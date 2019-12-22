import createScheduler from './scheduler';

const DEFAULT_COLOR = '#000';
const RESOLUTION = 0.5; // px;

const fractalCanvas = $canvas => {
  let color = DEFAULT_COLOR;

  const ctx = $canvas.getContext('2d');

  const clear = () => {
    $canvas.width += 0;
    return api;
  };

  const setColor = value => {
    color = value;
    return api;
  };

  const { schedule, start } = createScheduler();

  const path = commands => {
    commands = parse(commands);

    const x0 = +commands[0][1];
    const y0 = +commands[0][2];
    const dx = commands[commands.length - 1][1] - x0;
    const dy = commands[commands.length - 1][2] - y0;
    const radius = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    const toRadial = ([command, x, y]) => {
      const dx = x - x0;
      const dy = y - y0;
      return {
        command,
        r: Math.sqrt(dx * dx + dy * dy) / radius,
        a: Math.atan2(dy, dx) - angle
      };
    };

    const radialCommands = commands.map(toRadial);

    const segments = [{ x0, y0, radius, angle, depth: 0 }];
    let xPrev;
    let yPrev;

    start();

    const job = () => {
      if (!segments.length) {
        return;
      }

      const { x0, y0, radius, angle, depth } = segments.pop();
      ctx.beginPath();

      // ctx.strokeStyle = typeof color === 'function' ? color(depth) : color;
      ctx.fillStyle = typeof color === 'function' ? color(depth) : color;

      for (let i = 0; i < radialCommands.length; ++i) {
        const { command, r, a } = radialCommands[i];
        const x = x0 + r * radius * Math.cos(a + angle);
        const y = y0 + r * radius * Math.sin(a + angle);
        ctx[METHODS[command]](x, y);

        if (command === 'R') {
          const dx = x - xPrev;
          const dy = y - yPrev;
          const rad = Math.sqrt(dx * dx + dy * dy);

          if (r * rad >= RESOLUTION) {
            segments.push({
              x0: xPrev,
              y0: yPrev,
              radius: rad,
              angle: Math.atan2(dy, dx),
              depth: depth + 1
            });
          }
        }
        xPrev = x;
        yPrev = y;
      }

      ctx.fill()
      // ctx.stroke();

      schedule(job);
    };

    schedule(job);
  };

  const api = {
    clear,
    color: setColor,
    path
  };

  return api;
};

const parse = path =>
  typeof path === 'string' ? path.split(' ').map(split) : path;

const split = s => /(\w)(-?\d+)[, ](-?\d+)/g.exec(s).slice(1);

const METHODS = {
  M: 'moveTo',
  L: 'lineTo',
  R: 'lineTo'
};

export default fractalCanvas;
