  import { useRef } from "react";
  
  // 判断点是否在区域内
  const originX1 = useRef<number>(0);
  const originY1 = useRef<number>(0);

  const judge = (x1: number, y1: number, width: number, height: number, x2: number, y2: number,cir:number) => {
    let ltX = (x1 - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let ltY = (y1 - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;

    let rtX = (x1 + width - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let rtY = (y1 - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 + width - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;

    let rbX = (x1 + width - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 + height - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let rbY = (y1 + height - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 + width - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;

    let lbX = (x1 - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 + height - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let lbY = (y1 + height - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;
    // fabric源码判断点是否在区域内
    const oCoords: any = {
      tl: {
        x: ltX,
        y: ltY
      },
      tr: {
        x: rtX,
        y: rtY
      },
      br: {
        x: rbX,
        y: rbY
      },
      bl: {
        x: lbX,
        y: lbY
      }
    };
    const point = {
      x: x2,
      y: y2
    };
    function lineBox(oCoords: any) {

      var lines: any = {
        topline: {
          o: oCoords.tl,
          d: oCoords.tr
        },
        rightline: {
          o: oCoords.tr,
          d: oCoords.br
        },
        bottomline: {
          o: oCoords.br,
          d: oCoords.bl
        },
        leftline: {
          o: oCoords.bl,
          d: oCoords.tl
        },
      };
      return lines;
    };
    let lines = lineBox(oCoords);
    function pointBox(point: { y: number; x: number; }, lines: any) {

      var b1, b2, a1, a2, xi, // yi,
        xcount = 0,
        iLine;

      for (var lineKey in lines) {
        iLine = lines[lineKey];
        // optimisation 1: line below point. no cross
        if ((iLine.o.y < point.y) && (iLine.d.y < point.y)) {
          continue;
        }
        // optimisation 2: line above point. no cross
        if ((iLine.o.y >= point.y) && (iLine.d.y >= point.y)) {
          continue;
        }
        // optimisation 3: vertical line case
        if ((iLine.o.x === iLine.d.x) && (iLine.o.x >= point.x)) {
          xi = iLine.o.x;
          // yi = point.y;
        }
        // calculate the intersection point
        else {
          b1 = 0;
          b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
          a1 = point.y - b1 * point.x;
          a2 = iLine.o.y - b2 * iLine.o.x;

          xi = -(a1 - a2) / (b1 - b2);
          // yi = a1 + b1 * xi;
        }
        // dont count xi < point.x cases
        if (xi >= point.x) {
          xcount += 1;
        }
        // optimisation 4: specific for square images
        if (xcount === 2) {
          break;
        }
      }
      return xcount;
    };
    let jud = pointBox(point, lines);
    return jud;
  };

  export default  judge