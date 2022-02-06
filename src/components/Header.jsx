import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoWallet from '../assets/logoWallet.png';
import calculateExpenses from '../functions';

class Header extends React.Component {
  render() {
    const { userLogin, expenseData } = this.props;
    const total = calculateExpenses(expenseData.expenses);
    return (
      <header>
        <img src={ logoWallet } alt="logo trybe wallet" />
        <h4>
          <p>
            <span>Email: </span>
            {userLogin.email
              ? (<span data-testid="email-field">{userLogin.email}</span>)
              : (<span>eu@email.com</span>)}
          </p>
          <p>
            <span>Despesa Total: R$</span>
            <span data-testid="total-field">{total}</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </h4>
      </header>
    );
  }
}

Header.propTypes = {
  userLogin: PropTypes.objectOf(PropTypes.string).isRequired,
  expenseData: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userLogin: state.user,
  expenseData: state.wallet });

export default connect(mapStateToProps)(Header);
