import React, { useEffect, useReducer, useState } from 'react'
import { initialState, userReducer } from '../Helper/Reducer'

function Form() {
    const [users,setUsers]=useState([])
    const [data,dispatch]=useReducer(userReducer,initialState)
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const [gender,setGender]=useState('')
    const addUserToTable=async(e)=>{
        e.preventDefault()
        dispatch({type:'addUser',payload:{name,age,gender}})
        setUsers(data)
        setAge('')
        setGender('')
        setName('')
    }

  return (

    <div>
        <form onSubmit={addUserToTable}>
            <div>
                <input type="text" name="" placeholder='Name' id="" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <input type="text" name="" placeholder='Gender' id="" value={gender} onChange={(e)=>{setGender(e.target.value)}}/>
                <input type="text" name="" placeholder='age' id="" value={age} onChange={(e)=>{setAge(e.target.value)}}/>
            </div>
            <button type='submit'>ADD</button>
        </form>
        {users && users.map((user)=>{
            return <div key={user.id}>{user.name}</div>
        })}
        {}
    </div>
  )
}

export default Form