import React, { useRef } from "react";
import bycriptjs from 'bycriptjs';

const PasswordEncrypt = () => {
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    console.log(password);
    const hashedPassword = bycriptjs.hashSync(password, 10);
    console.log(hashedPassword);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="senha" type="password" ref={passwordRef}/>
      <button type="submit">Enviar!</button>
    </form>
  )
}

export default PasswordEncrypt;