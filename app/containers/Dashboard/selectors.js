import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

export const makeSelectTickets = () =>
  createSelector(
    selectDashboardDomain,
    state => state.get('tickets'),
  );

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );

export default makeSelectDashboard;
export { selectDashboardDomain };
