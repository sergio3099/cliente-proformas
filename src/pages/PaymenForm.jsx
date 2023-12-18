import * as React from 'react';
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { InputAdornment, MenuItem } from '@mui/material';
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'

export default function PaymentForm() {

    const animatedComponents = makeAnimated()

    const [productos, setProductos] = useState([])
    const loadProductos = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/productos')
        const data = await res.json()
        setProductos(data.productos)
        let options = productos.map(i => {
            return { value: `${i.nombre}`, label: `${i.nombre}` }

        })
        const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
            (searchValue.toLocaleLowerCase()))
        // console.log(options);
        return filterOptions
        // return data
    }

    useEffect(() => {
        loadProductos()
    }, [])
    const handleChange = e => setPrice({ ...price, [e.target.name]: e.target.value });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await fetch('https://us-central1-proforma-project.cloudfunctions.net/app/api/prices', {
                method: 'POST',
                body: JSON.stringify(price),

                headers: {
                    'Access-Control-Allow-Origin': ['*'],
                    'Content-Type': 'application/json'
                }
            })
            alert('Se ha guardado con exito')
            navigate('/proformadetalle')
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
                
            </Typography> */}
            <Grid container spacing={3} component="form">
                <Grid item xs={12}  >
                   
                    <Typography>Producto</Typography>
                    <AsyncSelect

                        // closeMenuOnSelect={false}
                        // // options={options}
                        // cacheOptions
                        // loadOptions={loadProductos}
                        // components={animatedComponents}
                        // defaultOptions
                        // isMulti
                        defaultValue
                        closeMenuOnSelect={false}
                        loadOptions={loadProductos}
                        components={animatedComponents}
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                        }}
                        />

                

                </Grid>




            </Grid>
        </React.Fragment>
    );
}