import * as React from 'react'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review({ formData }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de Cotización
      </Typography>
      <Grid item xs={12}>
        <Typography variant='h7' gutterBottom>{formData.producto ? formData.producto : ''}</Typography>
        <Typography variant='h6'>Materiales</Typography>

        
        
      </Grid>
      <Grid container>
        <React.Fragment >
          <Grid item xs={6}>
            <Typography >Vidrio:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{formData.vidrio ? formData.vidrio : ''}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Aluminio:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{formData.aluminio ? formData.aluminio : ''}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Grosor del vidrio:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{formData.grosorVidrio}</Typography>
          </Grid>
        </React.Fragment>
        <Typography variant='h6'>Medidas</Typography>
      </Grid>
      <Grid container>
        <React.Fragment >
          <Grid item xs={6}>
            <Typography >Alto:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{formData.alto}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Ancho:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{formData.ancho}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>Grosor del vidrio:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{formData.grosorVidrio}</Typography>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles cliente
          </Typography>
          <Typography gutterBottom>{formData.nombre}</Typography>
          <Typography gutterBottom>{formData.apellido}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Localidad
          </Typography>
          <Grid container>
            <React.Fragment >
              <Grid item xs={6}>
                <Typography gutterBottom>Dirección:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{formData.direccion}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Referencia:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{formData.referencia}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Celular:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{formData.celular}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}