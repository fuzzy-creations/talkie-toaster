import React, { Component } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import Pipe from './parts/FlappyToastPipe';
import styles from '../sass/ToasterFlappyToast.module.scss';
import { addNewScore } from '../firebase/firebase' 

const birdRadius = 20;

class App extends Component {

  getInitialPipes() {
    const count = 3;
    const pipes = [];
    for (let i = 1; i < count; i++) {
      const x = window.innerWidth + (window.innerWidth / i);
      pipes.push({
        upperPipeHeight: (window.innerHeight / 2) - ((Math.random() * 100) + 40),
        bottomPipeHeight: (window.innerHeight / 2) - ((Math.random() * 100) + 40),
        x: x
      })
    }
    return pipes;
  }

  constructor(props) {
    super(props);
    this.state = {
      birdHeight: window.innerHeight / 2,
      left: 350,
      gravity: 0.8,
      velocity: 0,
      pipes: this.getInitialPipes(),
      pipeSpeed: 7, 
      count: 0,
      highScore: 0,
      gameOver: false, 
      submittingScore: false,
      userName: "",
      status: "", 
      submitSent: false
    }
    this.moveUp = this.moveUp.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 15);
    this.counter = setInterval(() => {this.setState({count: this.state.count + 1})}, [100])
    

  }

  update() {
    const birdCrashed = this.state.birdHeight > window.innerHeight - birdRadius * 2;
    if(birdCrashed){
      if(this.state.count > this.state.highScore){
        this.setState({highScore: this.state.count})
      }
      this.setState({ gameOver: true })
      clearInterval(this.counter)
      clearInterval(this.interval);
      return;
    }

    const pipeWasHit = this.state.pipes.find(pipe => pipe.isHit)
    
    if(pipeWasHit){
      if(this.state.count > this.state.highScore){
        this.setState({highScore: this.state.count})
      }
      this.setState({ gameOver: true })
      if(this.state.count > 1000){
        this.props.stageStatus()
      }
      clearInterval(this.counter)
      clearInterval(this.interval);
      return;
    } 

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;
    const birdHeight = newVelocity + this.state.birdHeight;
    const newPipes = this.state.pipes.map(pipe => {
      const newX = pipe.x - this.state.pipeSpeed
      if (newX < 0) {
          return {
              upperPipeHeight: (window.innerHeight / 2) - ((Math.random() * 110) + 20),
              bottomPipeHeight: (window.innerHeight / 2) - ((Math.random() * 110) + 20),
              x: window.innerWidth - 40
        }
      } else {
        let isHit = false;
        const xDifference = (this.state.left - pipe.x)
        const hitOnX = xDifference < 10 && xDifference > 0;
        const hitOnUpperY = birdHeight < pipe.upperPipeHeight;
        const hitOnLowerY = birdHeight + birdRadius > (window.innerHeight - pipe.bottomPipeHeight)
        if ((hitOnUpperY || hitOnLowerY) && hitOnX) {
          isHit = true
        } 

        return {
          ...pipe,
          x: newX,
          isHit: isHit
        }
      }
    })
    this.setState({
      velocity: newVelocity,
      birdHeight: birdHeight,
      pipes: newPipes
    })
  }



  moveUp(e) {
    this.setState({
      velocity: this.state.velocity - 25
    })
  }

  resetGame() {
    this.setState({pipes: this.getInitialPipes()})
    this.setState({count: 0})
    this.setState({gameOver: false})
    this.setState({birdHeight: window.innerHeight / 2})
    this.setState({submittingScore: false})
    this.setState({submitSent: false})
    this.interval = setInterval(() => this.update(), 15);
    this.counter = setInterval(() => {this.setState({count: this.state.count + 1})}, [100])
    }

  handleKeyPress(e) {
    console.log(e)
    if(e.key === "s"){
      this.resetGame()
      }
    }




  render() {
    const left = this.state.left;
    const birdHeight = this.state.birdHeight;

    const submitHandler = () => {
      if(this.state.userName.length >= 3 && this.state.userName.length <= 10){
         addNewScore(this.state.userName, "flappytoast", this.state.highScore).then(() => {
            this.setState({submitSent: true})
             this.setState({status: "Success"})
         })
      } else {
          this.setState({status: "Name must be between 3 and 10 characters"})
          setTimeout(() => {
              this.setState({status: ""})
          }, [3000])
      }

  }

  const submit = this.state.submitSent ? null : <div className={styles.gameOver__btn__1} onClick={() => submitHandler()}>Submit</div>;

  const finishedOptions = this.state.submittingScore ? (
      <>
      <input className={styles.gameOver__input} type="text" placeholder="Name" onChange={(e) => this.setState({userName: e.target.value})} />
      {submit}
      <div className={styles.gameOver__btn__1} onClick={() => this.resetGame()} tabIndex="0">Restart</div>
      <div className={styles.gameOver__btn__1} onClick={() => this.props.changeStage(10)}>Leave</div>
      {this.state.status}
      </>
  ) : (
      <>
      <div className={styles.gameOver__btn__1} onClick={() => this.resetGame()} tabIndex="0">Restart</div>
      <div className={styles.gameOver__btn__1} onClick={() => this.setState({submittingScore: true})}>Submit Score</div>
      <div className={styles.gameOver__btn__1} onClick={() => this.props.changeStage(10)}>Leave</div>
      </>
  )

    const gameOverMenu = this.state.gameOver ? (
    <div className={styles.gameOver}>
      <div className={styles.gameOver__text}>Game Over</div>
      <div className={styles.gameOver__btn}>
        {finishedOptions}
      </div>
      <div className={styles.gameOver__score}>Score - {this.state.count}</div>
    </div>    
    ) : null;

    return (
      <div className={styles.container} >
        {gameOverMenu}
        <div className={styles.game__top}>
          <span className={styles.game__top__text}>Press "S" to fly</span>
        </div>
        <KeyHandler keyEventName={KEYPRESS} keyValue="s" onKeyHandle={this.moveUp} />
        <div style={{ left: left, top: birdHeight, position: 'absolute' }}>
          <div r={birdRadius} className={styles.toast}></div>
        </div>
        {this.state.pipes.map(pipe => {
          const upperPipeHeight = pipe.upperPipeHeight;
          const x = pipe.x;
          const bottomPipeTop = window.innerHeight - pipe.bottomPipeHeight;
          const bottomPipeHeight = pipe.bottomPipeHeight;
          return <Pipe key={x} isHit={pipe.isHit} upperPipeHeight={upperPipeHeight} bottomPipeHeight={bottomPipeHeight} x={x} bottomPipeTop={bottomPipeTop} />
        })}
       <div className={styles.game__bottom}>
        <span className={styles.game__bottom__text}>Distance - {this.state.count}</span> 
        <span className={styles.game__bottom__text}>Best - {this.state.highScore}</span> 
       </div>
      </div>
    );
  }
}

export default App;