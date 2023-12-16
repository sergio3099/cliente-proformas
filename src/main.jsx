import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-40dviqvcmcg18n7f.us.auth0.com"
      clientId="TfslEPr4NMdEspoSfvJ0X5XEZStxRfJx"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>

  </React.StrictMode>,
  console.log(Auth0Provider.domain)
  )
  