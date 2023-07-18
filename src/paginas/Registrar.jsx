import { useState } from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import React from 'react'


const Registrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
           setAlerta({
               msg: 'Todos los campos son obligatorios',
               error: true
           })
           return
        }

        if(password !== repetirPassword ) {
            setAlerta({
                msg: 'Las contraseñas no son iguales',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlerta({
                msg: 'El Password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        // Crear el usuario en la API
        try {
            const { data } = await clienteAxios.post(`/usuarios`, {nombre, email, password} )

            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

  return (
    <>
        <h1 className="text-green2-50 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus {''}
            <span className="text-gray-500">proyectos</span>
        </h1>

        { msg && <Alerta alerta={alerta} /> }
    
        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="nombre"
                >Nombre y Apellido</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre y Apellido"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electronico"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password2"
                >Repetir Contraseña</label>
                <input
                    id="password2"
                    type="password"
                    placeholder="Repetir Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <div className='flex justify-center items-center'>
<button 
            type='submit' 
            class="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden text-lg font-medium 
            text-black border-2 border-black2-50 rounded-full hover:text-white group 
            hover:bg-gray-50">
            <span 
            class="absolute left-0 block w-full h-0 transition-all bg-green2-50 opacity-100 group-hover:h-full 
            top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform 
            translate-x-full group-hover:translate-x-0 ease">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative">Crear cuenta</span>
            </button>
</div>
            
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm duration-100 hover:font-extrabold'
                to="/"
            >¿Ya tienes una cuenta? Inicia Sesión</Link>

            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm duration-100 hover:font-extrabold'
                to="/olvide-password"
            >Olvidé mi contraseña</Link>
        </nav>
    
    </>
  )
}

export default Registrar