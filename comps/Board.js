import React, { useEffect, useRef, useState } from "react";
import Piece from "./Piece";
import Wire from "./Wire";
import Sprite from "./Sprite";
import Lane from "./Lane";
import Led from "./Led";
import Switch from "./Switch";

let PIECES = [];
let WIRES = [];
let SELECTED_PIECE = null;
let SELECTED_WIRE = null;
let SELECTED_DIVIT = null;
let OLD_DIVIT = null;
const DIVITS = [];
//LOGIC n p a1 a2 , b1 b2 n p

let LANES = []
for (let index = 0; index < 60; index++) {
    LANES.push(new Lane(index, null, false))
}
LANES.push(new Lane(60, false, true))
LANES.push(new Lane(61, true, true))
LANES[60].ioval = false;
LANES[61].ioval = true;


//specialfunc
//n:60, p:61
// 0 1 2 3.. 29
//30 31 
//cnt: connections, val: true for pos, false for neg, io: immuteable wire true
//first row
for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 5; j++)
        DIVITS.push({ x: 34 + i * 32, y: 126 + j * 32, lan: i })
}
//second row
for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 5; j++)
        DIVITS.push({ x: 34 + i * 32, y: 341 + j * 32, lan: i + 30 })
}
//first io
for (let j1 = 0; j1 < 2; j1++) {
    for (let i1 = 0; i1 < 5; i1++)
        for (let i = 0; i < 5; i++) {
            if (j1 === 0)
                DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 22 + j1 * 32, lan: 60 })
            else
                DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 22 + j1 * 32, lan: 61 })
        }
}

//second io
for (let j1 = 0; j1 < 2; j1++) {
    for (let i1 = 0; i1 < 5; i1++)
        for (let i = 0; i < 5; i++)
            if (j1 === 0)
                DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 537 + j1 * 32, lan: 60 })
            else
                DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 537 + j1 * 32, lan: 61 })
}



const ic1c = { x: 1080, y: 30, width: 212, height: 97 };
const ic2c = { x: 1080, y: 30 + 97 + 20, width: 212, height: 97 };
const ic3c = { x: 1080, y: 30 + 97 * 2 + 20 * 2, width: 212, height: 97 };

const led1c = { x: 1372 - 40, y: 50, width: 32, height: 61 };
const led2c = { x: 1372, y: 50, width: 32, height: 61 };
const led3c = { x: 1372 + 40, y: 50, width: 32, height: 61 };
const switch1c = { x: 1345, y: 170, width: 100, height: 45 };



export default function Board() {


    const canvasRef = useRef(null);
    //PIECES.push(new Piece(10, 10, 'ic.svg'));
    //wait for it to mount with useEffect
    useEffect(() => {

        //prerender
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const background = new Sprite(0, 0, 'breadboard.svg');
        const ic1 = new Sprite(ic1c.x, ic1c.y, 'ic.svg');
        const ic2 = new Sprite(ic2c.x, ic2c.y, 'ic.svg');
        const ic3 = new Sprite(ic3c.x, ic3c.y, 'ic.svg');
        const led1 = new Sprite(led1c.x, led1c.y, 'ledoff.svg');
        const led2 = new Sprite(led2c.x, led2c.y, 'ledoff2.svg');
        const led3 = new Sprite(led3c.x, led3c.y, 'ledoff3.svg');
        const switch1 = new Sprite(switch1c.x, switch1c.y, 'switchoff.svg');

        //very scary loop oooh
        function render() {

            //board prerender
            ctx.fillStyle = "#c6c6c8";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            background.draw(ctx);
            //ic prerender
            ic1.draw(ctx);
            ic2.draw(ctx);
            ic3.draw(ctx);
            led1.draw(ctx);
            led2.draw(ctx);
            led3.draw(ctx);
            switch1.draw(ctx);

            //highlighting
            if (SELECTED_DIVIT != null && SELECTED_PIECE != null) {
                ctx.strokeStyle = "yellow";
                ctx.lineWidth = 4;
                ctx.strokeRect(SELECTED_DIVIT.x, SELECTED_DIVIT.y, 20, 20)
                if (SELECTED_PIECE instanceof Led) {
                    ctx.strokeRect(SELECTED_DIVIT.x + 32, SELECTED_DIVIT.y, 20, 20)
                }
                if (SELECTED_PIECE instanceof Switch) {
                    ctx.strokeRect(SELECTED_DIVIT.x + 32, SELECTED_DIVIT.y, 20, 20)
                    ctx.strokeRect(SELECTED_DIVIT.x + 64, SELECTED_DIVIT.y, 20, 20)
                }
            }
            if (SELECTED_DIVIT != null) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 4;
                ctx.strokeRect(SELECTED_DIVIT.x, SELECTED_DIVIT.y, 20, 20)
            }
            if (SELECTED_DIVIT != null && SELECTED_WIRE != null) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 4;
                ctx.strokeRect(SELECTED_DIVIT.x, SELECTED_DIVIT.y, 20, 20)
            }

            //render wire first
            for (let i = 0; i < WIRES.length; i++) {
                WIRES[i].draw(ctx)
            }
            if (SELECTED_WIRE != null) {
                SELECTED_WIRE.draw(ctx);
            }
            //render pieces
            for (let i = 0; i < PIECES.length; i++) {
                PIECES[i].draw(ctx, LANES);
            }


            //render
            requestAnimationFrame(render);
        }
        render()
    });

    return (
        <canvas
            ref={canvasRef}
            height="608"
            width="1500"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDoubleClick={onDoubleClick}
        />
    );
}



