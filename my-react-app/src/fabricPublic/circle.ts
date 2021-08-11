import {fabric} from 'fabric'

const circle = () => {
    let canvasFabric = new fabric.Canvas('canvas');
    
    let mousedownX = 0;
    let mousedownY = 0;
    let mousemoveX = 0;
    let mousemoveY = 0;

    canvasFabric.on('mouse:down', (event) => {
      const { e } = event;
      mousedownX = e.offsetX;
      mousedownY = e.offsetY;
    });
    canvasFabric.on('mouse:move', (event) => {
      const { e } = event;
      mousemoveX = e.offsetX;
      mousemoveY = e.offsetY; 
    });

    canvasFabric.on('mouse:up',() => {
     
        let circle = new fabric.Circle({
            left: mousedownX,
            top: mousedownY,
            radius:mousemoveX - mousedownX > mousemoveY - mousedownY ? (mousemoveY - mousedownY)/2 : (mousemoveX - mousedownX)/2,
            fill:undefined,
            stroke:'black'
        });
        canvasFabric.add(circle)
    });   
};


export default circle