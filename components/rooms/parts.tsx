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

/** Checks on a floor running to a vanishing point, as one path. Depth 1 is the near edge. */
export function perspectiveTiles({
  vanish: [vx, vy],
  left,
  right,
  floor,
  near,
  far,
  columns = 6,
  rows = 4,
}: {
  vanish: [number, number];
  left: number;
  right: number;
  floor: number;
  near: number;
  far: number;
  columns?: number;
  rows?: number;
}) {
  const u = (i: number) => left + (i * (right - left)) / columns;
  const depth = (j: number) => near + ((far - near) * j) / rows;
  const sx = (x: number, d: number) => (vx + (x - vx) / d).toFixed(1);
  const sy = (d: number) => (vy + (floor - vy) / d).toFixed(1);
  let path = "";
  for (let j = 0; j < rows; j++) {
    for (let i = j % 2; i < columns; i += 2) {
      path += `M${sx(u(i), depth(j))} ${sy(depth(j))}L${sx(u(i + 1), depth(j))} ${sy(depth(j))}L${sx(u(i + 1), depth(j + 1))} ${sy(depth(j + 1))}L${sx(u(i), depth(j + 1))} ${sy(depth(j + 1))}Z`;
    }
  }
  return path;
}

export type EnfiladeRoom = { wall: string; tile?: [string, string] };

/** Doorways nested towards one vanishing point, each room with a checked floor in true perspective. */
export function Enfilade({
  rooms,
  cx,
  floor,
  halfWidth,
  height,
  vanish,
  frame,
  frameFill,
  depth = 0.64,
}: {
  rooms: EnfiladeRoom[];
  cx: number;
  floor: number;
  halfWidth: number;
  height: number;
  vanish: [number, number];
  frame: number;
  frameFill: string;
  depth?: number;
}) {
  const [vx, vy] = vanish;
  return (
    <>
      {rooms.map((room, k) => {
        const f = depth ** k;
        const next = depth ** (k + 1);
        const doorX = vx + (cx - vx) * f;
        const bottom = vy + (floor - vy) * f;
        const left = cx - halfWidth;
        const right = cx + halfWidth;
        const edge = (x: number, scale: number) => vx + (x - vx) * scale;
        const farBottom = vy + (floor - vy) * next;
        return (
          <g key={k}>
            <path d={arch(doorX, bottom, (halfWidth + frame) * f, (height + frame) * f)} fill={frameFill} />
            <path d={arch(doorX, bottom, halfWidth * f, height * f)} fill={room.wall} />
            {room.tile ? (
              <>
                <path
                  d={`M${edge(left, f)} ${bottom}L${edge(right, f)} ${bottom}L${edge(right, next)} ${farBottom}L${edge(left, next)} ${farBottom}Z`}
                  fill={room.tile[0]}
                />
                <path
                  d={perspectiveTiles({ vanish, left, right, floor, near: 1 / f, far: 1 / next })}
                  fill={room.tile[1]}
                />
              </>
            ) : null}
          </g>
        );
      })}
    </>
  );
}

type StripeColour = "aulait" | "shallot" | "romesco";

/** One roll of Farrow & Ball Stripe BP6103, measured from its product image. */
const STRIPE_ROLL = 1134;
const STRIPE_RUN: [StripeColour, number][] = (() => {
  const run: [StripeColour, number][] = [["aulait", 25], ["shallot", 37], ["romesco", 149], ["aulait", 37]];
  let used = 248;
  let colour: StripeColour = "shallot";
  while (used < STRIPE_ROLL) {
    const width = Math.min(37.6, STRIPE_ROLL - used);
    run.push([colour, width]);
    used += width;
    colour = colour === "shallot" ? "aulait" : "shallot";
  }
  return run;
})();

/** Stripe wallpaper laid out across a width, with one roll spanning `roll` units. */
export function stripeBands(width: number, roll: number) {
  const scale = roll / STRIPE_ROLL;
  const bands: { x: number; width: number; colour: StripeColour }[] = [];
  for (let start = 0; start < width; start += roll) {
    let x = start;
    for (const [colour, size] of STRIPE_RUN) {
      const bandWidth = Math.min(size * scale, width - x);
      if (bandWidth <= 0) break;
      bands.push({ x, width: bandWidth, colour });
      x += size * scale;
    }
  }
  return bands;
}

/**
 * Farrow & Ball Dot BP5902: staggered columns of spots that swell and shrink in a
 * diagonal wave. The wave's centre drops from left to right, like the printed paper.
 */
export function dotPaper(width: number, height: number, spacing: number) {
  const columns = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / (spacing * 0.94)) + 1;
  const largest = spacing * 0.43;
  const smallest = spacing * 0.1;
  let path = "";
  for (let column = 0; column < columns; column++) {
    const x = column * spacing;
    const centre = height * (0.24 + (0.56 * x) / width);
    for (let row = 0; row < rows; row++) {
      const y = row * spacing * 0.94 + (column % 2 ? spacing * 0.47 : 0);
      const distance = (y - centre) / (height * 0.46);
      const r = smallest + (largest - smallest) * Math.exp(-distance * distance);
      const size = r.toFixed(1);
      path += `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${size} ${size} 0 1 0 ${(r * 2).toFixed(1)} 0a${size} ${size} 0 1 0 ${(-r * 2).toFixed(1)} 0`;
    }
  }
  return path;
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

/** Encaustic floor of pinwheels: each tile is four half-square triangles turning around its centre. */
export function PinwheelTiles({
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
  const cell = size / 2;
  const turns = [
    [[0, 0], [1, 0], [1, 1]],
    [[1, 0], [1, 1], [0, 1]],
    [[0, 1], [0, 0], [1, 0]],
    [[1, 1], [0, 1], [0, 0]],
  ];
  let d = "";
  for (let row = 0; row * cell < height; row++) {
    for (let column = 0; column * cell < width; column++) {
      const [p, q, r] = turns[(row % 2) * 2 + (column % 2)];
      const point = ([px, py]: number[]) => `${x + (column + px) * cell} ${y + (row + py) * cell}`;
      d += `M${point(p)}L${point(q)}L${point(r)}Z`;
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
