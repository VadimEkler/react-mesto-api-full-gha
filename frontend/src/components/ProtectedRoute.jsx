import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: ProtectedComponent, loggedIn, ...props }) {

  return (
    loggedIn ?
      <ProtectedComponent {...props}/>
      : <Navigate to={'/sign-in'} replace />
  )
}