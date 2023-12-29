import { Box, Container, Typography, Grid, Paper, Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProformaDetalle = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [proforma, setProforma] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        referencia: '',
        celular: '',
        email: '',
        nickname: '',
        precio: '',
        productosProforma: []
    })

    const [productNames, setProductNames] = useState([]);
    const [glassNames, setGlassNames] = useState([]);
    const [aluminumNames, setAluminumNames] = useState([]);

    const fetchProductNames = async (_id) => {
        try {
            const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/productos/${_id}`);
            const data = await res.json();
            // Map the product IDs to their respective names
            setProductNames(prevState => ({
                ...prevState,
                [_id]: data.nombre
            }));
        } catch (error) {
            console.error('Error fetching product names', error);
        }

    };

    const fetchAllProductNames = async () => {
        try {
            // Iterar sobre los productos en proforma y obtener los nombres por _id
            for (const subArray of proforma.productosProforma) {
                for (const producto of subArray) {
                    await fetchProductNames(producto.producto);
                }
            }
        } catch (error) {
            console.error('Error al obtener nombres de productos:', error);
        }
    };
    const fetchGlassNames = async (_id) => {
        try {
            const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoVidrios/${_id}`);
            if (res.ok) {
                const data = await res.json();
                setGlassNames(prevState => ({
                    ...prevState,
                    [_id]: data.nombre || 'Tipo de vidrio no encontrado'
                }));
            } else {
                console.error(`Error al obtener datos del tipo de vidrio con ID ${_id}. Estado de respuesta: ${res.status}`);
            }
        } catch (error) {
            console.error(`Error al obtener el tipo de vidrio con ID ${_id}:`, error);
        }
    };

    const fetchAllGlassNames = async () => {
        try {
            for (const subArray of proforma.productosProforma) {
                for (const producto of subArray) {
                    await fetchProductNames(producto.producto);
                    await fetchGlassNames(producto.vidrio);
                }
            }
        } catch (error) {
            console.error('Error al obtener nombres de vidrios:', error);
        }
    };

    const fetchAluminumNames = async (_id) => {
        try {
            const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoAluminios/${_id}`);
            if (res.ok) {
                const data = await res.json();
                setAluminumNames(prevState => ({
                    ...prevState,
                    [_id]: data.nombre || 'Tipo de aluminio no encontrado'
                }));
            } else {
                console.error(`Error al obtener datos del tipo de aluminio con ID ${_id}. Estado de respuesta: ${res.status}`);
            }
        } catch (error) {
            console.error(`Error al obtener el tipo de aluminio con ID ${_id}:`, error);
        }
    };

    const fetchAllAluminumNames = async () => {
        try {
            for (const subArray of proforma.productosProforma) {
                for (const producto of subArray) {
                    await fetchProductNames(producto.producto);
                    await fetchGlassNames(producto.vidrio);
                    await fetchAluminumNames(producto.aluminio);
                }
            }
        } catch (error) {
            console.error('Error al obtener nombres de aluminio:', error);
        }
    };

    const loadProforma = async (_id) => {
        try {
            const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/${_id}`)
            const data = await res.json()
            setProforma({
                nombre: data.nombre,
                apellido: data.apellido,
                direccion: data.direccion,
                referencia: data.referencia,
                celular: data.celular,
                email: data.email,
                nickname: data.nickname,
                precio: data.precio,
                productosProforma: data.productosProforma
            })

        } catch (error) {
            console.error('No se encuentran los datos', error);
        }
    }
    useEffect(() => {
        if (params.id) {
            loadProforma(params.id)
        }
    }, [params.id])

    useEffect(() => {
        if (proforma.productosProforma.length > 0) {
            fetchAllProductNames()
            fetchAllGlassNames()
            fetchAllAluminumNames()
        }
    }, [proforma.productosProforma])

    return (
        <Container style={{ marginTop: '2rem' }}>
            <Paper variant="outlined" style={{ padding: '1rem' }}>
                <Grid container justifyContent="center" alignItems="center" >
                    <Typography marginTop={2} marginBottom={3} variant='h4'>DETALLES DE MI PROFORMA</Typography>
                </Grid>
                <Box>
                    <Typography variant='h6'>Datos del cliente</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Nombres y apellidos:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.nombre} {proforma.apellido}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Correo electrónico:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.email}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Celular:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.celular}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Dirección:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.direccion}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Referencia:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.referencia}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <Box marginTop={4}>
                    <Typography variant='h6'>Detalles del producto</Typography>
                    {proforma.productosProforma.map((subArray, index) => (
                        <Card sx={{ mb: 1 }} key={index}>
                            {subArray.map((producto, idx) => (
                                <CardContent item xs={12} sm={6} key={idx}>
                                    <Grid item xs={12} sm={6}>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong style={{ width: '250px' }}>Nombre del producto:  </strong>
                                            <Typography>
                                                {productNames[producto.producto] || 'Nombre no encontrado'}
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong style={{ width: '250px' }}>Tipo de vidrio:  </strong>
                                            <Typography>
                                                {glassNames[producto.vidrio] || 'Nombre no encontrado'}
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong style={{ width: '250px' }}>Tipo de aluminio:  </strong>
                                            <Typography>
                                                {aluminumNames[producto.aluminio] || 'Nombre no encontrado'}
                                            </Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong style={{ width: '250px' }}>Alto:  </strong>
                                            <Typography>{producto.alto}</Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong style={{ width: '250px' }}>Ancho:  </strong>
                                            <Typography>{producto.ancho}</Typography>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong style={{ width: '250px' }}>Grosor de vidrio:  </strong>
                                            <Typography>{producto.grosorVidrio}</Typography>
                                        </div>

                                    </Grid>
                                </CardContent>
                            ))}

                        </Card>

                    ))}

                </Box>
                <Box marginTop={4}>
                    <Typography variant='h6'>Valor</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', }}>
                                <strong style={{ width: '180px' }}>Sub Total:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}> $ {proforma.precio}</Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <strong style={{ width: '180px' }}>IVA:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}> $ {proforma.precio * 0.12}</Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <strong style={{ width: '180px' }}>Total:</strong>
                                <Typography variant='h5' style={{ marginLeft: '0.5rem' }}> $ {(proforma.precio * 0.12) + proforma.precio}</Typography>
                            </div>

                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default ProformaDetalle