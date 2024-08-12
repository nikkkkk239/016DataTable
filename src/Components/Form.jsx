import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Helpers/Context'

function Form() {
  const {state,dispatch}=useContext(userContext)
  const [name,setName]=useState('')
  const [age,setAge]=useState('')
  const [gender,setGender]=useState('')

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(name!='' && age!='' && gender!=''){
      dispatch({type:'ADDUSER',payload:{name,age,gender}})
      if(state.users.length==1){
        dispatch({type:'setPageTo1'})
      }
      setName('')
      setAge('')
      setGender('')
    }
  }

  useEffect(()=>{
    localStorage.setItem('users',JSON.stringify(state))
    console.log(state)
  },[state])
  return (
    <div >
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'5px'}}>
        <div style={{display:'flex',gap:'5px'}}>
        <input type="text" name="" style={{padding:'5px'}} placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}  id="" />
        <input type="text" name="" style={{padding:'5px'}} placeholder='Age' value={age} onChange={(e)=>{setAge(e.target.value)}}  id="" />
        <input type="text" name="" style={{padding:'5px'}} placeholder='Gender' value={gender} onChange={(e)=>{setGender(e.target.value)}} id="" />
        </div>
        <button style={{width:'20%',marginLeft:'250px'}} type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form