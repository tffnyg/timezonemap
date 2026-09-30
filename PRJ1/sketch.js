let totalColumns = 25;
let img;
let currentTimezone;
let systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let tz = [];
let day = true;

let JSONdata;

let userHover = false;
let offsetNum = 0;
let dstOn = false;


async function setup() {
  img = await loadImage("WTZmap_editT.png");
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNERS);
  image(img, 0, 0, img.width, img.height);

  for (i = 0; i < totalColumns; i++) {
    tz.push(i);
  }
  console.log(tz);

  JSONdata = await loadJSON('timezones.json')
}

function draw() {
  background(img);

  currentTimezone = systemTimezone;
  let currentHour = hour();

  userHover = false;

  // Hover rects
  let rectWidth = width / totalColumns;

  for (let i = 0; i < totalColumns; i += 1) {
    let xpos = rectWidth * i;
    // check the left side of each rect
    if (mouseX > xpos && mouseX < xpos + rectWidth) {
      fill(250, 127);
      currentTimezone = tz[i];
      userHover = true;

      //Hover Bright Pink on UTC column
      if (tz[i] == 11) {
        fill(232, 58, 171, 127);
        currentTimezone = "Coordinated Universal Time (UTC)";
        offsetNum = 0
        // all other conditionals, must be ELSEIF 
      } else if (tz[i] == 0) {
        currentTimezone = '"X-ray Time Zone" (UTC-11)';
        offsetNum = -11;
      } else if (tz[i] == 1) {
        currentTimezone = JSONdata.timezones[0].name + '(UTC-10)';
        offsetNum = -10;
      } else if (tz[i] == 2) {
        currentTimezone = JSONdata.timezones[1].name + '(UTC-9)';
        offsetNum = -9;
      } else if (tz[i] == 3) {
        currentTimezone = JSONdata.timezones[2].name + '(UTC-8)';
        offsetNum = -8;
      } else if (tz[i] == 4) {
        currentTimezone = JSONdata.timezones[4].name + '(UTC-7)';
        offsetNum = -7;
      } else if (tz[i] == 5) {
        currentTimezone = JSONdata.timezones[5].name + '(UTC-6)';
        offsetNum = -6;
      } else if (tz[i] == 6) {
        currentTimezone = JSONdata.timezones[7].name + '(UTC-5)';
        offsetNum = -5;
      } else if (tz[i] == 7) {
        currentTimezone = '"Quebec Time Zone" (UTC-4)';
        offsetNum = -4;
      } else if (tz[i] == 8) {
        currentTimezone = JSONdata.timezones[9].name + '(UTC-3)';
        offsetNum = -3;
      } else if (tz[i] == 9) {
        currentTimezone = '"Oscar Time Zone"(UTC-2)';
        offsetNum = -2;
      } else if (tz[i] == 10) {
        currentTimezone = '"November Time Zone"(UTC-1)';
        offsetNum = -1;
      } else if (tz[i] == 12) {
        currentTimezone = JSONdata.timezones[13].name + '(UTC+1)';
        offsetNum = 1;
      } else if (tz[i] == 13) {
        currentTimezone = JSONdata.timezones[15].name + '(UTC+2)';
        offsetNum = 2;
      } else if (tz[i] == 14) {
        currentTimezone = JSONdata.timezones[17].name + '(UTC+3)';
        offsetNum = 3;
      } else if (tz[i] == 15) {
        currentTimezone = JSONdata.timezones[19].name + '(UTC+4)';
        offsetNum = 4;
      } else if (tz[i] == 16) {
        currentTimezone = '"Echo Time Zone" (UTC+5)';
        offsetNum = 5;
      } else if (tz[i] == 17) {
        currentTimezone = '"Foxtrot Time Zone" (UTC+6)';
        offsetNum = 6;
      } else if (tz[i] == 18) {
        currentTimezone = JSONdata.timezones[21].name + '(UTC+7)';
        offsetNum = 7;
      } else if (tz[i] == 19) {
        currentTimezone = JSONdata.timezones[24].name + '(UTC+8)';
        offsetNum = 8;
      } else if (tz[i] == 20) {
        currentTimezone = JSONdata.timezones[26].name + '(UTC+9)';
        offsetNum = 9;
      } else if (tz[i] == 21) {
        currentTimezone = JSONdata.timezones[28].name + '(UTC+10)';
        offsetNum = 10;
      } else if (tz[i] == 22) {
        currentTimezone = '"Lima Time Zone" (UTC+11)';
        offsetNum = 11;
      } else if (tz[i] == 23) {
        currentTimezone = JSONdata.timezones[30].name + '(UTC+12)';
        offsetNum = 12;
      } else if (tz[i] == 24) {
        currentTimezone = '"Yankee Time Zone" (UTC-12)';
        offsetNum = -12;
        // end conditional else
      } else {
        fill(250, 127);
      }

    } else {
      fill(255, 0);
    }
    rect(xpos, 0, rectWidth, height);

    /* if (JSONdata.timezones[i].dst_offset !== null){ 
      textSize(32);
      text("DST +1 hr", width / 2, height / 2  + 220);
      } else {
       noFill();
      }; Does not work, have to expand it further bc of dataset mismatch*/

  } // for  loop end

  // if mouseY is outside the sketch bounds, go back to current time
  if (mouseY < 0 || mouseY > height || mouseX < 0 || mouseX > width) {
    userHover = false;
    currentTimezone = systemTimezone;
  }

  textAlign(CENTER);
  textSize(60);
  textFont('Roboto Mono');
  fill(255);
  text(currentTimezone, width / 2, height / 2 + 150);



  if (userHover == true) {
    UTCtime();
  } else if (userHover == false) {
    ctime();
  }
}

