class Layer{
    constructor(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        this.SIZE = SIZE;
        this.numShapes = this.SIZE;
        this.angle = 360/this.numShapes;
        
        this.stepsOutwards = stepsOutwards;
        this.singleStep = (CRYSTAL_SIZE/2) / this.stepsOutwards;
        this.thinStroke = thinStroke;
        this.thickStroke = thickStroke;

        this.layerColor = getPalette();

    }
}

class Circles extends Layer {
    constructor(SIZE, CRYSTAL_SIZE,){
        super(SIZE, CRYSTAL_SIZE,);

        this.radDiv = 2;
        this.radiusFactor = randomBinaryChoice() ? this.radDiv : this.radDiv * 2;
        this.shapeSize = (CRYSTAL_SIZE / this.radiusFactor) *0.9;
        this.position = (CRYSTAL_SIZE/2) - (this.shapeSize/2); // center point for the circle
    }

    render(){
        noFill();
        strokeWeight(1);
        stroke(this.layerColor);
        push();
            //translate(width/2, height/2);
            for (let i = 0; i <= this.numShapes; i++){
                ellipse(this.position, 0, this.shapeSize, this.shapeSize);
                rotate(360/this.numShapes);
            }
        pop();
    }
}

class OutlineShape extends Layer {
    constructor(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        super(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke);

    }

    render(){
        const weight = randomBinaryChoice() ? this.thinStroke : this.thickStroke;
        const hexTrue = randomBinaryChoice();
    
        stroke(this.layerColor);
        strokeWeight(weight);
    
        push();
            //translate(width/2, height/2);
            if(hexTrue){
                hexagon(0,0, CRYSTAL_SIZE/2);
            }
            else{
                ellipse(0,0, CRYSTAL_SIZE, CRYSTAL_SIZE);
            }
        pop();
    }
}

class Lines extends Layer {
    constructor(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        super(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke);
        this.numRatio = randomBinaryChoice() ? this.numShapes : this.numShapes*2;

        this.numOfSteps = randomBinaryChoice() ? this.stepsOutwards : this.stepsOutwards * 1.25;
        this.step = (CRYSTAL_SIZE/2) / this.numOfSteps;
        this.start = floor(random(0, this.numOfSteps));
        this.stop = floor(random(0, this.numOfSteps + 1));
    
    
        this.weight = randomBinaryChoice() ? this.thinStroke : this.thickStroke;

    }

    render(){
        strokeWeight(this.weight);

        push();
            noFill();

            stroke(this.layerColor);
            //translate(width/2,height/2);

            for(let i = 0; i < this.numRatio; i++){
                rotate(360/this.numRatio);
                line(this.start * this.step,0,this.stop * this.step,0);
            }
        pop();
    }
}

class DottedLines extends Layer {
    constructor (SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        super(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke);
        this.numRatio = randomBinaryChoice() ? this.numShapes : this.numShapes*2;
        
        this.angle = 360/this.numRatio;
        this.shapeSize = 3;
        this.centerOffset = this.singleStep;

    }

    render() {
        fill(this.layerColor);
        noStroke();
        push();
            //translate(width/2, height/2);
            for(let i = 0; i <= this.numRatio; i++){
                for (let x = this.centerOffset; x < CRYSTAL_SIZE/2; x += this.singleStep){
                    rect(x,0, this.shapeSize, this.shapeSize);
                }
                rotate(this.angle);
            }
        pop();
    }

}

class CenteredShape extends Layer {
    constructor(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        super(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke);
        this.randomShape = random(1);
        this.shapeSize = floor(random(this.stepsOutwards/2, this.stepsOutwards)) * this.singleStep;
    }

    render(){
        fill(this.layerColor);
        noStroke();
        push();
        //translate(width/2, height/2);

        if (this.randomShape < 0.1){
            rect(0,0,this.shapeSize*1.25, this.shapeSize*1.25);
        }
        else if (this.randomShape >= 0.1 && this.randomShape < 0.6){
            ellipse(0,0, this.shapeSize*1.25, this.shapeSize*1.25);
        }
        else if(this.randomShape >= 0.6){
            rotate(this.angle/2);
            hexagon(0,0, this.shapeSize*0.85);
        }
        pop();
    }
}

class SteppedHexagons extends Layer{
    constructor(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        super(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke);
        this.numOfSteps = randomBinaryChoice() ? this.stepsOutwards : this.stepsOutwards*1.45;
        this.centerOffset = (CRYSTAL_SIZE/2)*0.15;
        this.singleStep = ((CRYSTAL_SIZE/2) - this.centerOffset)/this.numOfSteps;
        this.weight = randomBinaryChoice() ? this.thinStroke : this.thickStroke;
    }

    render(){
        stroke(this.layerColor);
        noFill();
        strokeWeight(this.weight);

        push();
            //translate(width/2, height/2);
            rotate(this.angle/2);
            for (let i = 1; i < this.numOfSteps + 1; i++){
                hexagon(0,0, this.centerOffset + (i*this.singleStep));
            }
        pop();
    }

}

class RingOfShapes extends Layer{

    constructor(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke){
        super(SIZE, CRYSTAL_SIZE, stepsOutwards, thinStroke, thickStroke);
        this.steps = floor(random(1, this.stepsOutwards))
        this.center = this.steps * this.singleStep;
        this.randomShape = random(1);
        this.direction = randomBinaryChoice();
        this.fillColor = randomBinaryChoice() ? this.layerColor : color(0, 1);
        this.weight = randomBinaryChoice() ? this.thinStroke : this.thickStroke;

        if (this.steps < this.stepsOutwards / 2){
            this.radius = floor(random(1, this.steps)) * this.singleStep;
        }
        else if (this.steps > this.stepsOutwards/2) {
            this.radius = floor(random(1, this.stepsOutwards - this.steps)) * this.singleStep;
        }
        else{
            this.radius = floor(random(1, (this.stepsOutwards/2)+1)) * this.singleStep
        }


    }
    render(){
        stroke(this.layerColor)
        fill(this.fillColor)
        strokeWeight(this.weight)
        push()
        //translate(width / 2, height / 2)
        for (let i = 0; i < this.numShapes; i++) {
          if (this.randomShape < 0.33) {
            ellipse(0, this.center, this.radius, this.radius)
          } else if (this.randomShape >= 0.33 && this.randomShape < 0.66) {
            rect(0, this.center, this.radius, this.radius)
          } else if (this.randomShape >= 0.66) {
            myTriangle(this.center, this.radius, this.direction)
          }
          rotate(this.angle)
        }
        pop()
    }
}