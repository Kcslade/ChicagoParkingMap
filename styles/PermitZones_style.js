var size = 0;
var placement = 'point';
function categories_PermitZones(feature, value, size, resolution, labelText,
                       labelFont, labelFill, bufferColor, bufferWidth,
                       placement) {
                switch(value.toString()) {case "N":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(255,249,63,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 3.6479999999999997}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
                    break;
case "Y":
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(2,37,215,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 3.6479999999999997}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
                    break;}};

var style_PermitZones = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("BUFFER");
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
    
var style = categories_PermitZones(feature, value, size, resolution, labelText,
                          labelFont, labelFill, bufferColor,
                          bufferWidth, placement);

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
