from qgis.PyQt.QtCore import QCoreApplication
from qgis.core import (
    QgsProcessing,
    QgsFeatureSink,
    QgsProcessingException,
    QgsProcessingAlgorithm,
    QgsProcessingParameterFeatureSource,
    QgsProcessingParameterFeatureSink,
    QgsProcessingParameterField,
    QgsSpatialIndex,
    QgsFeatureRequest,
    QgsGeometry,
    QgsFeature
)
from qgis import processing

class SnapPointsToStreet(QgsProcessingAlgorithm):
    INPUT_POINTS = 'INPUT_POINTS'
    INPUT_LINES = 'INPUT_LINES'
    STREET_NAME_FIELD_POINTS = 'STREET_NAME_FIELD_POINTS'
    STREET_NAME_FIELD_LINES = 'STREET_NAME_FIELD_LINES'
    OUTPUT = 'OUTPUT'

    def tr(self, string):
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return SnapPointsToStreet()

    def name(self):
        return 'snap_points_to_street'

    def displayName(self):
        return self.tr('Snap Points to Street')

    def group(self):
        return self.tr('Example scripts')

    def groupId(self):
        return 'examplescripts'

    def shortHelpString(self):
        return self.tr("Snaps points to the nearest street centerline with the same street name")

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
                self.STREET_NAME_FIELD_POINTS,
                self.tr('Street Name Field in Points Layer'),
                parentLayerParameterName=self.INPUT_POINTS,
                type=QgsProcessingParameterField.String
            )
        )

        self.addParameter(
            QgsProcessingParameterField(
                self.STREET_NAME_FIELD_LINES,
                self.tr('Street Name Field in Lines Layer'),
                parentLayerParameterName=self.INPUT_LINES,
                type=QgsProcessingParameterField.String
            )
        )

        self.addParameter(
            QgsProcessingParameterFeatureSink(
                self.OUTPUT,
                self.tr('Snapped Points')
            )
        )

    def processAlgorithm(self, parameters, context, feedback):
        points_source = self.parameterAsSource(parameters, self.INPUT_POINTS, context)
        lines_source = self.parameterAsSource(parameters, self.INPUT_LINES, context)
        street_name_field_points = self.parameterAsString(parameters, self.STREET_NAME_FIELD_POINTS, context)
        street_name_field_lines = self.parameterAsString(parameters, self.STREET_NAME_FIELD_LINES, context)

        if points_source is None or lines_source is None:
            raise QgsProcessingException(self.invalidSourceError(parameters, self.INPUT_POINTS if points_source is None else self.INPUT_LINES))

        (sink, dest_id) = self.parameterAsSink(parameters, self.OUTPUT, context, points_source.fields(), points_source.wkbType(), points_source.sourceCrs())

        if sink is None:
            raise QgsProcessingException(self.invalidSinkError(parameters, self.OUTPUT))

        index = QgsSpatialIndex(lines_source.getFeatures(), feedback)

        def snap_to_nearest(point_geom, street_name):
            expr = f'"{street_name_field_lines}" = \'{street_name}\''
            request = QgsFeatureRequest().setFilterExpression(expr)
            nearest_ids = index.nearestNeighbor(point_geom, 10)
            min_dist = float('inf')
            nearest_point = None
            for nearest_id in nearest_ids:
                nearest_street = next(lines_source.getFeatures(QgsFeatureRequest(nearest_id)))
                if nearest_street[street_name_field_lines] == street_name:
                    nearest_street_geom = nearest_street.geometry()
                    candidate_point = nearest_street_geom.nearestPoint(QgsGeometry.fromPointXY(point_geom))
                    dist = candidate_point.distance(QgsGeometry.fromPointXY(point_geom))
                    if dist < min_dist:
                        min_dist = dist
                        nearest_point = candidate_point
            return nearest_point

        total = 100.0 / points_source.featureCount() if points_source.featureCount() else 0
        features = points_source.getFeatures()

        for current, point in enumerate(features):
            if feedback.isCanceled():
                break

            point_geom = point.geometry().asPoint()
            street_name = point[street_name_field_points]
            nearest_point_geom = snap_to_nearest(point_geom, street_name)
            if nearest_point_geom:
                new_feature = QgsFeature()
                new_feature.setGeometry(nearest_point_geom)
                new_feature.setAttributes(point.attributes())
                sink.addFeature(new_feature, QgsFeatureSink.FastInsert)

            feedback.setProgress(int(current * total))
            if current % 100 == 0:  # Update the console every 100 features
                feedback.pushInfo(f'Processed {current} of {points_source.featureCount()} features')

        feedback.pushInfo('Processing completed')

        return {self.OUTPUT: dest_id}
