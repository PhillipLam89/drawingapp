const canvasProperties = {
    width: innerWidth,
    height:innerHeight,
    center: {x: innerWidth / 2, y: innerHeight / 2}
}



myCanvas.width = canvasProperties.width
myCanvas.height = canvasProperties.height

helperCanvas.width = canvasProperties.width
helperCanvas.height = canvasProperties.height


const ctx = myCanvas.getContext('2d')
const helperCtx = helperCanvas.getContext('2d')
clearAndRedrawCanvas()
helperCtx.fillStyle = 'white'
helperCtx.fillRect(0,0 ,canvasProperties.width, canvasProperties.height)

const shapes = []

let currentShape = null




myCanvas.onpointerdown = downCBforPaths //default starting option

changeCanvas.onchange = function changeCanvasBG() {
 clearAndRedrawCanvas(changeCanvasInput.value)
 drawProperShapes(shapes,true)
}
function clearAndRedrawCanvas(color = 'grey') {    
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height)
    ctx.fillStyle = color
    ctx.fillRect(0,0, myCanvas.width, myCanvas.height) //grey outside area
    const scale = 1
    const stageProperties = {
        width: innerWidth / 2 * scale,
        height: innerHeight/ 2 * scale,
        left: canvasProperties.center.x  * scale / 2,
        right: canvasProperties.center.y  * scale / 2
    }
    

    ctx.fillStyle = 'white'
    ctx.fillRect(stageProperties.left,  //our center drawing canvas
                stageProperties.right, 
                stageProperties.width, 
                stageProperties.height)
        
}
function drawProperShapes(shapes, onCanvasChange = false) {
    clearAndRedrawCanvas(onCanvasChange ? changeCanvasInput.value : 'grey')
    for (const shape of shapes) { 
        shape.draw(ctx)
    }
    helperCtx.clearRect(0,0, canvasProperties.width, canvasProperties.height)
    for (const shape of shapes) { 
        shape.drawHitRegion(helperCtx)
    }
}
function changeTools(tool) {
    const shapeTypes = {
        select: downCBforSelect,
        path: downCBforPaths,
        circle: downCBforCircles,
        rect: downCBforRects,
        square:downCBforRects,
        equilateralTriangle:downCBforTriangles,
        rightTriangle:downCBforTriangles
    }
    myCanvas.onpointerdown = shapeTypes[tool.value]
}
function getOptions() {
    return {
        fillColor: fillColor.value,
        strokeColor: strokeColor.value,
        fill: fill.checked,
        stroke: stroke.checked,
        strokeWidth: Number(strokeWidth.value)

    }
}

function handleUserChanges() {
    shapes.filter(s => s.selected).forEach(s => {
        s.options.fill = fill.checked
        s.options.fillColor = fillColor.value
        s.options.strokeColor = strokeColor.value
        s.options.stroke = stroke.checked
        s.options.strokeWidth = Number(strokeWidth.value)
    })
    drawProperShapes(shapes)
}
