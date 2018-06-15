import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";
import { togle_panel, add_database, set_database } from "../state/action/index";
import update from 'immutability-helper';
import { getConnection } from "../database/index";
var mysql = require('mysql');



class SettingPanel extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            inputValue: {
                URI: "",
                name: "",
                password: ""
            }
        }

        this.togle_panel = this.togle_panel.bind(this)
        this.settingHandle = this.settingHandle.bind(this)
        this.access_database = this.access_database.bind(this)

        
    }

    togle_panel(){
        console.log("click")
        this.props.togle_panel()
    }

    settingHandle(e){
        this.setState( update(this.state, {inputValue: {[e.target.name]:{$set: e.target.value }} } ))
    }

    access_database(){
        this.props.togle_panel()

        let payload = { uri: this.state.inputValue.URI , name: this.state.inputValue.name, password: this.state.inputValue.password }
        this.props.set_database(payload)


        // var con = mysql.createConnection({
        //     host: this.state.inputValue.URI,
        //     user: this.state.inputValue.name,
        //     password: this.state.inputValue.password
        //   });
        let con = getConnection()


          
          con.connect((err) => {
            if (err) throw err;
            con.query("show databases",  (err, result, fields) => {
              if (err) throw err;
              console.log(result);
              result.map(( database ) => {
                con.query(`show tables  in ${database.Database}`, (err, result, fields) => {
                    if (err) throw err;
                    console.log(result);
                    let tablelist = result.map( r => { return Object.values(r)[0] } )
                    let payloads = {database: database.Database, table: tablelist, open: false}
                    this.props.add_database(payloads)
                })
              })
              
            });
          });
    }

    render() {
        return (
            <div>
            {  this.props.state.settingpanel.open &&
            <div class="settingpanel__container">
                <button onClick={this.togle_panel}>X</button>
                URI
                <input type="text" name="URI" value={this.state.inputValue.URI} onChange={this.settingHandle} />
                USERNAME
                <input type="text" name="name" value={this.state.inputValue.name} onChange={this.settingHandle} />
                PASSWORD
                <input type="text" name="password" value={this.state.inputValue.password} onChange={this.settingHandle} />
                <input onClick={this.access_database} type="submit" value="SET"/>
            </div>
            }
            </div>
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
    togle_panel: ()=>dispatch(togle_panel()),
    add_database: (payload) =>dispatch(add_database(payload)),
    set_database: (payload) =>dispatch(set_database(payload))
    }
}
  
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(SettingPanel)



