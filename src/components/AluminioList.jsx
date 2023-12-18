import { Card, CardContent, Typography, Button, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AluminioList() {
    const navigate = useNavigate()
    const [aluminios, setAluminios] = useState([])

    const loadAluminio = async () => {
        await axios.get('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios')
            .then(res => {
                setAluminios(res.data.tipoAluminios)
            })

    }
    const handleDelete = async (_id) => {
        try {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios/${_id}`, {
                method: "DELETE"
            })
            setAluminios(tipoAluminios.filter((aluminio) => aluminio._id !== _id))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadAluminio()
    }, [])



    return (
        <Container>
            <Button
                variant='contained'
                color='primary'
                sx={{ mt: 2 }}
                onClick={() => navigate("/nuevo-aluminio")}

            >
                Aluminio Nuevo
            </Button>
            <h2>Aluminios</h2>
            {
                aluminios.length > 0 ? (
                    aluminios.map(i => (
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
                                        onClick={() => navigate(`/${i._id}/editar-aluminio`)}
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
                    <h3>No hay aluminio estamos trabajando en aquello</h3>
                )
            }

        </Container>
    )
}
