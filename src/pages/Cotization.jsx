import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../pages/DataPrice';
import PaymentForm from '../pages/PaymenForm';
import Review from '../pages/Review';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/sergio3099">
        Código Fuente
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Datos Cliente', 'Producto', 'Detalles Cotización'];


const theme = createTheme();

export default function Checkout() {

  const {user, isAuthenticated} = useAuth0()
  const [activeStep, setActiveStep] = React.useState(0);

  const [formData, setFormData] = React.useState({
    // Aquí agrega todos los campos de los formularios
    nombre: '',
    apellido: '',
    direccion: '',
    referencia: '',
    celular: '',
    selectedProduct: null,
    selectedVidrio: null,
    selectedAluminio: null,
    alto: '',
    ancho: '',
    grosorVidrio: '',
    email: user.email,
    // Otros campos si los hay
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm formData={formData} setFormData={setFormData} />
        );
      case 1:
        return (
          <PaymentForm formData={formData} setFormData={setFormData} />
        );
      case 2:
        return (
          <Review formData={formData} />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
      });

      if (response.ok) {
        alert('Se ha guardado con éxito');
        navigate('/home');
      } else {
        alert('Hubo un problema al guardar la cotización');
      }
    } catch (error) {
      console.error('Ocurrió un error al procesar la solicitud:', error);
      alert('Ocurrió un error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >

      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Cotización
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </form>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Gracias por su cotización.
              </Typography>
              <Typography variant="subtitle1">
                Su cotizacion ha sido guardada exitosamente
              </Typography>
              <Button
                variant='contained'
                color='primary'
                size='large'
                sx={{ m: 1 }}
                endIcon={<AddIcon fontSize='large' />}
                onClick={() => window.location.reload(true)}
              >
                Nueva Cotización
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* Botones para navegar entre los pasos */}
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Atrás
                </Button>
                <Button type='submit' variant="contained" onClick={() => {

                  if (activeStep === steps.length - 1) {
                    handleSubmit(handleSubmit); // Llama a la función para guardar los datos en la colección
                    // Puedes añadir acciones adicionales aquí después de guardar los datos si es necesario
                  }
                  handleNext();
                }
                }
                >
                  {activeStep === steps.length - 1 ? 'Guardar cotización' : 'Siguiente'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider >
  );
}