import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Helpers/Context'
import Page from './Page'
import { nanoid } from 'nanoid'
function Table() {
    const {state,dispatch}=useContext(userContext)
    const [count,setCount]=useState(0)
    const [pageArr,setPageArr]=useState([])
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
    
    
  return (
    <div style={{width:'100%',display:'flex',flexDirection:'column',gap:'10px'}}>
        <input type="text" placeholder='search' style={{width:'20%',padding:'5px'}} />
        
            {
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
            </table>
            }
            <div style={{display:'flex',gap:'40px',justifyContent:'center',marginTop:'10px'}}>
                {pageArr.map((page)=>{
                    return <div key={page} style={state.currentPage==page ?{border:'1px solid white',padding:'5px',backgroundColor:'white',color:'black'} :{border:'1px solid white',padding:'5px',cursor:'pointer'}} onClick={()=>handlePageChange(page)}>{page}</div>
                })}
            </div>
        
    </div>
  )
}

export default Table