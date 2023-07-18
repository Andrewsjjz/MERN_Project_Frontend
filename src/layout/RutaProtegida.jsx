import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import SideBar from "../components/SideBar"
import React from 'react'


export default function RutaProtegida() {

  const {auth , cargando} = useAuth()

  if(cargando) return 'Cargando....'

  return (
    <>
      {auth._id ? 
      (
        <div className="">
          <Header/>

          <div className="md:flex md:min-h-screen">
            <SideBar/>

            <main className="flex-1 p-10">
              <Outlet/>
              
            </main>
          </div>
        </div>
      ): <Navigate to='/'/>}
    </>
  )
}
