import { useReducer } from "react"
import {nanoid} from 'nanoid'
export const initialState=[]

export const userReducer=(state,action)=>{
    console.log('Entereed')
    switch (action.type){
        case 'addUser':
            return [...state,{
                    name:action.payload.name,
                    age:action.payload.age,
                    gender:action.payload.gender,
                    editable:false,
                    deleted:false,
                    id:nanoid()
                }
            ]
        

    }

}