import React, { Component } from 'react';
import Board from './board.js';

export default class Game extends Component{

	constructor(){
        super();
        this.boardSize = 8;
        this.mines_count = 10;
        // this.state = {
        //     boardPosition: new Board()
        // }
    }

    

    render(){
        return (
            <div>
                <Board board_size = {this.boardSize} mines_count = {this.mines_count} />
            </div>
        )
    }
}

