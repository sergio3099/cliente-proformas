import {Navigate, Outlet} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

export const ProtectedRoute = ({isAllowed, children, redirectTo="/landing"})=> {

    if(!isAllowed){
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}