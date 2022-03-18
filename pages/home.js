import Head from 'next/head'
import ProductsList from '../components/ProductsList'
import { getProducts, getCategories } from '../utils/api'
import Layout from '../components/Layout'

const HomePage = ({ products, categories }) => {
  return (
    <Layout categories={categories}>
      <Head>
        <title>Ashleys Awesome App</title>
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
