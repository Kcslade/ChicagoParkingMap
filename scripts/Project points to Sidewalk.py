from qgis.PyQt.QtCore import QCoreApplication, QVariant
from qgis.core import (
    QgsProcessing,
    QgsFeatureSink,
    QgsProcessingException,
    QgsProcessingAlgorithm,
    QgsProcessingParameterFeatureSource,
    QgsProcessingParameterFeatureSink,
    QgsProcessingParameterField,
    QgsProcessingParameterNumber,
    QgsFeatureRequest,
    QgsGeometry,
    QgsFeature,
    QgsPointXY,
    QgsSpatialIndex,
    QgsCoordinateTransform,
    QgsProject
)
import math

class ProjectPoints(QgsProcessingAlgorithm):
    INPUT_POINTS = 'INPUT_POINTS'
    INPUT_LINES = 'INPUT_LINES'
    ADDRESS_FIELD = 'ADDRESS_FIELD'
    DISTANCE = 'DISTANCE'
    OUTPUT = 'OUTPUT'

    def tr(self, string):
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return ProjectPoints()

    def name(self):
        return 'project_points'

    def displayName(self):
        return self.tr('Project Points Perpendicular to Line')

    def group(self):
        return self.tr('Example scripts')

    def groupId(self):
        return 'examplescripts'

    def shortHelpString(self):
        return self.tr("Projects points perpendicular to the centerline based on bearing and address parity")

    def initAlgorithm(self, config=None):
        self.addParameter(
            QgsProcessingParameterFeatureSource(
                self.INPUT_POINTS,
                self.tr('Input Points Layer'),
                [QgsProcessing.TypeVectorPoint]
            )
        )

        self.addParameter(
            QgsProcessingParameterFeatureSource(
                self.INPUT_LINES,
                self.tr('Input Lines Layer'),
                [QgsProcessing.TypeVectorLine]
            )
        )

        self.addParameter(
            QgsProcessingParameterField(
                self.ADDRESS_FIELD,
                self.tr('Address Field'),
                parentLayerParameterName=self.INPUT_POINTS,
                type=QgsProcessingParameterField.Numeric
            )
        )

        self.addParameter(
            QgsProcessingParameterNumber(
                self.DISTANCE,
                self.tr('Projection Distance'),
                defaultValue=10.0
            )
        )

        self.addParameter(
            QgsProcessingParameterFeatureSink(
                self.OUTPUT,
                self.tr('Projected Points')
            )
        )

    def processAlgorithm(self, parameters, context, feedback):
        points_source = self.parameterAsSource(parameters, self.INPUT_POINTS, context)
        lines_source = self.parameterAsSource(parameters, self.INPUT_LINES, context)
        address_field = self.parameterAsString(parameters, self.ADDRESS_FIELD, context)
        distance = self.parameterAsDouble(parameters, self.DISTANCE, context)

        if points_source is None or lines_source is None:
            raise QgsProcessingException(self.invalidSourceError(parameters, self.INPUT_POINTS if points_source is None else self.INPUT_LINES))

        (sink, dest_id) = self.parameterAsSink(parameters, self.OUTPUT, context, points_source.fields(), points_source.wkbType(), points_source.sourceCrs())

        if sink is None:
            raise QgsProcessingException(self.invalidSinkError(parameters, self.OUTPUT))

        points_crs = points_source.sourceCrs()
        lines_crs = lines_source.sourceCrs()

        if points_crs != lines_crs:
            transform = QgsCoordinateTransform(lines_crs, points_crs, QgsProject.instance())

        index = QgsSpatialIndex(lines_source.getFeatures())

        def get_bearing_and_line(point_geom):
            nearest_id = index.nearestNeighbor(point_geom, 1)[0]
            nearest_line = next(lines_source.getFeatures(QgsFeatureRequest(nearest_id)))
            line_geom = nearest_line.geometry()
            if points_crs != lines_crs:
                line_geom.transform(transform)
            start_point = line_geom.vertexAt(0)
            end_point = line_geom.vertexAt(1)
            bearing = math.degrees(math.atan2(end_point.y() - start_point.y(), end_point.x() - start_point.x()))
            return bearing, line_geom

        total = 100.0 / points_source.featureCount() if points_source.featureCount() else 0
        features = points_source.getFeatures()

        for current, point in enumerate(features):
            if feedback.isCanceled():
                break

            point_geom = point.geometry().asPoint()
            address = point[address_field]

            # Get the bearing from the nearest line segment
            bearing, line_geom = get_bearing_and_line(point_geom)

            # Determine the direction based on address and bearing
            direction = 1 if address % 2 == 0 else -1

            # Adjust direction based on bearing and address parity
            if 0 <= bearing < 90:  # North-East
                if address % 2 == 0:
                    direction = -1  # Even: West side
                else:
                    direction = 1  # Odd: East side
            elif 90 <= bearing < 180:  # South-East
                if address % 2 == 0:
                    direction = 1  # Even: South side
                else:
                    direction = -1  # Odd: North side
            elif 180 <= bearing < 270:  # South-West
                if address % 2 == 0:
                    direction = 1  # Even: South side
                else:
                    direction = -1  # Odd: North side
            elif 270 <= bearing < 360:  # North-West
                if address % 2 == 0:
                    direction = -1  # Even: West side
                else:
                    direction = 1  # Odd: East side

        
            angle_rad = math.radians(bearing + (90 * direction))
            new_x = point_geom.x() + distance * math.cos(angle_rad)
            new_y = point_geom.y() + distance * math.sin(angle_rad)
            new_point_geom = QgsGeometry.fromPointXY(QgsPointXY(new_x, new_y))

            new_feature = QgsFeature()
            new_feature.setGeometry(new_point_geom)
            new_feature.setAttributes(point.attributes())
            sink.addFeature(new_feature, QgsFeatureSink.FastInsert)

            feedback.setProgress(int(current * total))
            if current % 100 == 0:
                feedback.pushInfo(f'Processed {current} of {points_source.featureCount()} features')

        feedback.pushInfo('Projection completed')

        return {self.OUTPUT: dest_id}
