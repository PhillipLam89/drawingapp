const downCBforSelect = function(e) { //handles user selection

    const startPos = {
     x: e.offsetX,
     y: e.offsetY
    }
    
  const[r,g,b] = helperCtx.
                  getImageData(startPos.x, startPos.y, 1,1).data

  const id = ''+r+g+b  
  
  const selectedShape = shapes.find(shape => shape.id == id)
  shapes.forEach(s => s.selected = false)
  drawProperShapes(shapes)
 
  if (selectedShape) {
    selectedShape.selected = true
    const oldCenter = selectedShape.center
    drawProperShapes(shapes)

    const moveCallback = function (e) {
        const mousePos = {
           x: e.offsetX,
           y: e.offsetY,
        };
         const newPoint = subtractPoints(mousePos, startPos);
         selectedShape.setCenter(addPoints(oldCenter, newPoint));
         drawProperShapes(shapes);
  }

  const upCallback = function(e) {
    myCanvas.onpointermove = ''
    myCanvas.onpointerup = upCallback

    window.onkeydown = ({key}) => {
      if (key === 'Delete') {
          const index = shapes.findIndex(shape => shape.selected)
          shapes.splice(index,1)
          drawProperShapes(shapes)
      }
  } 
  }
  myCanvas.onpointermove = moveCallback
  myCanvas.onpointerup = upCallback



}
}

const downCBforCircles =  function(e) { 
  deselectAll()
  window.onkeydown = ''
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
     currentShape.recenter()
     shapes.push(currentShape)
  
  }

  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
}

const downCBforRects = function(e) { //handles rects
  deselectAll()
  window.onkeydown = ''
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
    currentShape.recenter()
     shapes.push(currentShape)
  
  }
 //  myCanvas.addEventListener('pointermove', moveCallBack)
 //  myCanvas.addEventListener('pointerup', upCallBack)
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
}

const downCBforPaths = function(e) {
  deselectAll() 
  window.onkeydown = ''
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
        
        currentShape.recenter()
        shapes.push(currentShape)
    }
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
 }

const downCBforTriangles = function(e) { //handles equilateral triangles
  deselectAll() 
  window.onkeydown = ''
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
     currentShape.recenter()
     shapes.push(currentShape)
  
  }
 //  myCanvas.addEventListener('pointermove', moveCallBack)
 //  myCanvas.addEventListener('pointerup', upCallBack)
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
}
