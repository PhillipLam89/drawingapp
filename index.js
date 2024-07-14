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
let path = []
path.type = 'path' //bcuz arrays = objects
let rectangle = {type:'rect'}



const downCBforRects = function(e) { //handles rects
   
    const mousePos = {
     x: e.offsetX,
     y: e.offsetY
    }
    rectangle.corner1 = mousePos
 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    rectangle.corner2 = mousePos //this gives us the initial corner when they click and the new corner as they drag for rectangle's length
 
    clearAndRedrawCanvas()
    drawProperShapes([...shapes, rectangle])
  }
 
  
  const upCallBack = function(e) {
     myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
     myCanvas.onpointerup = 'die'
  
     // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
     // myCanvas.removeEventListener('pointerup', upCallBack)
 
     shapes.push(rectangle)
     rectangle = {type:'rect'}
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
    path.push(mousePos)
 
 const moveCallBack = function(e) {
     const mousePos = {
      x: e.offsetX,
      y: e.offsetY
     }
    path.push(mousePos)
 
    clearAndRedrawCanvas()
    drawProperShapes([...shapes, path])
 
  }
 
  
  const upCallBack = function(e) {
     myCanvas.onpointermove = 'die' //notice using .on will not let you use removeEventListener but you can set its .on property to null
     myCanvas.onpointerup = 'die'
  
     // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
     // myCanvas.removeEventListener('pointerup', upCallBack)
 
     shapes.push(path)
     path = []
     path.type = 'path'
  }
 //  myCanvas.addEventListener('pointermove', moveCallBack)
 //  myCanvas.addEventListener('pointerup', upCallBack)
  myCanvas.onpointermove = moveCallBack
  myCanvas.onpointerup = upCallBack
  
 }


myCanvas.onpointerdown = downCBforPaths
// myCanvas.onpointerdown = downCBforRects
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
        switch(shape.type) {
            case "rect":
                ctx.beginPath()
                const minX = Math.min(shape.corner1.x, shape.corner2.x)
                const minY = Math.min(shape.corner1.y, shape.corner2.y)
                const width = Math.abs(shape.corner1.x - shape.corner2.x)
                const height = Math.abs(shape.corner1.y - shape.corner2.y)
                ctx.rect(minX,minY,width,height)
                ctx.stroke()
            break
            case "path":
                ctx.beginPath()
                ctx.moveTo(shape[0].x, shape[0].y)
                
                for(let i = 1; i < shape.length;i++) { //start at index 1 since we have initial positions of index 0 already
                    ctx.lineTo(shape[i].x, shape[i].y)
                }       
                ctx.stroke()
            break;
        }



 

 
    }
}
function changeTools(tool) {
    const shapeTypes = {
        path: downCBforPaths,
        rect: downCBforRects
    }
    myCanvas.onpointerdown = shapeTypes[tool.value]
}