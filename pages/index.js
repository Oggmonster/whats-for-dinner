import Head from "next/head";
import React, { useState, useEffect } from "react";

import Link from "next/link";

import Header from "@components/Header";
import Footer from "@components/Footer";

import { getEntry } from "@utils/contentfulService";

const scheduleId = "uxjBeyQxfsUz4D3woHgTC";

const days = [
  { value: 'monday', label: 'måndag', color: '65C1E8' },
  { value: 'tuesday', label: 'tisdag', color: 'D85B63' },
  { value: 'wednesday', label: 'onsdag', color: 'D680AD' },
  { value: 'thursday', label: 'torsdag', color: '5C5C5C' },
  { value: 'friday', label: 'fredag', color: 'C0BA80' },
  { value: 'saturday', label: 'lördag', color: 'FDC47D' },
  { value: 'sunday', label: 'söndag', color: 'EA3B46' },
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
    };
    fetchActiveWeek();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>What's for dinner?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container px-3 max-w-md mx-auto">
          <Header />
          <div className="flex flex-col">
            <Link href={`/food-planner`}>Planera matschema</Link>
            <Link href={`/shopping-list`}>Inköpslista</Link>
          </div>
          <div>
            {thisWeek && (
              <>
              <div className="mt-4">
                <h3 className="font-bold">Lunch</h3>
                <p>{thisWeek.days[`${day}_lunch`]['label']}</p>
                <h3 className="font-bold">Middag</h3>
                <p>{thisWeek.days[`${day}_dinner`]['label']}</p>
              </div>
              <div  className="mt-4">
                <h3 className="font-bold">Vecka {ISO8601_week_no(new Date())}.</h3>
                <ul>
                  {days.map(d => {
                    return (
                      <li style={{backgroundColor: '#' + d.color}} className="py-2 px-1">
                        <div>{d.label}</div>
                        <div>lunch: {thisWeek.days[`${d.value}_lunch`]['label']}</div>
                        <div>middag: {thisWeek.days[`${d.value}_dinner`]['label']}</div>
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
