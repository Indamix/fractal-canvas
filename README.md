# fractal-canvas
Fractal Canvas enhances &lt;canvas&gt; by adding recursive rendering method

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
Clears the canvas

### .color({String})
Sets the stroke color

*Default*: #000
````javascript
fractalCanvas.color('#face8D');
````

### .maxIterations({Number})
Sets maximum amount of path repetitions

Increase for a more detailed result, decrease to improve performance 

*Default*: 50000
````javascript
fractalCanvas.maxIterations(10000);
````

### .path({(String|Array)})
Renders the path

#### String: 
````javascript
fractalCanvas.path('M0,600L200,550R300,200R600,500L800,600');
````

#### Array: 
````javascript
fractalCanvas.path([
  ['M', 0, 600],
  ['L', 200, 550],
  ['R', 300, 200],
  ['R', 600, 500],
  ['L', 800, 600]
]);
````