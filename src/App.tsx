import { useState } from 'react'
import './App.css';
import Block from './components/Block'


function App() {
  const [state, setState] = useState(Array(9).fill(null))
  const [currentTurn, setCurrentTurn] = useState('X')
  const [winner, setWinner] = useState<string | null>(null)
  const [winningBlocks, setWinningBlocks] = useState<number[] | null>(null)

  const checkWinner = (state: Array<string | null>): 'X' | 'O' | null => {
    const win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    for(let i = 0; i < win.length; i++ ){
      const [a,b,c] = win[i]
      if (state[a] && state[a] === state[b] && state[a] === state[c]){
        setWinningBlocks([a, b, c])
        return state[a] as 'X' | 'O'
      }
    }
    return null
  }

  const handleBlockClick = (index: number) => {
    if (winner || state[index] !== null) return

    const stateCopy = Array.from(state)
    stateCopy[index] = currentTurn

    setState(stateCopy)
    const win = checkWinner(stateCopy)
    if (win) {
      setWinner(win)
      // setTimeout(() => {
      //   alert(`${win} won`)
      //   resetGame()
      // }, 0)
      return
    }

    if(!stateCopy.includes(null)){
      setTimeout(() => {alert('It\'s a draw!')
        resetGame()
      }, 0)
      return
    }

    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X')
  }

  const resetGame = () => {
    setState(Array(9).fill(null))
    setCurrentTurn('X')
    setWinner(null)
    setWinningBlocks(null)
  }

  return (
    <div className='home'>
      <div className='heading'>
        <h1>Let's play<br></br>
        The Tic-tac-toe 
        Game!</h1>
        <div>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </div>
      <div className='board'>
        <div className='header'>
          <h2 className={`player-x ${currentTurn === 'X' ? 'active' : ''}`}>Player X</h2>
          <h2 className={`player-o ${currentTurn === 'O' ? 'active' : ''}`}>Player O</h2>
        </div>
        <div className="row1">
          <Block onClick={()=> handleBlockClick(0)} value={state[0]} isWinningBlock={winningBlocks?.includes(0)}/>
          <Block onClick={()=> handleBlockClick(1)} value={state[1]} isWinningBlock={winningBlocks?.includes(1)}/>
          <Block onClick={()=> handleBlockClick(2)} value={state[2]} isWinningBlock={winningBlocks?.includes(2)}/>
        </div> 
        <div className="row2">
          <Block onClick={()=> handleBlockClick(3)} value={state[3]} isWinningBlock={winningBlocks?.includes(3)}/>
          <Block onClick={()=> handleBlockClick(4)} value={state[4]} isWinningBlock={winningBlocks?.includes(4)}/>
          <Block onClick={()=> handleBlockClick(5)} value={state[5]} isWinningBlock={winningBlocks?.includes(5)}/>
        </div>
        <div className="row3">
          <Block onClick={()=> handleBlockClick(6)} value={state[6]} isWinningBlock={winningBlocks?.includes(6)}/>
          <Block onClick={()=> handleBlockClick(7)} value={state[7]} isWinningBlock={winningBlocks?.includes(7)}/>
          <Block onClick={()=> handleBlockClick(8)} value={state[8]} isWinningBlock={winningBlocks?.includes(8)}/>
        </div>
      </div>
    </div>
  );
}

export default App;
