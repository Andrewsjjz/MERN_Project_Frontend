import { useContext } from 'react'
import ProyectosContext from '../context/ProyectosProvider'
import React from 'react'


const useProyectos = () => {
    return useContext(ProyectosContext)
}

export default useProyectos