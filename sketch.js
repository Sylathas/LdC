const triangles = [];
const circles = [];
const semiCircles = [];
var myCanvas, r1 = 0, r2 = 0, r3 = 0, latitude, longitude, altitude, lastlat, lastlon, lastalt, hasinput = false;

function preload() {
  loader('T', 10);
  loader('C', 10);
  loader('SC', 10);
  logoName = loadImage('assets/TXT00.png');
  folio = loadFont('assets/FolioStd-Light.otf');
}

function setup() {
  myCanvas = createCanvas(600 ,600);
  myCanvas.parent("logo");
  //Create Grid
  rectMode(CENTER);
  //rect(windowWidth/2,windowHeight/2,150,150);

  //Create Logo
  imageMode(CENTER);
  angleMode(DEGREES);
  image(circles[0], 300, 300, 600, 600);
  image(triangles[0], 300, 300, 600, 600);
  image(semiCircles[0], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text('0', -300-150, 300-160);
  textAlign(CENTER);
  text('0', -300, 300-160);
  textAlign(RIGHT);
  text('0', -300+150, 300-160);
  pop();

  lastlat = 0;
  lastlon = 0;
  lastalt = 0;

  //Create latitude input
  latitude = createInput();
  latitude.size(100, 20);
  latitude.position(windowWidth/2-220, windowHeight/2+150);

  //Create longitude input
  longitude = createInput();
  longitude.size(100, 20);
  longitude.position(windowWidth/2-55, windowHeight/2+150);

  //Create altitude input
  altitude = createInput();
  altitude.size(100, 20);
  altitude.position(windowWidth/2+110, windowHeight/2+150);

  addInputPlaceholder();

  //Create Button to generate
  genButton = createButton('Generate');
  genButton.size(110, 50);
  genButton.position(windowWidth/2-220, windowHeight/2+250);
  genButton.mousePressed(changeLogo);

  //Create Button to save
  randButton = createButton('Save');
  randButton.size(110, 50);
  randButton.position(windowWidth/2-55, windowHeight/2+250);
  randButton.mousePressed(saveLogo);

  //Create Button to randomize
  saveButton = createButton('Randomize');
  saveButton.size(110, 50);
  saveButton.position(windowWidth/2+110, windowHeight/2+250);
  saveButton.mousePressed(randomizeLogo);
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
  hasinput = true;
  clear();
  if(latitude.value()){
    lastlat = latitude.value();
  }
  if (longitude.value()){
    lastlon = longitude.value();
  }
  if(altitude.value()){
    lastalt = altitude.value();
  }

  r1 = checkFirstNumber(lastlat, r1, true);
  r2 = checkFirstNumber(lastlon, r2, true);
  r3 = checkFirstNumber(lastalt, r3, false);


  //Create Logo
  image(circles[r3], 300, 300, 600, 600);
  image(triangles[r1], 300, 300, 600, 600);
  image(semiCircles[r2], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text(lastlat, -300-150, 300-160);
  textAlign(CENTER);
  text(lastlon, -300, 300-160);
  textAlign(RIGHT);
  text(lastalt, -300+150, 300-160);
  pop();
}

function randomizeLogo(){
  hasinput = true;
  clear();

  lastlat = random(10).toFixed(3);
  lastlon = random(10).toFixed(3);
  lastalt = floor(random(2000));
  addInputPlaceholder(hasinput);

  r1 = checkFirstNumber(lastlat, r1, true);
  r2 = checkFirstNumber(lastlon, r2, true);
  r3 = checkFirstNumber(lastalt, r3, false);

  //Create Logo
  image(circles[r3], 300, 300, 600, 600);
  image(triangles[r1], 300, 300, 600, 600);
  image(semiCircles[r2], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(13);
  text(lastlat, -300-150, 300-160);
  textAlign(CENTER);
  text(lastlon, -300, 300-160);
  textAlign(RIGHT);
  text(lastalt, -300+150, 300-160);
  pop();
}

function checkFirstNumber(coordinate, r, n){
  var cordfirst1 = coordinate;
  if(n){cordfirst1 = (coordinate - floor(coordinate))*10;}
  const cordfirst2 = str(cordfirst1).charAt(0);
  const cordfirst3 = Number(cordfirst2);
  if(cordfirst3 > -1 || cordfirst3 < 10){
    return cordfirst3;
  } else{
    return r;
  }
}

function saveLogo(){
  saveCanvas(myCanvas, 'LdcLogo', 'png');
}

function windowResized() {
    clear();
    randButton.remove();
    saveButton.remove();
    genButton.remove();
    latitude.remove();
    longitude.remove();
    altitude.remove();

    //Create Logo
    image(circles[r1], 300, 300, 600, 600);
    image(triangles[r2], 300, 300, 600, 600);
    image(semiCircles[r3], 300, 300, 600, 600);
    image(logoName, 300, 300, 600, 600);

    //Add Coordinates
    textFont(folio);
    push();
    rotate(-90);
    textSize(13);
    text(lastlat, -300-150, 300-160);
    textAlign(CENTER);
    text(lastlon, -300, 300-160);
    textAlign(RIGHT);
    text(lastalt, -300+150, 300-160);
    pop();

    //Create latitude input
    latitude = createInput();
    latitude.size(100, 20);
    latitude.position(windowWidth/2-220, windowHeight/2+150);

    //Create longitude input
    longitude = createInput();
    longitude.size(100, 20);
    longitude.position(windowWidth/2-55, windowHeight/2+150);

    //Create altitude input
    altitude = createInput();
    altitude.size(100, 20);
    altitude.position(windowWidth/2+110, windowHeight/2+150);

    addInputPlaceholder(hasinput);

    //Create Button to generate
    genButton = createButton('Generate');
    genButton.size(110, 50);
    genButton.position(windowWidth/2-220, windowHeight/2+250);
    genButton.mousePressed(changeLogo);

    //Create Button to save
    randButton = createButton('Save');
    randButton.size(110, 50);
    randButton.position(windowWidth/2-55, windowHeight/2+250);
    randButton.mousePressed(saveLogo);

    //Create Button to randomize
    saveButton = createButton('Randomize');
    saveButton.size(110, 50);
    saveButton.position(windowWidth/2+110, windowHeight/2+250);
    saveButton.mousePressed(randomizeLogo);
}

function addInputPlaceholder(hasinput){
  i = 0;
  inputs = document.getElementsByTagName('input');
  for (input of inputs){
    if(hasinput){
      if(i == 0){input.value = lastlat;}
      else if(i == 1){input.value = lastlon;}
      else if(i == 2){input.value = lastalt;}
    } else if(!hasinput){
      if(i == 0){input.placeholder = "Latitudine";}
      else if(i == 1){input.placeholder = "Longitudine";}
      else if(i == 2){input.placeholder = "Altitudine";}
    }
    i++;
  }
}
