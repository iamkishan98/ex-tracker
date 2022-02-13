import React,{Component} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import {withRouter} from 'react-router'


export default class CreateExercise extends Component{
    
    constructor(props){
        
        super(props)
        console.log("In constructor")

        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : '',
            description:'',
            duration:0,
            date: new Date(),
            users : []
        }
    }

    componentDidMount(){
        console.log("component mounted")

        const getusers = async ()=> {

            const result = await axios.get('/users/',{
                headers : { 'Content-Type': 'application/json'}
            })
            
            console.log(result.data)

            this.setState({
                users : result.data.map( user => user.username),
                username: result.data[0].username
            })
        }
        getusers()
    }

    onChangeUsername(event){
        this.setState({
            username : event.target.value
        })
    }

    onChangeDescription(event){
        this.setState({
            description: event.target.value
        })
    }

    onChangeDuration(event){
        this.setState({
            duration: event.target.value
        })
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onSubmit(event){
        
        event.preventDefault()

        const newex = {
            username : this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(newex)

        axios.post('/exercises/add',newex,
        {
            headers : {'Content-Type': 'application/json' }
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err.response.data))

        //console.log(response.data)

        //window.location = '/';
    }

    render(){
        
        return(
            <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
};

//export default withRouter(CreateExercise)