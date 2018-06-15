var mysql = require('mysql');
import store from "../state/store/index";

function getConnection (){
    var con = mysql.createConnection({
        host: store.getState().settingpanel.uri,
        user: store.getState().settingpanel.name,
        password: store.getState().settingpanel.password
    });

    return con
}

function getConnectionwithDatabase (){
    var con = mysql.createConnection({
        host: store.getState().settingpanel.uri,
        user: store.getState().settingpanel.name,
        password: store.getState().settingpanel.password,
        database: store.getState().activedatabase
    });

    return con
}

export {getConnection, getConnectionwithDatabase}
