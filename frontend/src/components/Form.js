import React, { useState, useEffect } from 'react'
import APIService from './APIService'
function Form(props) {
   const [name, setname] = useState('')
   const [rollNo, setrollNo] = useState('')
   const [email, setemail] = useState('')
   
   useEffect(() => {
     setname(props.student.name)
     setrollNo(props.student.rollNo)
     setemail(props.student.email)
   }, [props.student])
   
   const updateStudent = () => {
        APIService.UpdateStudent(props.student.id, {name,rollNo,email})
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
   }

   const insertStudent = () => {
         APIService.InsertStudent({name,rollNo,email})
         .then(resp => props.insertedStudent(resp))
         .catch(error => console.log(error))
   }
  
    return (
    <div>
       {props.student ? (

        <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name</label>
            <input type="text" className='form-control'
            value={name} placeholder='Enter Name'
            onChange={(e) => setname(e.target.value)}/>


            <label htmlFor='rollNo' className='form-label'>Roll No</label>
            <input type="number" className='form-control'
             value={rollNo} placeholder='Enter Roll No'
             onChange={(e) => setrollNo(e.target.value)}/>


            <label htmlFor='email' className='form-label'>Email</label>
            <input type="text" className='form-control'
             value={email} placeholder='Enter Email'
             onChange={(e) => setemail(e.target.value)}/>



            {
              props.student.id ?  <button onClick={updateStudent} className="btn btn-success mt-3">Update</button>
              :
              <button onClick={insertStudent} className="btn btn-success mt-3">Insert</button>
            }
            
        </div>
       ): null}
       
       

        </div>
       
   
  )
}

export default Form
