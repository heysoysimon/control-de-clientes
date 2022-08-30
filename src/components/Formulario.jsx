import React from 'react'
import { Formik, Form , Field} from 'formik'
import {useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = yup.object().shape({
  /* validaciones */
    nombre: yup.string()
    .min(3, "el nombre es muy corto" )
    .max(20, "el nombre es muy largo" )
    .required('este campo es obligatorio'),

    empresa: yup.string()
    .required("el nombre de la empresa es obligatorio"),

    email: yup.string()
    .email("introdusca un email valido ")
      .required('el Email es obligatorio'),

      telefono: yup.number()
      .positive("numero no valuido")
      .integer("numero no valido")
      .typeError("el numero no es valido")
  })
/* por aqui se envia los atos a un backeng */
  const  handletSubmit = async (valores) =>{
/*       console.log(valores); */
          try{
            let respuesta
           if(cliente.id){
         /*    console.log("editando...") */
         const url = `http://localhost:3000/clientes/${cliente.id}`

         respuesta = await fetch(url,{
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
        }
        })
           } else{
        /*     console.log('nuevo resgistro') */
        const url = 'http://localhost:3000/clientes'

         respuesta = await fetch(url,{
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
        }
        })
           }
           /* console.log(respuesta) */
           await respuesta.json()
        /*    console.log(resultado) */
           navigate('/clientes')

          }catch(error) {
            console.log(error)
          }
  }
  return (
    cargando ? <Spinner/> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md
    md:w-3/4 mx-auto'>
      <h1 className='
      text-gray-600 
      font-bold text-xl 
      uppercase
      text-center'> {cliente?.nombre ? 
      'Editar Cliente' : ' Agrgear Cliente'} </h1>

      <Formik
          initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono:cliente?.telefono ?? "",
            notas: cliente?.notas ?? ""
          }}
          enableReinitialize={true}
            /* valores de arrida  */
          onSubmit={async(values,{resetForm}) =>{
                await handletSubmit(values)
                resetForm()
          }}

          validationSchema={nuevoClienteSchema}
      >

        {({errors,touched}) => {
          console.log(touched) 
          return(
            <Form className='mt-10'>

               <div className='mb-4'>

            <label 
                className='text-gray-800'
                htmlFor="nombre"
                >Nombre:</label>

               <Field 
               id="nombre" 
               type="text"
               placeholder="nombre del cliente"
               className="mt-2 w-full p-3 bg-gray-50"
               name="nombre"
               />
               </div>

               {errors.nombre && touched.nombre ?(
                  <Alerta>{errors.nombre}</Alerta>

              ): null}
                
               <div className='mb-4'>
                <label 
                className='text-gray-800'
                htmlFor="empresa"
                >empresa:</label>

               <Field id="empresa" 
               type="text"
               placeholder="nombre de la empresa"
               className="mt-2 w-full p-3 bg-gray-50"
               name="empresa"
               />

                
               {errors.empresa && touched.empresa ?(
                  <Alerta>{errors.empresa}</Alerta>

              ): null}

               </div>

               <div className='mb-4'>
                <label 
                className='text-gray-800'
                htmlFor="email"
                >Email:</label>

               <Field id="email" 
               type="email"
               placeholder="email del cliente "
               className="mt-2 w-full p-3 bg-gray-50"
               name="email"
               />

          {errors.email && touched.email ?(
                  <Alerta>{errors.email}</Alerta>

              ): null}
               </div>


               <div className='mb-4'>
                <label 
                className='text-gray-800'
                htmlFor="numero"
                >Numero de telefono :</label>

               <Field id="numero" 
               type="telf"
               placeholder="numero del cliente "
               className="mt-2 w-full p-3 bg-gray-50"
               name="telefono"
               />


               {errors.telefono && touched.telefono ?(
                  <Alerta>{errors.telefono}</Alerta>

              ): null}
               </div>



               <div className='mb-4'>
                <label 
                className='text-gray-800'
                htmlFor="notas"
                >Notas :</label>

               <Field 
               id="notas" 
               type="text"
               as="textarea"
               placeholder="notas del cliente  "
               className="mt-2 w-full p-3 bg-gray-50"
               name="notas"
               />

               </div>

               <input
               type="submit"
               valuie={cliente?.nombre ? 
              'Editar Cliente' : ' Agrgear Cliente'} 
               className='mt-5 w-full bg-blue-800 p-3 
               text-white uppercase font-bold text-lg'
               />

            </Form>
               )}}
      </Formik>
      
    </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario
