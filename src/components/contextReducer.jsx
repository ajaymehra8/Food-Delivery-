import React, { createContext, useContext, useReducer } from 'react'

const CartStateContent=createContext();
const CartDispatchContent=createContext();

const reducer = (state, action) => {
  switch(action.type){
    case "Add":
      return [...state,{id:action.id,name:action.name,price:action.price,qty:action.qty,size:action.size}];
    case "Remove":
      let newArr=[...state];
      newArr.splice(action.index,1);
      return newArr;
      case "DROP":
        let empArray = []
        return empArray;
    case "Update":
      let arr=[...state];
      arr.find((food,index)=>{
        if(food.id===action.id){

          arr[index]={...food,qty:parseInt(action.qty)+food.qty,price:action.price+food.price}
        }
return arr;
      })  
      return arr;
    default:
      console.log("Error in reducer");
  }
};


export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <CartDispatchContent.Provider value={dispatch}>
        <CartStateContent.Provider value={state}>
          {children}
        </CartStateContent.Provider>
      </CartDispatchContent.Provider>
    </div>
  );
};

export const useCart = () => {
  return useContext(CartStateContent);
}

export const useDispatch = () => {
  return useContext(CartDispatchContent);
}
