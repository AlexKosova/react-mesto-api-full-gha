import React from "react";

export default function AuthForm ({title, buttonText, children, onSubmit}) {

  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  function handleEmail (e) {
    setEmail(e.target.value)
  }

  function handlePass (e) {
    setPass(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onSubmit({
      "password": pass,
      "email": email
    })
  }

  return (
    <section className="auth">
      <form onSubmit={handleSubmit} className="auth__form">
        <h2 className="auth__title">{title}</h2>
        <div className="auth__input-area">
          <input value={email} onChange={handleEmail} className="auth__input auth__email" type="email" placeholder="Email"></input>
        <input value={pass} onChange={handlePass} type="password" className="auth__input auth__password" placeholder="Пароль"></input>
        </div>
        <button type="submit" className="auth__submit-button" >{buttonText}</button>
      </form>
      {children}
    </section>
  )
}