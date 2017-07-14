var context = document.getElementById('canvas').getContext("2d");

// Mouse Move Event

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

// Mouse Down Event
$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

// Mouse Up Event
$('#canvas').mouseup(function(e){
  paint = false;
});

//Mouse Leave Event
$('#canvas').mouseleave(function(e){
  paint = false;
});


//add click function
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(curTool == "eraser"){
    clickColor.push("white");
  }else{
    clickColor.push(curColor);
  }
  clickColor.push(curColor);
  clickSize.push(curSize);
}

//redraw function
function redraw()
{

  context.save();
  context.beginPath();
  var drawingAreaX = 0;
  var drawingAreaY = 0;
  var drawingAreaWidth = 2000;
  var drawingAreaHeight =2000;
  context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
  context.clip();

  var radius;
  var i = 0;
  for(; i < clickX.length; i++)
  {
  context.lineJoin = "round";
  for(var i=0; i < clickX.length; i++)
  {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
    }else{
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = radius;
    context.stroke();
  }
  context.globalAlpha = 1;
}
context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);

  context.restore();

}
 // end redraw function
// add outline
var outlineImage = new Image();
function prepareCanvas(){


  outlineImage.src = "templates/circ.png";
}


//Defines Color Variables
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var curColor = colorPurple;
var clickColor = new Array();
//TOOLS
var clickSize = new Array();
var curSize = "normal";
var clickTool = new Array();
var curTool = "crayon";


// Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
init = function () {

  // Load images
  crayonImage.onload = resourceLoaded;
  crayonImage.src = "templates/circ.png";

  markerImage.onload = resourceLoaded;
  markerImage.src = "images/marker-outline.png";

  eraserImage.onload = resourceLoaded;
  eraserImage.src = "images/eraser-outline.png";

  crayonBackgroundImage.onload = resourceLoaded;
  crayonBackgroundImage.src = "images/crayon-background.png";

  markerBackgroundImage.onload = resourceLoaded;
  markerBackgroundImage.src = "images/marker-background.png";

  eraserBackgroundImage.onload = resourceLoaded;
  eraserBackgroundImage.src = "images/eraser-background.png";

  crayonTextureImage.onload = resourceLoaded;
  crayonTextureImage.src = "images/crayon-texture.png";

  outlineImage.onload = resourceLoaded;
  outlineImage.src = "templates/circ.png";
};


init: init
;
;
