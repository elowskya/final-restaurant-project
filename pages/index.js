import { useSession, signIn, signOut } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import landingImage from '../public/assets/images/landingImage.jpg'
import HomePage from './home'
import { Grid, Box, Typography, useMediaQuery } from '@mui/material'

const IndexPage = () => {
  const [session, status] = useSession()
  const signInButtonNode = () => {
    if (session) {
      return false
    }
    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    )
  }
  const signOutButtonNode = () => {
    if (!session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="hero">
      <Head>
        <title>Strapi Next.js E-commerce</title>
      </Head>
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      <div className="text">
        Hello world
        {/*session[0].user.email*/}
      </div>
    </div>
  )
}

export default IndexPage
