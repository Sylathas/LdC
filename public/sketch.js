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
var myCanvas, r1 = 0,
  r2 = 0,
  r3 = 0,
  selector, lastlat = 0,
  lastlon = 0,
  lastalt = 0,
  hasinput = false,
  lastvalue, styleSpec, elevation = 0,
  checkbox1, checkbox2, checker1 = false,
  checker2 = false;

function preload() {
  loader('T', 10);
  loader('C', 10);
  loader('SC', 10);
  logoName = loadImage('assets/TXT00.png');
  folio = loadFont('assets/FolioStd-Light.otf');
}

function loader(name, num) {
  for (let i = 0; i < num; i++) {
    if (name === 'T') {
      trianglesone.push(loadImage('assets/triangle/00/T0' + i + '.png'));
      if ($("#map").css("opacity") == "1") {
        trianglestwo.push(loadImage('assets/triangle/01/T0' + i + '.png'));
        trianglesthree.push(loadImage('assets/triangle/02/T0' + i + '.png'));
        trianglesfour.push(loadImage('assets/triangle/03/T0' + i + '.png'));
        trianglesfive.push(loadImage('assets/triangle/04/T0' + i + '.png'));
        trianglessix.push(loadImage('assets/triangle/05/T0' + i + '.png'));
        trianglesseven.push(loadImage('assets/triangle/06/T0' + i + '.png'));
        triangleseight.push(loadImage('assets/triangle/07/T0' + i + '.png'));
        trianglesnine.push(loadImage('assets/triangle/08/T0' + i + '.png'));
        trianglesten.push(loadImage('assets/triangle/09/T0' + i + '.png'));
      }
    } else if (name === 'C') {
      circles.push(loadImage('assets/circle/C0' + i + '.png'));
    } else if (name === 'SC') {
      semiCircles.push(loadImage('assets/semiCircle/SC0' + i + '.png'));
    }
  }
}

function setup() {
  if (windowWidth < 480) {
    myCanvas = createCanvas(300, 300);
  } else {
    myCanvas = createCanvas(600, 600);
  }

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

  //Create checkbox 1
  checkbox1 = createCheckbox('rimuovi coordinate', checker1);
  checkbox1.changed(myCheckedEvent1);
  checkbox1.position(windowWidth / 10, windowHeight / 1.3);


  //Create checkbox 2
  checkbox2 = createCheckbox('rimuovi nome', checker2);
  checkbox2.changed(myCheckedEvent2);
  checkbox2.position(windowWidth / 10, windowHeight / 1.25);


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
  selector.id('aidi');
  lastvalue = selector.value();
  selector.changed(function() {
    changeLogo();
  });
  selector.parent("selecto");
  selector.size(windowWidth / 5.9, 30);
  selector.position(windowWidth / 4.7, windowHeight / 1.44);

  /*
    //Create latitude input
    latitude = createInput();
    latitude.size(70, 13);
    latitude.position(300, windowHeight / 2 + 150);

    //Create longitude input
    longitude = createInput();
    longitude.size(70, 13);
    longitude.position(400, windowHeight / 2 + 150);

    //Create altitude input
    altitude = createInput();
    altitude.size(70, 13);
    altitude.position(500, windowHeight / 2 + 150);

    addInputPlaceholder();

    //Create Button to generate
    genButton = createButton('Genera');
    genButton.size(110, 50);
    genButton.position(300, windowHeight / 2 + 200);
    genButton.mousePressed(changeLogo);
  */
  //Create Button to save
  randButton = createButton('Salva');
  randButton.mousePressed(saveLogo);

  randButton.size(windowWidth / 15, 30);
  randButton.position(windowWidth / 10, windowHeight / 1.44);

  /*
    //Create Button to randomize
    saveButton = createButton('Randomizza');
    saveButton.size(110, 50);
    saveButton.position(600, windowHeight / 2 + 200);
    saveButton.mousePressed(randomizeLogo);
  */

  //Create Logo
  image(circles[0], 300, 300, 600, 600);
  checkTriangle();
  image(semiCircles[0], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);
}

