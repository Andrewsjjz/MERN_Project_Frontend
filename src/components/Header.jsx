import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import useAuth from '../hooks/useAuth'
import Busqueda from './Busqueda'
import React from 'react'


const Header = () => {

    const { handleBuscador, cerrarSesionProyectos } = useProyectos()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProyectos()
        localStorage.removeItem('token')
    }


  return (
    <header className="px-4 py-5 bg-yellow2-100 border-b">
        <div className="md:flex md:justify-between">
            <Link 
            to="/proyectos"
            className="text-4xl text-green2-50 font-black text-center mb-5 md:mb-0">
                UpTask
            </Link>

            <div className='flex flex-col md:flex-row items-center gap-4'>
                <button
                    type="button"
                    className='font-bold uppercase'
                    onClick={handleBuscador}
                >Buscar Proyecto</button>
                <Link
                    to="/proyectos"
                    className='font-bold uppercase'
                >Proyectos</Link>


                <button
                    type="button"
                    className='text-white text-sm bg-green2-50 hover:bg-green-950 p-3 rounded-md uppercase font-bold'
                    onClick={handleCerrarSesion}
                >Cerrar Sesión</button>

                <Busqueda />
            </div>
        </div>
    </header>
  )
}

export default Header