"""
***************************************************************************
*                                                                         *
*   This program is free software; you can redistribute it and/or modify  *
*   it under the terms of the GNU General Public License as published by  *
*   the Free Software Foundation; either version 2 of the License, or     *
*   (at your option) any later version.                                   *
*                                                                         *
***************************************************************************
"""

from qgis.PyQt.QtCore import QCoreApplication, QVariant
from qgis.core import (QgsProcessing,
                       QgsProcessingException,
                       QgsProcessingAlgorithm,
                       QgsProcessingParameterFeatureSource,
                       QgsProcessingParameterField,
                       QgsProcessingParameterFileDestination,
                       QgsFeatureRequest,
                       QgsProcessingUtils)
import csv

class CommunityAreaPointCountAlgorithm(QgsProcessingAlgorithm):

    INPUT = 'INPUT'
    COMMUNITY_NAME_FIELD = 'COMMUNITY_NAME_FIELD'
    COMMUNITY_NUMBER_FIELD = 'COMMUNITY_NUMBER_FIELD'
    OUTPUT = 'OUTPUT'

    def tr(self, string):
        return QCoreApplication.translate('Processing', string)

    def createInstance(self):
        return CommunityAreaPointCountAlgorithm()

    def name(self):
        return 'community_area_point_count'

    def displayName(self):
        return self.tr('Community Area Point Count')

    def group(self):
        return self.tr('Custom scripts')

    def groupId(self):
        return 'customscripts'

    def shortHelpString(self):
        return self.tr("This algorithm generates a CSV with the count of points in each community area.")

    def initAlgorithm(self, config=None):
        self.addParameter(
            QgsProcessingParameterFeatureSource(
                self.INPUT,
                self.tr('Input layer'),
                [QgsProcessing.TypeVectorPoint]
            )
        )

        self.addParameter(
            QgsProcessingParameterField(
                self.COMMUNITY_NAME_FIELD,
                self.tr('Community Name Field'),
                parentLayerParameterName=self.INPUT,
                type=QgsProcessingParameterField.String
            )
        )

        self.addParameter(
            QgsProcessingParameterField(
                self.COMMUNITY_NUMBER_FIELD,
                self.tr('Community Number Field'),
                parentLayerParameterName=self.INPUT,
                type=QgsProcessingParameterField.Numeric
            )
        )

        self.addParameter(
            QgsProcessingParameterFileDestination(
                self.OUTPUT,
                self.tr('Output CSV file'),
                fileFilter='CSV files (*.csv)'
            )
        )

    def processAlgorithm(self, parameters, context, feedback):
        source = self.parameterAsSource(
            parameters,
            self.INPUT,
            context
        )

        if source is None:
            raise QgsProcessingException(self.invalidSourceError(parameters, self.INPUT))

        community_name_field = self.parameterAsString(
            parameters,
            self.COMMUNITY_NAME_FIELD,
            context
        )

        community_number_field = self.parameterAsString(
            parameters,
            self.COMMUNITY_NUMBER_FIELD,
            context
        )

        output_file = self.parameterAsFileOutput(
            parameters,
            self.OUTPUT,
            context
        )

        community_count = {}

        total = 100.0 / source.featureCount() if source.featureCount() else 0
        features = source.getFeatures()

        for current, feature in enumerate(features):
            if feedback.isCanceled():
                break

            community_name = feature[community_name_field]
            community_number = feature[community_number_field]

            if (community_name, community_number) in community_count:
                community_count[(community_name, community_number)] += 1
            else:
                community_count[(community_name, community_number)] = 1

            feedback.setProgress(int(current * total))

        with open(output_file, 'w', newline='') as csvfile:
            fieldnames = ['Community Name', 'Community Number', 'Point Count']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()

            for (community_name, community_number), count in community_count.items():
                writer.writerow({
                    'Community Name': community_name,
                    'Community Number': community_number,
                    'Point Count': count
                })

        return {self.OUTPUT: output_file}
