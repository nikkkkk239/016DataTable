import React, { useContext, useReducer ,useState} from 'react'
import { userContext } from '../Helpers/Context'

function Page(props) {
  const {arrOfUsers}=props;
  const {state,dispatch}=useContext(userContext)
  const [newName,setNewName]=useState('')
  const [newAge,setNewAge]=useState('')
  const [newGender,setNewGender]=useState('')

  const handleSave=(id)=>{
    dispatch({type:'UPDATEUSER',payload:{newName,newAge,newGender,updateId:id}})
  }
  const handleEdit=(id,name,age,gender)=>{
      dispatch({type:'EDITUSER',payload:{editId:id}})
      setNewName(name)
      setNewAge(age)
      setNewGender(gender)
  }
  const handleDelete=(id)=>{
      dispatch({type:'DELETEUSER',payload:{deleteId:id}})
  }

  return (<>
      {arrOfUsers.map((s,i)=>{
        return <tr key={i} style={{width:'100%',display:'flex'}}>
          <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{s.editable ? <input type='text' value={newName} onChange={(e)=>{setNewName(e.target.value)}}/> : s.name}</td>
          <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{s.editable ? <input type='text' value={newGender} onChange={(e)=>{setNewGender(e.target.value)}}/> : s.gender}</td>
          <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{s.editable ? <input type='text' value={newAge} onChange={(e)=>{setNewAge(e.target.value)}}/> : s.age}</td>
          <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{s.editable ? <button onClick={()=>handleSave(s.id)}>save</button> : <button onClick={()=>handleEdit(s.id,s.name,s.age,s.gender)}>edit</button>}<button onClick={()=>handleDelete(s.id)}>Delete</button></td>
        </tr>
      })}
      </>
  )
}

export default Page