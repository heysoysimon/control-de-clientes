import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

  const [cliente,setCliente] = useState({})
  const [cargando , setCargando] = useState(false)
  const {id} = useParams()

  useEffect(() =>{
    /* cambia al valor contraio en el boleano  */
    setCargando(!cargando)
      const obtenerClientesApi = async () =>{
          try {
            const url = `http://localhost:3000/clientes/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            setCliente(resultado)
          } catch (error) {
            console.log(error)
          }
          setTimeout(() =>{
              setCargando(false)
          },3000)
         
      }
      obtenerClientesApi()
  },[])

  console.log(id)
  return (

  cargando ? 
  <p><Spinner/></p>: 
  Object.keys(cliente).length === 0 ? 
  <p> no hay resultados</p> 
  : (
      <div>

    {cargando ? 'cargando....' : (
    <>
      <h1 className='font-black text-4xl text-blue-900'> 
      Ver Clientes: {cliente.nombre}</h1>

        <p className='mt-3'
        > informacion del cliente</p>

        {cliente.nombre && (
          <p className='text-2xl text-gray-700 mt-10'>
          <span className=' text-gray-800 uppercase font-bold'>Cliente:</span> 
          {cliente.nombre}
        </p>
        )}

      {cliente.email && (
          <p className='text-2xl text-gray-700 mt-4'>
          <span className=' text-gray-800 uppercase font-bold'>Email:</span> 
          {cliente.email}
        </p>
      )}

        {cliente.telefono && (
          <p className='text-2xl text-gray-700 mt-4'>
          <span className=' text-gray-800 uppercase font-bold'>Telefono:</span> 
          {cliente.telefono}
        </p>
        )}

        {cliente.empresa && (
              <p className='text-2xl text-gray-700 mt-4'>
              <span className=' text-gray-800 uppercase font-bold'>Empresa:</span> 
              {cliente.empresa}
            </p>
        )}

        {cliente.notas && (
            <p className='text-2xl text-gray-700 mt-4'>
            <span className=' text-gray-800 uppercase font-bold'>Notas:</span> 
            {cliente.notas}
          </p>
        )}
      </>
      )}
      </div>
    )
  )
}

export default VerCliente
