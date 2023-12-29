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

    const fetchProductName = async (_id) => {
        try {
            const res = await axios.get(
                `https://backend-proformas.onrender.com/v1/softwareproformas/api/productos/${_id}`
            );
            return res.data.nombre;
        } catch (error) {
            console.error('Error fetching product name:', error);
            return 'Nombre no disponible';
        }
    };

    const handleDelete = async (_id) => {
        try {
            await axios.delete(
                `https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/${_id}`
            );
            setProformas(proformas.filter((proforma) => proforma._id !== _id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadProformas = async () => {
            try {
                let proformasData = [];
                if (user.nickname === 'admin-support') {
                    const res = await axios.get(
                        'https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/'
                    );
                    proformasData = res.data.proformas;
                } else {
                    const res = await axios.get(
                        'https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas/'
                    );
                    proformasData = res.data.proformas.filter(
                        (proforma) => proforma.nickname === user.nickname
                    );
                }

                const updatedProformas = [];
                for (const proforma of proformasData) {
                    const updatedProducts = [];
                    for (const productos of proforma.productosProforma) {
                        const productName = await fetchProductName(productos[0].producto);
                        updatedProducts.push({ ...productos[0], nombre: productName });
                    }
                    updatedProformas.push({
                        ...proforma,
                        productosProforma: updatedProducts,
                    });
                }
                setProformas(updatedProformas);
            } catch (error) {
                console.error('Error loading proformas:', error);
            }
        };

        loadProformas();
    }, [user.nickname]);

    return (
        <Container>
            <h2>Proformas</h2>
            {
                proformas.length > 0 ? (
                    proformas.map((proforma) => (
                        <Card key={proforma._id}
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
                                    <Typography>
                                        <strong>Nombre:</strong> {proforma.nombre}
                                    </Typography>
                                    <Typography>
                                        <strong>Precio:</strong> ${proforma.precio}
                                    </Typography>
                                    <Typography>
                                        <strong>Productos:</strong>{' '}
                                        {proforma.productosProforma.map((productos, index) => (
                                            <span key={index}>
                                                {index > 0 && ', '}
                                                {productos.nombre}
                                            </span>
                                        ))}
                                    </Typography>

                                </div>
                                <div>
                                    <Button
                                        component={Link}
                                        sx={{ my: 2, color: 'black' }}
                                        onClick={() => navigate(`/${proforma._id}/proforma`)}
                                    >Ver detalles</Button>

                                    <IconButton
                                        variant='contained'
                                        color='error'
                                        onClick={() => handleDelete(proforma._id)}
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
