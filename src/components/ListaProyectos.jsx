import { Link } from "react-router-dom"
import React from 'react'





export default function ListaProyectos({ proyecto }) {

  const { _id, nombre, cliente, fechadeEntrega, } = proyecto

  return (
    <div className="border-b p-6 flex flex-col relative mt-5 ">
      <p className='font-bold text-2xl py-2'><span className="font-normal">Proyecto:</span> {nombre}</p>
      <p className='font-bold text-xl py-2'><span className='font-normal'>Cliente: </span>{cliente}</p>

      <div className="flex justify-between">
        <Link
          to={`${_id}`}
          className=" flex top-0 right-0 mt-4 text-black 
        text-lg font-semibold py-2 px-4 rounded-md hover:bg-green2-150 
        hover:text-white transition duration-300"
        >

          Ver Proyecto</Link>



      </div>
    </div>
  )
}
