import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import {connect} from "react-redux";
import { getConnectionwithDatabase } from "../database/index";
import { set_query_result } from "../state/action/index";



class Databasesql extends React.Component {


    constructor(props){
        super(props)
        

        this.state = {result:
                        { columnName: ["id", "name", "age"],
                          data: [
                              {id: 1, name: "one ok", age: 23},
                              {id: 2, name: "safo", age: 24}
                        ]
                        }
                    }

        this.rowsRender = this.rowsRender.bind(this)
        this.EnterPressed = this.EnterPressed.bind(this)
    }

    EnterPressed(e){
        let query = e.target.value
        if (e.key =="Enter"){
            let con = getConnectionwithDatabase()
            con.connect((err) => {
                if (err) throw err;
                con.query(query,  (err, result, fields) => {
                    console.log(result)
                    this.props.set_query_result(result)
                })
        })
        } else {
            console.log(e.target.selectionStart)
        }
    }

    keyRender(keys) {
         if (typeof keys === "object" ){
         return keys.map((key, index) => {
            if (key != "modified" && key != "created"){
                return (
                <th>
                    {key}
                </th>
                )
            }
        })
        }
    }

    objectTostring(d) {
        if (d == null){
            return "null"
        } else if (typeof d == "object"){
            return d.toString()
        } else {
            return d
        }
    }

    rowsRender(){
        if ( typeof this.props.state.queryresult == "object" ){
        return this.props.state.queryresult.map((d, index) => {
            return (
                <tbody>
                <tr>
                    {this.props.state.resultkeys.map((key) =>{
                        if (key != "modified" && key != "created"){
                            return (
                                <td>
                                 {  this.objectTostring(d[key]) }
                                </td>
                            )
                        }
                        
                    })
                    }
                </tr>
                </tbody>
            )
           
        })
    }
}

    render() {
        return (
            <div className="sql__container">
                <input   onKeyPress={this.EnterPressed} name="" id="" />
                <div className="table__container">
                <table>
                <tbody>
                    <tr>
                        {this.keyRender(this.props.state.resultkeys)}
                    </tr>
                </tbody>
                {this.rowsRender()}              
              </table>
                </div>
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
    // open_table: (index)=> dispatch(open_table(index)),
    // set_active_database: (database) => dispatch(set_active_database(database)),
    set_query_result: (result) => dispatch(set_query_result(result))
    }
}
  
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(Databasesql)

