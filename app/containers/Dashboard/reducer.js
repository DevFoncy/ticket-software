/*
 *
 * Dashboard reducer
 *
 */
import { fromJS } from 'immutable';
import { TICKET_WATCHER, TICKET_SUCCESS } from './constants';

export const initialState = fromJS({
  loadingTickets: false,
  tickets: [],
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case TICKET_WATCHER:
      return state.set('loadingTickets', true).set('tickets', []);
    case TICKET_SUCCESS:
      return state.set('loadingTickets', false).set('tickets', action.payload);
    default:
      return state;
  }
}

export default dashboardReducer;
