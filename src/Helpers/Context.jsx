import { nanoid } from "nanoid";
import { createContext, useEffect, useReducer } from "react";

export const userContext=createContext([])
export const UserContextProvider=({children})=>{
    
    const reducer=(state,action)=>{
        switch (action.type){
            case 'ADDUSER':
                return [
                    ...state,{
                        name:action.payload.name,
                        age:action.payload.age,
                        gender:action.payload.gender,
                        editable:false,
                        id:nanoid()
                    }
                ]
            case 'DELETEUSER':
                return state.filter((s)=>{
                    return s.id != action.payload.deleteId
                })
            case 'EDITUSER':
                return state.map((s)=>{
                    if(s.id==action.payload.editId){
                        return {
                            ...s,editable:true
                        }
                    }
                    return s
                })
            case 'UPDATEUSER':
                return state.map((s)=>{
                    if(s.id==action.payload.updateId){
                        return {
                            name:action.payload.newName,
                            age:action.payload.newAge,
                            gender:action.payload.newGender,
                            id:action.payload.updateId,
                            editable:false
                        }
                    }
                    return s
                })
            default :
            return state
        }
    }
    const [state,dispatch]=useReducer(reducer,[],()=>{
        try {
            const local=localStorage.getItem('users')
            return local ? JSON.parse(local) : []
        } catch (error) {
            console.log('mkc',error)
            return []
        }
    })
    return <userContext.Provider value={{state,dispatch}}>
        {children}
    </userContext.Provider>
}