import Head from "next/head";
import React, { useState, useEffect } from "react";

import Link from "next/link";

import { getEntry, updateEntry } from "@utils/contentfulService";

const scheduleId = "uxjBeyQxfsUz4D3woHgTC";
const shoppingListId = "3ILfSiNkSomyMSBksia4Iz";

const days = [
  { value: "monday", label: "måndag", color: "65C1E8" },
  { value: "tuesday", label: "tisdag", color: "D85B63" },
  { value: "wednesday", label: "onsdag", color: "D680AD" },
  { value: "thursday", label: "torsdag", color: "5C5C5C" },
  { value: "friday", label: "fredag", color: "C0BA80" },
  { value: "saturday", label: "lördag", color: "FDC47D" },
  { value: "sunday", label: "söndag", color: "EA3B46" },
];

function ISO8601_week_no(dt) {
  const tdt = new Date(dt.valueOf());
  const dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

export default function Home() {
  const [thisWeek, setThisWeek] = useState();
  const [shoppingList, setShoppingList] = useState();
  const [inList, setInList] = useState([]);
  const [day, setDay] = useState(
    new Date().toLocaleString("en-us", { weekday: "long" }).toLowerCase()
  );

  useEffect(() => {
    const fetchActiveWeek = async () => {
      const schedule = await getEntry(scheduleId);
      const weekNo = ISO8601_week_no(new Date());
      const week = schedule.weeks.filter((w) => w.weekNo === weekNo)[0];
      const foodWeek = await getEntry(week.weekId);
      setThisWeek(foodWeek);
      const list = await getEntry(shoppingListId);
      setShoppingList(list);
    };
    fetchActiveWeek();
  }, []);

  const markAsAdded = (addedKey) => {
    setInList([...inList, addedKey]);
  };

  const isAdded = (addedKey) => {
    return !inList.some((i) => i === addedKey);
  };

  const addIngredientsToShoppingList = async (dishId, addedKey) => {    
    markAsAdded(addedKey);
    if(!dishId) {
      return false;
    }
    const dish = await getEntry(dishId);
    const shopItems = dish.ingredients.map((i) => {
      return { text: i, isDone: false };
    });
    const newItems = [...shoppingList.items, ...shopItems];
    await updateEntry(shoppingListId, {
      items: newItems,
    });
    shoppingList.items = newItems;
    setShoppingList(shoppingList);
  };

  return (
    <div className="container">
      <Head>
        <title>What's for dinner?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container px-3 py-3 max-w-md mx-auto">
          <div className="flex flex-row justify-evenly">
            <Link href={`/food-planner`}>Planera matschema</Link>
            <Link href={`/shopping-list`}>Inköpslista</Link>
          </div>
          <div>
            {thisWeek && (
              <>
                <div className="mt-4">
                  <h3 className="font-bold">Lunch</h3>
                  <p>{thisWeek.days[`${day}_lunch`]["label"]}</p>
                  <h3 className="font-bold">Middag</h3>
                  <p>{thisWeek.days[`${day}_dinner`]["label"]}</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold">
                    Vecka {ISO8601_week_no(new Date())}. ({thisWeek.name})
                  </h3>
                  <ul>
                    {days.map((d, i) => {
                      return (
                        <li
                          style={{ backgroundColor: "#" + d.color }}
                          className="py-2 px-2 rounded my-2"
                          key={i}
                        >
                          <div>
                            <strong>{d.label}</strong>
                          </div>
                          <div className="flex justify-between">
                            lunch: {thisWeek.days[`${d.value}_lunch`]["label"]}{" "}
                            {isAdded(i + "l") && (
                              <button
                                className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-2 py-1 m-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                                onClick={() =>
                                  addIngredientsToShoppingList(
                                    thisWeek.days[`${d.value}_lunch`]["value"],
                                    i + "l"
                                  )
                                }
                              >
                                &#128722;
                              </button>
                            )}
                          </div>
                          <div className="flex justify-between mt-1">
                            middag:{" "}
                            {thisWeek.days[`${d.value}_dinner`]["label"]}
                            {isAdded(i + "d") && (
                              <button
                                type="button"
                                onClick={() =>
                                  addIngredientsToShoppingList(
                                    thisWeek.days[`${d.value}_dinner`]["value"],
                                    i + "d"
                                  )
                                }
                                className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-2 py-1 m-1 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                              >
                                &#128722;
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
