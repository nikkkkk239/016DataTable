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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="" placeholder='Name' value={name} onChange={(e)=>{setName(e.target.value)}}  id="" />
        <input type="text" name="" placeholder='Age' value={age} onChange={(e)=>{setAge(e.target.value)}}  id="" />
        <input type="text" name="" placeholder='Gender' value={gender} onChange={(e)=>{setGender(e.target.value)}} id="" />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form