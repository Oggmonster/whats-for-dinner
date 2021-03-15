import Head from "next/head";
import React, { useState, useEffect } from "react";

import Link from "next/link";

import FoodWeek from "@components/FoodWeek";
import Schedule from "@components/Schedule";
import { getEntry, getEntries, updateEntry, addEntry } from "@utils/contentfulService";

const scheduleId = 'uxjBeyQxfsUz4D3woHgTC';

export default function FoodPlanner() {
  const [isEditMode, setEditMode] = useState(false);
  const [activeFoodWeek, setActiveFoodWeek] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [foodWeeks, setFoodWeeks] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const result = await getEntries({content_type: 'dish'});
      setDishes(result);
    };
    const fetchFoodWeeks = async () => {
      const result = await getEntries({content_type: 'foodWeek'});
      setFoodWeeks(result);
    };
    fetchFoodWeeks();
    fetchDishes();
  }, []);


  const handleSaveFoodWeek = async (foodWeek) => {
    if (foodWeek.id === undefined) {
      const result = await addEntry('foodWeek', {
        name: foodWeek.name,
        days: foodWeek.days,
        isActive: foodWeek.isActive,
      });
      foodWeek.id = result.sys.id;
      setFoodWeeks([...foodWeeks, foodWeek]);
    } else {
      const result = await updateEntry(foodWeek.id, {
        name: foodWeek.name,
        days: foodWeek.days,
        isActive: foodWeek.isActive,
      });
    }    
    setEditMode(false);
  };

  const handleEditMode = () => {
    setEditMode(!isEditMode);
  };

  const handleActivate = (id) => {
    const index = foodWeeks.findIndex((w) => w.id === id);
    const item = foodWeeks[index];
    item.isActive = !item.isActive;
    handleSaveFoodWeek(item);
    const newWeeks = [...foodWeeks];
    newWeeks[index] = item;
    setFoodWeeks(newWeeks);
  };

  const handleEditFoodWeek = (id) => {
    const index = foodWeeks.findIndex((w) => w.id === id);
    const item = foodWeeks[index];
    setActiveFoodWeek(item);
    setEditMode(true);
  }

  const generateSchedule = async () => {
    const activeWeeks = foodWeeks.filter((f) => f.isActive);
    const weekIds = activeWeeks.map((w) => w.id);
    let idIndex = 0;
    const schedule = [];
    for (let i = 1; i <= 53; i++) {
      schedule.push({
        weekNo: i,
        weekId: weekIds[idIndex],
      });
      idIndex = idIndex < weekIds.length - 1 ? idIndex + 1 : 0;
    }
    const result = await updateEntry(scheduleId, {
      weeks: schedule,
    });
    alert('Matchemat klart!');
    console.log(result);
  };

  return (
    <div className="container">
      <Head>
        <title>Matschema</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container px-3 py-3 max-w-md mx-auto">
        <div className="flex flex-row justify-evenly">
            <Link href={`/`}>Start</Link>
            <Link href={`/shopping-list`}>Inköpslista</Link>
          </div>
          <h3 className="title font-bold text-lg m-2">Matschema</h3>

          <button
            type="button"
            onClick={handleEditMode}
            className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          >
            {isEditMode ? "Stäng" : "Lägg till matvecka"}
          </button>
          {isEditMode && (
            <FoodWeek existingWeek={activeFoodWeek} dishes={dishes} onSave={handleSaveFoodWeek} />
          )}
          {!isEditMode && (
            <Schedule
              foodWeeks={foodWeeks}
              onActivate={handleActivate}
              onEdit={handleEditFoodWeek}
              onGenerateSchedule={generateSchedule}
            />
          )}
        </div>
      </main>
    </div>
  );
}
