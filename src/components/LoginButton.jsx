import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
// import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';

const LoginButton = () => {

    const { loginWithRedirect } = useAuth0();
  return (
    <Button 
    variant='contained' color='success'
    onClick={() => loginWithRedirect()}
    
    >Iniciar sesión
    </Button>
   
  )
}

export default LoginButton