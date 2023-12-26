import { Box, Container, Typography, Grid, Paper } from '@mui/material'
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
        producto: '',
        vidrio: '',
        aluminio: '',
        alto: '',
        ancho: '',
        grosorVidrio: '',
        email: '',
        nickname: '',
        precio: ''
    })

    const loadProforma = async (_id) => {
        const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/${_id}`)
        const data = await res.json()
        setProforma({
            nombre: data.nombre,
            apellido: data.apellido,
            direccion: data.direccion,
            referencia: data.referencia,
            celular: data.celular,
            producto: data.producto,
            vidrio: data.vidrio,
            aluminio: data.aluminio,
            alto: data.alto,
            ancho: data.ancho,
            grosorVidrio: data.grosorVidrio,
            email: data.email,
            nickname: data.nickname,
            precio: data.precio
        })
    }
    useEffect(() => {
        if (params.id) {
            loadProforma(params.id)
        }
    }, [params.id])


    return (
        <Container style={{ marginTop: '2rem' }}>
            <Paper variant="outlined" style={{ padding: '1rem' }}>
                <Grid container justifyContent="center" alignItems="center" >
                    <Typography marginTop={2} marginBottom={3} variant='h4'>DETALLE DE MI PROFORMA</Typography>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Producto:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.producto} {proforma.apellido}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Vidrio:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.vidrio}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Aluminio:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.aluminio}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Alto:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.alto} cm</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Ancho:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.ancho} cm</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <strong style={{ width: '180px' }}>Grosor del vidrio:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}>{proforma.grosorVidrio} mm</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <Box marginTop={4}>
                    <Typography variant='h6'>Valor</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div style={{ display: 'flex',  }}>
                                <strong style={{ width: '180px' }}>Sub Total:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}> $ {proforma.precio}</Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <strong style={{ width: '180px' }}>IVA:</strong>
                                <Typography style={{ marginLeft: '0.5rem' }}> $ {proforma.precio*0.12}</Typography>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <strong style={{ width: '180px' }}>Total:</strong>
                                <Typography variant='h5' style={{ marginLeft: '0.5rem' }}> $ {(proforma.precio*0.12)+proforma.precio}</Typography>
                            </div>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default ProformaDetalle