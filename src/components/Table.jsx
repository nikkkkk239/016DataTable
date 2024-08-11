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
    <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'10px'}}>
        <input type="text" placeholder='search' style={{width:'20%',padding:'5px'}} />
        {state!=[] && <table border={'1px solid black'} >
            <tbody>
                <tr style={{backgroundColor:'white',color:'black',display:'flex',width:'100%'}}>
                    <th style={{flex:'1',padding:'5px'}}>Name</th>
                    <th style={{flex:'1',padding:'5px'}}>Gender</th>
                    <th style={{flex:'1',padding:'5px'}}>Age</th>
                    <th style={{flex:'1',padding:'5px'}}>Actions</th>
                </tr>
                {
                    state.map((s)=>{
                        return <tr key={s.id} style={{display:'flex',width:'100%'}}>
                            <td style={{padding:'10px',flex:'1'}}>{s.editable? <input value={newName} style={{backgroundColor:'black',color:'white',border:'none',outline:'none',width:'100%',height:'100%'}} onChange={(e)=>{setNewName(e.target.value)}}/> : s.name}</td>
                            <td style={{padding:'10px',flex:'1'}}>{s.editable? <input value={newGender} style={{backgroundColor:'black',color:'white',border:'none',outline:'none',width:'100%',height:'100%'}} onChange={(e)=>{setNewGender(e.target.value)}}/> :s.gender}</td>
                            <td style={{padding:'10px',flex:'1'}} >{s.editable? <input value={newAge}  style={{backgroundColor:'black',color:'white',border:'none',outline:'none',width:'100%',height:'100%'}}onChange={(e)=>{setNewAge(e.target.value)}}/> :s.age}</td>
                            <td style={{padding:'10px',flex:'1'}}>{s.editable ? 
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