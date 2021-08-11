import { fabric } from 'fabric'
import React from 'react';
function FabricBox() {
  let canvasFabric: fabric.Canvas | null = null;
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
  let types = '';

const initCanvas = () => {
  if(!canvasFabric) {
    canvasFabric = new fabric.Canvas('canvas');
  }
}

const initEvent = () => {
  canvasFabric!.on('mouse:down', (event) => {
    mousedownX = event.e.offsetX;
    mousedownY = event.e.offsetY;
    isDraw = true;
    isText = !isText;
});

canvasFabric!.on('object:moving', () => {
    isDraw = false;
});
canvasFabric!.on('object:rotating', () => {
    isDraw = false;
});
canvasFabric!.on('object:scaling', () => {
    isDraw = false;
});

canvasFabric!.on('mouse:move', (event) => {
    mousemoveX = event.e.offsetX;
    mousemoveY = event.e.offsetY;
    console.log(types);
    
    if (isDraw&&isGroup) {
        switch (types) {
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
canvasFabric!.on('mouse:up', () => {
    isDraw = false;
    removeObj = null;
    isGroup = true;
});
};
  
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
          canvasFabric!.add(canvasObj);
          canvasObj.enterEditing();
          canvasObj.hiddenTextarea?.focus();
      } else {
          canvasObj.exitEditing();
          canvasObj.set("backgroundColor", "rgba(0,0,0,0)");
          if (canvasObj.text == "") {
              canvasFabric!.remove(canvasObj);
          }
          canvasFabric!.renderAll();
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

  const fabricType = (type:string) => {
    initCanvas();
    initEvent();
    if(types === type)return
    types = type;
    console.log(types,type);
    
  }

  const remove = (canvasObj: any) => {
      if (removeObj) {
          canvasFabric!.remove(removeObj)
      }
      canvasFabric!.add(canvasObj);
      removeObj = canvasObj;
  };
  // 组合
  if (group) {
      group.onclick = () => {
          isGroup = false;
          if (!canvasFabric!.getActiveObject()) {
              return;
          }
          if (canvasFabric!.getActiveObject().type !== 'activeSelection') {
              return;
          }
          canvasFabric!.getActiveObject().toGroup();
          canvasFabric!.requestRenderAll();
      }
  };

  // 取消组合
  if (ungroup) {
      ungroup.onclick = () => {
          if (!canvasFabric!.getActiveObject()) {
              return;
          }
          if (canvasFabric!.getActiveObject().type !== 'group') {
              return;
          }
          canvasFabric!.getActiveObject().toActiveSelection();
          canvasFabric!.requestRenderAll();
      }
  }

  return (
    <div className="fabricDraw">
      <button onClick ={() => {fabricType('fabricRect')}}>▭</button>
      <button onClick ={() => {fabricType('fabricCircle')}}  >◯</button>
      <button onClick ={() => {fabricType('fabricPloy')}}  >┌</button>
      <button onClick ={() => {fabricType('fabricText')}}  >文本</button>
      <button onClick ={() => {fabricType('fabricImg')}}  >图片</button>
      <button id="group">组合</button>
      <button id="ungroup" >拆分</button>
    </div>
  );
}

export default FabricBox;
