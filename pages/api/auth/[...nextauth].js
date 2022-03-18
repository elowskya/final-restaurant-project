import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

const options = {
  providers: [
    Github({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'enter your email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return null
        } else {
          // If you return null or false then the credentials will be rejected
          return null
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),
  ],

  // database: process.env.NEXT_PUBLIC_DATABASE_URL,
  // session: { strategy: "jwt" },
  session: {
    jwt: true, // THIS IS THE OLD WAY FOR next-auth
  },
  // jwt: {
  //   secret: process.env.SECRET,
  // },
  callbacks: {
    session: async (session, user) => {
      session.jwt = user.jwt
      session.id = user.id
      return session
    },
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false
      console.log(token, user, account)
      if (isSignIn) {
        console.log(JSON.stringify(account, null, 2))
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        )

        const data = await response.json()
        token.jwt = data.jwt
        token.id = data.user.id
      }
      return token
    },
  },
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
