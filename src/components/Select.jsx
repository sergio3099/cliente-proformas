import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'


const Select = () => {
    const animatedComponents = makeAnimated()
    const [vidrios, setVidrios] = useState([])
    const loadVidrios = async (searchValue) => {
        const res = await fetch('https://backend-proformas.onrender.com/v1/softwareproformas/api/tipovidrios')
        const data = await res.json()
        setVidrios(data.tiposVidrios)
        let options = vidrios.map(i => {
            return { value: `${i.nombre}`, label: `${i.nombre}` }

        })
        const filterOptions = options.filter(option => option.label.toLocaleLowerCase().includes
            (searchValue.toLocaleLowerCase()))
        // console.log(options);
        return filterOptions
        // return data
    }

    useEffect(() => {
        loadVidrios()
    }, [])
    return (
        

            <AsyncSelect
                closeMenuOnSelect={false}
                loadOptions={loadVidrios}
                components={animatedComponents}
                onChange={(slectedOption) => {
                    console.log(slectedOption);
                }}
            />
        
    )
}

export default Select