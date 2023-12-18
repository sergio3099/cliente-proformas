// import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Grid, InputAdornment, MenuItem, TextField, Typography, Button, Stack } from '@mui/material'
import Box from '@mui/material/Box';
import { React, useState, useEffect } from 'react'
import SaveIcon from '@mui/icons-material/Save';
// import {useNavigate} from 'react-router-dom'


const products = [
  {
    value: 'puerta',
    label: 'Puerta'
  },
  {
    value: 'mueble_cocina',
    label: 'Muebles de cocina'
  },
  {
    value: 'closet',
    label: 'Closets'
  }
]

const colors = [
  {
    value: 'cafe',
    label: 'Café'
  },
  {
    value: 'blanco',
    label: 'Blanco'
  },
  {
    value: 'negro',
    label: 'Negro'
  },
  {
    value: 'otro',
    label: 'Otro'
  },
]

const materials = [
  {
    value: 'laurel',
    label: 'Madera (Laurel)',
  },
  {
    value: 'prefabricado',
    label: 'Prefabricado (MDF)',
  },
  {
    value: 'otra-mader',
    label: 'Otra madera',
  },
]

const HomePage = () => {
  const { isAuthenticated } = useAuth0()
  const [price, setPrice] = useState({
    name: '',
    material: '',
    sizehigh: '',
    sizebroad: '',
    sizewall: '',
    color: '',
    description: '',
    price: ''

  });

  const navigate = useNavigate();
  const handleChange = e => setPrice({ ...price, [e.target.name]: e.target.value });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/proformas', {
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


  return isAuthenticated ? (
    <div>
      <h2>Esta es la página Home</h2>
      <Box sx={{ flexGrow: 1 }} mt={4}>

        <Grid container
          alignItems='center' justifyContent='center' spacing={3}
        >
          <Grid item xs={8} >
            <Typography variant='h4' >
              Cotizar
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid item  >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="¿Qué desea cotizar?"
                  name='name'
                  defaultValue=''
                  onChange={handleChange}
                  sx={{ m: 1, width: '25ch' }}
                >
                  {products.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}

                </TextField>

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Elija el material"
                  name='material'
                  defaultValue=''
                  onChange={handleChange}
                  sx={{ m: 1, width: '25ch' }}
                >
                  {materials.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  sx={{ m: 1, width: '25ch' }}
                  label="Elija el color?"
                  name='color'
                  defaultValue=''
                  onChange={handleChange}
                >
                  {colors.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}

                </TextField>
              </Grid>

              <Grid item>

                <TextField
                  label="Ingrese el alto"
                  name='sizehigh'
                  onChange={handleChange}
                  type='Number'
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                  }}
                />
                <TextField
                  label="Ingrese el ancho"
                  name='sizebroad'
                  onChange={handleChange}
                  type='Number'
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                  }}
                />
                <TextField
                  label="Ingrese el grosor de la pared"
                  name='sizewall'
                  onChange={handleChange}
                  type='Number'
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Descripción"
                  name='description'
                  onChange={handleChange}
                  sx={{ m: 1, width: 'auto' }}
                  // sm={{ m: 1, with: '25ch' }}
                  multiline
                  rows={4}
                  placeholder='Agregue una descripción' />

              </Grid>
              <Grid>
                <TextField
                  label="Precio"
                  name='price'
                  onChange={handleChange}
                  type='Number'
                  id="outlined-start-adornment"
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} alignItems="end">
                <Button sx={{ m: 1, width: 'auto' }} variant='contained' color='primary' size='large' type='submit' endIcon={<SaveIcon />} >
                  Save
                </Button>

              </Grid>

            </form>

          </Grid>

        </Grid>

      </Box>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default HomePage