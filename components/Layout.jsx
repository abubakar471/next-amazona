import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useStyles from '../utils/styles'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Store } from '@/utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const Layout = ({ children, title, description }) => {
    // status is a flag , that shows loading of session , that means when we loading session we won't show
    // user a name
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const classes = useStyles();
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    }, [cart.cartItems]);

    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: "CART_RESET" });
        signOut({ callbackUrl: '/login' });
    }
    // in this theme object function where we created a key called components for mui components and to 
    // give those components styling using createTheme
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
        },
        // this is targeting our Appbar or navbar i mean
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        border: 0,
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        color: 'white',
                        padding: '0 30px',
                    }
                }
            }
        }
    })

    return (
        <>
            <Head>
                <title>{title ? title + ' -Next Amzona' : 'Next Amzona'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>

            <ToastContainer position="bottom-center" limit={1} />

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <Link href="/" className="text-lg font-bold">
                            amazona
                        </Link>

                        <div className="grow"></div>

                        <div>
                            <Link href="/cart" className="navlink">
                                {cartItemsCount > 0 && (

                                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                        {cartItemsCount}
                                    </span>
                                )}
                                Cart
                            </Link>
                            {status === 'loading' ? (
                                'loading'
                            ) : session?.user ? (
                                <Menu as="div" className={`${classes.navlink} relative inline-block`} >
                                    <Menu.Button>
                                        {session.user.name}
                                    </Menu.Button>
                                    <Menu.Items style={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                        border: 0,
                                        borderRadius: "10px",
                                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                        color: 'white',
                                    }} className='bg-white absolute w-56 right-0 origin-top-right shadow-lg'>
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link text-white-600" href="/profile">Profile</DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className="dropdown-link text-white-600" href="/order-history">Order History</DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink onClick={logoutClickHandler} className="dropdown-link text-white-600" href="#">Logout</DropdownLink>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            ) : (
                                <Link href="/login" className={classes.navlink}>Login</Link>
                            )}

                        </div>
                    </Toolbar>
                </AppBar >
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <p>Copyright &copy; 2023 | developed by abu bakar siddique </p>
                </footer>
            </ThemeProvider >
        </>
    )
}

export default Layout