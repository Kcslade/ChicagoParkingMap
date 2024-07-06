var size = 0;
var placement = 'point';

function createXPattern(color) {
    var canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 8;
    var context = canvas.getContext('2d');

    context.strokeStyle = color;
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(8, 8);
    context.stroke();

    context.beginPath();
    context.moveTo(8, 0);
    context.lineTo(0, 8);
    context.stroke();

    return context.createPattern(canvas, 'repeat');
}

function createLinePattern(angle, color) {
    var canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 8;
    var context = canvas.getContext('2d');

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(angle * Math.PI / 180);
    context.translate(-canvas.width / 2, -canvas.height / 2);

    context.beginPath();
    context.moveTo(0, 4);
    context.lineTo(8, 4);
    context.stroke();

    return context.createPattern(canvas, 'repeat');
}

var patternCase1 = createXPattern('rgba(205, 0, 3, 1.0)');
var patternCase2 = createLinePattern(35, 'rgba(232, 0, 4, 1.0)');

function categories_PaidParkingZones(feature, value, size, resolution, labelText,
                       labelFont, labelFill, bufferColor, bufferWidth,
                       placement) {
    var fill_PaidParkingZones;
    switch(value.toString()) {
        case "1":
            fill_PaidParkingZones = new ol.style.Fill({
                color: patternCase1
            });
            return [new ol.style.Style({
                fill: fill_PaidParkingZones,
                text: createTextStyle(feature, resolution, labelText, labelFont,
                                      labelFill, placement, bufferColor,
                                      bufferWidth)
            }), new ol.style.Style({
                stroke: new ol.style.Stroke({color: 'rgba(205,0,3,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 3.6479999999999997}),
                text: createTextStyle(feature, resolution, labelText, labelFont,
                                      labelFill, placement, bufferColor,
                                      bufferWidth)
            })];
            break;
        case "2":
            fill_PaidParkingZones = new ol.style.Fill({
                color: patternCase2
            });
            return [new ol.style.Style({
                fill: fill_PaidParkingZones,
                text: createTextStyle(feature, resolution, labelText, labelFont,
                                      labelFill, placement, bufferColor,
                                      bufferWidth)
            }), new ol.style.Style({
                stroke: new ol.style.Stroke({color: 'rgba(232,0,4,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 3.6479999999999997}),
                text: createTextStyle(feature, resolution, labelText, labelFont,
                                      labelFill, placement, bufferColor,
                                      bufferWidth)
            })];
            break;
        case "3":
            return [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 0, 0)' // No fill
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 1.0)', // Red stroke
                    width: 3.6479999999999997
                }),
                text: createTextStyle(feature, resolution, labelText, labelFont,
                                      labelFill, placement, bufferColor,
                                      bufferWidth)
            })];
            break;
        default:
            return [new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.6)' // Default fill color
                }),
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 1
                }),
                text: createTextStyle(feature, resolution, labelText, labelFont,
                                      labelFill, placement, bufferColor,
                                      bufferWidth)
            })];
    }
}

var style_PaidParkingZones = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("hourszone");
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
    
var style = categories_PaidParkingZones(feature, value, size, resolution, labelText,
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
