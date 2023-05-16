import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import CheckoutWizard from '../components/CheckoutWizard'
import { useForm } from 'react-hook-form'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const Shipping = () => {
    const router = useRouter();
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const submitHandler = ({ fullName, address, city, postalCode, country }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country }
        });
        Cookies.set('cart',
            JSON.stringify({
                ...cart, shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalCode,
                    country
                }
            })
        );

        router.push('/payment');
    }
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress]);




    return (
        <Layout title="Shipping" >
            <div className='mt-10'>
                <CheckoutWizard activeStep={1} />
                <form className='mx-auto max-w-screen-md'
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <h1 className="mb-4 text-xl">Shipping Address</h1>
                    <div className="mb-4">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" autoFocus className="w-full"
                            {...register('fullName', {
                                required: "Please enter full name"
                            })} />
                    </div>
                    {errors.fullName && (
                        <div className="text-red-500">{errors.fullName.message}</div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="adderss" autoFocus className="w-full"
                            {...register('address', {
                                required: "Please enter address",
                                minLength: { value: 3, message: "Address should be more thatn 3 characters" }
                            })} />
                    </div>
                    {errors.address && (
                        <div className="text-red-500">{errors.address.message}</div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" autoFocus className="w-full"
                            {...register('city', {
                                required: "Please enter city name"
                            })} />
                    </div>
                    {errors.city && (
                        <div className="text-red-500">{errors.city.message}</div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input type="text" id="postalCode" autoFocus className="w-full"
                            {...register('postalCode', {
                                required: "Please enter postal code"
                            })} />
                    </div>
                    {errors.postal && (
                        <div className="text-red-500">{errors.postal.message}</div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="country">Country</label>
                        <input type="text" id="country" autoFocus className="w-full"
                            {...register('country', {
                                required: "Please enter country name"
                            })} />
                    </div>
                    {errors.country && (
                        <div className="text-red-500">{errors.country.message}</div>
                    )}
                    <div className='mb-4 flex justify-between'>
                        <button className="primary-button">Next</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

// it means only logged in users can access this page
Shipping.auth = true

export default Shipping
