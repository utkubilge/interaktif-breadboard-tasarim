

export default class Wire {
    constructor(x, y, x1, y1) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x1, this.y1);
        ctx.strokeStyle = "maroon";
        ctx.lineWidth = 10;
        ctx.stroke();
    }
}