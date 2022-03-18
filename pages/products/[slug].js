import Head from 'next/head'
import { useRouter } from 'next/router'
import { getProducts, getProduct, getCategories } from '../../utils/api'
import Layout from '../../components/Layout'
import { useState } from 'react'
import { TextField } from '@mui/material'

const ProductPage = ({ product, categories }) => {
  const router = useRouter()
  const [filter, setFilter] = useState('')

  if (router.isFallback) {
    return <div>Loading product...</div>
  }

  return (
    <>
      <Head>
        <title>{product.title} product</title>
      </Head>
      <Layout categories={categories}>
        <div style={{ padding: '10px'}}>
          <TextField
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
            }} fullWidth size='small' label="Search" />
        </div>
        {product.food_items
          .filter((food) =>
            food.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((food, index) => (
            <div className="grid grid-cols-2 gap-3" key={index}>
              <div className="snipcart-add-item mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow">
                {food.name} - {food.price}
              </div>
              <button
                className="snipcart-add-item mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
                data-item-id={food.id}
                data-item-price={food.price}
                data-item-url={router.asPath}
                data-item-description={food.description}
                data-item-name={food.name}
                v-bind="customFields"
              >
                Add to cart
              </button>
            </div>
          ))}
      </Layout>
    </>
  )
}

export default ProductPage

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug)
  const categories = await getCategories()

  return { props: { product, categories } }
}

export async function getStaticPaths() {
  const products = await getProducts()
  return {
    paths: products.map((_product) => {
      return {
        params: { slug: _product.slug },
      }
    }),
    fallback: true,
  }
}
