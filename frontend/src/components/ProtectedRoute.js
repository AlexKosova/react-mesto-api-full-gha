import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({Component, ...props}) {
  return (
        props.isLoggedIn ? <Component {...props}/> : <Navigate to="/sign-in" replace/>
  )
}