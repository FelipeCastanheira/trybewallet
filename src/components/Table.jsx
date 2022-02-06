import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { string } from 'stylelint/lib/formatters';
import { removeAction } from '../actions';

class Table extends React.Component {
  removeExpense(index) {
    const { removeItem } = this.props;
    removeItem(index);
  }

  render() {
    const { walletData } = this.props;
    const { expenses, isFetching } = walletData;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th className="onlyDesktop">Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th className="onlyDesktop">Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense, i) => {
            const { value,
              currency, method, tag, description, id, exchangeRates } = expense;
            const currencyValue = exchangeRates[currency];
            const decimalValue = Number(currencyValue.ask).toFixed(2);
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td className="onlyDesktop">{ method }</td>
                <td>{ value }</td>
                <td>{ currencyValue.name }</td>
                <td className="onlyDesktop">{ decimalValue }</td>
                <td>
                  {/* <span>R$ </span> */}
                  <span>{(value * currencyValue.ask).toFixed(2)}</span>
                </td>
                <td>Real</td>
                <td>
                  <button type="button" data-testid="edit-btn">
                    {/* <i className="fas fa-pencil-alt" /> */}
                    <span>Editar Despesa</span>
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.removeExpense(i) }
                    data-testid="delete-btn"
                  >
                    <i className="far fa-trash-alt" />
                  </button>
                </td>
              </tr>
            );
          })}
          { isFetching && <tr><th>CARREGANDO...</th></tr>}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  walletData: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      exchangeRates: PropTypes.objectOf(string),
    })).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (e) => dispatch(removeAction(e)) });

const mapStateToProps = (state) => ({
  walletData: state.wallet });

export default connect(mapStateToProps, mapDispatchToProps)(Table);
