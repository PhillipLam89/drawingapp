
class Shape {
    constructor(options) {
        this.options = options
        this.selected = false
        this.idArr = generateID() //max number of colors
        this.id = this.idArr.join('')
        this.center = null
    }
    setCenter(center) {
        this.center = center;
     }
     recenter() {
        const points = this.getPoints();
        this.center = getMidPoint(points);
        for (const point of points) {
           const newPoint = subtractPoints(point, this.center);
           point.x = newPoint.x;
           point.y = newPoint.y;
        }
        this.setPoints(points);
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
    // drawGizmo(ctx) {
     
    //     const center = this.center;
    //     const points = this.getPoints(); 
    //     const minX = Math.min(...this.points.map(p=>p.x))
    //     const minY = Math.min(...this.points.map(p=>p.y))
    //     const maxX = Math.max(...this.points.map(p=>p.x))
    //     const maxY = Math.max(...this.points.map(p=>p.y))

    //     ctx.save()
    //     ctx.beginPath()
        
    //     ctx.rect(minX + center.x - this.options.strokeWidth,minY + center.y - this.options.strokeWidth, maxX-minX + this.options.strokeWidth * 2, maxY - minY+ this.options.strokeWidth * 2)
    //     ctx.strokeStyle = 'red'
    //     ctx.lineWidth = 3
    //     ctx.setLineDash([this.options.strokeWidth,5])
    //     ctx.stroke()
    //     ctx.beginPath()
    //     ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
    //     ctx.stroke()
    //     ctx.restore()
    // }
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
