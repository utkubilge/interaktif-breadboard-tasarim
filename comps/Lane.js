export default class Lane {
    constructor(id, val, io) {
        this.id = id;
        this.real = this.id + 1;
        this.val = val;
        this.io = io;
        this.ioval;
        this.validated = false;
        this.con = [];
    }
    fix() {
        if (this.io) {
            this.val = this.ioval;
        }
    }



}