const triangles = [];
const circles = [];
const semiCircles = [];

function preload() {
  loader('T', 10);
  loader('C', 10);
  loader('SC', 10);
  logoName = loadImage('assets/TXT00.png');
  folio = loadFont('assets/FolioStd-Light.otf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  //Create Grid
  rectMode(CENTER);
  //rect(windowWidth/2,windowHeight/2,150,150);

  //Create Logo
  imageMode(CENTER);
  angleMode(DEGREES);
  image(circles[0], windowWidth/2, windowHeight/2, 300, 300);
  image(triangles[0], windowWidth/2, windowHeight/2, 300, 300);
  image(semiCircles[0], windowWidth/2, windowHeight/2, 300, 300);
  image(logoName, windowWidth/2, windowHeight/2, 300, 300);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text('45.4681388', -windowHeight/2-150, windowWidth/2-160);
  textAlign(CENTER);
  text('9.2147358 ', -windowHeight/2, windowWidth/2-160);
  textAlign(RIGHT);
  text('124', -windowHeight/2+150, windowWidth/2-160);
  pop();


  //Create Button
  button = createButton('Random');
  button.size(100, 50);
  button.position(windowWidth/2-50, windowHeight/2+250);
  button.mousePressed(changeLogo);
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
  image(circles[floor(random(10))], windowWidth/2, windowHeight/2, 300, 300);
  image(triangles[floor(random(10))], windowWidth/2, windowHeight/2, 300, 300);
  image(semiCircles[floor(random(10))], windowWidth/2, windowHeight/2, 300, 300);
  image(logoName, windowWidth/2, windowHeight/2, 300, 300);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text('45.4681388', -windowHeight/2-150, windowWidth/2-160);
  textAlign(CENTER);
  text('9.2147358 ', -windowHeight/2, windowWidth/2-160);
  textAlign(RIGHT);
  text('124', -windowHeight/2+150, windowWidth/2-160);
  pop();
}
