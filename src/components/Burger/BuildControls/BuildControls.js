import React from 'react'
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'salad' },
    {label:'Bacon',type:'bacon' },
    {label:'Butter',type:'butter' },
    {label:'Cheese',type:'cheese' }

];
const buildControls =(props) => (

     <div className={classes.BuildControls}>
         <p>Current Price: <strong>{props.price}</strong></p>
       {controls.map(ctrl=>(
           <BuildControl 
           key={ctrl.label} 
           label={ctrl.label}
           added={()=>props.ingredientAdded(ctrl.type)}
           removed={()=>props.ingredientRemoved(ctrl.type)}
           disable={props.disabled[ctrl.type]}
           />
           
       ))}
       <button 
       className={classes.OrderButton}
       disabled={!props.purchasable}
       onClick={props.ordered}
       >{props.isAuth? 'Order Now':'Sign Up to Order' }</button>
    </div>
);
export default buildControls;