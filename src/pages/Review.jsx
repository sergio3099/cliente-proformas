import * as React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Review({ formData, data }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de Cotización
      </Typography>
      <Typography>Se enviará su proforma al siguiente correo electrónico</Typography>
      <Typography><strong>{formData.email}</strong></Typography>
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