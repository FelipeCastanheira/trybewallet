import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseValue: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  handleChange = (target, inputName) => {
    this.setState({ [inputName]: target.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { addExpense: newExpense } = this.props;
    const { expenseValue, currency, method, tag, description } = this.state;

    newExpense({ expenseValue, currency, method, tag, description });
  }

  render() {
    const { expenseValue, description } = this.state;
    const isEnableButton = expenseValue && description;
    return (
      <form>
        <label htmlFor="value-input">
          <h5>Valor:</h5>
          <input
            onChange={ ({ target }) => this.handleChange(target, 'expenseValue') }
            data-testid="value-input"
            type="number"
          />
        </label>
        <label htmlFor="currency-input">
          <h5>Moeda:</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'currency') }
            data-testid="currency-input"
          >
            <option data-testid="USD">USD</option>
            <option data-testid="CAD">CAD</option>
            <option data-testid="EUR">EUR</option>
            <option data-testid="GBP">GBP</option>
            <option data-testid="ARS">ARS</option>
            <option data-testid="BTC">BTC</option>
            <option data-testid="LTC">LTC</option>
            <option data-testid="JPY">JPY</option>
            <option data-testid="CHF">CHF</option>
            <option data-testid="AUD">AUD</option>
            <option data-testid="CNY">CNY</option>
            <option data-testid="ELS">ELS</option>
            <option data-testid="ETH">ETH</option>
            <option data-testid="XRP">XRP</option>
          </select>
        </label>
        <label htmlFor="method-input">
          <h5>Método de Pagamento:</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'method') }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de Crédito</option>
            <option>Cartão de Débito</option>
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
  addExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (e) => dispatch(addExpense(e)) });

export default connect(null, mapDispatchToProps)(Form);
