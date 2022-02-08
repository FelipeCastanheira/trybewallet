import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editAction, removeAction } from '../actions';

class Table extends React.Component {
  removeExpense(index) {
    const { removeItem } = this.props;
    removeItem(index);
  }

  updateExpense(id, curr) {
    const { updateItem } = this.props;
    updateItem(id, curr);
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
          { expenses.sort((a, b) => a.id - b.id).map((expense, i) => {
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
                  <button
                    type="button"
                    onClick={ () => this.updateExpense(id, currencyValue.code) }
                    data-testid="edit-btn"
                  >
                    {/* <i className="fas fa-pencil-alt" /> */}
                    {!walletData.editor && <span>Editar Despesa</span>}
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.removeExpense(id) }
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
      id: PropTypes.number,
      exchangeRates: PropTypes.objectOf(
        PropTypes.objectOf(PropTypes.string),
      ),
    })).isRequired,
    editor: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (e) => dispatch(removeAction(e)),
  updateItem: (e) => dispatch(editAction(e)) });

const mapStateToProps = (state) => ({
  walletData: state.wallet });

export default connect(mapStateToProps, mapDispatchToProps)(Table);
