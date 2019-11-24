// Individual exports for testing
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';
import { LOGOUT_WATCHER, TICKET_WATCHER } from './constants';
import { getTicketSuccess } from './actions';

function logoutApi() {
  return axios.request({
    method: 'get',
    url: `http://localhost:8000/api/auth/logout`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
}

function ticketsApi() {
  return axios.request({
    method: 'get',
    url: `http://localhost:8000/api/tickets`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
}

export function* logoutSaga() {
  try {
    const { data } = yield call(logoutApi);
    localStorage.clear();
    yield put(push('/login'));
    message.success('Vuelva pronto', 5);
  } catch (e) {
    console.log('e', e);
  }
}

// GET TICKETS
export function* getTickets() {
  try {
    const { data } = yield call(ticketsApi);
    yield put(getTicketSuccess(data));
    message.success('Tickets cargado con exito', 5);
  } catch (error) {
    // returnMessage(error);
    // getPlansFailed({})
  }
}

export default function* dashboardSaga() {
  yield takeLatest(TICKET_WATCHER, getTickets);
  yield takeLatest(LOGOUT_WATCHER, logoutSaga);
}
