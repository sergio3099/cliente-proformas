import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent, Typography, Button, IconButton, Container, Link } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'

export default function ProformasLista() {
    const navigate = useNavigate()
    const [proformas, setProformas] = useState([])
    const { user } = useAuth0()

    const loadProformas = async () => {
        if (user.nickname === 'admin-support') {
            // Si el usuario es 'admin-support', carga todas las proformas sin filtrar
            await axios.get(`https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/`)
                .then(res => {
                    setProformas(res.data.proformas);
                });
        } else {
            // Si el usuario no es 'admin-support', filtra las proformas por su nickname
            await axios.get(`https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/`)
                .then(res => {
                    const filteredProformas = res.data.proformas.filter(proforma => proforma.nickname === user.nickname);
                    setProformas(filteredProformas);
                });
        }
    };
    const handleDelete = async (_id) => {
        try {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/${_id}`, {
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
                                    <Typography><strong>Nombre:</strong> {i.nombre}</Typography>
                                    <Typography><strong>Descripción:</strong> {i.producto}</Typography>
                                    <Typography><strong>Precio:</strong> ${i.precio}</Typography>

                                </div>
                                <div>
                                    <Button
                                        component={Link}
                                        sx={{ my: 2, color: 'black' }}
                                        onClick={() => navigate(`/${i._id}/proforma`)}
                                    >Ver detalles</Button>

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
