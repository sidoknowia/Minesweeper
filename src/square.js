import React, { Component } from 'react';

export default class Square extends Component {
    constructor(props){
        super(props);
        this.sq_color = '#00ff00';
        this.sq_val = -1;
    }

    componentWillMount(){
        this.getSquareValues(this.props.row, 
                             this.props.col);
    }

    getSquareValues(r, c){
  
      let sq = this.props.board[r][c];
      this.sq_val = null;
      this.sq_color = 'square';

      if(sq.show){
        this.sq_val = this.props.board[r][c].val;
        if(sq.flag){
          this.sq_val = String.fromCharCode('9971');
        }

        if(sq.mine){
          this.sq_color = 'square-1';
          if(sq.flag){
            this.sq_val = String.fromCharCode('9971');
          }
        }
      }
       
    }


    render() {
      return (
        <div className={this.sq_color} datacolor={this.sq_color} 
            dataval={this.sq_val} 
            datarow={this.props.row} datacol={this.props.col}>
            {this.sq_val}
        </div>
      );
    }
  }

