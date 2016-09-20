import { fromJS, Map } from 'immutable';
import { ActionTypes, ActionKeyStore } from './actions';

let initialState = Map() // eslint-disable-line
                    // .set(,) // Usefull if we need to set some elastic search configuration information
                    .set(ActionKeyStore.DASHBOARDS, Map()); // eslint-disable-line


function didStartRequest(state, id) {
    return state.setIn([ActionKeyStore.DASHBOARDS, id, ActionKeyStore.IS_FETCHING], true);
}

function didReceiveResponse(state, id, data) {
    return state
      .setIn([ActionKeyStore.DASHBOARDS, id, ActionKeyStore.IS_FETCHING], false)
      .setIn([ActionKeyStore.DASHBOARDS, id, ActionKeyStore.DATA], fromJS(data));
}

function didReceiveError(state, id, error) {
    return state
        .setIn([ActionKeyStore.DASHBOARDS, id, ActionKeyStore.IS_FETCHING], false)
        .setIn([ActionKeyStore.DASHBOARDS, id, ActionKeyStore.DATA], fromJS([]))
        .setIn([ActionKeyStore.DASHBOARDS, id, ActionKeyStore.ERROR], fromJS(error));
}

function configurationsReducer(state = initialState, action) {

    switch (action.type) {
        case ActionTypes.CONFIG_DID_START_REQUEST:
            return didStartRequest(state, action.id);

        case ActionTypes.CONFIG_DID_RECEIVE_RESPONSE:
            return didReceiveResponse(state, action.id, action.data);

        case ActionTypes.CONFIG_DID_RECEIVE_ERROR:
            return didReceiveError(state, action.id, action.error);

        default:
            return state;
    }
};

export default configurationsReducer;