//mobile function TODO
function onTouchStart(evt) {
    if (!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
        document.documentElement.requestFullscreen()
        return;
    }

    let loc = {
        clientX: evt.touches[0].clientX,
        clientY: evt.touches[0].clientY
    };
    onMouseDown(loc);
}
function onTouchMove(evt) {
    let loc = {
        clientX: evt.touches[0].clientX,
        clientY: evt.touches[0].clientY
    };
    onMouseMove(loc);
}
function onTouchEnd() {
    onMouseUp();
}

function onDoubleClick(evt) {
    //TODO put switch handling
    SELECTED_PIECE = getPressedPiece(evt);
    if (SELECTED_PIECE != null && SELECTED_PIECE instanceof Switch) {
        SELECTED_PIECE.on = !SELECTED_PIECE.on;
        SELECTED_PIECE.changed = true;
    }
    SELECTED_PIECE = null;
    validate()
}

//MOUSEDOWN
function onMouseDown(evt) {
    console.log("down")


    //logging coords
    console.log(evt.clientX + " " + evt.clientY)

    //handle copying pieces
    handleCopying(evt);
    SELECTED_PIECE = getPressedPiece(evt);


    //divit select
    SELECTED_DIVIT = getPressedDivit(evt);
    //divit logging
    // if (SELECTED_DIVIT != null) {
    //     console.log("selected divit: " + SELECTED_DIVIT.x + " " + SELECTED_DIVIT.y + "\nval: " + SELECTED_DIVIT.val)
    // }

    //wire trashing
    let fullwire = null;
    if (SELECTED_DIVIT != null) {
        fullwire = getPressedWire(SELECTED_DIVIT)
    }
    if (fullwire != null) {
        //remove from lanes logic
        LANES[fullwire.div1].con.splice(LANES[fullwire.div1].con.indexOf(fullwire.div2), 1)
        LANES[fullwire.div2].con.splice(LANES[fullwire.div2].con.indexOf(fullwire.div1), 1)
        WIRES.splice(WIRES.indexOf(fullwire), 1)

    }

    //wire drawing
    if (SELECTED_DIVIT != null && SELECTED_WIRE == null && SELECTED_PIECE == null) {
        OLD_DIVIT = SELECTED_DIVIT;
        SELECTED_WIRE = new Wire(evt.clientX, evt.clientY, evt.clientX, evt.clientY, OLD_DIVIT.lan);
        WIRES.push(SELECTED_WIRE);
    }

    if (SELECTED_PIECE != null) {
        const index = PIECES.indexOf(SELECTED_PIECE);
        SELECTED_PIECE.offset = {
            x: evt.clientX - SELECTED_PIECE.x,
            y: evt.clientY - SELECTED_PIECE.y
        }
    }

}

//MOUSEMOVE
function onMouseMove(evt) {
    //piece movement
    if (SELECTED_PIECE != null) {
        SELECTED_PIECE.x = evt.clientX - SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = evt.clientY - SELECTED_PIECE.offset.y;
        if (SELECTED_PIECE instanceof Led)
            SELECTED_DIVIT = getPressedDivit(evt, SELECTED_PIECE.offset.x, SELECTED_PIECE.offset.y - 50);
        if (SELECTED_PIECE instanceof Switch)
            SELECTED_DIVIT = getPressedDivit(evt, SELECTED_PIECE.offset.x - 20, SELECTED_PIECE.offset.y - 40);

    } else if (SELECTED_WIRE != null) {
        SELECTED_WIRE.x1 = evt.clientX;
        SELECTED_WIRE.y1 = evt.clientY;
        SELECTED_DIVIT = getPressedDivit(evt);
    } else
        SELECTED_DIVIT = getPressedDivit(evt);
}

