import * as React from 'react';
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import InputAdornment from '@mui/material/InputAdornment'
import { Button, Card, CardContent, IconButton, List, ListItem, ListItemText, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PaymentForm({ formData, setFormData, data, setData, handleInputChange, handleAgregarProducto }) {
    const [productos, setProductos] = useState([])
    const [productosAgregados, setProductosAgregados] = useState([]);
    const [vidrios, setVidiros] = useState([])
    const [aluminios, setAluminios] = useState([])
    const animatedComponents = makeAnimated()

    const handleChange = (event) => {
        handleInputChange(event)
    }

    const loadProductos = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/productos')
        const data = await res.json()
        setProductos(data.productos)
        let options = productos.map(i => {
            return { value: `${i._id}`, label: `${i.nombre}` }
        })
        const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
            (searchValue.toLocaleLowerCase()))
        return Promise.resolve(filterOptions);
    }
    const loadVidrios = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipovidrios')
        const data = await res.json()
        setVidiros(data.tiposVidrios)
        let options = vidrios.map(i => {
            return { value: `${i._id}`, label: `${i.nombre}` }
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
            return { value: `${i._id}`, label: `${i.nombre}` }
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

        const getProductLabel = (productId) => {
            const selectedProduct = productos.find(product => product._id === productId);
            return selectedProduct ? selectedProduct.nombre : '';
        };
        const getVidrioLabel = (vidrioId) => {
            const selectedVidrio = vidrios.find(vidri => vidri._id === vidrioId);
            return selectedVidrio ? selectedVidrio.nombre : '';
        };
        const getAluminioLabel = (aluminioId) => {
            const selectedAluminio = aluminios.find(alum => alum._id === aluminioId);
            return selectedAluminio ? selectedAluminio.nombre : '';
        };



        const handleAddProduct = () => {
            // calculo de precio

            const nuevoProducto = {
                producto: data.producto ? data.producto.value : '',
                vidrio: data.vidrio ? data.vidrio.value : '',
                aluminio: data.aluminio ? data.aluminio.value : '',
                alto: formData.alto || '',
                ancho: formData.ancho || '',
                grosorVidrio: formData.grosorVidrio || '',

            };
            setProductosAgregados([...productosAgregados, nuevoProducto]);
            handleAgregarProducto();
            setData({
                producto: null,
                vidrio: null,
                aluminio: null,
                alto: '',
                ancho: '',
                grosorVidrio: '',
            });
        };
        const handleDeleteProduct = (index) => {
            const updatedProductosAgregados = [...productosAgregados];
            updatedProductosAgregados.splice(index, 1); // Eliminar el producto en el índice proporcionado
            setProductosAgregados(updatedProductosAgregados); // Actualizar la lista de productos agregados
    
            const updatedProductosTemporales = [...productosTemporales];
            updatedProductosTemporales.splice(index, 1); // Eliminar el producto correspondiente en la lista de productos temporales
            setProductosTemporales(updatedProductosTemporales); // Actualizar la lista de productos temporales
        };

        return (
            <React.Fragment>

                <Grid container spacing={3} component="form">
                    <Grid item xs={12}  >


                        <Typography>Producto</Typography>
                        <AsyncSelect
                            placeholder="Seleccione un producto"
                            loadOptions={loadProductos}
                            components={animatedComponents}
                            onChange={(selectedOption) => setData({ ...data, producto: selectedOption })}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography>Tipo de vidrio</Typography>
                        <AsyncSelect

                            placeholder="seleccione un vidrio"
                            loadOptions={loadVidrios}
                            components={animatedComponents}
                            onChange={(selectedOption) => setData({ ...data, vidrio: selectedOption })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography>Tipo aluminio</Typography>
                        <AsyncSelect
                            placeholder="seleccione un aluminio"
                            loadOptions={loadAluminios}
                            components={animatedComponents}
                            onChange={(selectedOption) => setData({ ...data, aluminio: selectedOption })}
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
                    <Grid item xs={12} sm={6} mb={2}>
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}

                >


                    Agregar Producto
                </Button>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Productos Agregados
                    </Typography>
                    {
                        productosAgregados.length > 0 ? (
                            productosAgregados.map((producto, index) => (
                                <Card key={index}
                                    style={{
                                        background: "#90caf9",

                                    }}
                                    sx={{ mb: 1 }}
                                >
                                    <CardContent
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "10px"

                                        }}
                                    >
                                        <div>
                                            <Typography> <strong>Nombre producto:</strong> {getProductLabel(producto.producto)}</Typography>
                                        </div>
                                        <div>
                                            <IconButton
                                                variant='contained'
                                                color='error'
                                                onClick={() => handleDeleteProduct(index)}>                                            
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <h3>Agregue un producto a su proforma</h3>
                        )
                    }

                </Grid>
            </React.Fragment>
        );
    }