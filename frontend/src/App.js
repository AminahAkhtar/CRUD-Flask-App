import './App.css';
import {useState, useEffect} from 'react';
import StudentList from './components/StudentList';
import Form from './components/Form';
function App() {

  const [students, setstudents] = useState([])
  const [editedstudent, setEditedstudent] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get',{
      'method':'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setstudents(resp))
    .catch(error => console.log(error))
  },[])

  const editStudent = (student) => {
    setEditedstudent(student)
  }

  const updatedData = (student) => {
    const new_student = students.map(my_student => {
      if(my_student.id === student.id){
        return student
      }
      else{
        return my_student
      }
    })
    setstudents(new_student)
  }

  const openForm = () => {
    setEditedstudent({name:'',rollNo:'',email:''})
  }

  const insertedStudent = (student) => {
    const new_students = [...students, student]
    setstudents(new_students)
  }

  const deleteStudent = (student) => {
    const new_students = students.filter(mystudent => {
      if(mystudent.id === student.id){
        return false
      }
      return true
    })

    setstudents(new_students)
  }
  return (
    <div className="App">
      <div className="row">
        <div className="col">
        <h1>Student Details</h1>
        </div>
        <div className="col">
        <button className='btn btn-success' onClick={openForm}>
            Insert
        </button>
        </div>

      </div>
      
      <StudentList students = {students} editStudent = {editStudent} deleteStudent= {deleteStudent}/>
     {editedstudent ? <Form student = {editedstudent} updatedData = {updatedData} insertedStudent = {insertedStudent} /> : null }
     
    </div>
  );
}

export default App;
