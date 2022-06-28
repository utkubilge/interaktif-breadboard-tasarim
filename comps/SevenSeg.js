export default class Led {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.height = h
        this.width = w
        this.image = new Image();
        this.image.src = "seven-seg-off.svg";
        this.image1 = new Image();
        this.image1.src = "seven-seg-1.svg";
        this.image2 = new Image();
        this.image2.src = "seven-seg2.svg";
        this.image3 = new Image();
        this.image3.src = "seven-seg3.svg";
        this.image4 = new Image();
        this.image4.src = "seven-seg4.svg";
        this.image5 = new Image();
        this.image5.src = "seven-seg5.svg";
        this.image6 = new Image();
        this.image6.src = "seven-seg6.svg";
        this.image7 = new Image();
        this.image7.src = "seven-seg7.svg";
        this.image8 = new Image();
        this.image8.src = "seven-seg8.svg";
        this.lans = [];

    }
    draw(ctx, LANES) {
        ctx.drawImage(this.image, this.x, this.y)
        if (this.lans.length > 0) {
            if (LANES[this.lans[2]].val && LANES[this.lans[7]].val) {
                if (LANES[this.lans[0]].val == false)
                    ctx.drawImage(this.image1, this.x, this.y)
                if (LANES[this.lans[1]].val == false)
                    ctx.drawImage(this.image2, this.x, this.y)
                if (LANES[this.lans[3]].val == false)
                    ctx.drawImage(this.image3, this.x, this.y)
                if (LANES[this.lans[4]].val == false)
                    ctx.drawImage(this.image4, this.x, this.y)

                if (LANES[this.lans[5]].val == false)
                    ctx.drawImage(this.image5, this.x, this.y)
                if (LANES[this.lans[6]].val == false)
                    ctx.drawImage(this.image6, this.x, this.y)
                if (LANES[this.lans[8]].val == false)
                    ctx.drawImage(this.image7, this.x, this.y)
                if (LANES[this.lans[9]].val == false)
                    ctx.drawImage(this.image8, this.x, this.y)
            }
        }

    }
}