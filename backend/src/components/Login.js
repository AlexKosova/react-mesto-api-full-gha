import React from "react";
import AuthForm from "./AuthForm";

export default function Login ({onSubmit}) {

  return (
    <AuthForm 
    title="Вход"
    buttonText="Войти"
    onSubmit={onSubmit}
    />
  )
}