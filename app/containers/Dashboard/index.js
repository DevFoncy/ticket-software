/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  notification,
  Button,
  Spin,
} from 'antd';
import makeSelectDashboard, {
  makeSelectTickets,
  makeSelectIsLoadingTickets,
} from './selectors';

import './index.less';
import reducer from './reducer';
import saga from './saga';

import {
  logoutWatcher,
  getTicketWatcher,
  assignTicketWatcher,
  attendTicketWatcher,
} from './actions';
import TicketList from '../../components/TicketList';
import SiderDashboard from '../../components/SiderDashboard';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const openNotification = () => {
  notification.info({
    message: 'Notificacion de mantenimiento ',
    description:
      'Es hora que realices un mantenimiento de tus equipos. Tienes un plazo de 24 horas',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      showMantenimiento: false,
      page: 'Lista de Tickets',
      menu: 'ticket',
      item: 'list-ticket',
    };
  }

  componentDidMount() {
    this.props.getTickets();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderDashboard
          onLogout={this.props.onLogout}
          menu={this.state.menu}
          item={this.state.item}
        />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Ticket</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.page}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {!this.props.isLoadingTickets ? (
              <TicketList
                getTicket={this.props.getTickets}
                attendTicket={this.props.attendTicket}
                assignTicket={this.props.assignTicket}
                data={this.props.tickets && this.props.tickets}
              />
            ) : (
              <div className="loadingSpin">
                <Spin size="large" />
              </div>
            )}

            {/* <Button type="primary" onClick={openNotification}> */}
            {/*  Open the notification box */}
            {/* </Button> */}
          </div>
        </Content>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // dashboard: makeSelectDashboard(),
  tickets: makeSelectTickets(),
  isLoadingTickets: makeSelectIsLoadingTickets(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logoutWatcher()),
    getTickets: () => dispatch(getTicketWatcher()),
    assignTicket: params => dispatch(assignTicketWatcher(params)),
    attendTicket: params => dispatch(attendTicketWatcher(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
  withConnect,
  memo,
)(Dashboard);
