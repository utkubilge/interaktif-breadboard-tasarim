import React from "react";

function Board(props) {
    var matrix = [];
    for (var i = 0; i < props.count; i++) {
        matrix.push(<div key={i} className='Hole'/>);
    }

    return (
        matrix

    )
}

export default Board