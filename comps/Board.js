import React, { useEffect, useRef, useState } from "react";
import Piece from "./Piece";
import Wire from "./Wire";
import Sprite from "./Sprite";

let PIECES = [];
let WIRES = [];
let SELECTED_PIECE = null;
let SELECTED_WIRE = null;
let SELECTED_DIVIT = null;
const DIVITS = [];

for(let i=0;i<30;i++) {
    for(let j=0;j<5;j++)
    DIVITS.push({x: 34+i*32, y: 126+j*32})
}


export default function Board() {

    const canvasRef = useRef(null);
    //PIECES.push(new Piece(10, 10, 'ic.svg'));
    //wait for it to mount with useEffect
    useEffect(() => {

        function render() {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            //board render

            const background = new Sprite(0, 0, 'breadboard.svg');
            background.draw(ctx);
            for (let i = 0; i < PIECES.length; i++) {
                PIECES[i].draw(ctx)
            }
            for (let i = 0; i < WIRES.length; i++) {
                WIRES[i].draw(ctx)
            }
            if (SELECTED_WIRE != null) {
                    SELECTED_WIRE.draw(ctx);
            }

            // for (let i = 0; i < PIECES.length; i++) {
            //     PIECES[i].draw(ctx);
            // }
            // for (let i = 0; i < WIRES.length; i++) {
            //     WIRES[i].draw(ctx);
            // }
            // if (SELECTED_WIRE != null) {
            //     SELECTED_WIRE.draw(ctx);
            // }
            //console.log("rendering")
            requestAnimationFrame(render);
        }
        render()
    });

    return (
        <canvas
            ref={canvasRef}
            height="618"
            width="1014"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
        />
    );
}





function onMouseDown(evt) {
    console.log(evt.clientX + " " + evt.clientY)

    if (evt.nativeEvent.which === 2) {
        PIECES.push(new Piece(evt.clientX, evt.clientY, 'ic.svg'));
    } else //devtool

    SELECTED_DIVIT = getPressedDivit(evt);
    console.log(SELECTED_DIVIT)
    if(SELECTED_DIVIT != null && SELECTED_WIRE == null) {
        SELECTED_WIRE = new Wire(evt.clientX, evt.clientY, evt.clientX, evt.clientY)
        WIRES.push(SELECTED_WIRE);
    }


    
    SELECTED_PIECE = getPressedPiece(evt);
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
    if (SELECTED_DIVIT != null) {
        SELECTED_WIRE = null;
    } else if (SELECTED_WIRE != null) {
        WIRES.pop()
        SELECTED_WIRE = null;
    }
    SELECTED_PIECE = null;
    

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



