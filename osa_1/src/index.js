
/* Sama kuin index_1.12-1.14.js -tiedosto */

import React from 'react';
import ReactDOM from 'react-dom';


const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>
        {text}
    </button>
)

const MaxAnecdote = (props) => {
    const MaxInd = [0]
    for (let i = 0; i <props.anecdotes.length; i++) {
        if(props.votes[i] === props.maxValue) {
            MaxInd[0] = i
        }
    }
   
    return (
    <div>
        <p>
            {props.anecdotes[MaxInd[0]]} <br/>
            has {props.maxValue} votes
        </p>
     </div>
    )
    }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes : {
          0:0,
          1:0,
          2:0,
          3:0,
          4:0,
          5:0},
      maxValue : 0
    }
  }

  giveRespond = (value) => () => this.setState({selected :value})
  getRandom = (max, min) =>  Math.floor(Math.random() * (max - min) ) + min

  giveVote = (selected) => () => {
    const copyVotes = {...this.state.votes} 
    copyVotes[selected] +=1

    const votesList = []
    for (let key in copyVotes) {
        votesList.push(copyVotes[key])
    }
    const max = Math.max.apply(null, votesList)

    return (
        this.setState({votes: copyVotes, maxValue : max})
      )
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]} <br/>
        has {this.state.votes[this.state.selected]} votes <br/>
        <Button
            handleClick =  {this.giveVote(this.state.selected)}
            text = "vote"
        />

        <Button
            handleClick =  {this.giveRespond(this.getRandom(6,0))}
            text = "next anecdote"
        />

        <h1> anecdote with most votes: </h1>
        <MaxAnecdote 
            anecdotes = {this.props.anecdotes}
            votes = {this.state.votes}
            maxValue = {this.state.maxValue}
        />

      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