function changeLogo() {
  lastvalue = selector.value();
  hasinput = true;
  clear();
  if (styleSpec) {
    if (styleSpec.center[1]) {
      lastlat = styleSpec.center[1];
    }
    if (styleSpec.center[0]) {
      lastlon = styleSpec.center[0];
    }
  } else {
    lastlat = 0;
    lastlon = 0;
  }

  if (elevation) {
    lastalt = elevation;
  }

  r1 = checkFirstNumber(lastlat, r1, true);
  r2 = checkFirstNumber(lastlon, r2, true);
  r3 = checkFirstNumber(lastalt, r3, false);

  //Create Logo
  image(circles[r3], 300, 300, 600, 600);
  checkTriangle();
  image(semiCircles[r2], 300, 300, 600, 600);
  if (!checker2) {
    image(logoName, 300, 300, 600, 600);
  }

  //Add Coordinates
  textFont(folio);
  push();
  rotate(-90);
  if (!checker1) {
    textSize(14.5);
    if (styleSpec) {
      text(styleSpec.center[0].toFixed(3), -445, 147);
      textAlign(CENTER);
      text(styleSpec.center[1].toFixed(3), -300, 147);
    } else {
      text(0, -445, 147);
      textAlign(CENTER);
      text(0, -300, 147);
    }
    textAlign(RIGHT);
    text(elevation, -150, 147);
  }
  pop();
}

/*function randomizeLogo() {
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
*/
function checkFirstNumber(coordinate, r, n) {
  var cordfirst1 = coordinate;
  if (n) {
    cordfirst1 = (coordinate - floor(coordinate)) * 100;
  }
  const cordfirst2 = str(cordfirst1).charAt(1);
  const cordfirst3 = Number(cordfirst2);
  if (cordfirst3 > -1 || cordfirst3 < 10) {
    return cordfirst3;
  } else {
    return r;
  }
}

function saveLogo() {
  saveCanvas(myCanvas, 'LdcLogo', 'png');
}

function windowResized() {
  clear();
  randButton.remove();
  selector.remove();
  checkbox1.remove();
  checkbox2.remove();

  if (checker1 == false) {
    //Add Coordinates
    textFont(folio);
    push();
    rotate(-90);
    textSize(14.5);
    if (styleSpec) {
      text(styleSpec.center[0].toFixed(3), -445, 147);
      textAlign(CENTER);
      text(styleSpec.center[1].toFixed(3), -300, 147);
    } else {
      text(0, -445, 147);
      textAlign(CENTER);
      text(0, -300, 147);
    }
    textAlign(RIGHT);
    text(elevation, -150, 147);
  }
  pop();

  //Create checkbox 1
  checkbox1 = createCheckbox('rimuovi coordinate', checker1);
  checkbox1.changed(myCheckedEvent1);
  checkbox1.position(windowWidth / 10, windowHeight / 1.3);

  //Create checkbox 2
  checkbox2 = createCheckbox('rimuovi nome', checker2);
  checkbox2.changed(myCheckedEvent2);
  checkbox2.position(windowWidth / 10, windowHeight / 1.25);

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
  if ($("#map").css("opacity") == "0.99") {
    selector.position(windowWidth / 2, windowHeight * 0.86);
    selector.size(windowWidth / 2.5, 40);
  } else {
    selector.size(windowWidth / 5.9, 30);
    selector.position(windowWidth / 4.7, windowHeight / 1.44);
  }
  selector.id('aidi');
  selector.changed(function() {
    changeLogo();
  });
  selector.parent("selecto");
  /*
    //Create latitude input
    latitude = createInput();
    latitude.size(100, 20);
    latitude.position(windowWidth / 2 - 220, windowHeight / 2 + 150);

    //Create longitude input
    longitude = createInput();
    longitude.size(100, 20);
    longitude.position(windowWidth / 2 - 55, windowHeight / 2 + 150);

    //Create altitude input
    altitude = createInput();
    altitude.size(100, 20);
    altitude.position(windowWidth / 2 + 110, windowHeight / 2 + 150);

    addInputPlaceholder(hasinput);

    //Create Button to generate
    genButton = createButton('Generate');
    genButton.size(110, 50);
    genButton.position(windowWidth / 2 - 220, windowHeight / 2 + 250);
    genButton.mousePressed(changeLogo);
  */
  //Create Button to save
  randButton = createButton('Salva');
  randButton.size(windowWidth / 15, 30);
  randButton.position(windowWidth / 10, windowHeight / 1.44);
  randButton.mousePressed(saveLogo);
  /*
    //Create Button to randomize
    saveButton = createButton('Randomize');
    saveButton.size(110, 50);
    saveButton.position(windowWidth / 2 + 110, windowHeight / 2 + 250);
    saveButton.mousePressed(randomizeLogo);
  */

  //Create Logo
  image(circles[0], 300, 300, 600, 600);
  checkTriangle();
  image(semiCircles[0], 300, 300, 600, 600);
  image(logoName, 300, 300, 600, 600);

  function addInputPlaceholder(hasinput) {
    i = 0;
    inputs = document.getElementsByTagName('input');
    for (input of inputs) {
      if (hasinput) {
        if (i == 1) {
          input.value = lastlat;
        } else if (i == 2) {
          input.value = lastlon;
        } else if (i == 3) {
          input.value = lastalt;
        }
      } else if (!hasinput) {
        if (i == 1) {
          input.placeholder = "Latitudine";
        } else if (i == 2) {
          input.placeholder = "Longitudine";
        } else if (i == 3) {
          input.placeholder = "Altitudine";
        }
      }
      i++;
    }
  }
}

