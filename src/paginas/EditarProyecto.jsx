import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import FormularioProyecto from '../components/FormularioProyecto'
import useProyectos from "../hooks/useProyectos"
import React from 'react'


const EditarProyecto = ({}) => {
    const params = useParams();
    const { obtenerProyecto, proyecto, cargando, eliminarProyecto } = useProyectos()
    const {_id} = proyecto
  
    useEffect( () => {
      obtenerProyecto(params.id)
    }, [])

    const handleClick = () => {
        if(confirm('¿Deseas eliminar este proyecto?')) {
            eliminarProyecto(params.id)
        } 
    }
  
    const { nombre } = proyecto

    if(cargando) return 'Cargando...'

    return (
        <>
    <div className='flex justify-between  items-center mb-10'>

<div className='flex items-center text-gray-400 hover:text-black mr-3'>
<Link
to={`/proyectos/${_id}`}
>
<button
className='uppercase font-bold flex justify-center items-center'
>
<svg
className='w-6 h-6'
viewBox="0 0 512 512"
fill="currentColor"
>
<path
fill="none"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={48}
d="M244 400L100 256l144-144M120 256h292"
/>
</svg>
Atras</button>      
</Link>
</div>



  <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
    <button
        className='uppercase font-bold'
        onClick={handleClick}
    >Eliminar</button>
  </div>
</div>
        <div className='mb-10'>
        <h1 className='text-center max-lg:text-center max-lg:mb-5 
              font-black text-4xl justify-center'>{nombre}</h1>
        </div>



            <div className="mt-10 flex justify-center">
              <FormularioProyecto />
            </div>
        </>
    )
}

export default EditarProyecto