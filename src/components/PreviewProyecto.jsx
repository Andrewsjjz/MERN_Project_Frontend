import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import React from 'react'
import {formatearFecha} from '../helpers/formatearFecha'



const PreviewProyecto = ({proyecto}) => {

    const { auth } = useAuth()

    const { nombre, _id, cliente, creador, fechadeEntrega} = proyecto



    return (
        <div className='border-b p-5 flex justify-between'>

            <div className='gap-2'>
                <p className='font-bold'>
                    Proyecto: 
                    <span className='font-normal'> {nombre}</span>

                </p>
                <p className='font-bold'>
                    Cliente: 
                    <span className='text-sm text-gray-500 uppercase'>
                    {''} {cliente}
                    </span>
                </p>
                
                {auth._id !== creador && (
                    <p className='p-1 text-xs rounded-lg text-white bg-green-500 w-28 text-center font-bold uppercase'>Colaborador</p>
                )}
            </div>

<div className='max-sm:justify-between max-sm:mt-6 max-sm:text-center max-lg:text-center'>
<Link
to={`${_id}`}
className='text-gray-600 hover:text-gray-800 hover:font-extrabold uppercase 
text-sm font-bold '
            >Ver Proyecto</Link>
</div>

        </div>
    )
}

export default PreviewProyecto