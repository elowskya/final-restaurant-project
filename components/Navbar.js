import Link from 'next/link'
import NextImage from './Image'
import CartImage from '../public/cart.svg'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/client'

const Navbar = () => {
  const [session, status] = useSession()
  return (
    <div className="flex justify-between ml-6 mr-6 mt-4">
      <button className="snipcart-checkout flex items-center text-sm text-indigo-500">
        <NextImage src="/cart.svg" alt="home" height="25" width="25" />
        <span className="snipcart-total-price ml-3 font-semibold text-sm text-indigo-500"></span>
      </button>

      <div className="flex items-center text-sm text-indigo-500">
        <span className="ml-3 font-semibold text-sm text-black">
          Hello, {session?.user?.email || "Guest"}
        </span>
        &nbsp; &nbsp; &nbsp;
       { session?.user?.email && <button 
          onClick={signOut}
          style={{
            border: '1.5px solid indigo',
            padding: '5px',
            borderRadius: '10px',
          }}
        >
          {' '}
          Sign Out
        </button>}
      </div>
    </div>
  )
}

export default Navbar
