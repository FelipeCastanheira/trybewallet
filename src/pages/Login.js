import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      isEmailValid: false,
      isPasswordValid: false,
    };
  }

  handleUser = ({ target }) => {
    const { value } = target;
    const includesAt = value.includes('@');
    const includesDot = value.includes('.com');
    this.setState({
      email: value,
      isEmailValid: includesAt && includesDot,
    });
  }

  handlePassword = ({ target }) => {
    const { value } = target;
    const MIN_LENGTH = 6;
    this.setState({
      isPasswordValid: value.length >= MIN_LENGTH,
    });
  }

  handleClick = () => {
    const { login: loginAction, history } = this.props;
    const { email } = this.state;
    loginAction({ email });
    history.push('/carteira');
  }

  render() {
    const { isEmailValid, isPasswordValid } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          <h5>Usuário:</h5>
          <input
            data-testid="email-input"
            onChange={ this.handleUser }
            placeholder="email"
            type="email"
          />
        </label>
        <label htmlFor="password-input">
          <h5>Senha:</h5>
          <input
            data-testid="password-input"
            placeholder="password"
            onChange={ this.handlePassword }
            type="password"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ !isEmailValid || !isPasswordValid }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e)) });

export default connect(null, mapDispatchToProps)(Login);
