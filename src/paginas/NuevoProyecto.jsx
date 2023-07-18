import FormularioProyecto from "../components/FormularioProyecto"
import { Link } from "react-router-dom"
import React from 'react'


const NuevoProyecto = () => {
    return (
      <>
              <div className='flex justify-between gap-4 text-black'>
          
              <h1 className="text-4xl font-black">Crear Proyecto</h1>


          <Link
            to="/proyectos"
            className='uppercase font-bold flex items-center hover:'
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
  
          <div className="mt-10 flex justify-center">
              <FormularioProyecto />
          </div>
      </>
    )
  }
  
  export default NuevoProyecto