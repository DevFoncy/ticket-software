/**
 *
 * TicketList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Table, Input, Divider, Modal, Button, Checkbox } from 'antd';

import './index.less';
import { columnTicket } from '../../utils/Constant';

const { Search } = Input;
const { Column, ColumnGroup } = Table;

export class TicketList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      visible: false,
      listUsers: [
        { id: 1, name: 'Fidel Angel', status: 'Ocupado' },
        { id: 2, name: 'Steve Arias', status: 'Libre' },
        { id: 3, name: 'Johan Aylas', status: 'Libre' },
        { id: 4, name: 'Migue lde la Cruz', status: 'Ocupado' },
        { id: 5, name: 'Rony Lindo', status: 'Libre' },
      ],
    };
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  reformat(data) {
    // console.log("data en component",data);
    const newData = [];
    if (data.length > 0) {
      data.map(d => {
        if (d.category_id === 1) {
          d.category_id = 'Bitrix24 Self Hosted';
        } else {
          d.category_id = 'Bitrix24 On Cloud';
        }
        newData.push(d);
      });
      return newData;
      // console.log("newData",newData);
    }
  }

  render() {
    // console.log("tickets", this.props.data);
    const info = this.reformat(this.props.data);
    return (
      <div className="ListTicket">
        <h2> Consulta de Ticket</h2>
        <h4> Ingrese el titulo</h4>
        <br />

        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 200 }}
        />
        <br />
        <br />
        <Table dataSource={info} onChange={this.onChange}>
          <Column title="ID" dataIndex="id" key="age" />
          <Column title="Titulo" dataIndex="title" key="address" />
          <Column title="Prioridad" dataIndex="priority" key="age2" />
          <Column title="Tipo de problema" dataIndex="category_id" key="age3" />
          <Column
            title="Acciones"
            key="action"
            render={() => (
              <span>
                <Button type="dashed" onClick={this.showModal}>
                  Asignar
                </Button>
                <Divider type="vertical" />
                <a>Eliminar</a>
              </span>
            )}
          />
        </Table>

        <Modal
          title="Lista de tecnicos a asignar"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.listUsers.map(user => (
            <div>
              <Checkbox onChange={this.onChange}>
                {' '}
                {user.name} Estado : {user.status}{' '}
              </Checkbox>
            </div>
          ))}
        </Modal>
      </div>
    );
  }
}

TicketList.propTypes = {};

export default TicketList;
