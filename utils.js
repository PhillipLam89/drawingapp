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
    anchor.download = 'aaaaa.json'
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
                    case 'square':
                        shape = Rect.load(shapeData)
                        break;                        
                    case 'path':
                        shape = Path.load(shapeData)
                        break;
                    case 'circle':
                            shape = Circle.load(shapeData)
                            break;     
                    case 'rightTriangle':
                        shape = Triangle.load(shapeData)
                        break;     
                    case 'equilateralTriangle':
                        shape = Triangle.load(shapeData)
                        break;                                                                        
                }
                shape.zIndex = shapes.length
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

function createBtn(shapeObj, side, obj) {
    
  
    if (document.getElementById('zIndexBtn')) zIndexBtn.remove()

    const btn = document.createElement('button')
    btn.textContent = `Move to ${side}`
    btn.style.position = 'absolute'
    btn.id = 'zIndexBtn'
    btn.style.left = shapeObj.center.x - shapeObj.size.width / 2 + 'px'
    btn.style.top = shapeObj.center.y  + shapeObj.size.height / 2 + 'px'
    btn.onclick = (e) => zIndexSwap(e,obj)
    document.body.appendChild(btn)
    
    // const deleteBtn = document.createElement('button')
    // deleteBtn.textContent = `Delete`
    // deleteBtn.style.position = 'absolute'
    // deleteBtn.id = 'deleteBtn'

    // const style = window.getComputedStyle(document.getElementById('zIndexBtn'))
    // let btnWidth= style.getPropertyValue('width')

    // btnWidth = ~~btnWidth.slice(0, btnWidth.indexOf('p'))
    // console.log(btnWidth)
    // deleteBtn.style.left = shapeObj.center.x - shapeObj.size.width / 2 + btnWidth * 1.2 + 'px'
    // deleteBtn.style.top = shapeObj.center.y  - shapeObj.size.height / 2 + btnWidth * 2 + 'px'
    // deleteBtn.onclick = (e) => zIndexSwap(e,obj)



    // document.body.appendChild(deleteBtn)
  
}


function zIndexSwap(e,obj) {
    shapes.forEach(s => s.selected = false)
    e.target.textContent = e.target.textContent == `Move to front` ? `Move to back` : `Bring to front`
    const smallIndex = obj.small
    const largeIndex = obj.big
 
 
    shapes[smallIndex] = obj.currentFrontShape
    shapes[smallIndex].zIndex = smallIndex
    shapes[largeIndex] = obj.currentBackShape
    shapes[largeIndex].zIndex = largeIndex
    drawProperShapes(shapes)
    e.target.remove()

  
}

function handleSwapBtnCreation(selectedShape) {
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].zIndex === selectedShape.zIndex) {
            continue
        }      
        if (checkCollision(selectedShape.collisionObj, shapes[i].collisionObj)) {
            let side = null
            let smallerIndex 
            let biggerIndex
            if (selectedShape.zIndex < shapes[i].zIndex) {
               side = 'front'
               smallerIndex = selectedShape.zIndex
               biggerIndex = shapes[i].zIndex
            }else {
              side = 'back'
              smallerIndex = shapes[i].zIndex
              biggerIndex =  selectedShape.zIndex
            }
            createBtn(selectedShape,side, {small: smallerIndex, big: biggerIndex, currentFrontShape: shapes[biggerIndex], currentBackShape: shapes[smallerIndex]})
            return
        }
      }
}
function undo() {
    history = [...history, shapes.pop()]
    drawProperShapes(shapes)
}

function redo() {
    if (history.length) {
        shapes = [...shapes, history.pop()]
        drawProperShapes(shapes)
    }

}