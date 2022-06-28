export default class Switch {
    constructor(x, y, w, h, imageSrc, imageSrc1) {
        this.x = x;
        this.y = y;
        this.height = h
        this.width = w
        this.image = new Image();
        this.image.src = imageSrc;
        this.image1 = new Image();
        this.image1.src = imageSrc1;
        this.Llane = null;
        this.Mlane = null;
        this.Rlane = null;
        this.LlaneO = null;
        this.MlaneO = null;
        this.RlaneO = null;
        this.pluged = false;
        this.changed = false;
        this.isNew = true;
        this.on = false;
        this.oldDiv = null;

    }
    draw(ctx, LANES) {
        //double click render
        if (this.on) 
            ctx.drawImage(this.image1, this.x, this.y)
        else
            ctx.drawImage(this.image, this.x, this.y)

    }
}