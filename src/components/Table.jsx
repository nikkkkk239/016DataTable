import React, { useContext, useState } from 'react'
import { userContext } from '../Helpers/Context'

function Table() {
    const {state,dispatch}=useContext(userContext)
    const [newName,setNewName]=useState('')
    const [newAge,setNewAge]=useState('')
    const [newGender,setNewGender]=useState('')
    const handleDelete=(id)=>{
        dispatch({type:'DELETEUSER',payload:{deleteId:id}})
    }
    const handleEdit=(id,name,age,gender)=>{
        dispatch({type:'EDITUSER',payload:{editId:id}})
        setNewName(name)
        setNewAge(age)
        setNewGender(gender)
    }
    const handleSave=(id)=>{
        dispatch({type:'UPDATEUSER',payload:{newName,newAge,newGender,updateId:id}})
    }
  return (
    <div>
        {state && <table border={'1px solid black'}>
            <tbody>
                <tr style={{backgroundColor:'white',color:'black'}}>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                {
                    state.map((s)=>{
                        return <tr>
                            <td>{s.editable? <input value={newName} onChange={(e)=>{setNewName(e.target.value)}}/> : s.name}</td>
                            <td>{s.editable? <input value={newGender} onChange={(e)=>{setNewGender(e.target.value)}}/> :s.gender}</td>
                            <td>{s.editable? <input value={newAge} onChange={(e)=>{setNewAge(e.target.value)}}/> :s.age}</td>
                            <td>{s.editable ? 
                                    <button onClick={()=>handleSave(s.id)}>save</button> 
                                    : <button onClick={()=>handleEdit(s.id,s.name,s.age,s.gender)}>edit</button>
                                }
                                <button onClick={()=>{handleDelete(s.id)}}>delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>}
    </div>
  )
}

export default Table