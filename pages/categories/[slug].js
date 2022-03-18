import Head from 'next/head'
import { useRouter } from 'next/router'
import ProductsList from '../../components/ProductsList'
import { getCategories, getCategory } from '../../utils/api'
import Layout from '../../components/Layout'

const CategoryPage = ({ category, categories }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading category...</div>
  }

  return (
    <>
      <Head>
        <title>{category.name} Restaurants</title>
      </Head>
      <Layout categories={categories}>
        <ProductsList products={category.products} />
      </Layout>
    </>
  )
}

export default CategoryPage

export async function getStaticProps({ params }) {
  const categories = await getCategories()
  const category = await getCategory(params.slug)
  return { props: { category, categories } }
}

export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map((_category) => {
      return {
        params: { slug: _category.slug },
      }
    }),
    fallback: true,
  }
}
