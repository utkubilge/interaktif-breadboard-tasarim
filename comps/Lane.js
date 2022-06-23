export default class Lane {
    constructor(id, val, io) {
        this.id = id;
        this.val = val;
        this.io = io;
        this.ioval;
        this.validated = false;
        this.con = [];
    }
    fix() {
        if (io) {
            this.val = this.ioval;
        }
    }



}