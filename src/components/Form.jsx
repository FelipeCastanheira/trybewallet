import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, removeAction } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
      id: 0,
    };
  }

  componentDidMount() {
    const { expenseThunk } = this.props;
    expenseThunk();
    this.handleRates();
  }

  handleRates = async () => {
    const { walletData } = this.props;
    const exchangeRates = walletData.currencies;
    this.setState({ exchangeRates });
  }

  handleChange = (target, inputName) => {
    this.setState({ [inputName]: target.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { expenseThunk, walletData } = this.props;
    const exchangeRates = walletData.currencies;
    this.setState({ exchangeRates }, () => {
      expenseThunk(this.state);
      this.setState((state) => ({ value: '',
        currency: 'USD',
        description: '',
        id: state.id + 1 }));
    });
  }

  handleUpdating = (event) => {
    event.preventDefault();
    const { expenseThunk, removeItem, walletData: { editData } } = this.props;
    removeItem(editData.id);
    expenseThunk({ ...this.state,
      id: editData.id,
      exchangeRates: editData.exchangeRates });
    this.setState({ value: '',
      currency: 'USD',
      description: '',
    });
    this.setState({ id: editData.id, exchangeRates: editData.exchangeRates }, () => {
    });
  }

  render() {
    const { value, description } = this.state;
    const { walletData } = this.props;
    // const { editData } = walletData;
    const isEnableButton = value && description;
    const exchangeRates = walletData.currencies;
    const options = Object.values(exchangeRates).filter((_data, index) => index !== 1);
    return (
      <form>
        { !exchangeRates && <h1>CARREGANDO...</h1>}
        <label htmlFor="value-input">
          <h5>Valor:</h5>
          <input
            onChange={ ({ target }) => this.handleChange(target, 'value') }
            data-testid="value-input"
            type="number"
            id="value-input"
            value={ value }
          />
        </label>
        <label htmlFor="currency-input">
          <h5>Moeda</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'currency') }
            data-testid="currency-input"
            id="currency-input"
          >
            { options.map(({ code }) => (
              <option key={ code } data-testid={ code }>{ code }</option>
            )) }
          </select>
        </label>
        <label htmlFor="method-input">
          <h5>Método de Pagamento:</h5>
          <select
            onChange={ ({ target }) => this.handleChange(target, 'method') }
            data-testid="method-input"
            id="method-input"
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
            id="tag-input"
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
            id="description-input"
            type="text"
            value={ description }
          />
        </label>
        <button
          onClick={ this.handleUpdating }
          disabled={ !isEnableButton }
          type="button"
        >
          Editar despesa
        </button>
        )
        : (
        <button
          onClick={ this.handleClick }
          disabled={ !isEnableButton }
          type="submit"
        >
          Adicionar despesa
        </button>
        {/* { editData.isUpdating
          ? (
            <button
              onClick={ this.handleUpdating }
              disabled={ !isEnableButton }
              type="submit"
            >
              Editar despesa
            </button>
          )
          : (
            <button
              onClick={ this.handleClick }
              disabled={ !isEnableButton }
              type="submit"
            >
              Adicionar despesa
            </button>
          ) } */}
      </form>
    );
  }
}

Form.propTypes = {
  expenseThunk: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  walletData: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf(
      PropTypes.string,
    )),
    editData: PropTypes.shape({ isUpdating: PropTypes.bool,
      id: PropTypes.number,
      exchangeRates: PropTypes.objectOf(
        PropTypes.objectOf(PropTypes.string),
      ) }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isFetching,
  walletData: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  removeItem: (e) => dispatch(removeAction(e)),
  expenseThunk: (e) => dispatch(fetchAPI(e)) });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
