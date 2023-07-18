import { Outlet } from "react-router-dom"
import React from 'react'


export default function AuthLayout() {
  return (
    <>
      
      <main className="container mx-auto md:mt-3 p-4 md:flex md:justify-center">
        <div className="md:w-1/2 lg-1/2">
        <Outlet/>
        </div>
      </main>

    </>
  )
}
