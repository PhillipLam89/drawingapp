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


myCanvas.onpointerdown = function(e) {
   
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
 }

 
 const upCallBack = function(e) {
    myCanvas.onpointermove = null //notice using .on will not let you use removeEventListener but you can set its .on property to null
    myCanvas.onpointerup = null
 
    // myCanvas.removeEventListener('pointermove', moveCallBack) //must remove these listeners so no spam lines are drawn 
    // myCanvas.removeEventListener('pointerup', upCallBack)

    shapes.push(path)
    path = []

    clearAndRedrawCanvas()
    for (const shape of shapes) {
        ctx.beginPath()
        ctx.moveTo(shape[0].x, shape[0].y)
        
        for(let i = 1; i < shape.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(shape[i].x, shape[i].y)
        }       
        ctx.stroke()
    }

 }
//  myCanvas.addEventListener('pointermove', moveCallBack)
//  myCanvas.addEventListener('pointerup', upCallBack)
 myCanvas.onpointermove = moveCallBack
 myCanvas.onpointerup = upCallBack
 
}

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