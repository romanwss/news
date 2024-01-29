import React, { useState } from 'react';
import './Registration.css';

function Registration({ setModalBox, setMessage }) {
  const [errorMessage, setErrorMessage] = useState('');

  function Reg() {
    const email = document.getElementById('email').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('pass').value;

    

   

    

    const data = {
      email: email,
      login: login,
      password: password
    };

    const api = 'http://127.0.0.1:9001/registration'; 

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((result) => {
        const message = result.message;
        setMessage(message);
        setModalBox('MessageBox');
      })
      .catch((error) => {
        setErrorMessage('Произошла ошибка при отправке данных');
        console.error('Ошибка:', error);
      });
  }

  return (
    <div className="Registration">
      <h1>Регистрация:</h1>
      <input id='email' placeholder='E-Mail' type='email' />
      <input id='login' placeholder='Логин' type='text' />
      <input id='pass' placeholder='Пароль' type='password' />
      <button id='send' onClick={Reg}>Регистрация</button>
      <p id='error'>{errorMessage}</p>
    </div>
  );
}

export default Registration;
