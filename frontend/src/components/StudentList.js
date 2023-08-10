import React from 'react'
import '../../src/App.css'
import APIService from './APIService'
function StudentList(props) {

  const editStudent = (student) => {
    props.editStudent(student)
  }

  const deleteStudent = (student) => {

     // eslint-disable-next-line no-restricted-globals
    if(confirm("Do you wish to delete?")){
      APIService.DeleteStudent(student.id)
      .then(() => props.deleteStudent(student)) 
    }
    else{
      return
    }

   
}
  return (
    <div>
       {props.students && props.students.map(student => {
        return (
          <div key = {student.id} id="main-div">
             <p>Student ID No: {student.id}</p>
             <p>Name: {student.name}</p>
             <p>Roll No: {student.rollNo}</p>
             <p>Email: {student.email}</p>
             <div className="row">
                <div>
                    <button className="btn btn-primary"   onClick = {() => editStudent(student)}>Update</button>           
                </div>
                <div>
                    <button className="btn btn-danger" onClick={() => deleteStudent(student)}>Delete</button>
                </div>
             </div>






          </div>
        )
      })}
    </div>
  )
}

export default StudentList
