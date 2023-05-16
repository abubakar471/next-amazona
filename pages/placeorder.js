import React, { useContext, useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import CheckoutWizard from '@/components/CheckoutWizard'
import Link from 'next/link'
import { Store } from '@/utils/Store'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getError } from '@/utils/error'
import axios from 'axios'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'

const Placeorder = () => {
    const {data : session} = useSession();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;// 123.456 => 123.46
    const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const taxPrice = round2(itemsPrice * 0.15);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    useEffect(() => {
        if (!paymentMethod) {
            router.push('/payment');
        }
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                session: session
            });
            console.log(data);
            setLoading(false);
            dispatch({ type: 'CART_CLEAR_ITEMS' });
            Cookies.set('cart', JSON.stringify({ ...cart, cartItems: [] }));
            router.push(`/orders/${data._id}`);
        } catch (err) {
            setLoading(false);
            toast.error(getError(err));
        }
    }




    return (
        <Layout title='Place Order'>
            <div className='mt-10'>
                <CheckoutWizard activeStep={3} />
                <h1 className='mb-4 text-xl'>Place Order</h1>
                {
                    cartItems.length === 0 ? (
                        <div>
                            Cart is empty <Link href="/"
                                style={{ textDecoration: "underline" }}>Go Shopping</Link>
                        </div>) : (
                        <div className='grid md:grid-cols-4 md:gap-5'>
                            <div className='overflow-x-auto md:col-span-3'>

                                <div className='card p-5'>
                                    <h2 className='mb-4 text-lg'>Shipping Address</h2>
                                    <div>
                                        {shippingAddress.fullName}, {shippingAddress.address}, {' '}
                                        {shippingAddress.city}, {shippingAddress.postalCode}, {' '},
                                        {shippingAddress.country}
                                    </div>
                                    <div>
                                        <Link href="/shipping" style={{
                                            color: "rgb(80, 169, 253)"
                                        }}>Edit</Link>
                                    </div>
                                </div>

                                <div className='card p-5'>
                                    <h2>Payment Method</h2>
                                    <div>{paymentMethod}</div>
                                    <div>
                                        <Link href="/payment" style={{
                                            color: "rgb(80, 169, 253)"
                                        }}>Edit</Link>
                                    </div>
                                </div>

                                <div className='card overflow-x-auto p-5'>
                                    <h2 className='mb-2 text-lg'>Order Items</h2>
                                    <table className='min-w-full'>
                                        <thead className='border-b'>
                                            <tr>
                                                <th className='px-5 text-left'>Items</th>
                                                <th className='px-5 text-right'>Quantity</th>
                                                <th className='px-5 text-right'>Price</th>
                                                <th className='px-5 text-right'>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item) => (
                                                <tr key={item._id} className='border-b'>
                                                    <td>
                                                        <Link className='flex items-center' href={`/product/${item.slug}`}>
                                                            <Image src={`/${item.image}`}
                                                                alt={item.name}
                                                                width={50}
                                                                height={50}></Image>
                                                            &nbsp;
                                                            {item.name}
                                                        </Link>
                                                    </td>
                                                    <td className='p-5 text-right'>{item.quantity}</td>
                                                    <td className='p-5 text-right'>{item.price}</td>
                                                    <td className='p-5 text-right'>${item.quantity * item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div>
                                        <Link href="/cart" style={{
                                            color: "rgb(80, 169, 253)"
                                        }}>Edit</Link>
                                    </div>
                                </div>
                            </div>

                            <div className='card p-5'>
                                <h2 className='mb-2 text-lg'>Order Summary</h2>
                                <ul>
                                    <li>
                                        <div className='mb-2 flex justify-between'>
                                            <div>Items</div>
                                            <div>${itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='mb-2 flex justify-between'>
                                            <div>Tax</div>
                                            <div>${taxPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='mb-2 flex justify-between'>
                                            <div>Shipping</div>
                                            <div>${shippingPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='mb-2 flex justify-between'>
                                            <div>Total</div>
                                            <div>${totalPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <button
                                            className='primary-button w-full'
                                            disabled={loading}
                                            onClick={placeOrderHandler}
                                        >
                                            {loading ? 'Loading...' : 'Place Order'}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

// it means only logged in users can access this page
Placeorder.auth = true

// the dynamic function is for solving the hydration error that shows ui does not match what was rendered 
// server, life saving issure it was !
export default dynamic(() => Promise.resolve(Placeorder), { ssr: false })