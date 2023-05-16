import React, { useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const { redirect } = router.query;
    const { handleSubmit, register, formState: { errors } } = useForm();

    // get the data and rename it to session
    const { data: session } = useSession();

    useEffect(() => {
        // if a signed in user visit login page we will send him back to the home page
        if (session?.user) {
            router.push(redirect || '/');
        }
    }, [router, session, redirect]);

    const submitHandler = async ({ email, password }) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email, password
            });
            
            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getError(err));
        }
    }
    return (
        <Layout title="Login">
            <form className='mx-auto mt-10 max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
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