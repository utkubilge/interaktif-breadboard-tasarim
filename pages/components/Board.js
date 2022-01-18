import React from "react";

function Board(props) {

    return (
        <div
            id={props.id}
            onDrop={drop}
            onDragOver={dragOver}
            className={props.className}
        >
            {props.children}


        </div>
    )
}

export default Board