class Crystal{
    constructor(posX, posY, SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke ){
        this.x = posX;
        this.y = posY;
        this.layers = [];

        layerConstruct.forEach(shape =>{
            let randomizer = random(1);
            if( randomizer > shape.weight){
                this.layers.push(shape.init(SIZE, CRYSTAL_SIZE, stepOut, thinStroke, thickStroke));
            }
        });
    }

    render(){

        push();
            translate(this.x, this.y);
            this.layers.forEach( layer => {
                layer.render()
            });
        pop();
    }

}