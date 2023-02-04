/* eslint-disable */
import { configureStore, createSlice } from "@reduxjs/toolkit";

let cartData = createSlice({
    name: 'cartData',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action){ // (state)는 기존 state
            let number = state.findIndex((a)=>{return a.id === action.payload})
            state[number].count++ 
        },
        minusCount(state, action){ // (state)는 기존 state
            let number = state.findIndex((a)=>{return a.id === action.payload})
            if( state[number].count > 0 ) {
                state[number].count-- 
            }
        },
        addItem(state, action){
            state.push(action.payload)
        },
    }
})

export let { addCount, minusCount, addItem } = cartData.actions

export default configureStore({
    reducer: {
        cartData: cartData.reducer
    }
})