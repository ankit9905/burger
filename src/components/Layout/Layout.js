import React, {Component}from 'react';
import Aux from '../../Hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{

    state={
     showSideDrawer:false
    }
    sideDrawerCloseHandler=()=>{
      this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }

    render(){
    return(
        <Aux>
            {/* <div>Toolbar,Sidedrawer,Backdrop</div> */}
            <Toolbar 
                isAuth={this.props.isAuth}
                drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer 
                isAuth={this.props.isAuth}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}    />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return{
        isAuth:state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);