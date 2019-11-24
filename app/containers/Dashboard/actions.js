/*
 *
 * Dashboard actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGOUT_WATCHER,
  TICKET_SUCCESS,
  TICKET_WATCHER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function logoutWatcher() {
  return {
    type: LOGOUT_WATCHER,
  };
}

export function getTicketWatcher() {
  return {
    type: TICKET_WATCHER,
  };
}

export function getTicketSuccess(payload) {
  return {
    type: TICKET_SUCCESS,
    payload,
  };
}
