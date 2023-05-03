import { useEffect } from 'react'
import '@/styles/globals.css'
import '@/styles/Layout.css'
import { StoreProvider } from '@/utils/Store'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {/*if under any page in the pages directtory pageName.auth = true, it will go for the first 
         condition that means the user is logged in , we have done this Component.auth to check wheteher a
         is protected for only logged  in users or not */}
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : <Component {...pageProps} />
        }
      </StoreProvider>
    </SessionProvider>
  )
}



// it will check whether the user authenticated or not , if not logged in it will show him unauthorized error
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required')
    }
  });

  if (status === 'loading') {
    return (<div>Loading...</div>)
  }

  return children;
}