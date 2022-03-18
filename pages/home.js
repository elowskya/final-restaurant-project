import Head from 'next/head'
import ProductsList from '../components/ProductsList'
import { getProducts, getCategories } from '../utils/api'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Image from 'next/image'

const HomePage = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      <Head>
        <title>Strapi Next.js E-commerce</title>
      </Head>
      <ProductsList products={products} />
    </Layout>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  const categories = await getCategories()
  return { props: { products, categories } }
}

export default HomePage
