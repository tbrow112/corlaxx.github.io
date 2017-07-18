
var context = document.getElementById('canvas').getContext("2d");
var outlineImage = new Image();
//onload listeners
document.addEventListener('DOMContentLoaded', function() {
  prepareCanvas();
  //alert("Ready!");
}, false);

// add outline
var drawingAreaX = 0;
var drawingAreaY = 0;
var drawingAreaWidth = 2000;
var drawingAreaHeight = 2000;
var heartbutton = document.getElementById('heart');

heartbutton.addEventListener('click', function() {
  outlineImage.src = "templates/heart.png";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
});

function clearFunction() {
  context.clearRect(0,0, canvas.width, canvas.height);
clickX=[];
clickY=[];
}

var circlebutton = document.getElementById('circle');
circlebutton.addEventListener('click', function() {
  outlineImage.src = "/templates/circ.png";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
});

var greenbutton = document.getElementById('green');
greenbutton.addEventListener('click', function() {
  curColor = colorGreen;
  curTool = "crayon";

});
var erasebutton = document.getElementById('white');
erasebutton.addEventListener('click', function() {
  curTool = "eraser";
});

var yellowbutton = document.getElementById('yellow');
yellowbutton.addEventListener('click', function() {
  curColor = colorYellow;
});

var purplebutton = document.getElementById('purple');
yellowbutton.addEventListener('click', function() {
  curColor = colorPurple;
});

var brownbutton = document.getElementById('brown');
yellowbutton.addEventListener('click', function() {
  curColor = colorBrown;
});

function prepareCanvas() {
  outlineImage.src = "templates/circ.png";
}

//Defines Color Variables
var colorPurple = "#6923c3";
var colorGreen = "#31b809";
var colorYellow = "#ffea32";
var colorBrown = "#5d3600";


var curColor = colorPurple;
var clickColor = new Array();
//TOOLS
var clickSize = new Array();
var curSize = "large";
var clickTool = new Array();
var curTool = "crayon";

// Mouse Move Event

$('#canvas').mousemove(function(e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

// Mouse Down Event
$('#canvas').mousedown(function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

// Mouse Up Event
$('#canvas').mouseup(function(e) {
  paint = false;
});

//Mouse Leave Event
$('#canvas').mouseleave(function(e) {
  paint = false;
});


//add click function
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if (curTool == "eraser") {
    clickColor.push("white");
  } else {
    clickColor.push(curColor);
  }
  //clickColor.push(curColor);
  clickSize.push(curSize);
}

//redraw function
function redraw() {

  context.save();
  context.beginPath();

  context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
  context.clip();

  var radius;
  var i = 0;
  for (; i < clickX.length; i++) {
    context.lineJoin = "round";
    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.strokeStyle = clickColor[i];
      context.lineWidth = 15;
      context.stroke();
    }
    context.globalAlpha = 1;
  }
  context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);

  context.restore();

}
 // end redraw function
/*// add outline
var outlineImage = new Image();
function prepareCanvas(){

  crayonImage.src = "images/crayon-outline.png";

  markerImage.src = "images/marker-outline.png";

  eraserImage.src = "images/eraser.png";

  crayonBackgroundImage.src = "images/crayon-background.png";

  markerBackgroundImage.src = "images/marker-background.png";

  eraserBackgroundImage.src = "images/eraser-background.png";


  crayonTextureImage.src = "images/crayon-texture.png";

  outlineImage.src = "templates/circ.png";
}*/


//Defines Color Variables
var colorPurple = "#6923c3";
var colorGreen = "#31b809";
var colorYellow = "#ffea32";
var colorBrown = "#5d3600";

var curColor = colorPurple;
var clickColor = new Array();
//TOOLS
var clickSize = new Array();
var curSize = "normal";
var clickTool = new Array();
var curTool = "crayon";