function checkTriangle() {
  if (selector.value() == 'Arte negli spazi pubblici') {
    image(trianglesone[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Associazioni') {
    image(trianglestwo[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Collezioni') {
    image(trianglesthree[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Fondazioni') {
    image(trianglesfour[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Istituti esteri') {
    image(trianglesfive[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Musei') {
    image(trianglessix[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Musei aziendali e d\'impresa') {
    image(trianglesseven[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Parchi e Giardini') {
    image(triangleseight[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Spazi espositivi') {
    image(trianglesnine[r1], 300, 300, 600, 600);
  } else if (selector.value() == 'Spazi indipendenti') {
    image(trianglesten[r1], 300, 300, 600, 600);
  }
}

function myCheckedEvent1() {
  if (this.checked()) {
    checker1 = true;
  } else {
    checker1 = false;
  }
  changeLogo();
}

function myCheckedEvent2() {
  if (this.checked()) {
    checker2 = true;
  } else {
    checker2 = false;
  }
  changeLogo();
}

function getElevation(lng, lat) {
  // make API request
  var query = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&access_token=pk.eyJ1Ijoic3lsYXRoYXMiLCJhIjoiY2szNzF1ZTR5MDc5MzNtbnM0dmwzNzdyMCJ9.EN7o0z5fjNZqb_aQFTe8vg';
  $.ajax({
    method: 'GET',
    url: query,
  }).done(function(data) {
    // Get all the returned features
    var allFeatures = data.features;
    // Create an empty array to add elevation data to
    var elevations = [];
    // For each returned feature, add elevation data to the elevations array
    for (i = 0; i < allFeatures.length; i++) {
      elevations.push(allFeatures[i].properties.ele);
    }
    // In the elevations array, find the largest value
    var highestElevation = Math.max(...elevations);
    // Display the largest elevation value
    elevation = highestElevation;
    changeLogo();
  });
}

//mapbox

mapboxgl.accessToken = 'pk.eyJ1Ijoic3lsYXRoYXMiLCJhIjoiY2szNzF1ZTR5MDc5MzNtbnM0dmwzNzdyMCJ9.EN7o0z5fjNZqb_aQFTe8vg';
var map = new mapboxgl.Map({
  container: 'map', // Specify the container ID
  style: 'mapbox://styles/sylathas/ckkr3cciz03ki17o5h402418c', // Specify which map style to use
  center: [12.5736108, 41.29246], // Specify the starting position [lng, lat]
  zoom: 5 // Specify the starting zoom
});

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  marker: {
    color: 'gray'
  },
  mapboxgl: mapboxgl
});

map.addControl(geocoder, 'top-left');

map.on('load', function() {
  // Listen for the `geocoder.input` event that is triggered when a user
  // makes a selection
  geocoder.on('result', function(ev) {
    styleSpec = ev.result;
    getElevation(styleSpec.center[0], styleSpec.center[1]);
  });
});

Number.prototype.countDecimals = function() {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
}
