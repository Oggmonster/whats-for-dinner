import Head from 'next/head'

import { fetchEntries } from '@utils/fetchFromServer';
import Link from 'next/link';

import Header from '@components/Header'
import Footer from '@components/Footer'
import Post from '@components/Post'

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>What's for dinner?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div>
        <Link href={`/food-planner`}>Planera matschema</Link>
        </div>
        <div className="posts">
          {posts.map((p) => {
            return <Post key={p.name} name={p.name} ingredients={p.ingredients} />
          })}
        </div>
      </main>

      <Footer />      
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries();
  console.log('res', res);
  const posts = await res.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
    },
  }
}
