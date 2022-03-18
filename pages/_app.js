/* eslint-disable react-hooks/exhaustive-deps */
import App from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import { getCategories } from '../utils/api'
import '../styles/index.css'
import { Provider, useSession, getSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
        />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
        />
      </Head>
      <Provider session={session}>
        <div
          hidden
          id="snipcart"
          data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
        />
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </Provider>
    </>
  )
}
// https:/

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  // const categories = await getCategories()

  const session = await getSession(ctx)
  // Pass the data to our page via props
  return { ...appProps, pageProps: { session, path: ctx.pathname } }
}

function Auth({ children }) {
  const [session, status] = useSession()
  const router = useRouter()
  useEffect(() => {
    if (!session?.user && router.asPath !== '/api/auth/signin') {
      router.push('/api/auth/signin')
    }
    if (session?.user && router.asPath === '/') {
      router.push('/home')
    }
  }, [router.asPath])

  if (!session?.user && router.asPath !== '/api/auth/signin') {
    const message = "You aren't authorized to view this page"
    return (
      <div className="hero">
        <div className="text">{message}</div>
      </div>
    )
  }

  return children
}

export default MyApp
