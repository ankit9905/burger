import React, {Component} from 'react';
import {connect }  from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../withErrorHandler/withErrorHandler'
import  * as actions from '../../../store/actions/index'

class ContactData extends Component{
    
     state={
         orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                pincode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:'6',
                        maxLength:'6'
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                       options:[
                           {value:'fastest',displayValue:'Fastest'},
                           {value:'cheapest',displayValue:'Cheapest'}
                    ]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true
                },
         },
         formIsValid:false
     }
     orderHandler=(event)=>{
         event.preventDefault();

         const formData={};
         for(let formElementIdentifier in this.state.orderForm){
             formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
         }

         const order={
             ingredients:this.props.ings,
             price:this.props.prc,
             orderData:formData,
             userId:this.props.userId
         }
         
         this.props.onOrderBurger(order,this.props.token)
 
     }
     
     checkValidity(value,rules){
       let isValid = true;

       if(!rules){
           return true;
       }

       if(rules.required){
           isValid = value.trim() !== '' &&isValid;
       }
       if(rules.minLength){
           isValid = value.length >= rules.minLength &&isValid ; 
       }
       if(rules.maxLength){
        isValid = value.length <= rules.maxLength &&isValid;
    }

       return isValid;
     }

     inputChangeHandeler=(event,inputIdentifier)=>{
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement ={
            ...updatedForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid =true ;
        for(let inputIdentifier in updatedForm){
            formIsValid =updatedForm[inputIdentifier].valid && formIsValid; 
        }

        this.setState({orderForm:updatedForm,formIsValid:formIsValid});
     }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
        <form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement=>(
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangeHandeler(event,formElement.id)}
                />)
            )}
            <Button disabled={!this.state.formIsValid} btnType="Success" >Order</Button>
        </form>
        );
        if(this.props.loading)
        form=<Spinner />
      return(
          <div className={classes.ContactData}>
               <h3>Enter Your Contact Details</h3>
                {form}
          </div>
      );
    }
}

 const mapStateToProps = state =>{
     return{
       ings:state.burgerBuilder.ingredients,
       prc:state.burgerBuilder.totalPrice,
       loading:state.order.loading,
       token:state.auth.token,
       userId:state.auth.userId
     }
 };

const mapDispatchToProps = dispatch =>{
   return{ onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
   }
}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(ContactData,axios));