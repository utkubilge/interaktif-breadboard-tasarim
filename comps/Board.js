import React, { useEffect, useRef, useState } from "react";
import Piece from "./Piece";
import Wire from "./Wire";
import Sprite from "./Sprite";

let PIECES = [];
let WIRES = [];
let SELECTED_PIECE = null;
let SELECTED_WIRE = null;
let SELECTED_DIVIT = null;
let OLD_DIVIT = null;
const DIVITS = [];

let LOGIC = []

//first row
for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 5; j++)
        DIVITS.push({ x: 34 + i * 32, y: 126 + j * 32 , cnt: null, val: null})
}
//second row
for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 5; j++)
        DIVITS.push({ x: 34 + i * 32, y: 341 + j * 32 , cnt: null, val: null})
}
//first io
for (let j1 = 0; j1 < 2; j1++) {
    for (let i1 = 0; i1 < 5; i1++)
        for (let i = 0; i < 5; i++) {
            if(j1 === 0)
            DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 22 + j1 * 32 , cnt: null, val: false})
            else
            DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 22 + j1 * 32 , cnt: null, val: true})
        }
}
//second io
for (let j1 = 0; j1 < 2; j1++) {
    for (let i1 = 0; i1 < 5; i1++)
        for (let i = 0; i < 5; i++)
        if(j1 === 0)
            DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 537 + j1 * 32 , cnt: null, val: false})
            else
            DIVITS.push({ x: 64 + i * 32 + i1 * 186, y: 537 + j1 * 32 , cnt: null, val: true})
}


const ic1c = { x: 1080, y: 30, width: 212, height: 97 };
const ic2c = { x: 1080, y: 30 + 97 + 20, width: 212, height: 97 };
const ic3c = { x: 1080, y: 30 + 97 * 2 + 20 * 2, width: 212, height: 97 };
//const ic4c = { x: 1080, y: 30 + 97 * 3 + 20, width: 212, height: 97 };

const led1c = { x: 1372, y: 50, width: 32, height: 61 };
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
            switch1.draw(ctx);


            //render wire first
            for (let i = 0; i < WIRES.length; i++) {
                WIRES[i].draw(ctx)
            }
            if (SELECTED_WIRE != null) {
                SELECTED_WIRE.draw(ctx);
            }
            //render pieces
            for (let i = 0; i < PIECES.length; i++) {
                PIECES[i].draw(ctx)
            }
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
        />
    );
}

//mobile function
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


function onMouseDown(evt) {

    //logging coords
    console.log(evt.clientX + " " + evt.clientY)

    //handle copying pieces
    handleCopying(evt);
    SELECTED_PIECE = getPressedPiece(evt);


    //divit select
    SELECTED_DIVIT = getPressedDivit(evt);
    if (SELECTED_DIVIT != null) {
        console.log("selected divit: " + SELECTED_DIVIT.x + " " + SELECTED_DIVIT.y)
    }
    
    //wire trashing
    
        let fullwire = null;
        if (SELECTED_DIVIT != null) {
            fullwire = getPressedWire(SELECTED_DIVIT)
        }
        if (fullwire != null) {
            WIRES.splice(WIRES.indexOf(fullwire), 1)
        }

        //wire drawing
        if (SELECTED_DIVIT != null && SELECTED_WIRE == null) {
            OLD_DIVIT = SELECTED_DIVIT;
            SELECTED_WIRE = new Wire(evt.clientX, evt.clientY, evt.clientX, evt.clientY)
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

function onMouseMove(evt) {
    if (SELECTED_PIECE != null) {
        SELECTED_PIECE.x = evt.clientX - SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = evt.clientY - SELECTED_PIECE.offset.y;
    } else if (SELECTED_WIRE != null) {
        SELECTED_WIRE.x1 = evt.clientX;
        SELECTED_WIRE.y1 = evt.clientY;
    }
}

function onMouseUp(evt) {
    SELECTED_DIVIT = getPressedDivit(evt);
    if (SELECTED_DIVIT != null && OLD_DIVIT !== SELECTED_DIVIT) {
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
    //OLD_DIVIT=null;

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

        SELECTED_PIECE = new Piece(evt.clientX - led1c.width / 2, evt.clientY - led1c.height / 2, led1c.width, led1c.height, 'ledoff.svg')
        PIECES.push(SELECTED_PIECE);
    }
    if (evt.clientX > switch1c.x && evt.clientX < switch1c.x + switch1c.width &&
        evt.clientY > switch1c.y && evt.clientY < switch1c.y + switch1c.height && SELECTED_PIECE == null) {

        SELECTED_PIECE = new Piece(evt.clientX - switch1c.width / 2, evt.clientY - switch1c.height / 2, switch1c.width, switch1c.height, 'switchoff.svg')
        PIECES.push(SELECTED_PIECE);
    }
}

function getPressedDivit(evt) {
    for (let i = 0; i < DIVITS.length; i++) {
        if (evt.clientX > DIVITS[i].x && evt.clientX < DIVITS[i].x + 20 &&
            evt.clientY > DIVITS[i].y && evt.clientY < DIVITS[i].y + 20) {
            return DIVITS[i];
        }
    }
    return null;
}

function getPressedPiece(evt) {

    for (let i = 0; i < PIECES.length; i++) {
        if (evt.clientX > PIECES[i].x && evt.clientX < PIECES[i].x + PIECES[i].width &&
            evt.clientY > PIECES[i].y && evt.clientY < PIECES[i].y + PIECES[i].height) {
            return PIECES[i];
        }
    }
    return null;
}

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



