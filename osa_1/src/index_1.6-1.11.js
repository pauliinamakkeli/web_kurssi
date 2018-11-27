/*


import React from 'react';
import ReactDOM from 'react-dom';


const Button = ({handeClick, text}) => (
    <button onClick = {handeClick}>
        {text}
    </button>
)


const Statistic = (props) => {
    return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
)}

const Statistics = (props) => {
    const average = ((props.good*1+props.neutral*0+props.bad*-1)/(props.good+props.neutral+props.bad)).toFixed(1)
    const positive = ((props.good / (props.good + props.neutral + props.bad))*100).toFixed(1) + "%"
    if (props.good + props.neutral + props.bad >0) {
        return (
            <div>
               <table>
                   <tbody>
                        <Statistic text = "hyvä" value = {props.good} />
                        <Statistic text = "neutraali" value = {props.neutral} />
                        <Statistic text = "huono" value = {props.bad} />
                        <Statistic text = "keskiarvo" value = {average} />
                        <Statistic text = "positiivisia" value = {positive} />
                    </tbody>
                </table>
            </div> 
            )}
        return (
            <div>
                ei yhtään palautetta annettu
            </div>
        )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good:0,
            neutral:0,
            bad:0
        }
    }

giveRespond = (name,value) => () => this.setState({[name] :value})

render() {

    return (
    <div>
        <h1>anna palautetta</h1>
        <Button
            handeClick =  {this.giveRespond("good", this.state.good +1)}
            text = "hyvä"
        />
        <Button
            handeClick =  {this.giveRespond("neutral",this.state.neutral +1)}
            text = "neutraali"
        />
        <Button
            handeClick =  {this.giveRespond("bad",this.state.bad +1)}
            text = "huono"
        />
        
        <h1>statistiikka</h1>
            <Statistics good = {this.state.good} neutral = {this.state.neutral} bad = {this.state.bad} />
    </div>
    )
}
}

ReactDOM.render(
<App />,
document.getElementById('root')
)

*/