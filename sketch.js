const trianglesone = [];
const trianglestwo = [];
const trianglesthree = [];
const trianglesfour = [];
const trianglesfive = [];
const trianglessix = [];
const trianglesseven = [];
const triangleseight = [];
const trianglesnine = [];
const trianglesten = [];
const circles = [];
const semiCircles = [];
var myCanvas, r1 = 0, r2 = 0, r3 = 0, selector, latitude, longitude, altitude, lastlat, lastlon, lastalt, hasinput = false, lastvalue;

function preload() {
  loader('T', 10);
  loader('C', 10);
  loader('SC', 10);
  logoName = loadImage('assets/TXT00.png');
  folio = loadFont('assets/FolioStd-Light.otf');
}

function loader(name, num){
  for(let i = 0; i < num; i++){
    if(name === 'T'){
      trianglesone.push(loadImage('assets/triangle/00/T0'+i+'.png'));
      trianglestwo.push(loadImage('assets/triangle/01/T0'+i+'.png'));
      trianglesthree.push(loadImage('assets/triangle/02/T0'+i+'.png'));
      trianglesfour.push(loadImage('assets/triangle/03/T0'+i+'.png'));
      trianglesfive.push(loadImage('assets/triangle/04/T0'+i+'.png'));
      trianglessix.push(loadImage('assets/triangle/05/T0'+i+'.png'));
      trianglesseven.push(loadImage('assets/triangle/06/T0'+i+'.png'));
      triangleseight.push(loadImage('assets/triangle/07/T0'+i+'.png'));
      trianglesnine.push(loadImage('assets/triangle/08/T0'+i+'.png'));
      trianglesten.push(loadImage('assets/triangle/09/T0'+i+'.png'));
    } else if(name === 'C'){
      circles.push(loadImage('assets/circle/C0'+i+'.png'));
    } else if(name === 'SC'){
      semiCircles.push(loadImage('assets/semiCircle/SC0'+i+'.png'));
    }
  }
}

function setup() {
  myCanvas = createCanvas(600 ,600);
  myCanvas.parent("logo");
  //Create Grid
  rectMode(CENTER);
  //rect(windowWidth/2,windowHeight/2,150,150);

  imageMode(CENTER);
  angleMode(DEGREES);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(14.5);
  text('0', -445, 147);
  textAlign(CENTER);
  text('0', -300, 147);
  textAlign(RIGHT);
  text('0', -150, 147);
  pop();

  lastlat = 0;
  lastlon = 0;
  lastalt = 0;

  //Create type selector
  selector = createSelect();
  selector.option('Arte negli spazi pubblici');
  selector.option('Associazioni');
  selector.option('Collezioni');
  selector.option('Fondazioni');
  selector.option('Istituti esteri');
  selector.option('Musei');
  selector.option('Musei aziendali e d\'impresa');
  selector.option('Parchi e Giardini');
  selector.option('Spazi espositivi');
  selector.option('Spazi indipendenti');
  selector.selected('Arte negli spazi pubblici');
  lastvalue = selector.value();
  selector.size(100, 20);
  selector.position(windowWidth/2+250, windowHeight/2+150);

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

  //Create Logo
  image(circles[0], 300, 300, 600, 600);
  checkTriangle();
  image(semiCircles[0], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);
}

function changeLogo(){
  lastvalue = selector.value();
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
  checkTriangle();
  image(semiCircles[r2], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(14.5);
  text(lastlat, -445, 147);
  textAlign(CENTER);
  text(lastlon, -300, 147);
  textAlign(RIGHT);
  text(lastalt, -150, 147);
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
  checkTriangle();
  image(semiCircles[r2], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  textSize(14.5);
  text(lastlat, -445, 147);
  textAlign(CENTER);
  text(lastlon, -300, 147);
  textAlign(RIGHT);
  text(lastalt, -150, 147);
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
    selector.remove();

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

    //Create type selector
    selector = createSelect();
    selector.option('Arte negli spazi pubblici');
    selector.option('Associazioni');
    selector.option('Collezioni');
    selector.option('Fondazioni');
    selector.option('Istituti esteri');
    selector.option('Musei');
    selector.option('Musei aziendali e d\'impresa');
    selector.option('Parchi e Giardini');
    selector.option('Spazi espositivi');
    selector.option('Spazi indipendenti');
    selector.selected(lastvalue);
    selector.size(100, 20);
    selector.position(windowWidth/2+250, windowHeight/2+150);

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

    //Create Logo
    image(circles[r1], 300, 300, 600, 600);
    checkTriangle();
    image(semiCircles[r3], 300, 300, 600, 600);
    image(logoName, 300, 300, 600, 600);
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

function checkTriangle(){
  if(selector.value() == 'Arte negli spazi pubblici'){
    image(trianglesone[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Associazioni'){
    image(trianglestwo[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Collezioni'){
    image(trianglesthree[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Fondazioni'){
    image(trianglesfour[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Istituti esteri'){
    image(trianglesfive[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Musei'){
    image(trianglessix[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Musei aziendali e d\'impresa'){
    image(trianglesseven[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Parchi e Giardini'){
    image(triangleseight[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Spazi espositivi'){
    image(trianglesnine[r1], 300, 300, 600, 600);
  } else if(selector.value() == 'Spazi indipendenti'){
    image(trianglesten[r1], 300, 300, 600, 600);
  }
}
