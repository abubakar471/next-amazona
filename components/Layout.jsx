import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ? title + ' -Next Amzona' : 'Next Amzona'}</title>
                <meta name="description" content="next amazona online e-commerce platform" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>
                <header>
                    <nav className="flex h-12 
                    justify-between shadow-md
                     items-center px-4
                     ">
                        <Link href="/" className="text-lg font-bold">
                            amazona
                        </Link>
                        <div>
                            <Link href="/cart" className='p-2'>Cart</Link>
                            <Link href="/login" className='p-2'>Login</Link>
                        </div>
                    </nav>
                </header>
                <main className='container mt-4 m-auto px-4'>{children}</main>
                <footer className='flex items-center justify-center h-10 shadow-inner'>
                    <p>Copyright &copy; 2023 | developed by abu bakar siddique </p>
                </footer>
            </div>
        </>
    )
}

export default Layout