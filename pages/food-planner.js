import Head from 'next/head';

import { fetchEntries } from '@utils/fetchFromServer';
import FoodWeek from '@components/FoodWeek';

export default function FoodPlanner({dishes}) {

  const handleSaveFoodWeek = (foodWeek) => {
    console.log(foodWeek);
  }; 
  
  return (
    <div className="container">
      <Head>
        <title>Matschema</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h3>Veckoplan</h3>
          <FoodWeek dishes={dishes} onSave={handleSaveFoodWeek} />
        </div>        
      </main>      
    </div>
  )
}


export async function getStaticProps() {
  const res = await fetchEntries();
  const dishes = await res.map((p) => {
    return p.fields
  })

  return {
    props: {
      dishes,
    },
  }
}
