let helveticaFont;
let fontSize = 200; // Increase the font size for a larger letter
let noiseFactor = 0.5; // Increased noise factor for more distortion
let time = 0;

function preload() {
  // Load Helvetica font
  helveticaFont = loadFont('Helvetica.ttf'); // Replace 'Helvetica.ttf' with the actual path to your Helvetica font file
}

function setup() {
  createCanvas(600, 600); // Adjust the canvas size for a larger letter
  textFont(helveticaFont);
  textSize(fontSize);
  noStroke();
}

function draw() {
  background(0);

  // Calculate the center of the canvas based on the new size
  let centerX = width / 2;
  let centerY = height / 2;

  // Get the geometry for the letter "B" centered on the screen
  let letterB = helveticaFont.textToPoints('B', centerX - fontSize / 3, centerY + fontSize / 3, fontSize);

  // Draw the distorted letter "B" with less spiky and smoother waviness
  fill(
    map(sin(time + PI / 4), -1, 1, 0, 255),
    map(sin(time + 2 * PI / 4), -1, 1, 0, 255),
    map(sin(time + 3 * PI / 4), -1, 1, 0, 255)
  );
  beginShape();
  for (let i = 0; i < letterB.length; i++) {
    let pt = letterB[i];
    let yOffset = map(noise(pt.x * noiseFactor, pt.y * noiseFactor, time), 0, 1, -30, 30); // Increased range of noise
    yOffset += sin(pt.x * 0.1 + time * 5) * 15; // Wavy effect using sin()
    yOffset = mix(yOffset, -0, 0.3); // Apply a smoothing function
    curveVertex(pt.x, pt.y + yOffset);
  }
  endShape(CLOSE);

  // Increment time for animation
  time += 0.02; // Adjusted time increment for smoother animation
}

// Mixing function (Linear interpolation)
function mix(x, y, a) {
  return x * (1 - a) + y * a;
}
