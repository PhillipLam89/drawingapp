class Triangle extends Shape {
    constructor(corner1, type, options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = {}
        this.type = type
        this.points = [this.corner1,this.corner2]
    }
    static load(data) {
       
        const triangle = new Triangle()
        triangle.type = data.type
        triangle.idArr = data.idArr
        triangle.id = data.id
        triangle.options = data.options
        triangle.center  = Vector.load(data.center)
        triangle.size = data.size
       triangle.corner1 = data.corner1
       triangle.corner2 = data.corner2
        return triangle
    }
    serialize() {
       
        return {
            type: this.type,
            idArr: this.idArr,
            id: this.id,
            options: this.options,
            center: new Vector(this.center.x, this.center.y),
            size: this.size,
            selected: this.selected,
            corner1: this.getPoints()[0],
            corner2: this.getPoints()[1],
        }
    }
    setCorner2(corner2) {
        this.corner2 = corner2
    }
    getPoints() {
        return [this.corner1, this.corner2];
     }
     
     setPoints(points) {
        this.corner1 = points[0];
        this.corner2 = points[1];
     }  
    drawHitRegion(ctx) {
        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        const center=this.center
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const newY = this.corner2.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x + center.x, y + center.y)
        ctx.lineTo(this.corner2.x + center.x,y + center.y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(minX + center.x + (this.type ==='rightTriangle' ? 0 : width / 2 ),
                  newY < y ? (y - height + center.y) : (y+height + center.y) 
                  )
        ctx.lineTo(this.corner1.x + center.x , y + center.y)
        super.applyHitRegionStyles(ctx)     
    }

    setWidth(width) {
        const size = getSize(this.getPoints())
        const ratio = width / size.width

        for (const point of this.getPoints()) {
            point.x *= ratio
        }
        this.size.width = width

         const height = this.size.width* Math.cos(Math.PI / 6)
         heightInput.value = ~~height
     }

    draw(ctx, type = null) {
        const center = this.center
        const pad = this.options.strokeWidth
        ctx.beginPath()
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const newY = this.corner2.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x + center.x, y + center.y)
        ctx.lineTo(this.corner2.x + center.x,y + center.y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(center.x + minX + (this.type ==='rightTriangle' ? 0 : width / 2 ),
                  newY < y ? (y - height + center.y) : (y+height + center.y) 
                  )
        ctx.lineTo(this.corner1.x + center.x , y + center.y)
        const isDownwards = newY > this.corner1.y
        const collisionObj = {
            x:  minX - pad + center.x,
            y:  (y-pad) - (isDownwards ? 0 : height)  + center.y,
            w: width,
            h: height
        }
        this.collisionObj = collisionObj
        super.handleOptions(ctx)
        if (this.selected) {
            this.drawGizmo(ctx, minX - pad, width, height, y-pad, newY, pad )
          
        }       
    }
    drawGizmo(ctx, startX, width, height, startY, newY,pad) {
        const center = this.center;
       
        ctx.save()  

        ctx.lineWidth = 3
        ctx.beginPath()
        const isDownwards = newY > this.corner1.y

        ctx.rect(startX + center.x, 
                startY  - (isDownwards ? 0 : height)  + center.y,
                width + pad * 2 ,
                height + pad * 2)
        ctx.strokeStyle = 'red' 
        ctx.setLineDash([pad,5])
        ctx.stroke()
        
        ctx.restore()

    }
}