//MOUSEUP : LOGIC
function onMouseUp(evt) {

    //piece logic
    SELECTED_DIVIT = getPressedDivit(evt);
    if (SELECTED_PIECE != null) {

        //Leds
        if (SELECTED_PIECE instanceof Led) {
            SELECTED_DIVIT = getPressedDivit(evt, SELECTED_PIECE.offset.x, SELECTED_PIECE.offset.y - 50);
            if (SELECTED_DIVIT != null) {
                SELECTED_PIECE.Llane = SELECTED_DIVIT.lan;
                SELECTED_PIECE.Rlane = SELECTED_DIVIT.lan + 1;
            } else {
                SELECTED_PIECE.Llane = null;
                SELECTED_PIECE.Rlane = null;
            }
        }

        //Switches
        if (SELECTED_PIECE instanceof Switch) {
            SELECTED_DIVIT = getPressedDivit(evt, SELECTED_PIECE.offset.x - 20, SELECTED_PIECE.offset.y - 40);


            if (SELECTED_DIVIT != null) {
                SELECTED_PIECE.Llane = SELECTED_DIVIT.lan;
                SELECTED_PIECE.Mlane = SELECTED_DIVIT.lan + 1;
                SELECTED_PIECE.Rlane = SELECTED_DIVIT.lan + 2;
                SELECTED_PIECE.pluged = true;



            } else {
                SELECTED_PIECE.Llane = null;
                SELECTED_PIECE.Mlane = null;
                SELECTED_PIECE.Rlane = null;
                SELECTED_PIECE.pluged = false;
            }
        }


    }

    //wire drawing
    if (SELECTED_DIVIT != null && OLD_DIVIT != SELECTED_DIVIT && SELECTED_PIECE == null) {
        SELECTED_WIRE.div2 = SELECTED_DIVIT.lan;

        //logic handle
        //console.log("wire drawn " + OLD_DIVIT.lan +" " + SELECTED_DIVIT.lan)
        LANES[OLD_DIVIT.lan].con.push(SELECTED_DIVIT.lan)
        LANES[SELECTED_DIVIT.lan].con.push(OLD_DIVIT.lan)


        SELECTED_WIRE = null;
    } else if (SELECTED_WIRE != null) {
        WIRES.pop()
        SELECTED_WIRE = null;
    }
    //piece trashing
    if (evt.clientX > 1020 && evt.clientX < 1500 && SELECTED_PIECE != null) {
        PIECES.splice(PIECES.indexOf(SELECTED_PIECE), 1)

    }
    SELECTED_PIECE = null;

    //board logic calculate
    validate()

}

//VALIDATE (only thing that doesnt get reset is cons) (and switch logic)
function validate() {
    LANES.forEach(e => {
        e.validated = false;
        e.val = null
    });
    //validate switches
    PIECES.forEach(e => {
        if (e instanceof Switch) {
            if (e.pluged) {
                if (e.isNew) {
                    if (e.on) {
                        LANES[e.Rlane].con.push(e.Mlane)
                        LANES[e.Mlane].con.push(e.Rlane)
                    } else {
                        LANES[e.Llane].con.push(e.Mlane)
                        LANES[e.Mlane].con.push(e.Llane)
                    }
                    e.isNew = false;
                }
                if (e.changed) {
                    if (e.on) {
                        LANES[e.Llane].con.splice(LANES[e.Llane].con.indexOf(e.Mlane), 1)
                        LANES[e.Mlane].con.splice(LANES[e.Mlane].con.indexOf(e.Llane), 1)
                        LANES[e.Rlane].con.push(e.Mlane)
                        LANES[e.Mlane].con.push(e.Rlane)
                    } else {
                        LANES[e.Rlane].con.splice(LANES[e.Rlane].con.indexOf(e.Mlane), 1)
                        LANES[e.Mlane].con.splice(LANES[e.Mlane].con.indexOf(e.Rlane), 1)
                        LANES[e.Llane].con.push(e.Mlane)
                        LANES[e.Mlane].con.push(e.Llane)
                    }
                    e.changed = false;
                }

            } else {

            }
        }

    });
    validateN(LANES[60])
    validateP(LANES[61])
    console.log(LANES)
}

function validateN(lane) {
    if (lane.validated != true) {
        lane.validated = true;
        if (lane.ioval != true)
            lane.val = false;

        if (lane.con != null) {
            lane.con.forEach(e => {
                validateN(LANES[e])

            });
        }
    }
}

