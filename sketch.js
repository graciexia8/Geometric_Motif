const CRYSTAL_SIZE = 150;
const padding = 20;
const canvasPadding = 50;
const row = 4;
const col = 4;
const SIZE = 6;
const stepOut = 8;
const thinStroke = 1;
const thickStroke = 3;
let PALETTE = [];


function setup() {
    createCanvas((CRYSTAL_SIZE+canvasPadding)*row,(CRYSTAL_SIZE+canvasPadding)*col, SVG);
    PALETTE = [
        color('#ED6360'), //coral
        color('#2a237d'), //purple
    ];
    angleMode(DEGREES);
    rectMode(CENTER);
    noLoop();
}

function draw() {
    for (let i = 0; i < row; i++){
        for (let j = 0; j < col; j++){
            let crystal = new Crystal(CRYSTAL_SIZE/2+(i*(CRYSTAL_SIZE+padding)), CRYSTAL_SIZE/2+(j*(CRYSTAL_SIZE+padding)), SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke);
            crystal.render();
        }
        
    }


}

function simpleLines (){
    const stepsOutwards = 8;
    const numOfSteps = randomBinaryChoice() ? stepsOutwards : stepsOutwards * 1.25;
    const step = (CRYSTAL_SIZE/2) / numOfSteps;
    const start = floor(random(0, numOfSteps));
    const stop = floor(random(0, numOfSteps + 1));


    let numShapes = randomBinaryChoice() ? SIZE : SIZE*2;
    let strokeColor =  getPalette();
    let weight = randomBinaryChoice() ? 1 : 3;
    console.log(weight);

    noFill();
    
    push();
        translate(width/2,height/2);
        stroke(strokeColor);
        strokeWeight(weight);
        ellipse(0,0,CRYSTAL_SIZE,CRYSTAL_SIZE);

        for(let i = 0; i < numShapes; i++){
            rotate(360/numShapes);
            line(0,0,CRYSTAL_SIZE/2,0);
        }

    pop();
}

function mousePressed() {
    clear();
    redraw();
  }