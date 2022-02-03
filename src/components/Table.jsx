import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { walletData } = this.props;
    const { expenses } = walletData;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th className="onlyDesktop">Método de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th className="onlyDesktop">Câmbio Utilizado</th>
            <th>Valor Convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({ expenseValue, currency, method, tag, description, id }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td className="onlyDesktop">{ method }</td>
              <td>{ expenseValue }</td>
              <td>{ currency }</td>
              <td className="onlyDesktop">R$ 5,43</td>
              <td>
                <span>R$ </span>
                <span>{Math.ceil(expenseValue * 1)}</span>
              </td>
              <td>Real brasileiro</td>
              <td>
                <button type="button" data-testid="edit-btn">
                  <i className="fas fa-pencil-alt" />
                  {/* <span>Editar Despesa</span> */}
                </button>
                <button type="button" data-testid="delete-btn">
                  <i className="far fa-trash-alt" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  walletData: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  walletData: state.wallet });

export default connect(mapStateToProps)(Table);
