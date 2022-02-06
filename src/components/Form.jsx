import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: '',
      id: '0',
    };
  }

  componentDidMount() {
    this.handleRates();
  }

  handleRates = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    this.setState({ exchangeRates: data });
  }

  handleChange = (target, inputName) => {
    this.setState({ [inputName]: target.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { expenseThunk } = this.props;

    expenseThunk(this.state);
    this.setState((state) => ({ id: state.id + 1 }));
  }

  render() {
    const { expenseValue, description, exchangeRates } = this.state;
    const isEnableButton = expenseValue && description;
    const options = Object.keys(exchangeRates).filter((name) => name !== 'USDT');
    return (
      <form>
        { !exchangeRates && <h1>CARREGANDO...</h1>}
        <label htmlFor="value-input">
          <h5>Valor:</h5>
          <input
            onChange={ ({ target }) => this.handleChange(target, 'expenseValue') }
            data-testid="value-input"
            type="number"
          />
        </label>
        <label htmlFor="currency-input">
          <h5>Moeda</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'currency') }
            data-testid="currency-input"
          >
            { options.map((name) => (
              <option key={ name } data-testid={ name }>{ name }</option>
            )) }
          </select>
        </label>
        <label htmlFor="method-input">
          <h5>Método de Pagamento:</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'method') }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          <h5>Tag:</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'tag') }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          <h5>Descrição:</h5>
          <input
            onChange={ ({ target }) => this.handleChange(target, 'description') }
            data-testid="description-input"
            type="text"
          />
        </label>
        <button
          onClick={ this.handleClick }
          disabled={ !isEnableButton }
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  expenseThunk: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  expenseThunk: (e) => dispatch(fetchAPI(e)) });

export default connect(null, mapDispatchToProps)(Form);
