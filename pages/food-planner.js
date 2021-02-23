import Head from "next/head";
import React, { useState, useEffect } from "react";

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
        <div className="container px-3 mx-auto">
          <h3 className="title font-bold text-lg">Matschema</h3>

          <button
            type="button"
            onClick={handleEditMode}
            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
