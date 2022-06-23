export default class Lane {
    constructor(id, val, io) {
        this.id = id;
        this.val = val;
        this.io = io;
        this.validated = false;
        this.con = [];
    }

}