import { createSlice } from '@reduxjs/toolkit'

const initialState: CounterState = {
  item:[]
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addtocart: (state, action) => {
      state.item=[...state.item, action.payload];
    },
    removefromcart: (state, action) => {
     const index = state.item.findIndex(
       (item) => item.id === action.payload.id 
     );

     let newBasket = [...state.item];

     if(index >= 0){
        newBasket.splice(index, 1);
     }else{
        console.warn(
            `cant remove product {id: ${action.payload.id}} as its not in basket`
          );
     }
     state.item = newBasket;

    },
  },
})

// Action creators are generated for each case reducer function
export const { addtocart, removefromcart } = basketSlice.actions

export const selectBasket = (state) => state.basket.item;

export const selectBasketTotal =(state)=> state.basket.item.reduce((total, item)=>total += item.data.price, 0)

export default basketSlice.reducer