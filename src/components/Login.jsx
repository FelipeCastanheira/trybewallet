import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isEmailValid: false,
      isPasswordValid: false,
    };
  }

  handleUser = ({ target }) => {
    const { value } = target;
    const includesAt = value.includes('@');
    const includesDot = value.includes('.');
    this.setState({
      email: value,
      isEmailValid: includesAt && includesDot,
    })
  }

  handlePassword = ({ target }) => {
    const { value } = target;
    const MIN_LENGTH = 6;
    this.setState({
      password: value,
      isPasswordValid: value.length >= MIN_LENGTH,
    })
  }

  render() {
    const { email, isEmailValid, isPasswordValid } = this.state;
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
          onClick={() => this.props.login({ email })}
          disabled={ !isEmailValid || !isPasswordValid }
        >
          Entrar
        </button>
      </form>
    )        
  }

}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(login(e))});

export default connect(null, mapDispatchToProps)(Login);
