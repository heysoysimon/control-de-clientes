import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Formulario from "../components/Formulario"

const EditarCliente = () => {
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
              setCargando(false)
         
      }
      obtenerClientesApi()
  },[])
  return (
    <>
      <h1  className='font-black text-4xl text-blue-900'> Editar Cliente 
      </h1>

      <p className='mt-3'
      > usa el formulario para editar un cliente</p>

  {cliente?.nombre ? (
    <Formulario
      cliente={cliente}
      cargando={cargando}
    ></Formulario>
  ): <p className="bg-red-600 text-white text-center p-2">Cliente ID no valido</p>}
    </>
  )
}

export default EditarCliente
