import { fabric } from 'fabric'

const FabricDraw = (show: string) => {
    let canvasFabric = new fabric.Canvas('canvas');
    const group = document.getElementById('group');
    const ungroup = document.getElementById('ungroup');
    let mousedownX = 0;
    let mousedownY = 0;
    let mousemoveX = 0;
    let mousemoveY = 0;
    let isDraw = false;
    let isGroup = true;
    let isText = false;
    let removeObj: any = null;


    canvasFabric.on('mouse:down', (event) => {
        const { e } = event;
        mousedownX = e.offsetX;
        mousedownY = e.offsetY;
        isDraw = true;
        isText = !isText;
    });

    canvasFabric.on('object:moving', () => {
        isDraw = false;
    });
    canvasFabric.on('object:rotating', () => {
        isDraw = false;
    });
    canvasFabric.on('object:scaling', () => {
        isDraw = false;
    });

    canvasFabric.on('mouse:move', (event) => {
        const { e } = event;
        mousemoveX = e.offsetX;
        mousemoveY = e.offsetY;
        if (isDraw&&isGroup) {
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
        isGroup = true;
    })

    const rect = () => {
        let canvasObj = new fabric.Rect({
            left: mousedownX,
            top: mousedownY,
            width: mousemoveX - mousedownX,
            height: mousemoveY - mousedownY,
            fill: '',
            stroke: 'black',
        });
        // canvasFabric.add(rect);
        remove(canvasObj);
    };

    const circle = () => {
        let canvasObj = new fabric.Circle({
            left: mousedownX > mousemoveX ? mousemoveX : mousedownX,
            top: mousedownY > mousemoveY ? mousemoveY : mousedownY,
            radius: Math.sqrt(Math.pow((mousemoveX - mousedownX) / 2, 2) + Math.pow((mousemoveY - mousedownY) / 2, 2)),
            fill: undefined,
            stroke: 'black'
        });
        remove(canvasObj);
    };

    const ploy = () => {
        let points: { x: number; y: number; }[] = [{ x: mousedownX, y: mousedownY }, { x: mousemoveX, y: mousemoveY }];
        points.push({ x: mousedownX, y: mousedownY })

        let canvasObj = new fabric.Polyline(points
            , {
                fill: undefined,
                stroke: 'black'
            });
        canvasObj.set('selectable', false)
        remove(canvasObj);
    };

    const text = () => {
        let canvasObj = new fabric.Textbox('', {
            left: mousemoveX,
            top: mousedownY,
            fill: '',
            backgroundColor: '#fff',
            stroke: 'black',
            hasControls: true,
            editable: true,
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
            canvasFabric.renderAll();
            return
        }
    };

    const img = () => {
        fabric.Image.fromURL('https://img2.baidu.com/it/u=3355464299,584008140&fm=26&fmt=auto&gp=0.jpg', function (img) {
            img.set({
                left: mousedownX > mousemoveX ? mousemoveX : mousedownX,
                top: mousedownY > mousemoveY ? mousemoveY : mousedownY,
                scaleX: (mousemoveX - mousedownX) / img.width,
                scaleY: (mousemoveY - mousedownY) / img.height,
            })
            remove(img)
        })
    };

    const remove = (canvasObj: any) => {
        if (removeObj) {
            canvasFabric.remove(removeObj)
        }
        canvasFabric.add(canvasObj);
        removeObj = canvasObj;
    };
    // 组合
    if (group) {
        group.onclick = () => {
            isGroup = false;
            if (!canvasFabric.getActiveObject()) {
                return;
            }
            if (canvasFabric.getActiveObject().type !== 'activeSelection') {
                return;
            }
            canvasFabric.getActiveObject().toGroup();
            canvasFabric.requestRenderAll();
        }
    };

    // 取消组合
    if (ungroup) {
        ungroup.onclick = () => {
            if (!canvasFabric.getActiveObject()) {
                return;
            }
            if (canvasFabric.getActiveObject().type !== 'group') {
                return;
            }
            canvasFabric.getActiveObject().toActiveSelection();
            canvasFabric.requestRenderAll();
        }
    }
}


export default FabricDraw