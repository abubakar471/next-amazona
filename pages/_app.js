import { useEffect } from 'react'
import '@/styles/globals.css'
import '@/styles/Layout.css'
import { StoreProvider } from '@/utils/Store'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
