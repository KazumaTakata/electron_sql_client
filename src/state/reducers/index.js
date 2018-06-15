import { fromJS } from "immutable";


const initialState = {
  settingpanel: {
    open: true,
    uri: "",
    name: "",
    password: "", 
  },
  datasets: [],
  activedatabase: "",
  queryresult: [],
  resultkeys: []
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGILSETTINGPANEL":
      let TOGLEPANELSTATE = fromJS(state);
      let TOGLEPANELSTATE1 = TOGLEPANELSTATE.updateIn(["settingpanel", "open"], flag => !flag )
      return  TOGLEPANELSTATE1.toJS()
    case "ADDDATABASE":
      let DATASETSTATE = fromJS(state);
      let DATASETSTATE1 = DATASETSTATE.updateIn(["datasets"], list  => list.push(action.payloads)) 
      return DATASETSTATE1.toJS()
    case "OPENTABLE":
      let OPENTABLESTATE = fromJS(state);
      let OPENTABLESTATE1 = OPENTABLESTATE.updateIn(["datasets", action.index, "open"], openOrClose => !openOrClose )
      return OPENTABLESTATE1.toJS()
    case "SETTINGDATABASE":
      let SETTINGDATABASESTATE = fromJS(state);
      let SETTINGDATABASESTATE1 = SETTINGDATABASESTATE.setIn(["settingpanel", "uri"], action.payloads.uri )
      let SETTINGDATABASESTATE2 = SETTINGDATABASESTATE1.setIn(["settingpanel", "name"], action.payloads.name )
      let SETTINGDATABASESTATE3 = SETTINGDATABASESTATE2.setIn(["settingpanel", "password"], action.payloads.password )
      return SETTINGDATABASESTATE3.toJS()
    case "SETACTIVEDATABASE":
      let SETACTIVEDATABASE = fromJS(state);
      let SETACTIVEDATABASE1 = SETACTIVEDATABASE.setIn([ "activedatabase" ],  action.database )
      return SETACTIVEDATABASE1.toJS()
    case "SETQUERYRESULT":
      let keys
      if ( typeof action.result ==  "object"){
        if (action.result.length > 0){
          keys = Object.keys(action.result[0])
        } else {
          keys = []
        }
      } else {
        keys = []
      }
      
      let SETQUERYRESULT= fromJS(state);
      let SETQUERYRESULT1 = SETQUERYRESULT.setIn([ "queryresult" ],  action.result )
      let SETQUERYRESULT2 = SETQUERYRESULT1.setIn([ "resultkeys" ],  keys )

      return SETQUERYRESULT2.toJS()

    default:
      return state;
  }
};
export default rootReducer;