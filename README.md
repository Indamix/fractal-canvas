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
  .path('M0,600L200,550R300,200R600,500L800,600');
```

## Methods

### .clear()

Clears canvas

### .color(string)

Sets stroke color

_Default_: #000

```javascript
fractalCanvas.color('#face8D');
```

### .path(string | array)

Renders a path

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
