import React, { useState, useEffect } from "react";
import Cell from "./parts/LightsOutCell";
import styles from '../sass/ToasterLightsOut.module.scss';
import { addNewScore } from '../firebase/firebase' 

function ToasterLightsOut(props){
    const [nrows, setNrows] = useState(5)
    const [ncols, setNcols] = useState(5)
    const [chanceLightStartsOn, setChanceLightStaysOn] = useState(0.25)
    const [hasWon, setHasWon] = useState(false)
    const [board, setBoard] = useState([[true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true], [true, true, true, true, true]])

    const [count, setCount] = useState(0)

    const [victoryToast, setVictoryToast] = useState()
    const [victoryMenu, setVictoryMenu] = useState(false)
    const [submittingScore, setSubmittingScore] = useState(false);
    const [userName, setUserName] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        setBoard(createBoard())
    }, [])

    const createBoard = () => {
        let newBoard = [];
        for (let y = 0; y < nrows; y++) {
          let row = [];
          for (let x = 0; x < ncols; x++) {
            row.push(Math.random() < chanceLightStartsOn);
          }
          newBoard.push(row);
        }
        return newBoard;
      }


      
      const flipCellsAround = (coord) => {
          var flipBoard = board;
          let [y, x] = coord.split("-").map(Number);
          
          function flipCell(y, x) {
              if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                  flipBoard[y][x] = !flipBoard[y][x];
                }
            }

        flipCell(y, x); //Flip initial cell
        flipCell(y, x - 1); //flip left
        flipCell(y, x + 1); //flip right
        flipCell(y - 1, x); //flip below
        flipCell(y + 1, x); //flip above
    
        let newHasWon = flipBoard.every(row => row.every(cell => !cell));
        setBoard(flipBoard)
        setCount(count + 1)
        if(newHasWon){victoryInit()}
      }

      console.log(count)


    const makeTable = () => {
            let tblBoard = [];
            for (let y = 0; y < nrows; y++) {
            let row = [];
            for (let x = 0; x < ncols; x++) {
                let coord = `${y}-${x}`;
                row.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)} />);
            }
            tblBoard.push(<tr key={y}>{row}</tr>);
            }
            return (
            <table className={styles.lightsout__board}>
                <tbody>{tblBoard}</tbody>
            </table>
            );
        }

    makeTable()

    
    function victoryInit(){
      /// if anyone ever sees this, don't judge me
      setVictoryToast(<div className={styles.victory}></div>);
      setTimeout(() => {
        setVictoryToast(<div className={styles.victory}><div className={styles.victory__speech}>Woah!</div></div>);
      }, [3000])
      setTimeout(() => {
        setVictoryToast(<div className={styles.victory}><div className={styles.victory__speech}>You did it!</div></div>);
      }, [5000])
      setTimeout(() => {
        setVictoryToast(<div className={styles.victory}><div className={styles.victory__speech}>Woooooooooooooooooooo!</div></div>);
      }, [10000])
      setTimeout(() => {
        setVictoryToast(<div className={styles.victory}></div>);
      }, [15000])
      setTimeout(() => {
        setVictoryMenu(true);
        props.stageStatus()
      }, [20000])
     
    }

    const submitHandler = () => {
      if(userName.length >= 3 && userName.length <= 10){
         addNewScore(userName, "toastout", count).then(() => {
             setStatus("Success")
         })
      } else {
          setStatus("Name must be between 3 and 10 characters")
          setTimeout(() => {
              setStatus("")
          }, [3000])
      }

  }


  const finishedOptions = submittingScore ? (
      <>
      <input className={styles.gameOver__input} type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
      <div className={styles.gameOver__btn__1} onClick={() => submitHandler()}>Submit</div>
      <div className={styles.gameOver__btn__1} onClick={() => props.changeStage(10)}>Exit</div> 
      {status}
      </>
  ) : (
      <>
      <div className={styles.gameOver__btn__1} onClick={() => setSubmittingScore(true)}>Submit score</div>
      <div className={styles.gameOver__btn__1} onClick={() => props.changeStage(10)}>Exit</div> 
      </>
  )
    
    const finish = victoryMenu ? (
       <div className={styles.gameOver}>
          <div className={styles.gameOver__text}>You won!</div>
          <div className={styles.gameOver__btn}>
           {finishedOptions}
          </div>
          <div className={styles.gameOver__score}>Score - {count}</div>
      </div>
      ) : null;

  

      return (
        <div>
          {finish}
            <div className={styles.lightsout}>
              <div className={styles.lightsout__header} onClick={() => victoryInit()}>
                <div className={styles.lightsout__title}>ToastOut</div>
                <div className={styles.lightsout__count}>Turns {count}</div>
                <div className={styles.lightsout__text}>Pressing any of the lights will toggle it and the adjacent lights. The goal of the puzzle is to switch all the lights off</div>
              </div>
              {makeTable()}
              <div className={styles.lightsout__button} onClick={() => props.changeStage(10)}><span className={styles.lightsout__button__text}>Leave</span></div>
            </div>
            {victoryToast}
        </div>

      )
}

export default ToasterLightsOut;
