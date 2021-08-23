type Cap = "butt" | "round" | "square";

interface IProps {
    showShadow: boolean;
    transparency: number;
    types: number;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string;
    cir: number;
    pointX: number;
    pointY: number;
    shapeX: number;
    shapeY: number;
    shadow: boolean;
    imgW: number;
    imgH: number;
};

interface Img {
    ctx: CanvasRenderingContext2D;
    canvasDom: HTMLCanvasElement;
    myCanvasDom: HTMLCanvasElement;
    ctx_1: CanvasRenderingContext2D;
    canvasClearDom: HTMLCanvasElement;
    canvasClearDom_1: HTMLCanvasElement;
    state: IProps;
    originX: { current: number; };
    originY: { current: number; };
    originX1: { current: number; };
    originY1: { current: number; };
    beforeCir: { current: number; };
    callback: (data: { imgW: number, imgH: number }) => void
};

interface Block {
    canvas: HTMLCanvasElement | null;
    myCanvas: HTMLCanvasElement | null;
    canvasClear: HTMLCanvasElement | null;
    canvasClear_1: HTMLCanvasElement | null;
    originX: number;
    originY: number;
    originX1: number;
    originY1: number
    beforeCir: number;
    isShow: boolean;
    colors: string;
    types: number;
    transparency: number;
    cir: number;
    tile: boolean;
    tex: string;
    clear: boolean;
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string;
    align: string;
    baseline: string;
    textDirection: string;
    lwidth: number
    cap: Cap;
    size: number
    fonts: string;
    shapeX: number;
    shapeY: number;
    pointX: number;
    pointY: number;
    solid: number;
    dotted: number;
    deviation: number;
    start: string;
    end: string;
    layers: string;
    imgW: number;
    imgH: number;
    sat:number;
    rvalue:number;
    gvalue:number;
    bvalue:number
};

interface Arc {
    ctx: CanvasRenderingContext2D;
    transparency: number;
    types: number;
    colors: string;
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string
};

interface Circle {
    ctx: CanvasRenderingContext2D;
    transparency: number;
    types: number;
    colors: string;
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string;
    start: string;
    end: string;
    layers: string
};

interface Line {
    ctx: CanvasRenderingContext2D;
    transparency: number;
    types: number;
    colors: string;
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string;
    lwidth: number;
    cap: Cap;
    solid: number;
    dotted: number;
    deviation: number
};

interface Qcthree {
    ctx: CanvasRenderingContext2D;
    transparency: number;
    types: number;
    colors: string;
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string
  };

  interface Rect {
    ctx: CanvasRenderingContext2D;
    transparency: number;
    types: number;
    colors: string;
    shadow: boolean;
    shadowX: number;
    shadowY: number;
    blur: number;
    shaColor: string;
    start: string;
    end: string;
    layers: string
  };

  interface controls {
    ctx_1: CanvasRenderingContext2D;
    originX: { current: number; }; 
    originY: { current: number; };
    imgWidth: number;
    imgHeight: number;
    types:number
   };

export type { IProps, Img, Block, Arc, Circle, Line, Qcthree, Rect, controls,   };