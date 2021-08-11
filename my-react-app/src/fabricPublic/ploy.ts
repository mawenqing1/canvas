import {fabric} from 'fabric'

const ploy = () => {
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
        let ploy = new fabric.Polyline([{x:mousedownX,y:mousedownY},
        {x:mousemoveX,y:mousemoveY}
        ],{
            fill:undefined,
            stroke:'black'
        });
        canvasFabric.add(ploy)
    });   
};


export default ploy