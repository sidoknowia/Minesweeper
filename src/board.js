import React, { Component } from 'react';
import Square from './square.js';
import GAME_STATUS from './gameStatus.js';

export default class Board extends Component{

    constructor(props){
        super(props);
        this.board_size = this.props.board_size;
        this.mines_count = this.props.mines_count;

        this.state = {
            board_position : [],
            mines: [],
            game: {
                status: GAME_STATUS.ON,
                flag_ct: this.mines_count + 5,
                diffused_mines: 0,
                mines_left: this.mines_count
            }
        };
        
    
        this.handleClick = this.handleClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleCheatClick = this.handleCheatClick.bind(this);
        this.handleReloadClick = this.handleReloadClick.bind(this);
    }
    
    componentWillMount(){
        this.setUpBoard();
    }

    setUpBoard(){
        let _board_position = [];
        let _mines = [];

        // Construct grid
        for(let i = 0; i < this.board_size; i++){
            let t = [];
            for(let j = 0; j < this.board_size; j++){
                t.push( {
                    'color': 'white',
                    'val': 0,
                    'mine': false,
                    'diffused': true,
                    'flag':false,
                    'show': false,
                    'row': i,
                    'col': j
                } );
            }
            _board_position.push(t);
        }

        // Construct mines
        while(_mines.length < this.mines_count){
            let m = Math.floor(Math.random()*64) + 1;
            if(_mines.indexOf(matchMedia) === -1) {
                _mines.push(m);
            }
        }

        
        // Setup mines in grid
        for(let i=0; i < _mines.length; i++){
            let x = parseInt(_mines[i] / this.board_size);
            let y = parseInt(_mines[i] - x*this.board_size);
            
            _board_position[x][y] = {
                'color': 'white',
                'val': String.fromCharCode('9760'),
                'mine': true,
                'diffused': false,
                'flag':false,
                'show': false,
                'row': x,
                'col': y
            };
        }

        for(let r = 0; r < _board_position.length; r++){
            for(let c = 0; c < _board_position[r].length; c++){
                let brd = _board_position[r][c];
                let ct = 0;

                if(!brd.mine){
                    
                    let tl = null, t = null, tr = null, 
                    l = null, rt = null, bl = null, 
                    b = null, br = null;
                    
                    // Normal Case
                    if(r > 0 && c > 0 && 
                        c < _board_position[r].length - 1 && 
                        r < _board_position.length - 1){

                        tl = _board_position[r-1][c-1];
                        
                        if(tl.mine){
                            ct += 1;
                        }
                        t = _board_position[r-1][c];
                        if(t.mine){
                            ct += 1;
                        }
                        tr = _board_position[r-1][c+1]
                        if(tr.mine){
                            ct += 1;
                        }
                        l = _board_position[r][c-1];
                        if(l.mine){
                            ct += 1;
                        }
                        rt = _board_position[r][c+1];
                        if(rt.mine){
                            ct += 1;
                        }
                        bl = _board_position[r+1][c-1];
                        if(bl.mine){
                            ct += 1;
                        }
                        b = _board_position[r+1][c];
                        if(b.mine){
                            ct += 1;
                        }
                        br = _board_position[r+1][c+1];
                        if(br.mine){
                            ct += 1;
                        }

                        
                    }
                    
                    // Now lets get the edge cases
                    else if(r === 0 && c === 0){
                        
                        rt = _board_position[r][c+1];
                        
                        if(rt.mine){
                            ct += 1;
                        }
                        b = _board_position[r+1][c];
                        if(b.mine){
                            ct += 1;
                        }
                        br = _board_position[r+1][c+1];
                        if(br.mine){
                            ct += 1;
                        }
                    }

                    else if(r === 0 && c < _board_position[r].length - 1 ){
                        
                        rt = _board_position[r][c+1];
                        if(rt.mine){
                            ct += 1;
                        }

                        b = _board_position[r+1][c];
                        if(b.mine){
                            ct += 1;
                        }

                        br = _board_position[r+1][c+1];
                        if(br.mine){
                            ct += 1;
                        }

                        if(c > 0){
                            l = _board_position[r][c-1];
                            if(l.mine){
                                ct += 1;
                            }

                            bl = _board_position[r+1][c-1];
                            if(bl.mine){
                                ct += 1;
                            }
                        }
                        
                        
                    } 
                    
                    else if(c === 0 && r < _board_position.length - 1 && r > 0){
                        t = _board_position[r-1][c];
                        if(t.mine){
                            ct += 1;
                        }
                        tr = _board_position[r-1][c+1]
                        if(tr.mine){
                            ct += 1;
                        }
                        rt = _board_position[r][c+1];
                        if(rt.mine){
                            ct += 1;
                        }
                        b = _board_position[r+1][c];
                        if(b.mine){
                            ct += 1;
                        }
                        br = _board_position[r+1][c+1];
                        if(br.mine){
                            ct += 1;
                        }
                    }

                    else if(r === _board_position.length - 1 && c < _board_position[r].length - 1){
                        t = _board_position[r-1][c];
                        if(t.mine){
                            ct += 1;
                        }
                        tr = _board_position[r-1][c+1]
                        if(tr.mine){
                            ct += 1;
                        }

                        if(c > 0){
                            tl = _board_position[r-1][c-1];
                            if(tl.mine){
                                ct += 1;
                            }

                            l = _board_position[r][c-1];
                            if(l.mine){
                                ct += 1;
                            }
                        }
                    
                        rt = _board_position[r][c+1];
                        if(rt.mine){
                            ct += 1;
                        }
                    } 

                    else if(c === _board_position[r].length - 1 && r < _board_position.length){
                        
                        if(r > 0){
                            t = _board_position[r-1][c];
                            if(t.mine){
                                ct += 1;
                            }

                            tl = _board_position[r-1][c-1];
                            if(tl.mine){
                                ct += 1;
                            }
                        }
                        
                        l = _board_position[r][c-1];
                        if(l.mine){
                            ct += 1;
                        }

                        if(r < _board_position.length - 1){
                            b = _board_position[r+1][c];
                            if(b.mine){
                                ct += 1;
                            }
    
                            bl = _board_position[r+1][c-1];
                            if(bl.mine){
                                ct += 1;
                            }
                        }
                        
                    }

                    _board_position[r][c].val = ct;
                }
            }
        }

        this.setState({
            mines: _mines,
            board_position: _board_position,
            game: {
                status: GAME_STATUS.ON,
                flag_ct: this.mines_count + 5,
                diffused_mines: 0,
                mines_left: this.mines_count
            }
        });

    }

