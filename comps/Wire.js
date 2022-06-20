

export default class Wire {
    constructor(x, y, x1, y1) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.radius = 10
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x1, this.y1);
        ctx.strokeStyle = "maroon";
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "maroon"
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.arc(this.x1, this.y1, this.radius, 0, 2 * Math.PI)
        ctx.fill();
        

    }
}