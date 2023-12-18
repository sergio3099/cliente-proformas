import { Card, CardContent, Typography, Button, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductoList = () => {
    const navigate = useNavigate()
    const [productos, setProductos] = useState([])

    const loadProductos = async () => {
        await axios.get('https://backend-proformas.onrender.com/v1/softwareproformas/api/productos')
            .then(res => {
                setProductos(res.data.productos)
            })

    }
    const handleDelete = async (_id) => {
        try {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/productos/${_id}`, {
                method: "DELETE"
            })
            setProductos(productos.filter((producto) => producto._id !== _id))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadProductos()
    }, [])

    return (
        <Container>
            <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
                onClick={() => navigate("/nuevo-producto")}

            >
                Producto Nuevo
            </Button>
            <h2>Productos</h2>
            {
                productos.length > 0 ? (
                    productos.map(i => (
                        <Card key={i._id}
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
                                    <Typography>Nombre: {i.nombre}</Typography>
                                    <Typography>Descripción: {i.descripcion}</Typography>
                                    
                                </div>
                                <div>

                                    <IconButton
                                        variant='contained'
                                        color='success'
                                        onClick={() => navigate(`/${i._id}/editar-producto`)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        variant='contained'
                                        color='error'
                                        onClick={() => handleDelete(i._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <h3>No hay productos estamos trabajando en aquello</h3>
                )
            }

        </Container>
    )
}

export default ProductoList