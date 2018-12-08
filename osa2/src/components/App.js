/* Tehtävään 2.6 -2.10 */

import React from 'react';
import personService from './persons.js'


const Person = ({person, onClick}) => {
  return (
    <tr>
        <td width="40%">{person.name}</td>
        <td width="40%">{person.number}</td>
        <td width="40%"> <button onClick={onClick}>Poista</button> </td>
    </tr>
  )
}


const Filterform = ({value, onChange}) => {
  return (
    <form>
      <div>
          rajaa näytettäviä
      <input 
          value = {value}
          onChange = {onChange}/>
      </div>
  </form>
  )
}

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className = 'message'>
    {message}
    </div>
  )
}




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '', 
      filter:'',
      message:''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }



  addPerson = (event) => {
    event.preventDefault()

    const isInList = [0]
    
    for (let i = 0; i <this.state.persons.length; i++) {
        if(this.state.persons[i].name === this.state.newName) {
          isInList[0] = 1
          break;
        }
    }

    
    if(isInList[0] === 1) {
      if (window.confirm(this.state.newName + ' on jo luettelossa, korvataanko vanha numero uudella?')) {
        const samePerson = this.state.persons.find(p => p.name === this.state.newName)
        const samePersonId = samePerson.id
        const changedPerson = {...samePerson, number: this.state.newNumber}

        personService
          .update(samePersonId, changedPerson)
          .then(response => {
            this.setState({
              persons: this.state.persons.map(p => p.id !== samePersonId ? p : response ),
              message: 'Muutettiin numeroa henkilölle ' + samePerson.name
            })
          })
          .catch(error => {
            alert('Henkilö ' + samePerson.name + ' on jo poistettu listasta, joten muuttaminen ei onnistu. Päivitä selain ja lisää ' + samePerson.name + ' listaan.' )
          })

        setTimeout(() => {
          this.setState({message: null})
        }, 2000)

        }

      this.setState({
        newName:'',
        newNumber:''
      })

    }   
    
    else {
      const personObject = {
        name : this.state.newName,
        number : this.state.newNumber
      }

      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons : this.state.persons.concat(newPerson),
            newName:'',
            newNumber:'',
            message: 'Lisättiin ' + newPerson.name
        })
    })

      setTimeout(() => {
        this.setState({message: null})
      }, 2000)

  }
  }

  removeObject = (person) => {
    return () => {
      if (window.confirm('Poistetaanko ' + person.name + '?')) {
        personService
          .remove(person.id)
          .then(response => {
            console.log(response)
            this.setState({
              persons: this.state.persons.filter(personFilt => personFilt.id !== person.id),
              message: 'Poistetttiin ' + person.name 
            })
        })

        setTimeout(() => {
          this.setState({message: null})
        }, 2000)

        }
      }
    }

  handlePersonChange = (event) => {
    this.setState({newName:event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filter : event.target.value})
  }


  render() {
    const personsToShow = 
      this.state.filter ? 
        this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase())):
        this.state.persons
    

    return (
      <div>

      <h1>Puhelinluettelo</h1>

      <Notification message = {this.state.message} />

      <Filterform value = {this.state.filter} onChange = {this.handleFilterChange} />


        <h2>Lisää uusi</h2>

        <form onSubmit = {this.addPerson}>
          <div>
            nimi: 
            <input 
            value = {this.state.newName}
            onChange = {this.handlePersonChange}/>
          </div>

          <div>
            numero:
            <input 
            value = {this.state.newNumber}
            onChange = {this.handleNumberChange} />
          </div>

          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <table>
          <tbody>
            {personsToShow.map(person => <Person key = {person.name} person = {person} onClick = {this.removeObject(person)} />)}
          </tbody>
        </table>

      </div>
    )
  }
}

export default App