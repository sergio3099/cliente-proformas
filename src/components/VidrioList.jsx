import { Card, CardContent, Typography, Button, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const VidiroList = () => {
    const navigate = useNavigate()
    const [vidrios, setVidrios] = useState([])

    const loadVidrios = async () => {
        await axios.get('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipovidrios')
            .then(res => {
                setVidrios(res.data.tiposVidrios)
            })

    }
    const handleDelete = async (_id) => {
        try {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipovidrios/${_id}`, {
                method: "DELETE"
            })
            setVidrios(tiposVidrios.filter((vidrio) => vidrio._id !== _id))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadVidrios()
    }, [])

    return (
        <Container>
            <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
                onClick={() => navigate("/nuevo-vidrio")}

            >
                Vidrio Nuevo
            </Button>
            <h2>Vidrios</h2>
            {
                vidrios.length > 0 ? (
                    vidrios.map(i => (
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
                                    <Typography><strong>Nombre:</strong>        {i.nombre}</Typography>
                                    <Typography><strong>Descripción:</strong>   {i.descripcion}</Typography>
                                    <Typography><strong>Valor (m2):</strong>    $ {i.valor}</Typography>
                                    
                                </div>
                                <div>

                                    <IconButton
                                        variant='contained'
                                        color='success'
                                        onClick={() => navigate(`/${i._id}/editar-vidrio`)}
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
                    <h3>No hay vidrios estamos trabajando en aquello</h3>
                )
            }

        </Container>
    )
}

export default VidiroList