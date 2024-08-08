
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




myCanvas.onpointerdown = downCBforPaths //default starting option

changeCanvas.oninput = function changeCanvasBG() {

 clearAndRedrawCanvas(changeCanvasInput.value)
 drawProperShapes(shapes)
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
    

    // ctx.fillStyle = 'white'
    // ctx.fillRect(stageProperties.left,  //our center drawing canvas
    //             stageProperties.right, 
    //             stageProperties.width, 
    //             stageProperties.height)
        
}
function drawProperShapes(shapes) {
    clearAndRedrawCanvas(changeCanvasInput.value)
    for (const shape of shapes) { 
        shape.draw(ctx)
    }
    helperCtx.clearRect(0,0, canvasProperties.width, canvasProperties.height)
    for (const shape of shapes) { 
        shape.drawHitRegion(helperCtx)
    }
}
function changeTools(tool) {
    deselectAll()
   

    properties.style.display = 'none'
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

function deselectAll() {
    shapes.forEach(s => s.selected = false)
    drawProperShapes(shapes)
}



function changeX(value) {
    shapes.filter(s => s.selected).forEach(s => (s.center.x = Number(value)))
    drawProperShapes(shapes)
}
function changeY(value) {

    shapes.filter(s => s.selected).forEach(s => {
      
     
   
        (s.center.y = Number(value))
       
    })

    drawProperShapes(shapes)
    
}

function updateProperties(selectedShape) {
    if (!selectedShape) {
        properties.innerHTML = ''
        return
    }
    // const allPoints = [...selectedShape.points]

    // const minX = Math.min(...allPoints.map(p=>p.x))
    // const minY = Math.min(...allPoints.map(p=>p.y))
    // const maxX = Math.max(...allPoints.map(p=>p.x))
    // const maxY = Math.max(...allPoints.map(p=>p.y))

  
    // const width = maxX - minX
    // const height = maxY - minY

    // widthInput.value = ~~width
    // heightInput.value = ~~height

    centerXInput.value = ~~selectedShape.center.x
    centerYInput.value = ~~selectedShape.center.y

    
    widthInput.value = selectedShape.size.width
    heightInput.value = selectedShape.size.height
}

function changeWidth(value) {
 const shape = shapes.find(s => s.selected)
 shape.setWidth(Number(value))
 drawProperShapes(shapes)
}

function changeHeight(value) {
    const shape = shapes.find(s => s.selected)
    shape.setHeight(Number(value))
    drawProperShapes(shapes)
   }

function updateStylesDisplay(selectedShape) {
    fillColor.value = selectedShape.options.fillColor
    fill.checked = selectedShape.options.fill
    strokeColor.value = selectedShape.options.strokeColor
    stroke.checked = selectedShape.options.stroke
    strokeWidth.value = selectedShape.options.strokeWidth
}

function save() {
    const data = JSON.stringify(shapes.map(s => s.serialize()))
    //force download on click
    const anchor = document.createElement('a')
    const file = new Blob([data], {type: 'application/json'})
    anchor.href = URL.createObjectURL(file)
    anchor.download = 'myDrawing.json'
    anchor.click()
}

function load() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) =>{
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result)
         
            shapes = []
            for (const shapeData of data) {
                let shape = null
                switch(shapeData.type) {
                    case 'rect':
                        shape = Rect.load(shapeData)
                        break;
                    case 'path':
                        shape = Path.load(shapeData)
                        break;
                }
               
                shapes.push(shape)
            }
            drawProperShapes(shapes)
        }
        reader.readAsText(file)
    }
    input.click()
}

function checkCollision(rect1, rect2) {
    if (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
      ) {
        return true
      }
    return false
}