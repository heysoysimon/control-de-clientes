import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
  return (
    <>
      <h1  className='font-black text-4xl text-blue-900'> nuevo cliente 
      </h1>

      <p className='mt-3'
      > llena los siguientes campos para registrar un cliente</p>

      <Formulario></Formulario>
    </>
  )
}

export default NuevoCliente
