import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useStyles from '../utils/styles'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
// import styles from "../styles/Layout.css"

const Layout = ({ children, title, description }) => {
    const classes = useStyles();
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0'
            },
            h2: {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0'
            }
        },
        palette: {
            type: 'light',
            primary: {
                main: "#f0c800"
            },
            secondary: {
                main: '#208000'
            }
        }
    })
    return (
        <>
            <Head>
                <title>{title ? title + ' -Next Amzona' : 'Next Amzona'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <Link href="/" className="text-lg font-bold">
                            amazona
                        </Link>

                        <div className="grow"></div>
                        <div>
                            <Link href="/cart" className="navlink">Cart</Link>
                            <Link href="/login" className="navlink">Login</Link>
                        </div>
                    </Toolbar>
                </AppBar >
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <p>Copyright &copy; 2023 | developed by abu bakar siddique </p>
                </footer>
            </ThemeProvider>
        </>
    )
}

export default Layout