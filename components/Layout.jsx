import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useStyles from '../utils/styles'

const Layout = ({ children, title }) => {
    const classes = useStyles();

    return (
        <>
            <Head>
                <title>{title ? title + ' -Next Amzona' : 'Next Amzona'}</title>
                <meta name="description" content="next amazona online e-commerce platform" />
            </Head>

            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Link href="/" className="text-lg font-bold">
                        amazona
                    </Link>

                    <div className={classes.grow}></div>
                    <div>
                        <Link href="/cart" className={classes.navlink}>Cart</Link>
                        <Link href="/login" className={classes.navlink}>Login</Link>
                    </div>
                </Toolbar>
            </AppBar >
            <Container className={classes.main}>
                {children}
            </Container>
            <footer className={classes.footer}>
                <p>Copyright &copy; 2023 | developed by abu bakar siddique </p>
            </footer>
        </>
    )
}

export default Layout