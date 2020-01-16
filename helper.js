
function randomBinaryChoice(){
    const rando = random(1);
    if (rando > 0.5){
        return true;
    }
    else{
        return false;
    }
}

function getPalette(){
    const rando2 = floor(random(0, PALETTE.length));
    return PALETTE[rando2];
}

function hexagon(xpos, ypos, radius){
    const rotAngle = 360/6;
    beginShape();
        for (let i = 0; i < 6; i++){
            const thisVertex = pointCircle(xpos, ypos, radius, i * rotAngle)
            vertex(thisVertex.x, thisVertex.y);
        }
    endShape(CLOSE);
}

function pointCircle(xpos,ypos, radius, angle){
const x = xpos + radius * cos(angle);
const y = ypos + radius * sin(angle);
return createVector(x,y);
}

function myTriangle (center, radius, direction) {
    if (direction) {
      beginShape();
      vertex(center + radius * cos(0), radius * sin(0));
      vertex(center + radius * cos(120), radius * sin(120));
      vertex(center + radius * cos(240), radius * sin(240));
      endShape(CLOSE); 
    } else {
      beginShape();
      vertex(center + radius * cos(180), radius * sin(180));
      vertex(center + radius * cos(300), radius * sin(300));
      vertex(center + radius * cos(60), radius * sin(60));
      endShape(CLOSE);
    }
  }


let layerConstruct = [
    {
        name: 'centeredShape',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new CenteredShape(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke),
        weight: 0.3,
    }, 
    {
        name: 'circle',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new Circles(SIZE, CRYSTAL_SIZE),
        weight: 0.3,
    },
    {
        name: 'outlineShape',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new OutlineShape(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke),
        weight: 0.3,
    },
    {
        name: 'lines',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new Lines(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke),
        weight: 0.3,
    },
    {
        name: 'dottedLines',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new DottedLines(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke),
        weight: 0.1,
    },
    {
        name: 'steppedHexagons',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new SteppedHexagons(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke),
        weight: 0.3,
    },
    {
        name: 'ringOfShapes',
        init: (SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke) => new RingOfShapes(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke),
        weight: 0.1,
    },
];