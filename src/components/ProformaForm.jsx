import { Button, Card, CardContent, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import InputAdornment from '@mui/material/InputAdornment'
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


const ProformaForm = () => {
  const animatedComponents = makeAnimated()
  const navigate = useNavigate();
  const [productos, setProductos] = useState([])
  const [vidrios, setVidiros] = useState([])
  const [aluminios, setAluminios] = useState([])

  const [proforma, setProforma] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    referencia: '',
    celular: '',
    email: '',
    productosProforma: []
  })
  const [data, setData] = useState({
    producto: '',
    vidrio: '',
    aluminio: '',
    alto: '',
    ancho: '',
    grosorVidrio: '',

  })
  const [productosTemporales, setProductosTemporales] = useState([]);
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleAgregarProducto = () => {
    // Crear un nuevo producto temporal con los datos del formulario
    const nuevoProducto = {
      producto: data.producto.value,
      vidrio: data.vidrio.value,
      aluminio: data.aluminio.value,
      alto: data.alto,
      ancho: data.ancho,
      grosorVidrio: data.grosorVidrio,
    };


    setProductosTemporales([...productosTemporales, nuevoProducto]);

    // Agregar el nuevo producto temporal al estado de productos temporales
    setProforma({
      ...proforma,
      productosProforma: [...proforma.productosProforma, nuevoProducto],
    });

    // Limpiar los campos del formulario después de agregar el producto temporal
    setData({
      producto: '',
      vidrio: '',
      aluminio: '',
      alto: '',
      ancho: '',
      grosorVidrio: '',
    });
  };

  const loadProductos = async (searchValue) => {
    const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/productos')
    const data = await res.json()
    setProductos(data.productos)
    let options = productos.map(i => {
      return { value: `${i._id}`, label: `${i.nombre}` }
    })
    const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
      (searchValue.toLocaleLowerCase()))
    return filterOptions
  }

  const loadVidrios = async (searchValue) => {
    const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipovidrios')
    const data = await res.json()
    setVidiros(data.tiposVidrios)
    let options = vidrios.map(i => {
      return { value: `${i._id}`, label: `${i.nombre}` }
    })
    const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
      (searchValue.toLocaleLowerCase()))
    return filterOptions
  }

  const loadAluminios = async (searchValue) => {
    const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipoaluminios')
    const data = await res.json()
    setAluminios(data.tipoAluminios)
    let options = aluminios.map(i => {
      return { value: `${i._id}`, label: `${i.nombre}` }
    })
    const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
      (searchValue.toLocaleLowerCase()))
    return filterOptions
  }

  const handleGuardarProforma = async (e) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario

    try {

      const arreglo = productosTemporales.map((productoTemp) => ({
        producto: productoTemp.producto, // Solo el ID del producto
        vidrio: productoTemp.vidrio, // Solo el ID del vidrio
        aluminio: productoTemp.aluminio, // Solo el ID del aluminio
        alto: productoTemp.alto, // El valor ingresado en el campo alto
        ancho: productoTemp.ancho, // El valor ingresado en el campo ancho
        grosorVidrio: productoTemp.grosorVidrio, // El valor ingresado en el campo grosorVidrio
      }));

      const response = await fetch('http://localhost:4000/v1/softwareproformas/api/proformas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: proforma.nombre,
          apellido: proforma.apellido,
          direccion: proforma.direccion,
          referencia: proforma.referencia,
          celular: proforma.celular,
          email: proforma.email,
          productosProforma: arreglo
        }),
      });

      if (response.ok) {
        alert('Se ha guardado con éxito');
        // Realizar acciones adicionales si la proforma se creó con éxito
      } else {
        // Manejar errores si la solicitud no fue exitosa
        alert('error al guardar');
        console.error('ups no se pudo guardar', response.status);
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error revisame:', error);
      alert('Ocurrió un error al procesar la solicitud');

    }
  };


  useEffect(() => {
    loadProductos()
    loadVidrios()
    loadAluminios()
  }, [])
  return (

    <Container>
      <form onSubmit={handleGuardarProforma}>
        <Typography variant="h6" gutterBottom>
          Datos de Cliente
        </Typography>
        <Button
          variant="contained"
          color="success"
          type='submit'
        >
          Guardar Proforma
        </Button>
        <Grid container mt={1} spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              onChange={(e) => setProforma({ ...proforma, nombre: e.target.value })}
              name="nombre"
              label="Nombre"
              value={proforma.nombre}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              // id="lastName"
              onChange={(e) => setProforma({ ...proforma, apellido: e.target.value })}
              name="apellido"
              label="Apellido"
              value={proforma.apellido}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              // id="address1"
              onChange={(e) => setProforma({ ...proforma, direccion: e.target.value })}
              name="direccion"
              label="Dirección"
              value={proforma.direccion}
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              // id="address2"
              onChange={(e) => setProforma({ ...proforma, referencia: e.target.value })}
              name="referencia"
              label="Referencia"
              value={proforma.referencia}
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // id="address2"
              type='Number'
              onChange={(e) => setProforma({ ...proforma, celular: e.target.value })}
              name="celular"
              label="Celular"
              value={proforma.celular}
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // id="address2"
              type='email'
              onChange={(e) => setProforma({ ...proforma, email: e.target.value })}
              name="email"
              label="Correo Electronico"
              value={proforma.email}
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
        </Grid>


        <Grid container mt={1} spacing={3}>
          <Grid item container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography>Producto</Typography>
              <AsyncSelect
                placeholder="Seleccione un producto"
                loadOptions={loadProductos}
                components={animatedComponents}
                onChange={(selectedOption) => setData({ ...data, producto: selectedOption })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Vidrio</Typography>
              <AsyncSelect
                placeholder="Seleccione un tipo de vidrio"
                loadOptions={loadVidrios}
                components={animatedComponents}
                onChange={(selectedOption) => setData({ ...data, vidrio: selectedOption })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography>Aluminio</Typography>
              <AsyncSelect
                placeholder="Seleccione un tipo de aluminio"
                loadOptions={loadAluminios}
                components={animatedComponents}
                onChange={(selectedOption) => setData({ ...data, aluminio: selectedOption })}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                // onChange={handleChange}
                name="alto"
                type='Number'
                label="Alto"
                value={data.alto}
                onChange={handleInputChange}
                fullWidth
                autoComplete="given-name"
                variant="standard"
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={handleInputChange}
                name="ancho"
                label="Ancho"
                type='Number'
                value={data.ancho}
                fullWidth
                autoComplete="given-name"
                variant="standard"
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type='Number'
                onChange={handleInputChange}
                name="grosorVidrio"
                label="Grosor del vidrio"
                value={data.grosorVidrio}
                fullWidth
                autoComplete="given-name"
                variant="standard"
                InputProps={{
                  endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>

          {console.log(proforma)}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAgregarProducto}
            >
              Agregar producto
            </Button>

          </Grid>
          <Grid item xs={12}>
            <Typography>Mis productos</Typography>

            {productosTemporales.map((producto, index) => {
              const productoEncontrado = productos.find(p => p._id === producto.producto);
              const vidrioEncontrado = vidrios.find(v => v._id === producto.vidrio);
              const aluminioEncontrado = aluminios.find(a => a._id === producto.aluminio);

              return (
                <Card key={index} style={{ background: "#90caf9" }} sx={{ mb: 1 }}>
                  <CardContent style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                    <div>
                      <Typography>{`Producto ${index + 1}:`}</Typography>
                      <Typography>{`Nombre del Producto: ${productoEncontrado ? productoEncontrado.nombre : 'No encontrado'}`}</Typography>
                      <Typography>{`Tipo de Vidrio: ${vidrioEncontrado ? vidrioEncontrado.nombre : 'No encontrado'}`}</Typography>
                      <Typography>{`Tipo de Aluminio: ${aluminioEncontrado ? aluminioEncontrado.nombre : 'No encontrado'}`}</Typography>
                      <Typography>{`Alto: ${producto.alto} cm`}</Typography>
                      <Typography>{`Ancho: ${producto.ancho} cm`}</Typography>
                      <Typography>{`Grosor del Vidrio: ${producto.grosorVidrio} mm`}</Typography>
                    </div>
                    <div>
                      <IconButton variant='contained' color='error'>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </Grid>

      </form>

    </Container>
  )
}

export default ProformaForm