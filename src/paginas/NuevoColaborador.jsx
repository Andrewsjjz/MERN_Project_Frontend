import { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos';
import { useParams } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { Link } from 'react-router-dom';
import React from 'react'


const NuevoColaborador = () => {

  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()
  const params = useParams()
  const { _id } = proyecto

  useEffect(() => {
    obtenerProyecto(params.id)
  }, []);


  if (!proyecto?._id) return <Alerta alerta={alerta} />

  return (
    <>

      <div className='flex items-center text-gray-400 hover:text-black mr-3'>
        <Link
          to={`/proyectos/${_id}`}
        >
          <button
            className='uppercase font-bold flex justify-center items-center mb-7'
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
      <h1 className="text-4xl font-black text-center">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>



      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>


      {cargando ? <p className="text-center">cargando...</p> : colaborador?._id && (
        <div className='flex justify-center mt-10'>
          <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full'>
            <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>

            <div className='flex justify-between items-center'>
              <p>{colaborador.nombre}</p>

              <button
                type="button"
                className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                onClick={() => agregarColaborador({
                  email: colaborador.email
                })}
              >Agregar al Proyecto</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default NuevoColaborador