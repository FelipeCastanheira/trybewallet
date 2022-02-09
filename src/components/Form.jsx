import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, fetchAPI, removeAction } from '../actions';

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
    // this.handleRates();
  }

  // handleRates = async () => {
  //   const { walletData } = this.props;
  //   const exchangeRates = walletData.exp;
  //   this.setState({ exchangeRates });
  // }

  handleChange = (target, inputName) => {
    this.setState({ [inputName]: target.value });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { expenseThunk } = this.props;
    // const exchangeRates = walletData.currencies;
    expenseThunk(this.state);
    // this.setState({ exchangeRates }, () => {
    //   expenseThunk(this.state);
    // });
    this.setState((state) => ({ value: '',
      currency: 'USD',
      description: '',
      id: state.id + 1 }));
  }

  handleUpdating = (event) => {
    event.preventDefault();
    const { editAction, removeItem, walletData } = this.props;
    const { idToEdit, expenses } = walletData;
    const dataToEdit = expenses.find(({ id }) => id === idToEdit);
    const { exchangeRates } = dataToEdit;
    console.log(dataToEdit);
    removeItem(idToEdit);
    editAction({ ...this.state, id: idToEdit, exchangeRates });
    this.setState({ value: '',
      currency: 'USD',
      description: '',
    });
  }

  render() {
    const { value, description } = this.state;
    const { walletData } = this.props;
    const { editor, isFetching } = walletData;
    const isEnableButton = value && description;
    const optionData = walletData.currencies;
    // const optionData = Array.isArray(exchangeRates)
    //   ? exchangeRates : Object.keys(exchangeRates);
    const options = optionData.filter((name) => name !== 'USDT');
    return (
      <form>
        { isFetching && <h1>CARREGANDO...</h1>}
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
        {/* <button
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
        </button> */}
        { editor
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
          ) }
      </form>
    );
  }
}

Form.propTypes = {
  expenseThunk: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  walletData: PropTypes.shape({
    currencies: PropTypes.objectOf(PropTypes.objectOf(
      PropTypes.string,
    )),
    expenses: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      // exchangeRates: PropTypes.objectOf(
      //   PropTypes.objectOf(PropTypes.string),
      // ),
    })).isRequired,
    editor: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    idToEdit: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.isFetching,
  walletData: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  removeItem: (e) => dispatch(removeAction(e)),
  editAction: (e) => dispatch(editExpense(e)),
  expenseThunk: (e) => dispatch(fetchAPI(e)) });

export default connect(mapStateToProps, mapDispatchToProps)(Form);
