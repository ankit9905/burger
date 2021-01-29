import React from 'react';
import burgerLogo from '../../assets/images/28.1 burger-logo.png.png';
import classes from './Logo.css';

const logo=(props)=>{
 return <div className={classes.Logo}>
     <img src={burgerLogo} alt="Myburger" ></img>
 </div>
}

export default logo;