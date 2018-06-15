import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { togle_panel } from "../state/action/index";

class Header extends React.Component {

    constructor(props){
        super(props)
        this.togle_panel = this.togle_panel.bind(this)
    }

    togle_panel(){
        this.props.togle_panel()
    }

    render() {
        return (
            <header>
                <span onClick={this.togle_panel} className="header__setting">
                    <i class="fas fa-bars"></i>  
                </span>
                <span className="header__title">database sql client</span>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
      state : state
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      togle_panel: ()=>dispatch(togle_panel())
      }
}
  
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(Header)

