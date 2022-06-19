

export default class Piece {
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.height = 97
        this.width = 205
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}