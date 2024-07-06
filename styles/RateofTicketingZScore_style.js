var size = 0;
var placement = 'point';

var style_RateofTicketingZScore = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("Z Score");
    var labelText = "";
    size = 0;
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    var style = []; // Initialize style array

    if (value >= -1.000000 && value < 0.000000) {
        style = [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.449)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),
            fill: new ol.style.Fill({color: 'rgba(43,131,186,0.449)'}),
            text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
        })];
    } else if (value >= 0.000000 && value < 1.000000) {
        style = [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.449)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),
            fill: new ol.style.Fill({color: 'rgba(128,191,171,0.449)'}),
            text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
        })];
    } else if (value >= 1.000000 && value < 2.000000) {
        style = [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.449)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),
            fill: new ol.style.Fill({color: 'rgba(199,232,173,0.449)'}),
            text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
        })];
    } else if (value >= 2.000000 && value < 3.000000) {
        style = [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.449)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),
            fill: new ol.style.Fill({color: 'rgba(255,255,191,0.449)'}),
            text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
        })];
    } else if (value >= 3.000000 && value < 4.000000) {
        style = [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.449)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),
            fill: new ol.style.Fill({color: 'rgba(254,201,128,0.449)'}),
            text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
        })];
    } else if (value >= 4.000000 && value <= 5.000000) {
        style = [ new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,0.449)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.988}),
            fill: new ol.style.Fill({color: 'rgba(215,25,28,0.449)'}),
            text: createTextStyle(feature, resolution, labelText, labelFont, labelFill, placement, bufferColor, bufferWidth)
        })];
    }

    var interval = 250;
    var geometry = feature.getGeometry();
    if (geometry.getType() === 'MultiLineString') {
      geometry.getLineStrings().forEach(function (line) {
        var length = line.getLength();
        var intervals = Math.ceil(length / (interval * resolution));
        for (let i = 1; i < intervals; ++i) { //will not place labels at the start and end of the line
     // for (let i = 0; i <= intervals; ++i) to include them	
          var point = line.getCoordinateAt(i / intervals);
          var styletext = new ol.style.Style({
            text: new ol.style.Text({
              text: labelText,
              font: labelFont,
              fill: new ol.style.Fill({
                color: labelFill
              }),
              stroke: new ol.style.Stroke({
                color: bufferColor, 
                width: bufferWidth
              }),
            })
         });
          styletext.setGeometry(new ol.geom.Point(point));
          style.push(styletext);
        }
      });
    }

    return style;
};
