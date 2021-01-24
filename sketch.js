const triangles = [];
const circles = [];
const semiCircles = [];
var myCanvas;

function preload() {
  loader('T', 10);
  loader('C', 10);
  loader('SC', 10);
  logoName = loadImage('assets/TXT00.png');
  folio = loadFont('assets/FolioStd-Light.otf');
}

function setup() {
  myCanvas = createCanvas(500 ,500);
  myCanvas.parent("logo");
  //Create Grid
  rectMode(CENTER);
  //rect(windowWidth/2,windowHeight/2,150,150);

  //Create Logo
  imageMode(CENTER);
  angleMode(DEGREES);
  image(circles[0], 250, 250, 300, 300);
  image(triangles[0], 250, 250, 300, 300);
  image(semiCircles[0], 250, 250, 300, 300);
  image(logoName, 250, 250, 300, 300);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text('45.4681388', -250-150, 250-160);
  textAlign(CENTER);
  text('9.2147358 ', -250, 250-160);
  textAlign(RIGHT);
  text('124', -250+150, 250-160);
  pop();


  //Create Button to randomize
  randButton = createButton('Random');
  randButton.size(100, 50);
  randButton.position(windowWidth/2+50, windowHeight/2+250);
  randButton.mousePressed(changeLogo);

  //Create Button to save
  saveButton = createButton('Save');
  saveButton.size(100, 50);
  saveButton.position(windowWidth/2-150, windowHeight/2+250);
  saveButton.mousePressed(saveLogo);
}

function draw() {
}

function loader(name, num){
  for(let i = 0; i < num; i++){
    if(name === 'T'){
      triangles.push(loadImage('assets/triangle/T0'+i+'.png'));
    } else if(name === 'C'){
      circles.push(loadImage('assets/circle/C0'+i+'.png'));
    } else if(name === 'SC'){
      semiCircles.push(loadImage('assets/semiCircle/SC0'+i+'.png'));
    }
  }
}

function changeLogo(){
  clear();

  //Create Logo
  image(circles[floor(random(10))], 250, 250, 300, 300);
  image(triangles[floor(random(10))], 250, 250, 300, 300);
  image(semiCircles[floor(random(10))], 250, 250, 300, 300);
  image(logoName, 250, 250, 300, 300);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text('45.4681388', -250-150, 250-160);
  textAlign(CENTER);
  text('9.2147358 ', -250, 250-160);
  textAlign(RIGHT);
  text('124', -250+150, 250-160);
  pop();
}

function saveLogo(){
  saveCanvas(myCanvas, 'LdcLogo', 'png');
}

function windowResized() {
    resizeCanvas(500, 500); 
}