//time formatting code: https://www.geeksforgeeks.org/javascript/how-to-make-digital-clock-in-p5-js/ //
function ctime() {
  // Get the current second, minute and hours
  // and assign them to res variables
  var sec = second();
  var min = minute();
  var hrs = hour();

  // Check for AM or PM based on the
  // hours and store it in a variable
  //var mer = hrs < 12 ? "AM":"PM";

  // Format the time so that leading
  // 0's are added when needed
  sec = formatting(sec);
  min = formatting(min);
  hrs = formatting(hrs % 24);

  // Set the color of the background
  fill(255);

  // Set the font size
  textSize(180);

  // Set the text alignment in center
  // and display the result
  textAlign(CENTER, CENTER);

  // Display the time
  text(hrs + ":" + min + ":" + sec + " ", width / 2, height / 2);
}

function formatting(num) {
  // Convert to int and check
  // if less than 10
  if (int(num) < 10) {
    // Return the padded number
    return "0" + num;
  }

  // Return the original number if
  // padding is not required
  return num;
}

//time formatting code: https://www.geeksforgeeks.org/javascript/how-to-make-digital-clock-in-p5-js/ //
function UTCtime() {
  // CHANGED: Get current UTC time using native JavaScript Date object instead of p5's local time functions
  var now = new Date();
  var sec = now.getUTCSeconds();
  var min = now.getUTCMinutes();

  // CHANGED: Wrap hours using modulo, and add 24 if negative so it produces valid 0-23 hours
  var hrs = (now.getUTCHours() + offsetNum) % 24;
  if (hrs < 0) {
    hrs += 24;
  }

  // Check for AM or PM based on the
  // hours and store it in a variable
  //var mer = hrs < 12 ? "AM":"PM";

  // Format the time so that leading
  // 0's are added when needed
  sec = formatting(sec);
  min = formatting(min);
  hrs = formatting(hrs % 24);

  // Set the color of the background
  fill(255);

  // Set the font size
  textSize(180);

  // Set the text alignment in center
  // and display the result
  textAlign(CENTER, CENTER);

  // Display the time
  text(hrs + ":" + min + ":" + sec + " ", width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}