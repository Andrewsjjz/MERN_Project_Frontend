import { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'
import React from 'react'


const FormularioColaborador = () => {
  const [email, setEmail] = useState('')

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos()

  const handleSubmit = e => {
    e.preventDefault();

    if(email === '') {
        mostrarAlerta({
          msg: 'El Email es Obligatorio',
          error: true
        })
        return
    }

    submitColaborador(email)

  }

  const { msg } = alerta

  return (
    <form
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}
      <div className='mb-5'>
          <label
              className='text-gray-700 uppercase font-bold text-sm' 
              htmlFor='email'
          >
              Email Colaborador
          </label>
          <input
              type="email"
              id="email"
              placeholder='Email del Usuario'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
      </div>

      <button
            type='input'
            className='text-sm px-5 py-3 w-full max-sm:w-full rounded-lg uppercase font-bold 
              bg-green2-50 hover:bg-green-900 text-white text-center mt-5 flex gap-2 items-center justify-center '
          >
 <svg fill="none" viewBox="0 0 24 24" className='h-6 w-6'>
      <path
        fill="currentColor"
        d="M8.55 10.55a1 1 0 11-2 0 1 1 0 012 0zM10.55 11.55a1 1 0 100-2 1 1 0 000 2zM13.55 11.55a1 1 0 100-2 1 1 0 000 2z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.207 4.893a8.001 8.001 0 01.662 10.565c.016.013.03.027.045.042l4.243 4.243a1 1 0 01-1.414 1.414L15.5 16.914a.933.933 0 01-.042-.045A8.001 8.001 0 014.893 4.893a8 8 0 0111.314 0zm-9.9 9.9a6 6 0 108.486-8.485 6 6 0 00-8.485 8.485z"
        clipRule="evenodd"
      />
    </svg>
            Buscar
          </button>

    </form>
  )
}

export default FormularioColaborador