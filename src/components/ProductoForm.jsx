import {
    Card,
    Typography,
    Grid,
    CardContent,
    Button,
    TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductoForm() {
    const [productos, setProductos] = useState({
        nombre: '',
        descripcion: ''
    })
    const navigate = useNavigate();
    const handleChange = e => setProductos({ ...productos, [e.target.name]: e.target.value });
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const params = useParams()

    const loadProducto = async (_id) => {
        const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/productos/${_id}`)
        const data = await res.json();
        setProductos({
            nombre: data.nombre,
            descripcion: data.descripcion,

        })
        setEditing(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        if (editing) {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/productos/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(productos),
                headers: { "Content-Type": "application/json" }
            })
        } else {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/productos/`, {
                method: 'POST',
                body: JSON.stringify(productos),
                headers: { "Content-Type": "application/json" }
            })
        }
        setLoading(false);
        if (editing) {
            alert('Se ha editado con exito')
        } else {
            alert('Se ha guardado con exito')
        }
        navigate('/producto')
    }

    useEffect(() => {
        if (params.id) {
            loadProducto(params.id)
        }
    }, [params.id])

    return (
        <Grid

            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            item
            xs={7}
        >
            <Grid item xs={5}>
                <Card
                    sx={{ mt: 5 }}
                    style={{ padding: '1rem' }}
                >
                    <Typography
                        component='div'
                        variant='5'
                        textAlign='center'

                    >
                        {editing ? "Editar Producto" : "Nuevo Producto"}

                    </Typography>
                    <CardContent
                        sx={{ display: 'center' }}

                    >
                        <form onSubmit={handleSubmit}
                        
                        >
                            <TextField

                                variant='filled'
                                label='Nombre'
                                onChange={handleChange}
                                name='nombre'
                                value={productos.nombre}
                                style={{ margin: '.5rem 0' }}
                                fullWidth
                            />
                            <TextField

                                variant='filled'
                                label='Decripción'
                                onChange={handleChange}
                                name='descripcion'
                                value={productos.descripcion}
                                style={{ margin: '.5rem 0' }}
                                fullWidth
                            />
                           

                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                {" "}
                                {editing ? "Editar" : "Guardar"}</Button>



                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    )
}
