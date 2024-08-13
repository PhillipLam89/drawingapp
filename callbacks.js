const downCBforSelect = function(e) { //handles user selection
  if (document.getElementById('zIndexBtn')) zIndexBtn.remove()
  const aShapeIsSelected = shapes.some(s => s.selected)
  if (aShapeIsSelected) properties.style.display = 'none'
  
  const startPos = new Vector(e.offsetX, e.offsetY)
  
  const[r,g,b] = helperCtx.
                  getImageData(startPos.x, startPos.y, 1,1).data

  const id = ''+r+g+b  

  const selectedShape = shapes.find(shape => shape.id == id)
   shapes.forEach(s => s.selected = false)
  drawProperShapes(shapes)

if (selectedShape) {

    updateStylesDisplay(selectedShape)
    if (document.getElementById('zIndexBtn')) zIndexBtn.remove()
    handleSwapBtnCreation(selectedShape)

    if (selectedShape instanceof Triangle || selectedShape instanceof Circle) {
      heightInput.disabled = true
      heightInputLabel.style.textDecoration = 'line-through'
      heightInputLabel.style.color = 'red'
      widthInputLabel.textContent = `Scale ${selectedShape instanceof Triangle ? 'Width' : 'Radius'}`
    
    } else {
      heightInput.disabled = false
      widthInputLabel.textContent = 'Width'
      heightInputLabel.style.textDecoration = 'unset'
      heightInputLabel.style.color = 'unset'
    }

    
  properties.style.display = 'unset'
  selectedShape.selected = true
  const oldCenter = selectedShape.center
  drawProperShapes(shapes)

  const moveCallback = function (e) {
       const mousePos = new Vector(e.offsetX, e.offsetY)
       const newPoint = Vector.subtract(mousePos, startPos);
       selectedShape.setCenter(Vector.add(oldCenter, newPoint));
       drawProperShapes(shapes);

       if (document.getElementById('zIndexBtn')) zIndexBtn.remove()

        handleSwapBtnCreation(selectedShape)
        // for (let i = 0; i < shapes.length; i++) {
        //   if (shapes[i].zIndex === selectedShape.zIndex) {
        //       continue
        //   }      
        //   if (checkCollision(selectedShape.collisionObj, shapes[i].collisionObj)) {
        //       let side = null
        //       let smallerIndex 
        //       let biggerIndex
        //       if (selectedShape.zIndex < shapes[i].zIndex) {
        //          side = 'front'
        //          smallerIndex = selectedShape.zIndex
        //          biggerIndex = shapes[i].zIndex
        //       }else {
        //         side = 'back'
        //         smallerIndex = shapes[i].zIndex
        //         biggerIndex =  selectedShape.zIndex
        //       }
        //       createBtn(selectedShape,side, {small: smallerIndex, big: biggerIndex, currentFrontShape: shapes[biggerIndex], currentBackShape: shapes[smallerIndex]})
        //       return
        //   }
        // }
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

    updateProperties(selectedShape)
}
  myCanvas.onpointermove = moveCallback
  myCanvas.onpointerup = upCallback
  } 
}

const downCBforCircles =  function(e) { 
deselectAll()

window.onkeydown = ''
const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape = new Circle(mousePos, getOptions())

  currentShape.startPos = mousePos

const moveCallBack = function(e) {
  const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length

  drawProperShapes([...shapes, currentShape])
}

const upCallBack = function(e) {
   myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
   myCanvas.onpointerup = 'die'

   // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
   // myCanvas.removeEventListener('pointerup', upCallBack)
   currentShape.recenter()
   currentShape.zIndex = shapes.length
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

  
  const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape = new Rect(mousePos, type, getOptions())

  currentShape.corner1 = mousePos
  currentShape.startPos = mousePos

const moveCallBack = function(e) {

  const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape.setCorner2(mousePos) //this gives us the initial corner when they click and the new corner as they drag for rectangle's length


  drawProperShapes([...shapes, currentShape])
}

const upCallBack = function(e) {
   myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
   myCanvas.onpointerup = 'die'

   // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
   // myCanvas.removeEventListener('pointerup', upCallBack)
  currentShape.recenter()
  currentShape.zIndex = shapes.length
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
 const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape = new Path(mousePos, getOptions())
  currentShape.startPos = mousePos
  currentShape.zIndex = shapes.length
  const moveCallBack = function(e) {
    const mousePos = new Vector(e.offsetX, e.offsetY)
      currentShape.addPoint(mousePos)
  
      // clearAndRedrawCanvas()
      
      drawProperShapes([...shapes, currentShape])
    
  }

  const upCallBack = function(e) {
      myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
      myCanvas.onpointerup = 'die'
      
      currentShape.recenter()
      currentShape.zIndex = shapes.length
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

      const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape = new Triangle(mousePos, type, getOptions())
  currentShape.startPos = mousePos

const moveCallBack = function(e) {
  const mousePos = new Vector(e.offsetX, e.offsetY)
  currentShape.setCorner2(mousePos) 


  drawProperShapes([...shapes, currentShape])
}

const upCallBack = function(e) {
   myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
   myCanvas.onpointerup = 'die'

   // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
   // myCanvas.removeEventListener('pointerup', upCallBack)
   currentShape.recenter()
   currentShape.zIndex = shapes.length
   shapes.push(currentShape)

}
//  myCanvas.addEventListener('pointermove', moveCallBack)
//  myCanvas.addEventListener('pointerup', upCallBack)
myCanvas.onpointermove = moveCallBack
myCanvas.onpointerup = upCallBack

}
