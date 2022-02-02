import React from 'react';
import { connect } from 'react-redux';
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
            <span data-testid="email-field">{userLogin.email || 'Faça Login'}</span>
          </p>
          <p>
            <span>Despesa Total: R$</span>
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </h4>
      </header>
    )
  }

}

const mapStateToProps = state => ({
  userLogin: state.user});

export default connect(mapStateToProps)(Header);
