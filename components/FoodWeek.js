import React, { useState } from "react";

const days = [
  { value: 'monday', label: 'måndag' },
  { value: 'tuesday', label: 'tisdag' },
  { value: 'wednesday', label: 'onsdag' },
  { value: 'thursday', label: 'torsdag' },
  { value: 'friday', label: 'fredag' },
  { value: 'saturday', label: 'lördag' },
  { value: 'sunday', label: 'söndag' },
];

export default function FoodWeek({dishes, onSave}) {

  const getInitialFoodWeek = () => {
    const week = {
      name: '',
    };
    days.forEach(d => {
      week[d.value + '_lunch'] = 'valfritt';
      week[d.value + '_dinner'] = '';
    });
    return week;
  };
  const [foodWeek, setFoodWeek] = useState(getInitialFoodWeek());

  const handleChange = (ev) => {
    const { value } = ev.target;
    setFoodWeek({...foodWeek, [ev.target.name]: value});
  };

  const handleSave = () => {
    onSave(foodWeek);
  };

  return (
    <>
      <div>
        <label>Veckonamn</label>
        <input
          value={foodWeek.name}
          type='text'
          onChange={handleChange}
          name='name' />
      </div>
      {days.map(d => {        
        return (
        <div key={d.value}>
          <h5>{d.label}</h5>

          <label>Lunch</label>
          <input
            value={foodWeek[d.value + '_lunch']}
            type='text'
            onChange={handleChange}
            name={d.value + '_lunch'} />

          <label>Middag</label>
          <input
            value={foodWeek[d.value + '_dinner']}
            type='text'
            onChange={handleChange}
            name={d.value + '_dinner'} />
        </div>);
      })}
      <button onClick={handleSave}>Spara</button>
    </>    
  )
}
