import React,{Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
export default class CreateUser extends Component{
    constructor(props){
        super(props)

        this.onChangeusername = this.onChangeusername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            username : ''
        }
    }


    componentDidMount(){
        
        this.setState({
            username: ''
        })
        console.log(this.state.username)
    }

    onChangeusername(event){
        this.setState({
            username: event.target.value
        })
    }

    async onSubmit(event){
        event.preventDefault()

        const userdet = {
            username: this.state.username
        }

        try{
            let response = await axios.post('/users/add',userdet,
            {
                headers: {'Content-Type': 'application/json'}
            })
            console.log(response.data)
        }
        catch(err){
            console.log(err.response.data)
        }
        window.location= '/'
    }

    render(){
        
        return(
            <div>
             <h2>Create New User</h2>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>New Username</label>
                <input type="text" className="form-control" id="form12" class="form-control" placeholder='Type User name' value={this.state.username} onChange={this.onChangeusername}/>     
            </div>
            <br />
            <div className='form-group'>
                <input type="submit" value="Create user" className="btn btn-primary" />
            </div>
            </form>   
            </div>
        )
    }
};

