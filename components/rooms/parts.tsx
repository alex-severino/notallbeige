/**
 * The illustration kit: flat, front-on wall elevations in the studio palette.
 * Everything sits on local y = 0 (the floor) and grows upwards.
 */

type Place = { x?: number; y?: number; s?: number; flip?: boolean };

const place = ({ x = 0, y = 0, s = 1, flip = false }: Place) =>
  `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;

/** A row of half-ellipses hanging below y, closed `lip` above it. */
export function scallops(x0: number, x1: number, y: number, count: number, depth: number, lip = 2) {
  const width = (x1 - x0) / count;
  let d = `M${x0} ${y - lip}V${y}`;
  for (let i = 0; i < count; i++) d += `a${width / 2} ${depth} 0 0 0 ${width} 0`;
  return `${d}V${y - lip}Z`;
}

/** An arch standing on `bottom`, `height` tall in total. */
export function arch(cx: number, bottom: number, halfWidth: number, height: number) {
  const spring = bottom - height + halfWidth;
  return `M${cx - halfWidth} ${bottom}V${spring}A${halfWidth} ${halfWidth} 0 0 1 ${cx + halfWidth} ${spring}V${bottom}Z`;
}

/** A wobbly oval, for mirrors that can't stand still. */
export function wavy(cx: number, cy: number, rx: number, ry: number, waves: number, amount: number) {
  let d = "";
  const steps = 160;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const k = 1 + amount * Math.sin(waves * t);
    d += `${i ? "L" : "M"}${(cx + rx * k * Math.cos(t)).toFixed(1)} ${(cy + ry * k * Math.sin(t)).toFixed(1)}`;
  }
  return `${d}Z`;
}

/** Armchair with a scallop-shell back: wedges fanning out from the seat. */
export function ShellChair({
  a,
  b,
  seat,
  leg,
  ...at
}: Place & { a: string; b: string; seat: string; leg: string }) {
  const wedges = 7;
  const radius = 226;
  const cy = -118;
  const point = (angle: number) => [radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  return (
    <g transform={place(at)}>
      {Array.from({ length: wedges }, (_, i) => {
        const [x0, y0] = point(Math.PI + (i * Math.PI) / wedges);
        const [x1, y1] = point(Math.PI + ((i + 1) * Math.PI) / wedges);
        const bulge = (Math.hypot(x1 - x0, y1 - y0) / 2) * 1.02;
        return (
          <path
            key={i}
            d={`M0 ${cy}L${x0.toFixed(1)} ${y0.toFixed(1)}A${bulge.toFixed(1)} ${bulge.toFixed(1)} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z`}
            fill={i % 2 ? b : a}
          />
        );
      })}
      <path d="M-150 -60 -170 0H-134L-116 -60ZM150 -60 170 0H134L116 -60Z" fill={leg} />
      <rect x={-232} y={-146} width={464} height={92} rx={46} fill={seat} />
    </g>
  );
}

/** Tall lamp with a striped empire shade and a scalloped hem. */
export function FloorLamp({
  shade,
  stripe,
  fringe,
  stem,
  height = 520,
  ...at
}: Place & { shade: string; stripe: string; fringe: string; stem: string; height?: number }) {
  const panels = 7;
  const top = -height - 176;
  return (
    <g transform={place(at)}>
      <rect x={-56} y={-16} width={112} height={16} rx={8} fill={stem} />
      <rect x={-5} y={-height} width={10} height={height - 8} fill={stem} />
      {Array.from({ length: panels }, (_, i) => {
        const t0 = -62 + (i * 124) / panels;
        const t1 = -62 + ((i + 1) * 124) / panels;
        const b0 = -124 + (i * 248) / panels;
        const b1 = -124 + ((i + 1) * 248) / panels;
        return (
          <path key={i} d={`M${t0} ${top}H${t1}L${b1} ${-height}H${b0}Z`} fill={i % 2 ? stripe : shade} />
        );
      })}
      <path d={scallops(-124, 124, -height, panels, 22)} fill={fringe} />
    </g>
  );
}

/** Small lamp with a gourd base. */
export function TableLamp({
  shade,
  fringe,
  base,
  ...at
}: Place & { shade: string; fringe: string; base: string }) {
  return (
    <g transform={place(at)}>
      <path d="M-22 0H22C50 -24 50 -62 24 -80 42 -96 42 -124 14 -134H-14C-42 -124 -42 -96 -24 -80 -50 -62 -50 -24 -22 0Z" fill={base} />
      <rect x={-3} y={-168} width={6} height={36} fill={base} />
      <path d="M-44 -262H44L82 -160H-82Z" fill={shade} />
      <path d={scallops(-82, 82, -160, 5, 16)} fill={fringe} />
    </g>
  );
}

/** Dome pendant. `y` is the rim, and the cord runs up off the canvas. */
export function Pendant({
  x,
  y,
  width = 240,
  shade,
  fringe,
  cord,
}: {
  x: number;
  y: number;
  width?: number;
  shade: string;
  fringe: string;
  cord: string;
}) {
  const half = width / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-2.5} y={-4000} width={5} height={4000 - width * 0.44} fill={cord} />
      <path d={`M${-half} 0A${half} ${width * 0.46} 0 0 1 ${half} 0Z`} fill={shade} />
      <path d={scallops(-half, half, 0, 7, width * 0.075, 1)} fill={fringe} />
    </g>
  );
}

/** Waisted pedestal table. */
export function PedestalTable({
  top,
  leg,
  width = 190,
  height = 210,
  ...at
}: Place & { top: string; leg: string; width?: number; height?: number }) {
  const half = width / 2;
  return (
    <g transform={place(at)}>
      <path d={`M-17 ${-height + 8}C-17 ${-height * 0.55} -52 -40 -76 0H76C52 -40 17 ${-height * 0.55} 17 ${-height + 8}Z`} fill={leg} />
      <rect x={-half} y={-height} width={width} height={16} rx={8} fill={top} />
    </g>
  );
}

/** Bottle vase with a few loose stems. */
export function Vase({
  body,
  stem,
  bloomA,
  bloomB,
  ...at
}: Place & { body: string; stem: string; bloomA: string; bloomB: string }) {
  return (
    <g transform={place(at)}>
      <g fill="none" stroke={stem} strokeWidth={5} strokeLinecap="round">
        <path d="M-6 -120C-14 -190 -58 -222 -76 -272" />
        <path d="M0 -120C4 -210 2 -270 10 -336" />
        <path d="M8 -120C24 -180 58 -210 84 -252" />
      </g>
      <circle cx={-78} cy={-284} r={25} fill={bloomA} />
      <circle cx={11} cy={-352} r={30} fill={bloomB} />
      <circle cx={88} cy={-264} r={21} fill={bloomA} />
      <path d="M-30 -120C-72 -86 -60 -18 -36 0H36C60 -18 72 -86 30 -120 26 -136 28 -148 34 -156H-34C-28 -148 -26 -136 -30 -120Z" fill={body} />
    </g>
  );
}

/** Picture frame. Children draw inside a 0,0 to w,h box. */
export function Frame({
  x,
  y,
  w,
  h,
  frame,
  mat,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  frame: string;
  mat: string;
  children?: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-12} y={-12} width={w + 24} height={h + 24} fill={frame} />
      <rect width={w} height={h} fill={mat} />
      {children}
    </g>
  );
}

/** Deep, generous sofa made of bolsters. */
export function Sofa({
  body,
  back,
  base,
  width = 640,
  ...at
}: Place & { body: string; back: string; base: string; width?: number }) {
  const seats = 3;
  const inner = width - 150;
  const seatWidth = inner / seats;
  return (
    <g transform={place(at)}>
      <rect x={-width / 2 + 40} y={-26} width={22} height={26} fill={base} />
      <rect x={width / 2 - 62} y={-26} width={22} height={26} fill={base} />
      {Array.from({ length: seats }, (_, i) => (
        <rect key={i} x={-inner / 2 + i * seatWidth + 4} y={-262} width={seatWidth - 8} height={170} rx={62} fill={back} />
      ))}
      {Array.from({ length: seats }, (_, i) => (
        <rect key={i} x={-inner / 2 + i * seatWidth + 2} y={-138} width={seatWidth - 4} height={112} rx={50} fill={body} />
      ))}
      <rect x={-width / 2} y={-196} width={78} height={170} rx={39} fill={body} />
      <rect x={width / 2 - 78} y={-196} width={78} height={170} rx={39} fill={body} />
    </g>
  );
}

/** Full-height curtain with a scalloped pelmet. */
export function Curtain({
  x,
  width,
  height,
  a,
  b,
  pelmet,
  fringe,
  top = 0,
}: {
  x: number;
  width: number;
  height: number;
  a: string;
  b: string;
  pelmet: string;
  fringe: string;
  top?: number;
}) {
  const folds = Math.round(width / 34);
  const fold = width / folds;
  return (
    <g transform={`translate(${x} ${top})`}>
      {Array.from({ length: folds }, (_, i) => (
        <rect key={i} x={i * fold} y={0} width={fold + 0.5} height={height} fill={i % 2 ? b : a} />
      ))}
      <rect x={-10} y={-2} width={width + 20} height={96} fill={pelmet} />
      <path d={scallops(-10, width + 10, 94, Math.round(width / 46), 24, 2)} fill={fringe} />
    </g>
  );
}

/** Flat colour rug with stripes, seen front on. */
export function Rug({
  x,
  y,
  width,
  height,
  a,
  b,
  stripes = 9,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  a: string;
  b: string;
  stripes?: number;
}) {
  const stripe = width / stripes;
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: stripes }, (_, i) => (
        <rect key={i} x={i * stripe} width={stripe + 0.5} height={height} fill={i % 2 ? b : a} />
      ))}
    </g>
  );
}

/** Checkerboard floor filling a rectangle. */
export function Checks({
  x,
  y,
  width,
  height,
  size,
  a,
  b,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  size: number;
  a: string;
  b: string;
}) {
  const columns = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  let d = "";
  for (let row = 0; row < rows; row++) {
    for (let column = row % 2; column < columns; column += 2) {
      const cellWidth = Math.min(size, width - column * size);
      const cellHeight = Math.min(size, height - row * size);
      d += `M${x + column * size} ${y + row * size}h${cellWidth}v${cellHeight}h${-cellWidth}Z`;
    }
  }
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={a} />
      <path d={d} fill={b} />
    </g>
  );
}

/** A painted scalloped frieze running around the top of a room. */
export function Frieze({ width, depth, fill, count }: { width: number; depth: number; fill: string; count: number }) {
  return <path d={scallops(0, width, depth, count, depth * 0.55, depth)} fill={fill} />;
}
