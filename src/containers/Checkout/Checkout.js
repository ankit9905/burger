import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    
  
   // WIthout Redux method
    // componentDidMount(){
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
            
    //         if(param[0]==='price')
    //          price=param[1];
    //         else
    //         ingredients[param[0]]=+param[1];
    //     }
    //     this.setState({ingredients:ingredients,price:price});

    // }

    continueHandeler=()=>{
        this.props.history.replace("/checkout/ContactData");

    }

    cancelHandeler=()=>{
        this.props.history.goBack();
    }
    
    render(){
        let summary=<Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> :null
            summary=
            (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                continue={this.continueHandeler}
                cancel={this.cancelHandeler}/>
                <Route path={this.props.match.path+'/ContactData'} 
                 component={ContactData} />
            </div>
            )
        }

        return summary

    }
}
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);