function validateP(lane) {
    if (lane.validated != true) {
        lane.validated = true;
        if (lane.ioval != false)
            lane.val = true;

        if (lane.con != null) {
            lane.con.forEach(e => {
                validateP(LANES[e])

            });
        }
    }
}

//handle piece copying
function handleCopying(evt) {
    //ic1
    if (evt.clientX > ic1c.x && evt.clientX < ic1c.x + ic1c.width &&
        evt.clientY > ic1c.y && evt.clientY < ic1c.y + ic1c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Piece(evt.clientX - ic1c.width / 2, evt.clientY - ic1c.height / 2, ic1c.width, ic1c.height, 'ic.svg')
        PIECES.push(SELECTED_PIECE);
    }
    if (evt.clientX > ic2c.x && evt.clientX < ic2c.x + ic2c.width &&
        evt.clientY > ic2c.y && evt.clientY < ic2c.y + ic2c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Piece(evt.clientX - ic2c.width / 2, evt.clientY - ic2c.height / 2, ic2c.width, ic2c.height, 'ic.svg')
        PIECES.push(SELECTED_PIECE);
    }
    if (evt.clientX > ic3c.x && evt.clientX < ic3c.x + ic3c.width &&
        evt.clientY > ic3c.y && evt.clientY < ic3c.y + ic3c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Piece(evt.clientX - ic3c.width / 2, evt.clientY - ic3c.height / 2, ic3c.width, ic3c.height, 'ic.svg')
        PIECES.push(SELECTED_PIECE);
    }
    //led1
    if (evt.clientX > led1c.x && evt.clientX < led1c.x + led1c.width &&
        evt.clientY > led1c.y && evt.clientY < led1c.y + led1c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Led(evt.clientX - led1c.width / 2, evt.clientY - led1c.height / 2, led1c.width, led1c.height, 'ledoff.svg', 'ledon.svg')
        PIECES.push(SELECTED_PIECE);
    }
    //led2
    if (evt.clientX > led2c.x && evt.clientX < led2c.x + led2c.width &&
        evt.clientY > led2c.y && evt.clientY < led2c.y + led2c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Led(evt.clientX - led2c.width / 2, evt.clientY - led2c.height / 2, led2c.width, led2c.height, 'ledoff2.svg', 'ledon2.svg')
        PIECES.push(SELECTED_PIECE);
    }
    //led3
    if (evt.clientX > led3c.x && evt.clientX < led3c.x + led3c.width &&
        evt.clientY > led3c.y && evt.clientY < led3c.y + led3c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Led(evt.clientX - led3c.width / 2, evt.clientY - led3c.height / 2, led3c.width, led3c.height, 'ledoff3.svg', 'ledon3.svg')
        PIECES.push(SELECTED_PIECE);
    }
    //switch
    if (evt.clientX > switch1c.x && evt.clientX < switch1c.x + switch1c.width &&
        evt.clientY > switch1c.y && evt.clientY < switch1c.y + switch1c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Switch(evt.clientX - switch1c.width / 2, evt.clientY - switch1c.height / 2, switch1c.width, switch1c.height, 'switchoff.svg', "switchon.svg")
        PIECES.push(SELECTED_PIECE);
    }
}

//GETPRESSEDDIVIT
function getPressedDivit(evt, offX = 0, offY = 0) {

    for (let i = 0; i < DIVITS.length; i++) {
        if (evt.clientX - offX > DIVITS[i].x && evt.clientX - offX < DIVITS[i].x + 20 &&
            evt.clientY - offY > DIVITS[i].y && evt.clientY - offY < DIVITS[i].y + 20) {
            return DIVITS[i];
        }
    }
    return null;
}

//GETPRESSEDPIECE
function getPressedPiece(evt) {

    for (let i = 0; i < PIECES.length; i++) {
        if (evt.clientX > PIECES[i].x && evt.clientX < PIECES[i].x + PIECES[i].width &&
            evt.clientY > PIECES[i].y && evt.clientY < PIECES[i].y + PIECES[i].height) {
            return PIECES[i];
        }
    }
    return null;
}

//GETPRESSEDWIRE
function getPressedWire(divit) {

    for (let i = 0; i < WIRES.length; i++) {
        if ((divit.x < WIRES[i].x && divit.x + 20 > WIRES[i].x &&
            divit.y < WIRES[i].y && divit.y + 20 > WIRES[i].y) ||
            (divit.x < WIRES[i].x1 && divit.x + 20 > WIRES[i].x1 &&
                divit.y < WIRES[i].y1 && divit.y + 20 > WIRES[i].y1)
        ) {
            return WIRES[i];
        }
    }
    return null;
}



