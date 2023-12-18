import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, Typography, Button, IconButton, Container } from '@mui/material';


export default function ProformasLista() {
    const navigate = useNavigate()
    const [proformas, setProformas] = useState([])

    const loadProformas = async () => {
        await axios.get('https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas')
            .then(res => {
                setProformas(res.data.proformas)
            })

    }
    const handleDelete = async (_id) => {
        try {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios/${_id}`, {
                method: "DELETE"
            })
            setProformas(proformas.filter((proforma) => proforma._id !== _id))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadProformas()
    }, [])
    return (
        <Container>
            <h2>Proformas</h2>
            {
                proformas.length > 0 ? (
                    proformas.map(i => (
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
                                    <Typography>Descripción: {i.producto}</Typography>

                                </div>
                                <div>

                                    {/* <IconButton
                                        variant='contained'
                                        color='success'
                                        onClick={() => navigate(`/${i._id}/editar-aluminio`)}
                                    >
                                        <EditIcon />
                                    </IconButton> */}

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
                    <h3>No hay proformas estamos trabajando en aquello</h3>
                )
            }

        </Container>
    )
}
