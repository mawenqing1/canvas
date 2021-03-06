import { createContext } from "react";
import { Block } from '../interface/interface'
const initData: Block = {
    canvas: null,
    myCanvas: null,
    canvasClear: null,
    canvasClear_1: null,
    originX: 0,
    originY: 0,
    originX1: 0,
    originY1: 0,
    beforeCir: 0,
    isShow: false,
    colors: "",
    types: 1,
    transparency: 1,
    cir: 0,
    tile: false,
    tex: "",
    clear: false,
    shadow: false,
    shadowX: 10,
    shadowY: 10,
    blur: 10,
    shaColor: "pink",
    align: "start",
    baseline: "alphabetic",
    textDirection: "inherit",
    lwidth: 1,
    cap: "butt",
    size: 48,
    fonts: "serif",
    shapeX: 10,
    shapeY: 10,
    pointX: 0,
    pointY: 0,
    solid: 0,
    dotted: 0,
    deviation: 0,
    start: "black",
    end: "black",
    layers: "",
    imgW: 0,
    imgH: 0,
    sat: 0.1,
    rvalue: 0.1,
    gvalue: 0.1,
    bvalue: 0.1,
}; //初始数据

// 派发事件
const reducer = (state: Block, action: any) => {
    const { type, value } = action;
    switch (type) {
        case "changeState":
            return { ...state, ...action.data };
        case "changeIsShow":
            return { ...state, isShow: !state.isShow };
        case "changeColor":
            return { ...state, colors: value };
        case "changeTypes":
            return { ...state, types: value };
        case "changeTransparency":
            return { ...state, transparency: value };
        case "ChangeRotate":
            return { ...state, cir: value };
        case "changeTile":
            return { ...state, tile: !state.tile };
        case "changeText":
            return { ...state, tex: value };
        case "changeClear":
            return { ...state, clear: !state.clear };
        case "shadowBox":
            return { ...state, shadow: !state.shadow };
        case "shadowOffX":
            return { ...state, shadowX: value };
        case "shadowOffY":
            return { ...state, shadowY: value };
        case "shadowBlur":
            return { ...state, blur: value };
        case "shadowColor":
            return { ...state, shaColor: value };
        case "changeTexts":
            return { ...state, align: value };
        case "changeBases":
            return { ...state, baseline: value };
        case "changeTextDir":
            return { ...state, textDirection: value };
        case "changeLineWidth":
            return { ...state, lwidth: value };
        case "changeType":
            return { ...state, cap: value };
        case "changeFontSize":
            return { ...state, size: value };
        case "changeFontStyle":
            return { ...state, fonts: value };
        case "changeShapeOffX":
            return { ...state, shapeX: value };
        case "changeShapeOffY":
            return { ...state, shapeY: value };
        case "changePointX":
            return { ...state, pointX: value };
        case "changePointY":
            return { ...state, pointY: value };
        case "changeSolids":
            return { ...state, solid: value };
        case "changeDottdeds":
            return { ...state, dotted: value };
        case "changeDeviations":
            return { ...state, deviation: value };
        case "start":
            return { ...state, start: value };
        case "end":
            return { ...state, end: value };
        case "changeLayers":
            return { ...state, layers: value };
        case "changeSat":
            return { ...state, sat: value };
        case "changeRvalue":
            return { ...state, rvalue: value };
        case "changeGvalue":
            return { ...state, gvalue: value };
        case "changeBvalue":
            return { ...state, bvalue: value };
        case "initDate":
            return { ...state, ...value };
        default:
            return state;
    }
};

const ContextData = createContext({});

export { initData, reducer, ContextData };
