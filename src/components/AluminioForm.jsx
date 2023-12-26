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
import InputAdornment from '@mui/material/InputAdornment'


export default function AluminioForm() {

    const [aluminios, setAluminios] = useState({
        nombre: '',
        descripcion: '',
        valor: ''
    })
    const navigate = useNavigate();
    const handleChange = e => setAluminios({ ...aluminios, [e.target.name]: e.target.value });
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const params = useParams()

    const loadAluminio = async (_id) => {
        const res = await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios/${_id}`)
        const data = await res.json();
        setAluminios({
            nombre: data.nombre,
            descripcion: data.descripcion,
            valor: data.valor

        })
        setEditing(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        if (editing) {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(aluminios),
                headers: { "Content-Type": "application/json" }
            })
        } else {
            await fetch(`https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios/`, {
                method: 'POST',
                body: JSON.stringify(aluminios),
                headers: { "Content-Type": "application/json" }
            })
        }
        setLoading(false);
        if (editing) {
            alert('Se ha editado con exito')
        } else {
            alert('Se ha guardado con exito')
        }
        navigate('/aluminio')
    }

    useEffect(() => {
        if (params.id) {
            loadAluminio(params.id)
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
                        {editing ? "Editar Aluminio" : "Nuevo Aluminio"}

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
                                value={aluminios.nombre}
                                style={{ margin: '.5rem 0' }}
                                fullWidth
                            />
                            <TextField

                                variant='filled'
                                label='Decripción'
                                onChange={handleChange}
                                name='descripcion'
                                value={aluminios.descripcion}
                                style={{ margin: '.5rem 0' }}
                                fullWidth
                            />
                            <TextField
                                type='Number'
                                variant='filled'
                                label='Valor'
                                onChange={handleChange}
                                name='valor'
                                value={aluminios.valor}
                                style={{ margin: '.5rem 0' }}
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
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
