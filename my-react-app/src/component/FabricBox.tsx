import React, { useEffect } from 'react';
let fabric = window.fabric;
function FabricBox() {
    let canvasFabric: fabric.Canvas | null = null;

    let group = document.getElementById('group');
    let ungroup = document.getElementById('ungroup');
    let rubber = document.getElementById('rubber');
    let bursh = document.getElementById('bursh');
    let mousedownX = 0;
    let mousedownY = 0;
    let mousemoveX = 0;
    let mousemoveY = 0;
    let isDraw = false;
    let isGroup = true;
    let isText = false;
    let removeObj: any = null;
    let types = '';
    let sizes = 1;
    let colors = 'black';
    let bursize = 1;
    let textObj: any = null;
    let brighvalue = 0;


    // 初始化画布
    const initCanvas = () => {
        if (!canvasFabric) {
            canvasFabric = new fabric.Canvas('canvas');
            group = document.getElementById('group');
            ungroup = document.getElementById('ungroup');
            rubber = document.getElementById('rubber');
            bursh = document.getElementById('bursh');
            groupBox();
            ungroupBox();
        }
    }

    // 初始化事件
    const initEvent = () => {
        canvasFabric!.on('mouse:down', (event: any) => {
            mousedownX = event.e.offsetX;
            mousedownY = event.e.offsetY;
            isDraw = true;

            if (isDraw && isGroup) {
                if (types !== 'fabricText' && textObj) {
                    textObj.exitEditing();
                    textObj.set("backgroundColor", "rgba(0,0,0,0)");
                    if (textObj.text === '') {
                        canvasFabric!.remove(textObj);
                    }
                    canvasFabric!.renderAll();
                    textObj = null;
                    return
                }
                if (types === 'fabricText') {
                    isText = true;
                    text();
                } else {


                }
            }
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

        canvasFabric!.on('mouse:move', (event: any) => {
            mousemoveX = event.e.offsetX;
            mousemoveY = event.e.offsetY;
            if (isDraw && isGroup) {
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
                    case 'fabricImg':
                        img();
                        break;
                }
            }
        });
        canvasFabric!.on('mouse:up', () => {
            isDraw = false;
            removeObj = null;
            isText = false;
        });
    };

    // 绘制矩形
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

    // 绘制圆
    const circle = () => {
        let canvasObj = new fabric.Circle({
            left: mousedownX > mousemoveX ? mousemoveX : mousedownX,
            top: mousedownY > mousemoveY ? mousemoveY : mousedownY,
            radius: Math.abs(mousemoveX - mousedownX) > Math.abs(mousemoveY - mousedownY) ? Math.abs(mousemoveY - mousedownY) / 2 : Math.abs(mousemoveX - mousedownX) / 2,
            fill: undefined,
            stroke: 'black'
        });
        remove(canvasObj);
    };

    // 绘制折线
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

    // 绘制文本
    const text = () => {
        textObj = new fabric.Textbox('', {
            left: mousemoveX,
            top: mousedownY,
            fill: '',
            backgroundColor: '#fff',
            stroke: 'black',
            hasControls: true,
            editable: true,
        });
        if (isText) {
            canvasFabric!.add(textObj);
            textObj.enterEditing();
            textObj.hiddenTextarea!.focus();
        } else {
            textObj.exitEditing();
            textObj.set("backgroundColor", "rgba(0,0,0,0)");
            if (textObj.text === '') {
                canvasFabric!.remove(textObj);
            }
            canvasFabric!.renderAll();
            textObj = null;
            return
        }
    };

    // 绘制图片
    const img = () => {
        fabric.Image.fromURL('../../dasima.png', function (img: { set: (arg0: { left: number; top: number; scaleX: number; scaleY: number; }) => void; width: number; height: number; }) {
            img.set({
                left: mousedownX > mousemoveX ? mousemoveX : mousedownX,
                top: mousedownY > mousemoveY ? mousemoveY : mousedownY,
                scaleX: (mousemoveX - mousedownX) / (img.width as number),
                scaleY: (mousemoveY - mousedownY) / (img.height as number),
            })
            remove(img)
        })
    };

    // 类型选择
    const fabricType = (type: string) => {
        initCanvas();
        initEvent();
        if (types === type) return
        types = type;
        canvasFabric.isDrawingMode = false;
        if (types === 'rubber') {
            rubberBox();
        } else if (types === 'brush') {
            brush();
        } else if (types === 'brightness' || types === 'contrast' || types === 'saturation') {
            filter();
        }
    };

    const remove = (canvasObj: any) => {
        if (removeObj) {
            canvasFabric!.remove(removeObj)
        }
        canvasFabric!.add(canvasObj);
        removeObj = canvasObj;
    };
    // 组合
    const groupBox = () => {
        group!.onclick = () => {
            isGroup = false;
            console.log(isGroup);

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
    const ungroupBox = () => {
        ungroup!.onclick = () => {
            if (!canvasFabric!.getActiveObject()) {
                return;
            }
            if (canvasFabric!.getActiveObject().type !== 'group') {
                return;
            }
            canvasFabric!.getActiveObject().toActiveSelection();
            canvasFabric!.requestRenderAll();
        }
    };

    // 橡皮擦
    const rubberBox = () => {
        isGroup = false
        canvasFabric!.freeDrawingBrush = new fabric.EraserBrush(canvasFabric);
        canvasFabric.isDrawingMode = true;
        rubberSize(sizes);
    };

    // 获取橡皮擦大小
    const rubberSize = (size: number) => {
        sizes = size;
        canvasFabric.freeDrawingBrush.width = sizes;
    };

    // 画笔
    const brush = () => {
        console.log(1111);

        canvasFabric.freeDrawingBrush = new fabric.PencilBrush(canvasFabric);
        canvasFabric.isDrawingMode = true;
        color(colors);
        size(bursize);
    };

    // 画笔颜色
    const color = (burshColor: string) => {
        colors = burshColor;
        canvasFabric.freeDrawingBrush.color = colors;
    };
    // 画笔大小
    const size = (burshsize: number) => {
        bursize = burshsize;
        canvasFabric.freeDrawingBrush.width = bursize;
    };




    // fabric滤镜
    const filter = () => {
        let $ = function (id: string) { return document.getElementById(id) };
        function applyFilter(index: number, filter: any) {
            var obj = canvasFabric.getActiveObject();
            obj.filters[index] = filter;
            canvasFabric.renderAll();
        };

        function applyFilterValue(index: number, prop: any, value: any) {
            var obj = canvasFabric.getActiveObject();
            if (obj.filters[index]) {
                obj.filters[index][prop] = value;
                obj.applyFilters();
                canvasFabric.renderAll();
            }
        }
        let f = fabric.Image.filters;
        // const brightness = () => {
        //     applyFilter(0, this.checked && new f.Brightness({
        //         brightness: parseFloat(brighValue(brighvalue));
        // }));

        canvasFabric.on({
            'selection:created': function () {
                fabric.util.toArray(document.getElementsByTagName('input'))
                    .forEach(function (el) { el.disabled = false; })

                let filters = ['brightness', 'contrast', 'saturation'];

                for (var i = 0; i < filters.length; i++) {
                    (filters[i]) && ((filters[i]).checked = !!canvasFabric.getActiveObject().filters[i]);
                }
            },
            'selection:cleared': function () {
                fabric.util.toArray(document.getElementsByTagName('input'))
                    .forEach(function (el) { el.disabled = true; })
            }
        });
        ($('brightness') as HTMLElement).onchange = function () {
            applyFilter(0, this.checked && new f.Brightness({
                brightness: parseFloat(($('brightness-value') as HTMLElement).value)
            }));
        };
        ($('brightness-value') as HTMLElement).oninput = function () {
            applyFilterValue(0, 'brightness', parseFloat(this.value));
        };
        ($('contrast') as HTMLElement).onchange = function () {
            applyFilter(1, this.checked && new f.Contrast({
                contrast: parseFloat(($('contrast-value') as HTMLElement).value)
            }));
        };
        ($('contrast-value') as HTMLElement).oninput = function () {
            applyFilterValue(1, 'contrast', parseFloat(this.value));
        };
        ($('saturation') as HTMLElement).onchange = function () {
            applyFilter(2, this.checked && new f.Saturation({
                saturation: parseFloat(($('saturation-value') as HTMLElement).value)
            }));
        };
        ($('saturation-value') as HTMLElement).oninput = function () {
            applyFilterValue(2, 'saturation', parseFloat(this.value));
        };
    };

    // webGL滤镜
 

    return (
        <div className="fabricDraw">
            <button style={{ color: types === 'fabricRect' ? 'red' : '' }} onClick={() => { fabricType('fabricRect'), isGroup = true }}>▭</button>
            <button onClick={() => { fabricType('fabricCircle'), isGroup = true }}>◯</button>
            <button onClick={() => { fabricType('fabricPloy'), isGroup = true }}>┌</button>
            <button onClick={() => { fabricType('fabricText'), isGroup = true }}>文本</button>
            <button onClick={() => { fabricType('fabricImg'), isGroup = true }}>图片</button>
            <button id="group">组合</button>
            <button id="ungroup">拆分</button>
            <button id="rubber" onClick={() => { fabricType('rubber') }}>橡皮擦</button>
            <button id="rubber" onClick={() => { fabricType('') }}>选择</button>
            <div>
                大小
                <input onChange={(e) => { rubberSize(Number(e.target.value)) }} type="range" min={1} max={20} step={1} defaultValue={1} />
            </div>
            <div>
                <button onClick={() => { fabricType('brush') }}>画笔</button>
                <input onChange={(e) => { color(e.target.value) }} type="text" placeholder="输入改变的颜色" defaultValue="black" />
                <input onChange={(e) => { size(Number(e.target.value)) }} type="range" min={1} max={20} defaultValue={1} />
            </div>
            <p>
                <label >
                    <span>Brightness: </span>
                    <input onChange={() => { fabricType('brightness') }} type="checkbox" id="brightness" />
                </label>
                <br />
                <label >
                    value:
                    <input type="range" id="brightness-value" defaultValue={0.1} min={-1} max={1} step={0.004} />
                </label>
            </p>
            <p>
                <label >
                    <span>Contrast: </span>
                    <input onChange={() => { fabricType('contrast') }} type="checkbox" id="contrast" />
                </label>
                <br />
                <label >
                    value:
                    <input type="range" id="contrast-value" defaultValue={0.1} min={-1} max={1} step={0.004} />
                </label>
            </p>
            <p>
                <label >
                    <span>Saturation: </span>
                    <input onChange={() => { fabricType('saturation') }} type="checkbox" id="saturation" />
                </label>
                <br />
                <label >
                    value:
                    <input type="range" id="saturation-value" defaultValue={0.1} min={-1} max={1} step={0.004} />
                </label>
            </p>

        </div>
    );
}

export default FabricBox;
