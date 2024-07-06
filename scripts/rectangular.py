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
    QgsProject,
    QgsWkbTypes
)
import math

class CreateRectangles(QgsProcessingAlgorithm):
    INPUT_POINTS = 'INPUT_POINTS'
    INPUT_LINES = 'INPUT_LINES'
    ADDRESS_FIELD = 'ADDRESS_FIELD'
    SPOTS_FIELD = 'SPOTS_FIELD'
    SPOT_LENGTH = 'SPOT_LENGTH'
    RECT_WIDTH = 'RECT_WIDTH'
    OUTPUT = 'OUTPUT'

    def tr(self, string):
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return CreateRectangles()

    def name(self):
        return 'create_rectangles'

    def displayName(self):
        return self.tr('Create Rectangles from Points')

    def group(self):
        return self.tr('Example scripts')

    def groupId(self):
        return 'examplescripts'

    def shortHelpString(self):
        return self.tr("Creates rectangular geometries from points based on the number of spots and street bearing")

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
            QgsProcessingParameterField(
                self.SPOTS_FIELD,
                self.tr('Spots Field'),
                parentLayerParameterName=self.INPUT_POINTS,
                type=QgsProcessingParameterField.Numeric
            )
        )

        self.addParameter(
            QgsProcessingParameterNumber(
                self.SPOT_LENGTH,
                self.tr('Length of Each Spot'),
                defaultValue=2.5
            )
        )

        self.addParameter(
            QgsProcessingParameterNumber(
                self.RECT_WIDTH,
                self.tr('Width of Rectangle'),
                defaultValue=5.0
            )
        )

        self.addParameter(
            QgsProcessingParameterFeatureSink(
                self.OUTPUT,
                self.tr('Output Rectangles')
            )
        )

    def processAlgorithm(self, parameters, context, feedback):
        points_source = self.parameterAsSource(parameters, self.INPUT_POINTS, context)
        lines_source = self.parameterAsSource(parameters, self.INPUT_LINES, context)
        address_field = self.parameterAsString(parameters, self.ADDRESS_FIELD, context)
        spots_field = self.parameterAsString(parameters, self.SPOTS_FIELD, context)
        spot_length = self.parameterAsDouble(parameters, self.SPOT_LENGTH, context)
        rect_width = self.parameterAsDouble(parameters, self.RECT_WIDTH, context)

        if points_source is None or lines_source is None:
            raise QgsProcessingException(self.invalidSourceError(parameters, self.INPUT_POINTS if points_source is None else self.INPUT_LINES))

        (sink, dest_id) = self.parameterAsSink(parameters, self.OUTPUT, context, points_source.fields(), QgsWkbTypes.Polygon, points_source.sourceCrs())

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
            if bearing < 0:
                bearing += 360
            return bearing, line_geom

        total = 100.0 / points_source.featureCount() if points_source.featureCount() else 0
        features = points_source.getFeatures()

        for current, point in enumerate(features):
            if feedback.isCanceled():
                break

            point_geom = point.geometry().asPoint()
            address = point[address_field]
            spots = point[spots_field]

            
            bearing, line_geom = get_bearing_and_line(point_geom)

            
            length = spots * spot_length
            half_length = length / 2
            half_width = rect_width / 2

            angle_rad = math.radians(bearing)
            dx_half_length = half_length * math.cos(angle_rad)
            dy_half_length = half_length * math.sin(angle_rad)
            dx_half_width = half_width * math.cos(angle_rad + math.pi / 2)
            dy_half_width = half_width * math.sin(angle_rad + math.pi / 2)

            corner1 = QgsPointXY(point_geom.x() - dx_half_length - dx_half_width, point_geom.y() - dy_half_length - dy_half_width)
            corner2 = QgsPointXY(point_geom.x() + dx_half_length - dx_half_width, point_geom.y() + dy_half_length - dy_half_width)
            corner3 = QgsPointXY(point_geom.x() + dx_half_length + dx_half_width, point_geom.y() + dy_half_length + dy_half_width)
            corner4 = QgsPointXY(point_geom.x() - dx_half_length + dx_half_width, point_geom.y() - dy_half_length + dy_half_width)

            
            rectangle = QgsGeometry.fromPolygonXY([[corner1, corner2, corner3, corner4, corner1]])

            new_feature = QgsFeature()
            new_feature.setGeometry(rectangle)
            new_feature.setAttributes(point.attributes())
            sink.addFeature(new_feature, QgsFeatureSink.FastInsert)

            feedback.setProgress(int(current * total))
            if current % 100 == 0:
                feedback.pushInfo(f'Processed {current} of {points_source.featureCount()} features')

        feedback.pushInfo('Rectangle creation completed')

        return {self.OUTPUT: dest_id}
