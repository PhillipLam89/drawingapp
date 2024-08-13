
class Shape {
    constructor(options) {
        this.options = options
        this.selected = false
        this.idArr = generateID() //max number of colors
        this.id = this.idArr.join('')
        this.center = {x:0,y:0}
        this.size = null
        this.zIndex = 0
    }
    setCenter(center) {
        this.center = center
     }
     recenter() {
        const points = this.getPoints()
        this.center = Vector.midVector(points)
        this.size = getSize(points, this.type)
        for (const point of points) {
           const newPoint = Vector.subtract(point, this.center)
           point.x = newPoint.x
           point.y = newPoint.y
        }
        this.setPoints(points)
     }
     handleCollisions(ctx,collisionObj) {
    //     if (this.selected) {
           

    //    } 
     }
    applyHitRegionStyles(ctx) {
        const [red,green,blue] = this.idArr
   
        ctx.fillStyle = `rgb(${red},${green},${blue})`
        ctx.strokeStyle = `rgb(${red},${green},${blue})`
        ctx.lineWidth = this.options.strokeWidth + 5
        if (this.options.fill) {
            ctx.fill()
        }
        if (this.options.stroke) {
            ctx.stroke()
        }
    }

    handleOptions(ctx) {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = this.options.strokeWidth
        ctx.strokeStyle = this.options.strokeColor
        ctx.fillStyle = this.options.fillColor
        ctx.fillStyle && this.options.fill && ctx.fill()
        ctx.strokeStyle && this.options.stroke && ctx.stroke()      
        ctx.restore()
    }

    drawHitRegion(ctx) {
        throw new Error('not implemented')
    }
    draw(ctx) {
        throw new Error('draw method hasnt been implemented on this class yet! do it noob')
    }
}

function generateID() {
    return [~~(Math.random() * 256),~~(Math.random() * 256),~~(Math.random() * 256)]   
}

function getSize(allPoints, type) {
    const minX = Math.min(...allPoints.map(p=>p.x))
    const minY = Math.min(...allPoints.map(p=>p.y))
    const maxX = Math.max(...allPoints.map(p=>p.x))
    const maxY = Math.max(...allPoints.map(p=>p.y))

    if (type === 'square' || type === 'circle') {
        return {
            width: ~~(maxX-minX),
            height: ~~(maxX-minX)
        }
    }

    return {
        width: ~~(maxX-minX),
        height: ~~(maxY-minY)
    }
}