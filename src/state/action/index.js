// src/js/actions/index.js
const togle_panel = () => ({ type: "TOGILSETTINGPANEL" });
const add_database = (payloads) => ({ type: "ADDDATABASE", payloads });
const open_table = (index) => ({type: "OPENTABLE", index});
const set_database = (payloads) => ({type: "SETTINGDATABASE", payloads})
const set_active_database = (database) => ({type: "SETACTIVEDATABASE", database})
const set_query_result = (result) => ({type: "SETQUERYRESULT", result})
export { togle_panel, add_database, open_table, set_database, set_active_database, set_query_result }