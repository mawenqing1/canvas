import { fabric } from 'fabric'

const FabricDraw = (show: string) => {
    let canvasFabric = new fabric.Canvas('canvas');
    canvasFabric.selection = false;
    let mousedownX = 0;
    let mousedownY = 0;
    let mousemoveX = 0;
    let mousemoveY = 0;
    let isDraw = false;
    let isText = false;
    let removeObj: any = null;

    canvasFabric.on('mouse:down', (event) => {
        const { e } = event;
        mousedownX = e.offsetX;
        mousedownY = e.offsetY;
        isDraw = true;
        isText = !isText;
    });

    canvasFabric.on('mouse:move', (event) => {
        const { e } = event;
        mousemoveX = e.offsetX;
        mousemoveY = e.offsetY;
        if (isDraw) {
            switch (show) {
                case 'fabricRect':
                    rect();
                    break;
                case 'fabricCircle':
                    circle();
                    break;
                case 'fabricPloy':
                    ploy();
                    break;
                case 'fabricText':
                    text();
                    break;
                case 'fabricImg':
                    img();
                    break;
            }
        }
    });
    canvasFabric.on('mouse:up', () => {
        isDraw = false;
        removeObj = null;
    })

    function rect() {
        let canvasObj = new fabric.Rect({
            left: mousedownX,
            top: mousedownY,
            width: mousemoveX - mousedownX,
            height: mousemoveY - mousedownY,
            fill: '',
            stroke: 'black',
        });
        remove(canvasObj);
        canvasObj.set('selectable', false);
    };

    function circle() {
        let canvasObj = new fabric.Circle({
            left: mousedownX,
            top: mousedownY,
            radius: mousemoveX - mousedownX > mousemoveY - mousedownY ? (mousemoveY - mousedownY) / 2 : (mousemoveX - mousedownX) / 2,
            fill: undefined,
            stroke: 'black'
        });
        remove(canvasObj);
        canvasObj.set('selectable', false);
    };

    function ploy() {
        let points: { x: number; y: number; }[] = [{ x: mousedownX, y: mousedownY }, { x: mousemoveX, y: mousemoveY }];
        points.push({ x: mousedownX, y: mousedownY })
        let canvasObj = new fabric.Polyline(points
            , {
                fill: undefined,
                stroke: 'black'
            });
        remove(canvasObj);
    };

    function text() {
        let canvasObj = new fabric.Textbox('', {
            left: mousemoveX,
            top: mousedownY,
            fill: '',
            backgroundColor: '#fff',
            stroke: 'black',
        });
        if (isText) {
            canvasFabric.add(canvasObj);
            canvasObj.enterEditing();
            canvasObj.hiddenTextarea?.focus();
        } else {
            canvasObj.exitEditing();
            canvasObj.set("backgroundColor", "rgba(0,0,0,0)");
            if (canvasObj.text == "") {
                canvasFabric.remove(canvasObj);
            }
        }
    };

    function img() {
        fabric.Image.fromURL('https://img2.baidu.com/it/u=3355464299,584008140&fm=26&fmt=auto&gp=0.jpg', function (img) {
            remove(img)
        })
    }

    function remove(canvasObj: any) {
        if (removeObj) {
            canvasFabric.remove(removeObj)
        }
        canvasFabric.add(canvasObj);
        removeObj = canvasObj;
    };
}








export default FabricDraw