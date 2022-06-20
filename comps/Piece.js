

export default class Piece {
    constructor(x, y, h, w, imageSrc) {
        this.x = x;
        this.y = y;
        this.height = h
        this.width = w
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}