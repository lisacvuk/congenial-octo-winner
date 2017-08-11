var canvas = document.getElementById("mainCanvas");

var screen_width = 0; // Will be set in the res change code.
var screen_height = 0;

var board = {}

function init(){ // Most initalization happens in the res change code down there
  requestAnimationFrame(draw);
}
board.draw = function(context){ //TODO: Write this a bit more... elegantly.
  // First third
  context.beginPath();
  context.arc(board.centerX, board.centerY, board.radius, 0, (1/3)*2*Math.PI, false);
  context.lineWidth = board.lineWidth;
  context.strokeStyle = '#00FF00';
  context.stroke();
  // Second third
  context.beginPath();
  context.arc(board.centerX, board.centerY, board.radius, (1/3)*2*Math.PI, (2/3)*2*Math.PI, false);
  context.lineWidth = board.lineWidth;
  context.strokeStyle = '#0000FF';
  context.stroke();
  // Third third (heh)
  context.beginPath();
  context.arc(board.centerX, board.centerY, board.radius, (2/3)*2*Math.PI, 0, false);
  context.lineWidth = board.lineWidth;
  context.strokeStyle = '#FF0000';
  context.stroke();
}
function draw_player(context){
  // Second third
  context.beginPath();
  context.arc(board.centerX, board.centerY, board.radius - 20, (2.5/6)*2*Math.PI, (3.5/6)*2*Math.PI, false);
  context.lineWidth = board.lineWidth;
  context.strokeStyle = '#0000FF';
  context.stroke();
}
function draw(){
  update_resolution(canvas);

  var context = canvas.getContext('2d');

  board.draw(context);
  draw_player(context);
  requestAnimationFrame(draw);
}
function update_resolution(){ //Call every loop in case player changed res
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  screen_width = canvas.width;
  screen_height = canvas.height;

  if(screen_width > screen_height){ //Use whichever resolution is higher
                                    //TODO: Check if there is some other solution
    board.radius = screen_height / 2 - screen_height / 80;
    board.lineWidth = screen_height / 80;
  }else{
    board.radius = screen_width / 2- screen_width / 80;
    board.lineWidth = screen_width / 80;
  }
  board.centerX = screen_width / 2;
  board.centerY = screen_height / 2;
  //https://stackoverflow.com/questions/26745292/canvas-toggle-filling-whole-page-removing-scrollbar
  //Just in case I ever need this link again.
  document.body.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
init();
