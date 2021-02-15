import React, { useState } from "react";
import Select from 'react-select';

const days = [
  { value: 'monday', label: 'måndag', color: '65C1E8' },
  { value: 'tuesday', label: 'tisdag', color: 'D85B63' },
  { value: 'wednesday', label: 'onsdag', color: 'D680AD' },
  { value: 'thursday', label: 'torsdag', color: '5C5C5C' },
  { value: 'friday', label: 'fredag', color: 'C0BA80' },
  { value: 'saturday', label: 'lördag', color: 'FDC47D' },
  { value: 'sunday', label: 'söndag', color: 'EA3B46' },
];

export default function FoodWeek({dishes, onSave}) {

  const getInitialFoodWeek = () => {
    const week = {
      id: new Date().toISOString(),
      name: '',
      isActive: false,
    };
    days.forEach(d => {
      week[d.value + '_lunch'] = 'valfritt';
      week[d.value + '_dinner'] = '';
    });
    return week;
  };
  const dishOptions = dishes.map(d => ({ value: d.id, label: d.name }));
  const [foodWeek, setFoodWeek] = useState(getInitialFoodWeek());

  const handleSelect = (value) => {
    setFoodWeek({...foodWeek, [value.name]: value.value});
  }; 

  const handleChange = (ev) => {
    const { value } = ev.target;
    setFoodWeek({...foodWeek, [ev.target.name]: value});
  };

  const handleSave = () => {
    onSave(foodWeek);
  };

  const getRandomDish = (i) => {
    if (i%2 === 0) {
      return 'Bea';
    }
    return 'Pasta';
  };

  const handleSurprise = () => {
    const week = {
      name: foodWeek.name
    };
    days.forEach((d,i) => {
      week[d.value + '_lunch'] = getRandomDish(i);
      week[d.value + '_dinner'] = getRandomDish(i);
    });
    setFoodWeek(week);   
  };

  return (
    <>
      <div className="container w-9/12 px-2 py-2">
        <div className="text-sm text-gray-900 py-1 font-bold">Namnge veckan</div>        
        <input id="week-name" name="name" value={foodWeek.name} onChange={handleChange} type="text" className="rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full mt-4" placeholder="Veckonamn" />
      </div>      
      {/* <button onClick={handleSurprise}>Överraska mig</button> */}     
      
      <div className="flex flex-col">
      {days.map(d => {        
                  return (
                  <div style={{backgroundColor: `#${d.color}`}} key={d.value}>                   
                    <div className="px-4 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-gray-900 py-2">{d.label}</div> 
                      <div className="text-sm text-gray-900 font-bold">lunch</div>     
                      <Select 
                        value={foodWeek[d.value + '_lunch']}
                        onChange={(val) => handleSelect({name: d.value + '_lunch', value: val })}
                        options={dishOptions}
                        placeholder="Välj rätt"
                      />
                    </div>
                    <div className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-bold">middag</div>   
                      <Select 
                        value={foodWeek[d.value + '_dinner']}
                        onChange={(val) => handleSelect({name: d.value + '_dinner', value: val })}
                        options={dishOptions}
                        placeholder="Välj rätt"
                      />  
                    </div>
                  </div>);
      })}        
      </div>
      <div>
        <button className="py-2" onClick={handleSave}>Spara</button>
      </div>
    </>    
  )
}
