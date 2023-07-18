import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import ModalEliminarColaborador from '../components/ModalEliminarColaborador'
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';
import Colaborador from '../components/Colaborador';
import io from 'socket.io-client'
import React from 'react'


let socket;

const Proyecto = () => {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta,
    submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea } = useProyectos()

  const admin = useAdmin()


  useEffect(() => {
    obtenerProyecto(params.id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  }, [])

  useEffect(() => {
    socket.on("tarea agregada", tareaNueva => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', tareaEliminada => {
      if (tareaEliminada.proyecto === proyecto._id) {
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea actualizada', tareaActualizada => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        actualizarTareaProyecto(tareaActualizada)
      }
    })

    socket.on('nuevo estado', nuevoEstadoTarea => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea)
      }
    })
  })

  const { nombre } = proyecto
  if (cargando) return 'Cargando...'
  const { msg } = alerta


  return (
    <>
      <div className='mb-10'>
        <h1 className='text-center max-lg:text-center max-lg:mb-5 
              font-black text-4xl justify-center'>{nombre}</h1>
      </div>

      <div className='flex justify-between max-sm:gap-10'>

        <div className='flex items-center gap-4 text-gray-400 hover:text-black'>
          
          <Link
            to="/proyectos"
            className='uppercase font-bold flex items-center'
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
            Atras</Link>


        </div>

        {admin && (
        <div className='max-lg:flex items-center justify-center'>
          <button
            onClick={handleModalTarea}
            type='button'
            className='text-sm px-5 py-3 w-full max-sm:w-full rounded-lg uppercase font-bold 
              bg-green2-50 hover:bg-green-900 text-white text-center mt-5 flex gap-2 items-center justify-center '
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Nueva Tarea
          </button>
        </div>

      )}


        {admin && (
          <div className='flex items-center gap-1 text-gray-400 hover:text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <Link
              to={`/proyectos/editar/${params.id}`}
              className='uppercase font-bold'
            >Editar</Link>
          </div>
        )}


      </div>

      <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>


      <div className='bg-white shadow mt-10 rounded-lg'>
        {proyecto.tareas?.length ?
          proyecto.tareas?.map(tarea => (
            <Tarea
              key={tarea._id}
              tarea={tarea}
            />
          )) :
          <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>}
      </div>

      {admin && (
        <>
          <div className='flex items-center justify-between mt-10'>
            <p className='font-bold text-xl'>Colaboradores</p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className='text-gray-400 hover:text-black uppercase font-bold flex items-center justify-center'
            >
              <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      className='w-6 h-6'
    >
      <defs>
        <style />
      </defs>
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
      <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
    </svg>
              Añadir</Link>
          </div>

          <div className='bg-white shadow mt-10 rounded-lg'>
            {proyecto.colaboradores?.length ?
              proyecto.colaboradores?.map(colaborador => (
                <Colaborador
                  key={colaborador._id}
                  colaborador={colaborador}
                />
              )) :
              <p className='text-center my-5 p-10'>No hay Colaboradores en este proyecto</p>}
          </div>
        </>
      )}



      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  )

}

export default Proyecto