import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useForm } from 'react-hook-form';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const submitHandler = async ({ email, password }) => {
        console.log({
            email,password
        })
    }
    return (
        <Layout title="Login">
            <form className='mx-auto my-10 max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
                <h1 className='mb-4 text-xl'>Login to your amazona account</h1>
                <div className='mb-4'>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Please enter  email',
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'Please enter a valid email'
                            }
                        })}
                        className='w-full'
                        id='email'
                        autoFocus
                    />
                    {errors.email && <div className='text-red-500'>{errors.email.message}</div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='email'>Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: { value: 6, message: 'password should at least be 6 characters long' }
                        })}
                        className='w-full'
                        id='password'
                        autoFocus />
                    {errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                </div>
                <div className='mb-4'>
                    <button className='primary-button'>Login</button>
                </div>
                <div className='mb-4'>
                    Don&apos;t have and account?&nbsp;<Link href="/register"
                        style={{ textDecoration: "underline" }}>Register</Link>
                </div>
            </form>
        </Layout>
    )
}

export default Login