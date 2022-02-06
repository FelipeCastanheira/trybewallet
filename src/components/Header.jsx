import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoWallet from '../assets/logoWallet.png';

class Header extends React.Component {
  render() {
    const { userLogin } = this.props;
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
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </h4>
      </header>
    );
  }
}

Header.propTypes = {
  userLogin: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userLogin: state.user,
  expenseData: state.wallet });

export default connect(mapStateToProps)(Header);
