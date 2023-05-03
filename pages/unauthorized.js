import Layout from '@/components/Layout'
import React from 'react'
import { useRouter } from 'next/router';

const Unauthorized = () => {
    const router = useRouter();
    const { message } = router.query;

    return (
        <Layout title="Unauthorized 🔒">
            <div style={{ marginTop: '10px' }}>
                <h1 className='text-xl'>Access is denied!</h1>
                {message && <div className="mb-4 text-red-500">{message}</div>}
            </div>
        </Layout>
    )
}

export default Unauthorized