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
import { Layout, Menu, Breadcrumb, Icon, notification, Button } from 'antd';
import { makeSelectTickets } from './selectors';

import './index.less';
import reducer from './reducer';
import saga from './saga';

import { logoutWatcher, getTicketWatcher } from './actions';
import TicketList from '../../components/TicketList';
import CreateTicket from '../../components/CreateTicket';

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
    };
  }

  componentDidMount() {
    this.props.getTickets();
  }

  componentWillMount() {}

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Tickets</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Servicios</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Usuarios</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Equipo</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>Archivo</span>
            </Menu.Item>
            <Menu.Item key="10">
              <Icon type="logout" />
              <span onClick={this.props.onLogout}> Cerrar Session </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Ticket</Breadcrumb.Item>
              <Breadcrumb.Item>Crear Ticket</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <CreateTicket />
              <TicketList data={this.props.tickets && this.props.tickets} />
              <Button type="primary" onClick={openNotification}>
                Open the notification box
              </Button>
              ,
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  tickets: makeSelectTickets(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logoutWatcher()),
    getTickets: () => dispatch(getTicketWatcher()),
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
