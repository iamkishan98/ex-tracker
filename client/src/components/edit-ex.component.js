import React from 'react'
import { useState,useMemo,useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

export default function EditExercise(props){

  let {id} = useParams();
  const [username,setusername] = useState('');
  const [description,setdescription] = useState('');
  const [duration,setduration] = useState(0);
  const [date,setdate] = useState(new Date());
  const [users,setusers] = useState(['test user']);

  const getex = async (id) =>{
    console.log(id)
    const res = await axios.get("/exercises/"+id,{
      headers : {'Content-Type': 'application/json'}
    })

    setusername(res.data.username)
    setdescription(res.data.description)
    setduration(res.data.duration)
    setdate(new Date(res.data.date))
  
    console.log(res.data)
  }

  useMemo(() => {
    console.log("In a constructor")
    console.log(id)
    getex(id)
  }, [  ])


  onsubmit = async (e) =>
  {
    e.preventDefault();

    console.log(id);
    const updateduser = {
      username : username,
      description : description,
      duration: duration,
      date : date
    };
    console.log(updateduser)
    
    try
    {
      let result = await axios.post('/exercises/'+id,updateduser,
      {
        headers:{ 'Content-Type' : 'application/json'}
      });

      if(result && result.data){
        console.log(result.data)
      }
    }
    catch(error)
    {
      console.log(error.data)
    }

    window.location ="/";
  }

  return(
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={onsubmit}>
        <div className='form-group'>
        <label>Username</label>
        <input type="text" required defaultValue={username} className='form-control'/>
        </div>
        <div className='form-group'>
            <label>Description</label>
            <input type="text" required className="form-control" value={description} onChange={(event) => {setdescription(event.target.value)}}/>
        </div>

        <div className='form-group'>
            <label>Duration</label>
            <input type="text" className='form-control' value={duration} onChange={ (event)=>{setduration(event.target.value)}}/>
        </div>
        <div className='form-group'>
          <label>Date</label>
          <div>
            <DatePicker selected={date} onChange={(date) => {setdate(date)}}/>
          </div>
        </div>
        <br />
        <div className='form-group'>
            <input type="submit" value="Edit Exercise" className="btn btn-primary"></input>
        </div>
      </form>
    </div>
  )

}