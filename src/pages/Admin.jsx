import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Admin = () => {
  const {user}= useAuth0()

  return (
    <div>Esta es la pantalla del administrador

    {JSON.stringify(user)}
    </ div>
  )
}

export default Admin