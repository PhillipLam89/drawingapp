
const canvasProperties = {
    width: innerWidth,
    height:innerHeight,
    center: {x: innerWidth , y: innerHeight }
}

myCanvas.width = canvasProperties.width
myCanvas.height = canvasProperties.height

helperCanvas.width = canvasProperties.width
helperCanvas.height = canvasProperties.height


const ctx = myCanvas.getContext('2d')

const helperCtx = helperCanvas.getContext('2d')
clearAndRedrawCanvas()
helperCtx.fillStyle = 'red'
helperCtx.fillRect(0,0 ,canvasProperties.width / 2, canvasProperties.height / 2)


let shapes = []
let currentShape = null
let history = []

myCanvas.onpointerdown = downCBforPaths //default starting option

changeCanvas.oninput = function changeCanvasBG() {

 clearAndRedrawCanvas(changeCanvasInput.value)
 drawProperShapes(shapes)
}


document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
       history = [...history, shapes.pop()]
              
    }
    if (event.ctrlKey && event.key === 'y')  {
        if (history.length) {
            shapes = [...shapes, history.pop()]
        }
    }
    drawProperShapes(shapes)
  });

