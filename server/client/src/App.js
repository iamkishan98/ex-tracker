import React from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/navbar.component'
import ExercisesList from './components/ex-list.component'
import EditExercise from './components/edit-ex.component'
import CreateExercise from './components/create-ex.component'
import CreateUser from './components/users.component'

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Routes>
      <Route path="/" exact element={<ExercisesList />} />
      <Route path="/edit/:id" element={<EditExercise />}/>
      <Route path="/create" element={<CreateExercise />} />
      <Route path="/user" element={<CreateUser />} />
      </Routes>
      </div>
      
      </Router>
  );
}

export default App;
