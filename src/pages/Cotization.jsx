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
import { useAuth0 } from '@auth0/auth0-react'
import BasicModal from '../components/BasicModal'


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

  const { user, isAuthenticated } = useAuth0()
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [formData, setFormData] = React.useState({
    nombre: '',
    apellido: '',
    direccion: '',
    referencia: '',
    celular: '',
    precio: '',
    email: user.email,
    nickname: user.nickname,
    productosProforma: [],
  });

  const [data, setData] = React.useState({
    producto: '',
    vidrio: '',
    aluminio: '',
    alto: '',
    ancho: '',
    grosorVidrio: '',
    precio: ''

  })

  const resetFormData = () => {
    setFormData({
      nombre: '',
      apellido: '',
      direccion: '',
      referencia: '',
      celular: '',
      precio: '',
      email: user.email,
      nickname: user.nickname,
      productosProforma: []

    });
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [productosTemporales, setProductosTemporales] = React.useState([]);
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <PaymentForm
            formData={formData}
            setFormData={setFormData}
            data={data}
            setData={setData}
            handleInputChange={handleInputChange}
            handleAgregarProducto={handleAgregarProducto}
            productosTemporales={productosTemporales}
            setProductosTemporales={setProductosTemporales}
          />
        );
      case 2:
        return (
          <Review formData={formData} setData={setData} data={data}/>
        );
      default:
        throw new Error('Unknown step');
    }
  };



  const handleAgregarProducto = () => {
    const alto = parseFloat(data.alto);
    const ancho = parseFloat(data.ancho);

    if (!isNaN(alto) && !isNaN(ancho) && alto > 0 && ancho > 0) {
      const precio = alto + ancho + 10;

      const nuevoProducto = {
        producto: data.producto.value,
        vidrio: data.vidrio.value,
        aluminio: data.aluminio.value,
        alto: data.alto,
        ancho: data.ancho,
        grosorVidrio: data.grosorVidrio,
        precio: precio.toFixed(2)
      };

      setProductosTemporales([...productosTemporales, nuevoProducto]);

      setFormData({
        ...formData,
        productosProforma: [...formData.productosProforma, nuevoProducto],
      });

      setData({
        producto: '',
        vidrio: '',
        aluminio: '',
        alto: '',
        ancho: '',
        grosorVidrio: '',
      });
    } else {
      alert('Por favor, ingrese valores válidos y mayores que cero para alto y ancho.');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setModalOpen(true);

      const arreglo = productosTemporales.map((productoTemp) => ({
        producto: productoTemp.producto,
        vidrio: productoTemp.vidrio,
        aluminio: productoTemp.aluminio,
        alto: productoTemp.alto,
        ancho: productoTemp.ancho,
        grosorVidrio: productoTemp.grosorVidrio,
        precio: parseFloat(productoTemp.precio)
      }));

      const precioTotal = arreglo.reduce((total, producto) => total + producto.precio, 0);

      const response = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          direccion: formData.direccion,
          referencia: formData.referencia,
          celular: formData.celular,
          email: formData.email,
          nickname: formData.nickname,
          productosProforma: arreglo,
          precio: precioTotal.toFixed(2)
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('Se ha guardado con éxito');
        navigate('/home');
        setProductosTemporales([])
        resetFormData(  )
      } else {
        alert('Hubo un problema al guardar la cotización');
      }
    } catch (error) {
      console.error('Ocurrió un error al procesar la solicitud:', error);
      alert('Ocurrió un error al procesar la solicitud');
    } finally {
      setLoading(false);
      setModalOpen(false);
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
                onClick={() => {
                  resetFormData(); // Restablecer el estado del formulario
                  setActiveStep(0); // Reiniciar al primer paso
                }}
              >
                Nueva Cotización
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, formData, setFormData)}
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
          {/* {loading && <LinearIndeterminate />} */}
          <BasicModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider >
  );
}