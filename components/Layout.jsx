import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Layout = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ? title + ' -Next Amzona' : 'Next Amzona'}</title>
                <meta name="description" content="next amazona online e-commerce platform" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between'>

                <AppBar position="static">
                    <Toolbar>
                        <Link href="/" className="text-lg font-bold">
                            amazona
                        </Link>
                    </Toolbar>
                </AppBar>
                <Container>
                    {children}
                </Container>
                <footer className='flex items-center justify-center h-10 shadow-inner'>
                    <p>Copyright &copy; 2023 | developed by abu bakar siddique </p>
                </footer>
            </div>
        </>
    )
}

export default Layout