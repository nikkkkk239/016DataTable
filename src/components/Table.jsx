import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Helpers/Context'
import Page from './Page'
import { nanoid } from 'nanoid'
function Table() {
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
    const {state,dispatch}=useContext(userContext)
    const [count,setCount]=useState(0)
    const [pageArr,setPageArr]=useState([])
    const [searchName,setSearchName]=useState('')
    const [searchMode,setSearchMode]=useState(false)
    useEffect(()=>{
        if(state.users.length==1 && state.users[0]==[] ){
            setCount(0)
        }
        else{
            setCount(state.users.length)
        }
    },[state])
    useEffect(()=>{
        if(state.users.length==1 && state.users[0]==[] ){
            setCount(0)
        }
        else{
            setCount(state.users.length)
        }
        let arr=[]
        for (let i=1;i<=count;i++){
            arr.push(i)
        }
        setPageArr(arr)
    },[])
    useEffect(()=>{
        let arr=[]
        for (let i=1;i<=count;i++){
            arr.push(i)
        }
        setPageArr(arr)
    },[count])

    const handlePageChange=(page)=>{
        dispatch({type:'pageChange',payload:{page}})
    }
    const handleKeyDown=(e)=>{
        if(e.keyCode==13){
            setSearchMode(true)
            console.log('serach')
        }else{
            setSearchMode(false)
        }
    }
    
    
    
  return (
    <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'10px'}}>
        <input type="text" placeholder='search' style={{width:'20%',padding:'5px'}} value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} onKeyDown={handleKeyDown}/>
        
            {!searchMode ?
                state.users && <table border={'1px solid black'} >
                <tbody style={{width:'100%'}}>
                    <tr style={{backgroundColor:'white',color:'black',display:'flex',width:'100%'}}>
                        <th style={{flex:'1',padding:'5px'}}>Name</th>
                        <th style={{flex:'1',padding:'5px'}}>Gender</th>
                        <th style={{flex:'1',padding:'5px'}}>Age</th>
                        <th style={{flex:'1',padding:'5px'}}>Actions</th>
                    </tr>
                    {
                        state.users.map((s,i)=>{
                            if(i==state.currentPage-1){
                                return <Page key={i+1} arrOfUsers={s}/>
                            }
                        })
                    }
                </tbody>
            </table> :
                <table border={'1px solid black'} >
                    <tbody style={{width:'100%'}}>
                        <tr style={{backgroundColor:'white',color:'black',display:'flex',width:'100%'}}>
                            <th style={{flex:'1',padding:'5px'}}>Name</th>
                            <th style={{flex:'1',padding:'5px'}}>Gender</th>
                            <th style={{flex:'1',padding:'5px'}}>Age</th>
                            <th style={{flex:'1',padding:'5px'}}>Actions</th>
                        </tr>
                        {
                            state.users.map((s,i)=>{
                                return s.map((usop,j)=>{
                                    if(usop.name==searchName){
                                        console.log('bc')
                                        console.log(usop)
                                        return <tr key={j} style={{width:'100%',display:'flex'}}>
                                        <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{usop.editable ? <input type='text' value={newName} onChange={(e)=>{setNewName(e.target.value)}}/> : usop.name}</td>
                                        <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{usop.editable ? <input type='text' value={newGender} onChange={(e)=>{setNewGender(e.target.value)}}/> : usop.gender}</td>
                                        <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{usop.editable ? <input type='text' value={newAge} onChange={(e)=>{setNewAge(e.target.value)}}/> : usop.age}</td>
                                        <td style={{flex:1,padding:'5px',display:"flex",justifyContent:'center'}}>{usop.editable ? <button onClick={()=>handleSave(usop.id)}>save</button> : <button onClick={()=>handleEdit(usop.id,usop.name,usop.age,usop.gender)}>edit</button>}<button onClick={()=>handleDelete(usop.id)}>Delete</button></td>
                                      </tr>
                                    }
                                })
                            })
                        }
                    </tbody>
                </table>
            
            }
            <div style={{display:'flex',gap:'40px',justifyContent:'center',marginTop:'10px'}}>
                {!searchMode ? pageArr.map((page)=>{
                    return <div key={page} style={state.currentPage == page ?{border:'1px solid white',padding:'5px',backgroundColor:'white',color:'black'} :{border:'1px solid white',padding:'5px',cursor:'pointer'}} onClick={()=>handlePageChange(page)}>{page}</div>
                }) : <div style={{border:'1px solid white',padding:'5px',backgroundColor:'white',color:'black'}} >1</div>}
            </div>
        
    </div>
  )
}

export default Table