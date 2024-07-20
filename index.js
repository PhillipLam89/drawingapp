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
window.onresize = () => {
 
    drawProperShapes(shapes)
}
let currentShape = null

const downCBforSelect = function(e) { //handles user selection
   
    const mousePos = {
     x: e.offsetX,
     y: e.offsetY
    }
    
  const[r,g,b,a] = helperCtx.getImageData(mousePos.x, mousePos.y, 1,1).data

  const id = ''+r+g+b  
  
  const selectedShape = shapes.find(shape => shape.id === id)
  if (selectedShape) {
    selectedShape.selected = !selectedShape.selected
    drawProperShapes(shapes)
  }

}


const downCBforCircles =  function(e) { 

    const mousePos = {
     x: e.offsetX,
     y: e.offsetY
    }
    currentShape = new Circle(mousePos, getOptions())

 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length
 
    drawProperShapes([...shapes, currentShape])
  }
 
  const upCallBack = function(e) {
     myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
     myCanvas.onpointerup = 'die'
  
     // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
     // myCanvas.removeEventListener('pointerup', upCallBack)
 
     shapes.push(currentShape)
  
  }
 //  myCanvas.addEventListener('pointermove', moveCallBack)
 //  myCanvas.addEventListener('pointerup', upCallBack)
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
}

const downCBforRects = function(e) { //handles rects
    const type =
    [...document.querySelectorAll('option')]
      .find(attr => attr.selected).value
    const mousePos = {
     x: e.offsetX,
     y: e.offsetY
    }
    currentShape = new Rect(mousePos, type, getOptions())


 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length
 
 
    drawProperShapes([...shapes, currentShape])
  }
 
  const upCallBack = function(e) {
     myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
     myCanvas.onpointerup = 'die'
  
     // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
     // myCanvas.removeEventListener('pointerup', upCallBack)
 
     shapes.push(currentShape)
  
  }
 //  myCanvas.addEventListener('pointermove', moveCallBack)
 //  myCanvas.addEventListener('pointerup', upCallBack)
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
}

const downCBforPaths = function(e) {
   
    const mousePos = {
        x: e.offsetX,
        y: e.offsetY
    }

    currentShape = new Path(mousePos, getOptions())
    
    const moveCallBack = function(e) {
        const mousePos = {
        x: e.offsetX,
        y: e.offsetY
        }
        currentShape.addPoint(mousePos)
    
        // clearAndRedrawCanvas()
        drawProperShapes([...shapes, currentShape])
    
    }
 
    const upCallBack = function(e) {
        myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
        myCanvas.onpointerup = 'die'
    
        shapes.push(currentShape)
    }
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
 }

const downCBforTriangles = function(e) { //handles equilateral triangles
   
    const type =
      [...document.querySelectorAll('option')]
        .find(attr => attr.selected).value
    const mousePos = {
     x: e.offsetX,
     y: e.offsetY
    }
    currentShape = new Triangle(mousePos, type, getOptions())

 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    currentShape.setCorner2(mousePos) 
 

    drawProperShapes([...shapes, currentShape])
  }
 
  const upCallBack = function(e) {
     myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
     myCanvas.onpointerup = 'die'
  
     // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
     // myCanvas.removeEventListener('pointerup', upCallBack)
 
     shapes.push(currentShape)
  
  }
 //  myCanvas.addEventListener('pointermove', moveCallBack)
 //  myCanvas.addEventListener('pointerup', upCallBack)
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
}


myCanvas.onpointerdown = downCBforPaths //default starting option


function clearAndRedrawCanvas() {    
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height)
    ctx.fillStyle = 'grey'
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
function drawProperShapes(shapes) {
    clearAndRedrawCanvas()
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

function changeFillColor(value) {
   
    shapes.filter(s => s.selected)
          .forEach(s => s.options.fillColor = value)
    drawProperShapes(shapes)
}

function toggleFill() {
    shapes.filter(s => s.selected)
        .forEach(s => s.options.fill = !s.options.fill)
    drawProperShapes(shapes)
}
function changeStrokeColor(value) {
    shapes.filter(s => s.selected)
          .forEach(s => s.options.strokeColor = value)
    drawProperShapes(shapes)
}
function toggleStroke() {
    shapes.filter(s => s.selected)
        .forEach(s => s.options.stroke = !s.options.stroke)
    drawProperShapes(shapes)
}
function changeStrokeWidth(value) {
    shapes.filter(s => s.selected)
        .forEach(s => s.options.strokeWidth = value)
    drawProperShapes(shapes)
}
function handleUserChanges(value) {
    
}