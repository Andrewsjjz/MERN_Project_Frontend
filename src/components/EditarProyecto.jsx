import React from 'react'
import { useParams } from 'react-router-dom'    
import { useEffect } from 'react'
import useProyectos from '../hooks/useProyectos'
import FormularioProyecto from './FormularioProyecto'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React from 'react'




export default function EditarProyecto() {


    const {obtenerProyecto, proyectoSeleccionado, eliminarProyecto} = useProyectos() 
   
    const {nombre} = proyectoSeleccionado
    
    const params = useParams()

  const MySwal = withReactContent(Swal)

    
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])

    //METODO PARA COLOCAR ALERT
    const handleClick = async () => {
        Swal.fire( {
          title: 'Estas seguro que desea eliminar este proyecto?',
          text: "Una vez eliminado, no podrá recuperarlo",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, deseo eliminarlo',
          width: '28rem'

        })

        .then((result) => {
          if (result.isConfirmed) {

            eliminarProyecto(params.id)

            Swal.fire( {
              title: 'Eliminado!',
              text: 'Tu proyecto ha sido eliminado exitosamente',
              icon: 'success',
              timer: 2500,
            }

            )
          }
        })
        

  }

  return (
    <>
       <div className='flex justify-between'>

       <p className="font-black text-3xl">{nombre}</p>
    <button
        onClick={handleClick}
          className="flex top-0 right-0 mt-4 text-black 
        text-lg font-semibold py-2 px-4 rounded-md hover:bg-red-500 
        hover:text-white transition duration-300"
        >Eliminar</button>
       </div>


      <div className="container mx-auto py-8 rounded-xl">
        <FormularioProyecto/>
  </div>
    </>
  )
}
