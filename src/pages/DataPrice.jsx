import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import {
    Typography,
    Grid,
    TextField
} from '@mui/material';

export default function AddressForm() {
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        referencia: '',
        celular: ''
    })

    const handleChange = e => setDatos({ ...datos, [e.target.name]: e.target.value });


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Datos de Cliente
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="firstName"
                        onChange={handleChange}
                        name="nombre"
                        label="Nombre"
                        value={datos.nombre}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        // id="lastName"
                        onChange={handleChange}
                        name="apellido"
                        label="Apellido"
                        value={datos.apellido}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        // id="address1"
                        onChange={handleChange}
                        name="direccion"
                        label="Dirección"
                        value={datos.direccion}
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        // id="address2"
                        onChange={handleChange}
                        name="referencia"
                        label="Referencia"
                        value={datos.referencia}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        // id="address2"
                        type='Number'
                        onChange={handleChange}
                        name="celular"
                        label="Celular"
                        value={datos.celular}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>



            </Grid>
        </React.Fragment>
    );
}