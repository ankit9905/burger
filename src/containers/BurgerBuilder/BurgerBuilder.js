import React , {Component} from 'react';
import {connect } from 'react-redux';
import Aux from '../../Hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
// import {Redirect} from 'react-router-dom';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component{
    
   state={
       purchasing:false,
     
   }
   
   componentDidMount(){
     this.props.onInitIngredients();
   }

   updatePurchaseState(ingredients){
        
        
       const sum=Object.keys(ingredients)
         .map(igKey=>{
             return ingredients[igKey];
         })
         .reduce((sum,el)=>{
             return sum+el;
         },0);
         return sum>0
   } 

//    addIngredientHandler=(type)=>{
//         const oldCount=this.state.ingredients[type];
//         const updatedCount =oldCount+1;
//         const updatedIngredients={
//             ...this.state.ingredients
//         };
//         updatedIngredients[type]=updatedCount;
//         const PriceAddition=INGREDIENT_PRICES[type];
//         const oldPrice=this.state.totalPrice;
//         const newPrice=oldPrice+PriceAddition;
//         this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
//         this.updatePurchaseState(updatedIngredients);
//    }

//    removeIngredientHandler=(type)=>{
//     const oldCount=this.state.ingredients[type];
     
//     if(oldCount<=0)
//     return;
    
//     const updatedCount =oldCount-1;
//     const updatedIngredients={
//         ...this.state.ingredients
//     };
//     updatedIngredients[type]=updatedCount;
//     const PriceAddition=INGREDIENT_PRICES[type];
//     const oldPrice=this.state.totalPrice;
//     const newPrice=oldPrice-PriceAddition;

//     this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
//     this.updatePurchaseState(updatedIngredients); 
//    }

   purchaseHandler=()=>{
        if(this.props.isAuth){
            this.setState({purchasing:true})
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
   }

   purchaseCancelHandler=()=>{
       this.setState({purchasing:false})
   }
   
   purchaseContinueHandler=()=>{
        
      
    
    //   var name1= prompt("Enter your name to continue");
    //   console.log(name1);
    //   var pin= prompt("Enter pincode","828401");
    //   var country=prompt("Enter Your Country","India");
    //   var street =prompt("Enter Your Street","purana bazar");
      
    //   this.setState({loading:true})
    //      const order={
    //          ingredients:this.state.ingredientAdded,
    //          price:this.state.totalPrice,
    //          customer:{
    //             name:name1,
    //             address:{
    //                 street:street ,
    //                 pincode:pin,
    //                 country:country
    //             },
    //             email:'ankitagarwal@gmail.com'

    //          },
    //          deliveryMethod:'fastest'
    //      }
    //    axios.post('/orders.json',order)
    //      .then(response=>{
    //       this.setState({loading:false,purchasing:false})
    //      })
    //       .catch(error=>{
    //         this.setState({loading:false,purchasing:false})
    //       })

    //    const queryParams=[];
    //    for(let i in this.state.ingredients){
    //        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
    //    }
    //     queryParams.push('price='+this.props.prc);
    //    const queryString=queryParams.join('&');
          
    // {
    //     pathname:"/checkout",
    //     search:'?'+queryString

    // }

       this.props.onInitPurchase();
       this.props.history.push('/checkout');
   }

    render(){
        const disabledInfo={...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0;
        }
      
        let orderSummary= null;
       
        let ankit=this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
         if(this.props.ings){
            ankit=(
                <Aux>
                 <Burger ingredients={this.props.ings} />
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                isAuth={this.props.isAuth}
                price={this.props.prc}
                />
               
             
                </Aux>
            );
            orderSummary=  <OrderSummary ingredients={this.props.ings}
            price={this.props.prc}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler} />
         }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                  {orderSummary}
                </Modal>
                {ankit}
            </Aux>
            
        );
    }
}
const mapStateToProps = state =>{
    return{
      ings:state.burgerBuilder.ingredients,
      prc:state.burgerBuilder.totalPrice,
      error:state.burgerBuilder.error,
      isAuth:state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath : (path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder,axios));