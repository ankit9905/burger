import * as actionType from '../actions/actionTypes';

const initialState={
    ingredients:null,
    totalPrice:20,
    error :false,
    building:false
};
const INGREDIENT_PRICES={
    salad:6,
    cheese:6,
    butter:10,
    bacon:8
};


const reducer = (state = initialState,action)=>{
     switch(action.type){
         case actionType.ADD_INGREDIENT:
             return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
             }
         case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true
             }
         case actionType.SET_INGREDIENTS:
             return{
                 ...state,
                 ingredients:action.ingredients,
                 error:false,
                 totalPrice:20,
                 building:false
             }
         case actionType.FETCH_INGREDIENTS_FAILED:
             return{
                 ...state,
                 error:true
             }       
         default:
             return state;    
     }

};

export default reducer;