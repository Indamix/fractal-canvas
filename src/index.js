const MAX_ITERATIONS = 100000;

const fractalCanvas = ($canvas) => {
  const ctx = $canvas.getContext('2d');

  const clear = () => {
    $canvas.width += 0;
    return api;
  };

  const path = (commands, color = '#000') => {
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
      }
    };

    ctx.beginPath();
    ctx.strokeStyle = color;

    step({
      x0, y0, radius, angle,
      commands: commands.map(toRadial)
    });

    ctx.stroke();

    return api;
  };

  const step = ({x0, y0, radius, angle, commands}) => {
    const segments = [{x0, y0, radius, angle}];

    for (let j = 0; j < segments.length; ++j) {
      for (let i = 0; i < commands.length; ++i) {
        const {command, r, a} = commands[i];
        const {x0, y0, radius, angle} = segments[j];
        const x = x0 + r * radius * Math.cos(a + angle);
        const y = y0 + r * radius * Math.sin(a + angle);
        ctx[methods[command]](x, y);

        if (command === 'R') {
          const prev = commands[i - 1];
          const xPrev = x0 + prev.r * radius * Math.cos(prev.a + angle);
          const yPrev = y0 + prev.r * radius * Math.sin(prev.a + angle);
          const dx = x - xPrev;
          const dy = y - yPrev;
          const rad = Math.sqrt(dx * dx + dy * dy);

          if (rad > 1 && segments.length < MAX_ITERATIONS) {
            segments.push({
              x0: xPrev,
              y0: yPrev,
              radius: rad,
              angle: Math.atan2(dy, dx)
            });
          }
        }
      }
    }

  };

  const api = {clear, path};
  return api;
};

const parse = path => typeof path === 'string' ? path.split(' ').map(split) : path;

const split = s => /(\w)(-?\d+)[, ](-?\d+)/g.exec(s).slice(1);

const methods = {
  M: 'moveTo',
  L: 'lineTo',
  R: 'moveTo'
};

export default fractalCanvas;