    updateBoard(board){
        this.setState({
            board_position:board
        })
    }

    createBoard(board_size){
        let table = [];
        let tbody = [];
        for(let r = 0; r < board_size; r++){
            let children = [];
            for(let c = 0; c < board_size; c++){
                let child = this.state.board_position[r][c];
                let tdStyle = {
                    color: child.color,
                    border: '1px solid black'
                };
                                 
                children.push(
                    <td style={tdStyle} key={r+""+c} onClick={(e) => this.handleClick(e, this.state.board_position[r][c])}  
                                                     onContextMenu={(e) => 
                                                     this.handleRightClick(e, this.state.board_position[r][c]) } >
                        <div >
                            <Square row={r} col={c} board={this.state.board_position}  />
                        </div>
                    </td>
                    );
            }
            tbody.push(<tr key={Math.random()}>{children}</tr>);
        }   
        table.push(<table key="-1"><tbody>{tbody}</tbody></table>);
        return table;
    }

    handleReloadClick(e){
        this.setUpBoard();
    }

    handleClick(e, sq) {
        if(this.state.game.status !== GAME_STATUS.ON){
            alert("Game Over! Start a new game");
            return false;
        }
        if(sq.show){
            return false;
        }
        let r = sq.row;
        let c = sq.col;
        let gm = this.state.game;
        if(sq.mine){
            gm.status = GAME_STATUS.LOST;
            this.setState({
                game: gm
            });
            this.handleCheatClick();
        }

        sq.show = true;
        let b = this.state.board_position;
        b[r][c] = sq;
        this.updateBoard(b);

    }

    handleRightClick(e, sq){
        e.preventDefault();
        if(this.state.game.status !== GAME_STATUS.ON){
            alert("Game Over! Start a new game");
            return false;
        }
        if(sq.show){
            return false;
        }
        let r = sq.row;
        let c = sq.col;
        let flag_ct = this.state.game.flag_ct;
        let diff_ct = this.state.game.diffused_mines;
        let mines_lft = this.state.game.mines_left;

        flag_ct -= 1;

        sq.show = true;
        sq.flag = true;
        if(sq.mine){
            sq.diffused = true;
            diff_ct += 1
            mines_lft -= 1;
        }
      
        let b = this.state.board_position;
        b[r][c] = sq;
        this.updateBoard(b);

        let gm = {
            status: sq.status,
            flag_ct: flag_ct,
            diffused_mines: diff_ct,
            mines_left: mines_lft
        }
        this.checkGameStatus(gm)
    }

    checkGameStatus(game){
            
        let st = game.status;
        if(game.flag_ct === 0 && game.diffused_mines !== this.mines_count){
            st = GAME_STATUS.LOST;
        } else if(game.diffused_mines === this.mines_count){
            st = GAME_STATUS.WON;
        } else {
            st = GAME_STATUS.ON;
        }

        game.status = st;
        this.setState({
            game: game
        })
 
    }

    handleCheatClick(e){
        let board_position = this.state.board_position;

        for(let r = 0; r < board_position.length; r++){
            for(let c=0; c < board_position[r].length; c++){
                board_position[r][c].show = true;
            }
        }
        this.updateBoard(board_position);
    }

    getAlertClass(){
        
        switch(this.state.game.status) {
            case GAME_STATUS.ON:
              return 'alert alert-primary';
            case GAME_STATUS.WON:
              return 'alert alert-success'
            default:
              return 'alert alert-danger'
          }
    }

    render(){
        return (
            <div className="container-fluid margin-pos">
                <div className='row'>
                    <div className='col-6'>
                        <div className='container'>

                            <div className={this.getAlertClass()}>GAME : {this.state.game.status} !</div>
                            <h4>Flags Left - { this.state.game.flag_ct }</h4>
                            <h4>Mines Left - {this.state.game.mines_left} </h4>
                            <div className='board'>
                                {this.createBoard(this.board_size)}
                            </div>
                        </div>
                        
                    </div>
                    <div className='col-4'>
                        <div className='container-fluid'>
                             
                            <div className='row'>
                                <div className='alert alert-info margin-pos'>
                                    <ul>
                                        <li>Right click to diffuse</li>
                                        <li>Left click to expose value</li>
                                    </ul>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <button className='btn btn-warning' 
                                                onClick={(e) => this.handleCheatClick(e)}>
                                                Cheat
                                            </button>
                                        </div>
                                        <div className='col-6'>
                                            <button className='btn btn-success' 
                                                onClick={(e) => this.handleReloadClick(e)}>
                                                New Game
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
 
            </div>
        )
    }
}
