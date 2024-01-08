let helveticaFont;
let fontSize = 200;
let noiseFactor = 0.5; // higher for more distortion
let time = 0;

function preload() {
  helveticaFont = loadFont("Helvetica.ttf");
}

function setup() {
  createCanvas(600, 600);
  textFont(helveticaFont);
  textSize(fontSize);
  noStroke();
}

function draw() {
  background(0);
  // background();
  // background(255);

  // center of canvas
  let centerX = width / 2;
  let centerY = height / 2;

  // center the letter on canvas
  let letterA = helveticaFont.textToPoints(
    "A",
    centerX - fontSize / 4,
    centerY + fontSize / 4,
    fontSize
  );

  // draw the letter
  fill(
    map(sin(time + PI / 4), -1, 1, 0, 255),
    map(sin(time + (2 * PI) / 4), -1, 1, 0, 255),
    map(sin(time + (3 * PI) / 4), -1, 1, 0, 255)
  );
  beginShape();
  for (let i = 0; i < letterA.length; i++) {
    let pt = letterA[i];
    let yOffset = map(
      noise(pt.x * noiseFactor, pt.y * noiseFactor, time),
      0,
      1,
      -20,
      20
    ); // range of noise applied
    yOffset += sin(pt.x * 0.1 + time * 5) * 10; // apply wavy effect  to noise using sin()
    yOffset = smooth_noise(yOffset, 0, 0.3); // apply the smoothing function, adjust last factor to control amount of smoothing
    curveVertex(pt.x, pt.y + yOffset);
  }
  endShape(CLOSE);

  time += 0.02; // adjust time for animation speed
}

// smoothing function (Linear interpolation)
function smooth_noise(x, y, a) {
  return x * (1 - a) + y * a;
}
