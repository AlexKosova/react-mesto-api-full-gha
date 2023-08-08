import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

export default function Register 
({onSubmit}) {

  return (
    <AuthForm 
    title="Регистрация"
    buttonText="Зарегестрироваться"
    children={
      <h4 className="auth__postscriptLink">Уже зарегестрированы? <Link className="auth__postscriptLink" to="/sign-in">Войти</Link></h4>
    }
    onSubmit={onSubmit} />
  )
}