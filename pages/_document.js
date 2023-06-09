// import { ServerStyleSheets } from '@mui/core/styles'
import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}


// Document.getInitialProps = async (ctx) => {
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () => {
//     return originalRenderPage({
//       enhance: (App) => (props) => sheets.collect(<App {...props} />)
//     })
//   }

//   const initialProps = await Document.getInitialProps(ctx);
//   return(
//     ...initialProps,
//     styles : [
//       ...React.Children.to
//     ]
//   )
// }