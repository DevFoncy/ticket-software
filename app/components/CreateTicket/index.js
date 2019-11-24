/**
 *
 * CreateTicket
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Select, Input, Button, Upload, Icon } from 'antd';
import { Checkbox } from 'antd';

import './index.less';

const { Option } = Select;
const { Search } = Input;
const { TextArea } = Input;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Preguntas Comerciales', value: 'comerciales', name: 'comerciales' },
  { label: 'Preguntas Tecnicas', value: 'tickets', name: 'tickets' },
];

const optionsHerramienta = [
  { label: ' Bitrix24 Self Hosted', value: 'hosted' },
  { label: ' Bitrix24 On Cloud', value: 'cloud' },
];

const optionsProblema = [
  { label: ' No puede iniciar sesion', value: 'problema1' },
  { label: ' Informar de un error ', value: 'problema2' },
  { label: ' Como funciona ', value: 'problema3' },
  { label: ' Solicitar caracteristica', value: 'problema4' },
];

export class CreateTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // collapsed: false,
      tipoPregunta: [],
      tipoHerramienta: [],
      tipoProblema: [],
      description: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleInput = e => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
    console.log('this.state', this.state);
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onChange(checkedValues, name) {
    console.log('checked = ', checkedValues);
    this.setState({ [name]: checkedValues });
    console.log('state', this.state);
  }

  render() {
    return (
      <div className="CreateTicket">
        <h2> Registro Ticket</h2>
        <Button
          shape="round"
          size="large"
          type="primary"
          className="login-form-button"
          disabled={this.state.disabled}
          style={{ alignItems: 'right', float: 'right' }}
        >
          Registrar
        </Button>

        <h4> Ingrese el tipo de pregunta</h4>
        <Checkbox.Group
          options={options}
          defaultValue={['comerciales']}
          onChange={e => this.onChange(e, 'tipoPregunta')}
        />
        <br />

        <h4> Ingrese el tipo de herramienta </h4>
        <Checkbox.Group
          options={optionsHerramienta}
          defaultValue={['hosted']}
          onChange={e => this.onChange(e, 'tipoHerramienta')}
        />
        <br />

        <h4> Que te ocurrio</h4>
        <Checkbox.Group
          options={optionsProblema}
          defaultValue={['problema1']}
          onChange={e => this.onChange(e, 'tipoProblema')}
        />
        <br />

        <h4> Breve descripcion</h4>
        <TextArea
          name="description"
          rows={4}
          onChange={e => this.handleInput(e)}
        />

        <Form.Item label="Adjunte un archivo">
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </div>
    );
  }
}

CreateTicket.propTypes = {};

export default CreateTicket;
