const canvasProperties = {
    width: innerWidth,
    height:innerHeight,
    center: {x: innerWidth / 2, y: innerHeight / 2}
}

myCanvas.width = canvasProperties.width
myCanvas.height = canvasProperties.height

const ctx = myCanvas.getContext('2d')
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