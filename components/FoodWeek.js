import React, { useState } from "react";
import Select from 'react-select';

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
      <div>
        <label for="week-name" className="sr-only">Vad vill du kalla veckan?</label>
        <input id="week-name" name="name" value={foodWeek.name} onChange={handleChange} type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Veckonamn" />
      </div>
      
      <button onClick={handleSurprise}>Överraska mig</button>
      
      <button onClick={handleSave}>Spara</button>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dag
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lunch
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Middag
                    </th>                   
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {days.map(d => {        
                  return (
                  <tr key={d.value}>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{d.label}</div>                        
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Select 
                        value={foodWeek[d.value + '_lunch']}
                        onChange={(val) => handleSelect({name: d.value + '_lunch', value: val })}
                        options={dishOptions}
                        placeholder="Välj rätt"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                     <Select 
                      value={foodWeek[d.value + '_dinner']}
                      onChange={(val) => handleSelect({name: d.value + '_dinner', value: val })}
                      options={dishOptions}
                      placeholder="Välj rätt"
                    />  
                    </td>
                  </tr>);
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>    
  )
}
