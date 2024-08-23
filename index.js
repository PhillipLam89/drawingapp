
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

let copyOrCutHistory = []

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z' && shapes.length) {
       
       history = [...history, shapes.pop()]
              
    }
    if (event.ctrlKey && event.key === 'y')  {
        if (history.length) {
            shapes = [...shapes, history.pop()]
        }
    }
    if (event.ctrlKey && event.key === 'c')  {
            const selectedShape = shapes.find(s => s.selected)
            if (!selectedShape) return

            const types = {path: Path, square:Rect, rect: Rect, circle: Circle, equilateralTriangle: Triangle, rightTriangle: Triangle}


            
            const copy = new types[selectedShape.type]()
            const keys = Object.keys(selectedShape)
            const values = Object.values({...selectedShape})

            for (let i = 0; i < keys.length; i++) {
                copy[keys[i]] = values[i]
            }
            
            copy.idArr = generateID()
            copy.id = copy.idArr.join('')
            copy.options =  {...selectedShape.options}
            copy.points = selectedShape.points.map(v => new Vector(v.x+11 , v.y+11 ))
            copy.zIndex = shapes.length 

          
            if (!copyOrCutHistory.length) copyOrCutHistory.push(copy)           
            deselectAll()
          
    }   
    if (event.ctrlKey && event.key === 'x') {
        console.log('ran')
        const selectedShape = shapes.find(s => s.selected)
        if (!selectedShape) return
        const originalIndex = selectedShape.zIndex
        const copy = shapes.splice(originalIndex,1)[0]
        copyOrCutHistory[0] = copy
        
    } 
    if (event.ctrlKey && event.key === 'v' && copyOrCutHistory.length) {
        
        shapes = [...shapes, ...copyOrCutHistory]      
        copyOrCutHistory.length = 0
    }

    drawProperShapes(shapes)
  });

