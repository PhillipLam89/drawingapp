const canvasProperties = {
    width: innerWidth,
    height:innerHeight,
    center: {x: innerWidth / 2, y: innerHeight / 2}
}

myCanvas.width = canvasProperties.width
myCanvas.height = canvasProperties.height

const ctx = myCanvas.getContext('2d')
clearAndRedrawCanvas()

const shapes = []
let currentShape = null

const downCBforCircles =  function(e) { 

    const mousePos = {
     x: e.offsetX,
     y: e.offsetY
    }
    currentShape = new Circle(mousePos)

 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length
 
    clearAndRedrawCanvas()
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
    currentShape = new Rect(mousePos, type)

 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length
 
    clearAndRedrawCanvas()
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
    currentShape = new Path(mousePos)
    
    const moveCallBack = function(e) {
        const mousePos = {
        x: e.offsetX,
        y: e.offsetY
        }
        currentShape.addPoint(mousePos)
    
        clearAndRedrawCanvas()
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
    currentShape = new Triangle(mousePos, type)

 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length
 
    clearAndRedrawCanvas()
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
    ctx.fillStyle = 'gray'
    ctx.fillRect(0,0, myCanvas.width, myCanvas.height) //grey outside area

    const stageProperties = {
        width: 600,
        height: 480,
        left: canvasProperties.center.x - 600 / 2,
        right: canvasProperties.center.y - 480 / 2
    }

    ctx.fillStyle = 'white'
    ctx.fillRect(stageProperties.left,  //our center drawing canvas
                stageProperties.right, 
                stageProperties.width, 
                stageProperties.height)
}
function drawProperShapes(shapes) {
    for (const shape of shapes) { 
        shape.draw(ctx)
    }
}
function changeTools(tool) {
    const shapeTypes = {
        path: downCBforPaths,
        circle: downCBforCircles,
        rect: downCBforRects,
        square:downCBforRects,
        equilateralTriangle:downCBforTriangles,
        rightTriangle:downCBforTriangles
    }
    myCanvas.onpointerdown = shapeTypes[tool.value]
}