import { useSession, signIn, signOut } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useEffect } from "react"
import { useRouter } from "next/router"

const IndexPage = () => {
  const [session, status] = useSession()
  const router = useRouter()
  useEffect(()=>{
    
      router.push("/home")
    
  })
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
            Sign In test
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
        <title>Ashleys Awesome App</title>
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
