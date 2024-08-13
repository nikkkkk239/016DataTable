import { nanoid } from "nanoid";
import { createContext, useReducer } from "react";
//  [[{},{},{},{},{}],[{},{}]]
export const userContext=createContext()
export const UserContextProvider=({children})=>{
    
    const reducer=(state,action)=>{
        switch (action.type){
            case 'setPageTo1':
                return {
                    ...state,
                    currentPage:1
                }
            case 'pageChange':
                return {
                    ...state,
                    currentPage:action.payload.page
                }
                case 'ADDUSER':
                    // Create a new users array with updated data
                    const newUsers = state.users.map((subArray, index) => {
                        if (subArray.length < 5) {
                            // Add the new user to the first sub-array that is not full
                            return [
                                ...subArray,
                                {
                                    name: action.payload.name,
                                    age: action.payload.age,
                                    gender: action.payload.gender,
                                    editable: false,
                                    id: nanoid()
                                }
                            ];
                        }
                        return subArray;
                    });
        
                    // If all sub-arrays are full, create a new sub-array
                    if (newUsers.every(subArray => subArray.length === 5)) {
                        newUsers.push([
                            {
                                name: action.payload.name,
                                age: action.payload.age,
                                gender: action.payload.gender,
                                editable: false,
                                id: nanoid()
                            }
                        ]);
                    }
        
                    return {
                        ...state,
                        users: newUsers
                    };
            // case 'ADDUSER':
            //     console.log(state)
            //     let addedArr= state.users.map((s,i)=>{
            //         if(s.length<5){
            //             console.log('if statement.')
            //             s.push({
            //                 name:action.payload.name,
            //                 age:action.payload.age,
            //                 gender:action.payload.gender,
            //                 editable:false,
            //                 id:nanoid()
            //             })
            //             return s
            //         }
            //         else if(s.length == 5 && i == state.users.length-1){
            //             console.log('elseif1 statement.')
            //             let arr=[]
            //             arr.push({
            //                 name:action.payload.name,
            //                 age:action.payload.age,
            //                 gender:action.payload.gender,
            //                 editable:false,
            //                 id:nanoid()
            //             })
            //             return state.users.push(arr)
            //         }
            //         else if(s.length==5 ){
            //             console.log('elseif2 statement.')
            //             return s
            //         }
                    
            //     })
            //     return {
            //         ...state,
            //         users:addedArr
            //     }
            case 'DELETEUSER':
                let deletedArr=state.users.map((s,i)=>{
                    return s.filter((sakoon)=>{
                        return sakoon.id!=action.payload.deleteId
                    })
                })
                return {
                    ...state,
                    users:deletedArr
                }
            case 'EDITUSER':
                let editedArr= state.users.map((s)=>{
                    return s.map((sakoon)=>{
                        if(sakoon.id==action.payload.editId){
                            return {
                                ...sakoon,editable:true
                            }
                        }
                        return sakoon
                    })
                })
                return {
                    ...state,
                    users:editedArr
                }
            case 'UPDATEUSER':
                let updatedArr = state.users.map((s)=>{
                    return s.map((sakoon)=>{
                        if(sakoon.id==action.payload.updateId){
                            return {
                                name:action.payload.newName,
                                age:action.payload.newAge,
                                gender:action.payload.newGender,
                                id:action.payload.updateId,
                                editable:false
                            }
                        }
                        return sakoon
                    })
                })
                return {
                    ...state,
                    users:updatedArr
                }
            default :
                return state
        }
    }
    const [state,dispatch]=useReducer(reducer,{users:[[]],currentPage:0},()=>{
        try {
            const local=localStorage.getItem('users')
            return local ? JSON.parse(local) : {users:[[]],currentPage:0}
        } catch (error) {
            console.log('mkc',error)
            return {users:[[]],currentPage:0}
        }
    })
    return <userContext.Provider value={{state,dispatch}}>
        {children}
    </userContext.Provider>
}