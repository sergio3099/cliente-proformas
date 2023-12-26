import * as React from 'react';
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import InputAdornment from '@mui/material/InputAdornment'
import { MenuItem } from '@mui/material';

export default function PaymentForm({ formData, setFormData }) {
    const [productos, setProductos] = useState([])
    const [vidrios, setVidiros] = useState([])
    const [aluminios, setAluminios] = useState([])
    const animatedComponents = makeAnimated()

 
    const loadProductos = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/productos')
        const data = await res.json()
        setProductos(data.productos)
        let options = productos.map(i => {
            return { value: `${i.nombre}`, label: `${i.nombre}` }
        })
        const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
            (searchValue.toLocaleLowerCase()))
        return filterOptions
    }
    const loadVidrios = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipovidrios')
        const data = await res.json()
        setVidiros(data.tiposVidrios)
        let options = vidrios.map(i => {
            return { value: `${i.nombre}`, label: `${i.nombre}` }
        })
        const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
            (searchValue.toLocaleLowerCase()))
        return filterOptions
    }
    const loadAluminios = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios')
        const data = await res.json()
        setAluminios(data.tipoAluminios)
        let options = aluminios.map(i => {
            return { value: `${i.nombre}`, label: `${i.nombre}` }
        })
        const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
            (searchValue.toLocaleLowerCase()))
        return filterOptions
    }

    useEffect(() => {
        loadProductos();
        loadVidrios();
        loadAluminios();
    }, [])

    const handleProductoChange = (selectedOption) => {
        setFormData({ ...formData, producto: selectedOption.value });
    };

    const handleVidrioChange = (selectedOption) => {
        setFormData({ ...formData, vidrio: selectedOption.value });
    };

    const handleAluminioChange = (selectedOption) => {
        setFormData({ ...formData, aluminio: selectedOption.value });
    };


    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <React.Fragment>

            <Grid container spacing={3} component="form">
                <Grid item xs={12}  >

                    <Typography>Producto</Typography>
                    <AsyncSelect
                        placeholder="seleccione un producto"
                        loadOptions={loadProductos}
                        components={animatedComponents}
                        onChange={handleProductoChange}
                        value={formData.producto ? { value: formData.producto, label: formData.producto } : null}
                    />
                    {console.log(formData.producto.value)}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Tipo de vidrio</Typography>
                    <AsyncSelect

                        placeholder="seleccione un vidrio"
                        loadOptions={loadVidrios}
                        components={animatedComponents}
                        onChange={handleVidrioChange}
                        value={formData.vidrio ? { value: formData.vidrio, label: formData.vidrio } : null}

                    />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography>Tipo aluminio</Typography>
                    <AsyncSelect
                        placeholder="seleccione un aluminio"
                        loadOptions={loadAluminios}
                        components={animatedComponents}
                        onChange={handleAluminioChange}
                        value={formData.aluminio ? { value: formData.aluminio, label: formData.aluminio } : null}
                    />

                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type='Number'
                        name='alto'
                        label="Ingrese el alto"
                        value={formData.alto}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type='Number'
                        name='ancho'
                        label="Ingrese el ancho"
                        autoComplete="shipping address-line2"
                        onChange={handleChange}
                        value={formData.ancho}
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type='Number'
                        name="grosorVidrio"
                        label="Ingrese el grosor del vidrio"
                        autoComplete="shipping address-line2"
                        onChange={handleChange}
                        value={formData.grosorVidrio}
                        variant="standard"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}