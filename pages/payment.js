import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store';
import useStyles from '@/utils/styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Payment = () => {
    const classes = useStyles();
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Payment Mehod is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set('cart',
            JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod }))
    }
    return (
        <Layout title="Payment Method">
            <div className={classes.section}>
                <CheckoutWizard activeStep={2} />
                <form className='mx-auto max-w-screen-md'
                    onSubmit={submitHandler}
                >
                    <h1 className="mb-4 text-xl">Payment Method</h1>
                    {
                        ['Paypal', 'Stripe', 'Cash On Delivery'].map((payment) => (
                            <div key={payment} className='mb-4'>
                                <input
                                    type="radio"
                                    className='p-2 outline-none focus:ring-0'
                                    id={payment}
                                    name='paymentMethod'
                                    checked={selectedPaymentMethod === payment}
                                    onChange={() => setSelectedPaymentMethod(payment)}
                                />
                                <label className='p-2' htmlFor={payment}>{payment}</label>
                            </div>
                        ))
                    }
                    <div className='mb-4 flex justify-between'>
                        <button
                            type="button"
                            className="default-button"
                            onClick={() => router.push('/shipping')}
                        >
                            Back
                        </button>
                        <button
                            className="primary-button"
                            onClick={() => router.push('/placeorder')}
                        >Next</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Payment