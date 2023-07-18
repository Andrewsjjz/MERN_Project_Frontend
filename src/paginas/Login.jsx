import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth';
import React from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    const { setAuth } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }



        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password})
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
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
        <h1 className="text-green2-50 font-black text-6xl capitalize">Inicia sesión y administra tus {''}
            <span className="text-gray-500">proyectos</span>
        </h1>

        {msg && <Alerta alerta={alerta } />}
    
        <form 
            className="my-10 bg-white shadow rounded-xl p-10"
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo Electronico"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
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
                    onChange={ e => setPassword(e.target.value)}
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
            <span class="relative">Iniciar sesion</span>
            </button>
</div>
            
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm 
             hover:font-extrabold duration-100'
                to="/registrar"
            >¿No tienes una cuenta? Regístrate</Link>

            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm hover:font-extrabold duration-100'
                to="/olvide-password"
            >Olvidé mi contraseña</Link>
        </nav>
    

    </>





    
  )
}

export default Login