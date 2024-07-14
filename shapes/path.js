class Path {
    constructor(startPoint) {
        this.points = [startPoint]
    }
    addPoint(point) {
        this.points.push(point)
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this[0].x, this[0].y)
        
        for(let i = 1; i < this.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this[i].x, this[i].y)
        }       
        ctx.stroke()       
    }
}