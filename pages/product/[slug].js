import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import useStyles from '@/utils/styles';
import { Typography } from '@mui/material';
import Product from '@/models/Product';
import db from '@/utils/db';

const ProductScreen = ({ product }) => {
    const classes = useStyles();

    if (!product) {
        return <div>Product Not Found</div>
    }
    return (
        <Layout title={product.name} description={product.description}>
            <div className="py-2">
                <Link href="/">back to products</Link>
            </div>

            <div className={`${classes.section} grid md:grid-cols-4 md:gap-3`}>
                <div className='md:col-span-2'>
                    <Image
                        src={`/${product.image}`}
                        alt={product.name}
                        width={500}
                        height={500}
                        layout="responsive"
                    ></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <Typography component="h1" variant="h1">{product.name}</Typography>
                            <h1 className='text-lg'>{product.name}</h1>
                        </li>
                        <li>Category : {product.category}</li>
                        <li>Brand : {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description : {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className='card p-5'>
                        <div className='mb-2 flex justify-between'>
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
                        </div>
                        <button className='primary-button w-full'>Add to cart</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    return {
        props: {
            product: db.convertDocToObj(product)
        }
    }
}

export default ProductScreen