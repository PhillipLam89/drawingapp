class Path {
    constructor(startPoint) {
        this.points = [startPoint]
    }
    addPoint(point) {
        this.points.push(point)
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x, this.points[i].y)
        }       
        ctx.stroke()       
    }
}