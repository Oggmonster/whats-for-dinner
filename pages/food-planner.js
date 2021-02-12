import Head from 'next/head';
import React, { useState } from "react";

import { fetchEntries } from '@utils/fetchFromServer';
import FoodWeek from '@components/FoodWeek';
import Schedule from '@components/Schedule';

export default function FoodPlanner({dishes}) {

  const [isEditMode, setEditMode] = useState(false);

  const [foodWeeks, setFoodWeeks] = useState([]);

  const handleSaveFoodWeek = (foodWeek) => {
    setFoodWeeks([...foodWeeks, foodWeek]);
    setEditMode(false);
  };

  const handleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleActivate = (id) => {
    const index = foodWeeks.findIndex(w => w.id === id);
    const item = foodWeeks[index];
    item.isActive = !item.isActive;
    const newWeeks = [...foodWeeks];
    newWeeks[index] = item;
    setFoodWeeks(newWeeks);
  };

  const generateSchedule = () => {
    const activeWeeks = foodWeeks.filter(f => f.isActive);
    const weekIds = activeWeeks.map(w => w.id);
    let idIndex = 0;
    const schedule = [];
    for (let i=1; i <= 53; i++) {
      schedule.push({
        weekNo: i,
        weekId: weekIds[idIndex],
      });
      idIndex = idIndex < weekIds.length - 1 ? idIndex + 1 : 0;
    }
    console.log(schedule);
  };
  
  return (
    <div className="container">
      <Head>
        <title>Matschema</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h3>Matschema</h3>
          
          <button type="button" onClick={handleEditMode} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">{isEditMode ? 'Stäng' : 'Lägg till matvecka'}</button>
          {isEditMode && <FoodWeek dishes={dishes} onSave={handleSaveFoodWeek} />}
          <Schedule foodWeeks={foodWeeks} onActivate={handleActivate} onGenerateSchedule={generateSchedule} />
        </div>        
      </main>      
    </div>
  )
}


export async function getStaticProps() {
  const res = await fetchEntries();
  const dishes = await res.map((p) => {
    return {...p.fields, id: p.sys.id };
  });
  console.log(dishes);

  return {
    props: {
      dishes,
    },
  }
}
