import { push } from 'react-router-redux'
import Immutable from 'immutable'
import { SubmissionError } from 'redux-form'

import {
  INIT,
  REDUX_INIT,
  EVENTS_READ,
  EVENTS_READ_SUCCESS,
  EVENTS_READ_FAIL,
  EVENTS_UPDATE,
  EVENTS_UPDATE_SUCCESS,
  EVENTS_UPDATE_FAIL,
  TOKEN_GET,
  TOKEN_GET_SUCCESS,
  TOKEN_GET_FAIL,
} from '../constants'

const initialState = Immutable.fromJS({
  loaded: false,
})

export default function users(state = initialState, action) {
  switch (action.type) {
    case INIT:
    case REDUX_INIT:
      return state;
    case EVENTS_READ_SUCCESS:
      if (action.result.success) {
        return Immutable.fromJS(action.result.data).set('loaded', true);
      } else {
        console.log('API call returned with error');
        return state;
      }
    case EVENTS_UPDATE_SUCCESS:
      if (action.result.success) {
        return state.withMutations(map => {
          map.set('organization', action.data.organization);
          map.set('meetingname', action.data.meetingname);
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}

function _getToken() {
  return {
    types: [TOKEN_GET, TOKEN_GET_SUCCESS, TOKEN_GET_FAIL],
    promise: (client) => client.post('https://espeakers.com/balboa3/authenticate/gettoken', {
      data: {
        username: 'demo',
        usertype: 'speaker',
        passhash: '1cec5963b8e3581f25ce023c62550576b2a176f489fb517c1c4ab7ffdd9b91c25fc783f42d3e9e9f1c901a50701fa70f4c444c24044ceeb16f4b45e209b61075',
      }
    })
  }
}

function _getEvents(timestamp, token) {
  return {
    types: [EVENTS_READ, EVENTS_READ_SUCCESS, EVENTS_READ_FAIL],
    promise: (client) => client.post('https://www.espeakers.com/balboa3/event/read/497558', {
      data: {
        timestamp,
        token,
        username: 'demo',
        usertype: 'speaker',
      }
    })
  }
}

export function getEvents() {
  return dispatch => {
    dispatch(_getToken())
    .then(res => {
      dispatch(_getEvents(res.data.timestamp, res.data.token))
    })
    .catch(err => {
      throw err;
    });
  }
}

export function updateEvent(eid, organization, meetingname) {
  return {
    types: [EVENTS_UPDATE, EVENTS_UPDATE_SUCCESS, EVENTS_UPDATE_FAIL],
    promise: (client) => client.post('https://www.espeakers.com/balboa3/event/update/497558', {
      data: {
        event_json: JSON.stringify({
          eid: eid,
          organization,
          meetingname,
        }),
        timestamp: '1474984548',
        token: 'aeefc8ab1a85c06f74063ba22f4e149496a6aabf5dab877acce047a8508eafea38abb12d1ea4d6d6054ed8525ffaa7bea37e32b635e1db064a44b0a4cf952de5',
        username: 'demo',
        usertype: 'speaker',
      }
    }),
    data: {
      organization,
      meetingname,
    }
  }
}
