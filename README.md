# fractal-canvas

Fractal Canvas enhances &lt;canvas&gt; by adding a recursive rendering method

[Demo](https://indamix.github.io/fred/)

## Installing

```bash
npm i fractal-canvas
```

## Example

```javascript
import createFractalCanvas from 'fractal-canvas';

const canvas = document.getElementById('canvas');
const fractalCanvas = createFractalCanvas(canvas);

fractalCanvas
  .color('#009')
  .path('M0,600L200,550R300,200R600,500L800,600L700,550');
```

## Methods

### .clear()

Clear canvas.

### .color(string | (depth: number) => string)

Set stroke color.
Supports all standard formats: HEX, RGB, RGBA, HSL, HSLA etc.
First argument is either a string or a function that returns it.
The function is called with an iteration depth starting from 0.

_Default_: #000

```javascript
fractalCanvas.color('#face8D');

fractalCanvas.color(depth => `hsl(${Math.round(depth * 8)}, 100%, 50%)`);
```

### .path(string | array)

Render a path.

#### String:

```javascript
fractalCanvas.path('M0,600L200,550R300,200R600,500L800,600');
```

#### Array:

```javascript
fractalCanvas.path([
  ['M', 0, 600],
  ['L', 200, 550],
  ['R', 300, 200],
  ['R', 600, 500],
  ['L', 800, 600]
]);
```
