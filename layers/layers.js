var wms_layers = [];


        var lyr_OSMStandard = new ol.layer.Tile({
            'title': 'OSM Standard',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
                attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_OvernightWinterParkingRestrictions = new ol.format.GeoJSON();
var features_OvernightWinterParkingRestrictions = format_OvernightWinterParkingRestrictions.readFeatures(json_OvernightWinterParkingRestrictions, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_OvernightWinterParkingRestrictions = new ol.source.Vector({
            attributions: '<a class="legend"><img src="styles/legend/OvernightWinterParkingRestrictions.png" /> <b>Overnight Winter Parking Restrictions</b>'
            });
jsonSource_OvernightWinterParkingRestrictions.addFeatures(features_OvernightWinterParkingRestrictions);
var lyr_OvernightWinterParkingRestrictions = new ol.layer.Vector({
            declutter: false,
            source:jsonSource_OvernightWinterParkingRestrictions, 
            style: style_OvernightWinterParkingRestrictions,
            permalink: "OvernightWinterParkingRestrictions",
            popuplayertitle: "Overnight Winter Parking Restrictions",
            interactive: true,
            title: '<img src="styles/legend/OvernightWinterParkingRestrictions.png" /> Overnight Winter Parking Restrictions'
            });
var extent_OvernightWinterParkingRestrictions = jsonSource_OvernightWinterParkingRestrictions.getExtent();
var buffer_extent_OvernightWinterParkingRestrictions = new ol.extent.buffer(extent_OvernightWinterParkingRestrictions, 200); //aumento extent di 50m
lyr_OvernightWinterParkingRestrictions.set('extent' , buffer_extent_OvernightWinterParkingRestrictions);


var format_PermitZones = new ol.format.GeoJSON();
var features_PermitZones = format_PermitZones.readFeatures(json_PermitZones, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_PermitZones = new ol.source.Vector({
        attributions: "<a class='legend'><b>Permit Zones</b><br />\
        <img src='styles/legend/PermitZones_0.png' /> Resticted Zone<br />\
        <img src='styles/legend/PermitZones_1.png' /> Buffer Zone<br /></a>"
            });
jsonSource_PermitZones.addFeatures(features_PermitZones);
var lyr_PermitZones = new ol.layer.Vector({
            declutter: false,
            source:jsonSource_PermitZones, 
            style: style_PermitZones,
            permalink: "PermitZones",
            popuplayertitle: "Permit Zones",
            interactive: true,
            title: "<div id='layertitle'>Permit Zones<br />\
            <i class='fas fa-angle-up' id='secondImage'></i><i class='fas fa-angle-down' id='firstImage'></i></div><a class='layerlegend'>\
            <img src='styles/legend/PermitZones_0.png' /> Resticted Zone<br />\
            <img src='styles/legend/PermitZones_1.png' /> Buffer Zone<br /></a>"
                });
var extent_PermitZones = jsonSource_PermitZones.getExtent();
var buffer_extent_PermitZones = new ol.extent.buffer(extent_PermitZones, 200); //aumento extent di 50m
lyr_PermitZones.set('extent' , buffer_extent_PermitZones);


var format_PaidParkingZones = new ol.format.GeoJSON();
var features_PaidParkingZones = format_PaidParkingZones.readFeatures(json_PaidParkingZones, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_PaidParkingZones = new ol.source.Vector({
        attributions: "<a class='legend'><b>Paid Parking Zones</b><br />\
        <img src='styles/legend/PaidParkingZones_0.png' /> 24/7 Enforced<br />\
        <img src='styles/legend/PaidParkingZones_1.png' /> 8AM - 12AM All Days <br />\
        <img src='styles/legend/PaidParkingZones_2.png' /> 8AM - 10PM Mon-Sat<br /></a>"
            });
jsonSource_PaidParkingZones.addFeatures(features_PaidParkingZones);
var lyr_PaidParkingZones = new ol.layer.Vector({
            declutter: false,
            source:jsonSource_PaidParkingZones, 
            style: style_PaidParkingZones,
            permalink: "PaidParkingZones",
            popuplayertitle: "Paid Parking Zones",
            interactive: true,
            title: "<div id='layertitle'>Paid Parking Zones<br />\
            <i class='fas fa-angle-up' id='secondImage'></i><i class='fas fa-angle-down' id='firstImage'></i></div><a class='layerlegend'>\
            <img src='styles/legend/PaidParkingZones_0.png' /> 24/7 Enforced<br />\
            <img src='styles/legend/PaidParkingZones_1.png' /> 8AM - 12AM All Days <br />\
            <img src='styles/legend/PaidParkingZones_2.png' /> 8AM - 10PM Mon-Sat<br /></a>"
                });
var extent_PaidParkingZones = jsonSource_PaidParkingZones.getExtent();
var buffer_extent_PaidParkingZones = new ol.extent.buffer(extent_PaidParkingZones, 200); //aumento extent di 50m
lyr_PaidParkingZones.set('extent' , buffer_extent_PaidParkingZones);


var format_RateofTicketingZScore = new ol.format.GeoJSON();
var features_RateofTicketingZScore = format_RateofTicketingZScore.readFeatures(json_RateofTicketingZScore, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_RateofTicketingZScore = new ol.source.Vector({
        attributions: "<a class='legend'><b>Rate of Ticketing (Z-Score)</b><br />\
        <img src='styles/legend/RateofTicketingZScore_0.png' /> -1 - 0<br />\
        <img src='styles/legend/RateofTicketingZScore_1.png' /> 0 <br />\
        <img src='styles/legend/RateofTicketingZScore_2.png' /> 0 - 1<br />\
        <img src='styles/legend/RateofTicketingZScore_3.png' /> 1 - 2<br />\
        <img src='styles/legend/RateofTicketingZScore_4.png' /> 2 - 3<br />\
        <img src='styles/legend/RateofTicketingZScore_5.png' /> 3 - 4<br />\
        <img src='styles/legend/RateofTicketingZScore_6.png' /> 4 - 5<br /></a>"
            });
jsonSource_RateofTicketingZScore.addFeatures(features_RateofTicketingZScore);
var lyr_RateofTicketingZScore = new ol.layer.Vector({
            declutter: false,
            source:jsonSource_RateofTicketingZScore, 
            style: style_RateofTicketingZScore,
            permalink: "RateofTicketingZScore",
            popuplayertitle: "Rate of Ticketing (Z-Score)",
            interactive: true,
            title: "<div id='layertitle'>Rate of Ticketing (Z-Score)<br />\
            <i class='fas fa-angle-up' id='secondImage'></i><i class='fas fa-angle-down' id='firstImage'></i></div><a class='layerlegend'>\
            <img src='styles/legend/RateofTicketingZScore_0.png' /> -1 - 0<br />\
            <img src='styles/legend/RateofTicketingZScore_1.png' /> 0 <br />\
            <img src='styles/legend/RateofTicketingZScore_2.png' /> 0 - 1<br />\
            <img src='styles/legend/RateofTicketingZScore_3.png' /> 1 - 2<br />\
            <img src='styles/legend/RateofTicketingZScore_4.png' /> 2 - 3<br />\
            <img src='styles/legend/RateofTicketingZScore_5.png' /> 3 - 4<br />\
            <img src='styles/legend/RateofTicketingZScore_6.png' /> 4 - 5<br /></a>"
                });
var extent_RateofTicketingZScore = jsonSource_RateofTicketingZScore.getExtent();
var buffer_extent_RateofTicketingZScore = new ol.extent.buffer(extent_RateofTicketingZScore, 200); //aumento extent di 50m
lyr_RateofTicketingZScore.set('extent' , buffer_extent_RateofTicketingZScore);


var format_FreeZoneMap = new ol.format.GeoJSON();
var features_FreeZoneMap = format_FreeZoneMap.readFeatures(json_FreeZoneMap, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FreeZoneMap = new ol.source.Vector({
            attributions: "<a class='legend'><b>Free Zone Map</b></a>"
            });
jsonSource_FreeZoneMap.addFeatures(features_FreeZoneMap);

var lyr_FreeZoneMap = new ol.layer.Heatmap({
    declutter: false,
    source: jsonSource_FreeZoneMap,
    maxResolution: 28004.466152261964,
    minResolution: 2.194429967691247,
    radius: 10,  // Radius as per QGIS
    blur: 30,
    shadow: 250,
    opacity: 0.5,
    weight: function(feature) {
        // Assuming your feature has a property 'density'
        var density = feature.get('density');
        return density; // Normalize or adjust the density value if needed
    },
    gradient: [
        'rgba(0, 255, 0, 0.0)',   // Fully transparent green for very low density
        'rgba(0, 255, 0, 1.0)',   // Fully opaque green for low density
        'rgba(255, 255, 0, 1.0)', // Fully opaque yellow for medium density
        'rgba(255, 0, 0, 0.1)',   // Fully opaque red for high density
        'rgba(255, 0, 0, 0.1)'    // Fully transparent red for very high density
    ],
    title: "Parking Zone Heatmap"
});

var extent_FreeZoneMap = jsonSource_FreeZoneMap.getExtent();
var buffer_extent_FreeZoneMap = new ol.extent.buffer(extent_FreeZoneMap, 200); // Increase extent by 200 units
lyr_FreeZoneMap.set('extent', buffer_extent_FreeZoneMap);






lyr_OSMStandard.setVisible(true);lyr_OvernightWinterParkingRestrictions.setVisible(true);lyr_PermitZones.setVisible(true);lyr_PaidParkingZones.setVisible(true);lyr_RateofTicketingZScore.setVisible(true);lyr_FreeZoneMap.setVisible(true);
var layersList = [lyr_OSMStandard,lyr_OvernightWinterParkingRestrictions,lyr_PermitZones,lyr_PaidParkingZones,lyr_RateofTicketingZScore,lyr_FreeZoneMap];
lyr_OvernightWinterParkingRestrictions.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'ON_STREET': 'ON_STREET', 'FROM_STREE': 'FROM_STREE', 'TO_STREET': 'TO_STREET', 'RESTRICT_T': 'RESTRICT_T', 'SHAPE_LEN': 'SHAPE_LEN', });
lyr_PermitZones.set('fieldAliases', {'name': 'name', 'folders': 'folders', 'description': 'description', 'altitude': 'altitude', 'alt_mode': 'alt_mode', 'time_begin': 'time_begin', 'time_end': 'time_end', 'time_when': 'time_when', 'ADDRESS_RANGE___HIGH': 'ADDRESS_RANGE___HIGH', 'ADDRESS_RANGE___LOW': 'ADDRESS_RANGE___LOW', 'Adress': 'Adress', 'Adress_Range_': 'Adress_Range_', 'BUFFER': 'BUFFER', 'ODD_EVEN': 'ODD_EVEN', 'ROW_ID': 'ROW_ID', 'SECOND_STREET_DIRECTION': 'SECOND_STREET_DIRECTION', 'STATUS': 'STATUS', 'STREET_DIRECTION': 'STREET_DIRECTION', 'STREET_NAME': 'STREET_NAME', 'STREET_TYPE': 'STREET_TYPE', 'WARD___HIGH': 'WARD___HIGH', 'WARD___LOW': 'WARD___LOW', 'ZONE': 'ZONE', 'Addy range': 'Addy range', });
lyr_PaidParkingZones.set('fieldAliases', {'name': 'name', 'folders': 'folders', 'description': 'description', 'altitude': 'altitude', 'alt_mode': 'alt_mode', 'time_begin': 'time_begin', 'time_end': 'time_end', 'time_when': 'time_when', 'Area': 'Area', 'Box_Addy': 'Box_Addy', 'City': 'City', 'Country': 'Country', 'End_Adress': 'End_Adress', 'End_St_Adress': 'End_St_Adress', 'Meter_ID': 'Meter_ID', 'Number_Of_Spaces': 'Number_Of_Spaces', 'Pay_Box_Adress': 'Pay_Box_Adress', 'STREET_SUFFIX': 'STREET_SUFFIX', 'Start_Adress': 'Start_Adress', 'Start_St_Adress': 'Start_St_Adress', 'State': 'State', 'Street_Direction': 'Street_Direction', 'Street_Name_': 'Street_Name_', 'Ward_Number_of_Spaces': 'Ward_Number_of_Spaces', 'Zone': 'Zone', 'zone_adress': 'zone_adress', 'layer': 'layer', 'path': 'path', 'start time': 'start time', 'end time': 'end time', 'active days': 'active days', 'hourszone': 'hourszone', });
lyr_RateofTicketingZScore.set('fieldAliases', {'fid': 'fid', 'pri_neigh': 'pri_neigh', 'sec_neigh': 'sec_neigh', 'shape_area': 'shape_area', 'shape_len': 'shape_len', 'Refactored_Community Number': 'Refactored_Community Number', 'Refactored_Point Count': 'Refactored_Point Count', 'Refactored_Above below': 'Refactored_Above below', 'Refactored_Z Score': 'Refactored_Z Score', 'pri_neigh_2': 'pri_neigh_2', 'sec_neigh_2': 'sec_neigh_2', 'shape_area_2': 'shape_area_2', 'shape_len_2': 'shape_len_2', 'Refactored_Community Number_2': 'Refactored_Community Number_2', 'Refactored_Point Count_2': 'Refactored_Point Count_2', 'Refactored_Above below_2': 'Refactored_Above below_2', 'Refactored_Z Score_2': 'Refactored_Z Score_2', 'Community_Area_Number': 'Community_Area_Number', 'Point Count': 'Point Count', 'Above below': 'Above below', 'Z Score': 'Z Score', });
lyr_OvernightWinterParkingRestrictions.set('fieldImages', {'OBJECTID': 'Range', 'ON_STREET': 'TextEdit', 'FROM_STREE': 'TextEdit', 'TO_STREET': 'TextEdit', 'RESTRICT_T': 'TextEdit', 'SHAPE_LEN': 'TextEdit', });
lyr_PermitZones.set('fieldImages', {'name': 'TextEdit', 'folders': 'TextEdit', 'description': 'TextEdit', 'altitude': 'TextEdit', 'alt_mode': 'TextEdit', 'time_begin': 'TextEdit', 'time_end': 'TextEdit', 'time_when': 'TextEdit', 'ADDRESS_RANGE___HIGH': 'Range', 'ADDRESS_RANGE___LOW': 'Range', 'Adress': 'TextEdit', 'Adress_Range_': 'Range', 'BUFFER': 'TextEdit', 'ODD_EVEN': 'TextEdit', 'ROW_ID': 'TextEdit', 'SECOND_STREET_DIRECTION': 'TextEdit', 'STATUS': 'TextEdit', 'STREET_DIRECTION': 'TextEdit', 'STREET_NAME': 'TextEdit', 'STREET_TYPE': 'TextEdit', 'WARD___HIGH': 'TextEdit', 'WARD___LOW': 'TextEdit', 'ZONE': 'TextEdit', 'Addy range': 'Range', });
lyr_PaidParkingZones.set('fieldImages', {'name': 'TextEdit', 'folders': 'TextEdit', 'description': 'TextEdit', 'altitude': 'TextEdit', 'alt_mode': 'TextEdit', 'time_begin': 'TextEdit', 'time_end': 'TextEdit', 'time_when': 'TextEdit', 'Area': 'TextEdit', 'Box_Addy': 'TextEdit', 'City': 'TextEdit', 'Country': 'TextEdit', 'End_Adress': 'TextEdit', 'End_St_Adress': 'TextEdit', 'Meter_ID': 'TextEdit', 'Number_Of_Spaces': 'Range', 'Pay_Box_Adress': 'Range', 'STREET_SUFFIX': 'TextEdit', 'Start_Adress': 'TextEdit', 'Start_St_Adress': 'TextEdit', 'State': 'TextEdit', 'Street_Direction': 'TextEdit', 'Street_Name_': 'TextEdit', 'Ward_Number_of_Spaces': 'TextEdit', 'Zone': 'TextEdit', 'zone_adress': 'TextEdit', 'layer': 'TextEdit', 'path': 'TextEdit', 'start time': 'TextEdit', 'end time': 'TextEdit', 'active days': 'TextEdit', 'hourszone': 'Range', });
lyr_RateofTicketingZScore.set('fieldImages', {'fid': 'TextEdit', 'pri_neigh': 'TextEdit', 'sec_neigh': 'TextEdit', 'shape_area': 'TextEdit', 'shape_len': 'TextEdit', 'Refactored_Community Number': 'Range', 'Refactored_Point Count': 'Range', 'Refactored_Above below': 'Range', 'Refactored_Z Score': 'Range', 'pri_neigh_2': 'TextEdit', 'sec_neigh_2': 'TextEdit', 'shape_area_2': 'TextEdit', 'shape_len_2': 'TextEdit', 'Refactored_Community Number_2': 'TextEdit', 'Refactored_Point Count_2': 'TextEdit', 'Refactored_Above below_2': 'TextEdit', 'Refactored_Z Score_2': 'TextEdit', 'Community_Area_Number': 'Range', 'Point Count': 'Range', 'Above below': 'Range', 'Z Score': 'Range', });
lyr_OvernightWinterParkingRestrictions.set('fieldLabels', {'OBJECTID': 'hidden field', 'ON_STREET': 'hidden field', 'FROM_STREE': 'hidden field', 'TO_STREET': 'hidden field', 'RESTRICT_T': 'hidden field', 'SHAPE_LEN': 'hidden field', });
lyr_PermitZones.set('fieldLabels', {'name': 'hidden field', 'folders': 'hidden field', 'description': 'hidden field', 'altitude': 'hidden field', 'alt_mode': 'hidden field', 'time_begin': 'hidden field', 'time_end': 'hidden field', 'time_when': 'hidden field', 'ADDRESS_RANGE___HIGH': 'hidden field', 'ADDRESS_RANGE___LOW': 'hidden field', 'Adress': 'no label', 'Adress_Range_': 'hidden field', 'BUFFER': 'no label', 'ODD_EVEN': 'hidden field', 'ROW_ID': 'hidden field', 'SECOND_STREET_DIRECTION': 'hidden field', 'STATUS': 'hidden field', 'STREET_DIRECTION': 'hidden field', 'STREET_NAME': 'hidden field', 'STREET_TYPE': 'hidden field', 'WARD___HIGH': 'hidden field', 'WARD___LOW': 'hidden field', 'ZONE': 'hidden field', 'Addy range': 'hidden field', });
lyr_PaidParkingZones.set('fieldLabels', {'name': 'hidden field', 'folders': 'hidden field', 'description': 'hidden field', 'altitude': 'hidden field', 'alt_mode': 'hidden field', 'time_begin': 'hidden field', 'time_end': 'hidden field', 'time_when': 'hidden field', 'Area': 'hidden field', 'Box_Addy': 'no label', 'City': 'hidden field', 'Country': 'hidden field', 'End_Adress': 'hidden field', 'End_St_Adress': 'hidden field', 'Meter_ID': 'no label', 'Number_Of_Spaces': 'hidden field', 'Pay_Box_Adress': 'hidden field', 'STREET_SUFFIX': 'hidden field', 'Start_Adress': 'hidden field', 'Start_St_Adress': 'hidden field', 'State': 'hidden field', 'Street_Direction': 'hidden field', 'Street_Name_': 'hidden field', 'Ward_Number_of_Spaces': 'hidden field', 'Zone': 'hidden field', 'zone_adress': 'hidden field', 'layer': 'hidden field', 'path': 'hidden field', 'start time': 'hidden field', 'end time': 'hidden field', 'active days': 'hidden field', 'hourszone': 'hidden field', });
lyr_RateofTicketingZScore.set('fieldLabels', {'fid': 'hidden field', 'pri_neigh': 'hidden field', 'sec_neigh': 'hidden field', 'shape_area': 'hidden field', 'shape_len': 'hidden field', 'Refactored_Community Number': 'hidden field', 'Refactored_Point Count': 'hidden field', 'Refactored_Above below': 'hidden field', 'Refactored_Z Score': 'hidden field', 'pri_neigh_2': 'hidden field', 'sec_neigh_2': 'hidden field', 'shape_area_2': 'hidden field', 'shape_len_2': 'hidden field', 'Refactored_Community Number_2': 'hidden field', 'Refactored_Point Count_2': 'hidden field', 'Refactored_Above below_2': 'hidden field', 'Refactored_Z Score_2': 'hidden field', 'Community_Area_Number': 'hidden field', 'Point Count': 'hidden field', 'Above below': 'hidden field', 'Z Score': 'no label', });
lyr_RateofTicketingZScore.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});