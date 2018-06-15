import React from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import {connect} from "react-redux";
import { open_table, set_active_database, set_query_result } from "../state/action/index";
import { getConnectionwithDatabase } from "../database/index";

class DatabaseList extends React.Component {

    constructor(props){
        super(props)
        
        this.renderDatabaseList = this.renderDatabaseList.bind(this)
        this.openTable = this.openTable.bind(this)
        this.tableClick = this.tableClick.bind(this)
    }

    openTable(index, database ,e){
        console.log(index)
        // this.setState( update(this.state, {data: {[index]: {open: {$set: !this.state.data[index].open } }} } ))
        this.props.open_table(index)
        this.props.set_active_database(database)
    }

    tableClick(table, e){
        console.log(table)
        let query = `select * from ${table}`
        let con = getConnectionwithDatabase()
        con.connect((err) => {
            if (err) throw err;
            con.query(query,  (err, result, fields) => {
                console.log(result)
                this.props.set_query_result(result)
            })
        })
    }

    renderDatabaseList(){
         return this.props.state.datasets.map( (databaseitem, index) =>{
            return <div>      
                   <li onClick={(e) => this.openTable(index, databaseitem.database, e) } key={index}>
                      { databaseitem.database }
                   </li>
                   {  this.props.state.datasets[index].open &&
                   <ul>
                        {
                            databaseitem.table.map((table, index) => {
                                return <li className= "tablelist" onClick={(e) => this.tableClick(table, e)} key={index}> 
                                            {table}
                                       </li>
                            })
                        }
                  </ul>
                }
                  </div>
        } )
    }

    render() {
        return (
            <div className="databaselist__container">
                <ul>
                    {this.renderDatabaseList()}
                </ul>
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
    open_table: (index)=> dispatch(open_table(index)),
    set_active_database: (database) => dispatch(set_active_database(database)),
    set_query_result: (result) => dispatch(set_query_result(result))
    }
}
  
  
export default connect(
mapStateToProps,
mapDispatchToProps
)(DatabaseList)


