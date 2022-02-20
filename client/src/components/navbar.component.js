import React,{Component} from 'react'
//import { BrowserRouter as Router,Route } from 'react-router-dom'
import {Link} from 'react-router-dom'
export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Ex-Tracker</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Exercises</Link>
                </li>
                <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Exercise Log</Link>
                </li>
                <li className="navbar-item">
                <Link to="/user" className="nav-link">Create User</Link>
                </li>
                </ul>
                </div>
      </nav>
        )
    }
}

