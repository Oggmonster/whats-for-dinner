import React, { useState } from "react";

export default function Schedule({foodWeeks, onActivate, onEdit, onGenerateSchedule}) {

  //aktivera
  //visa

  const handleActivate = (id) => {
    onActivate(id);
  };

  const handleEdit = (id) => {
    onEdit(id);
  }  

  return (
    <div>
      <br />
      <button onClick={onGenerateSchedule} className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">Generera schema baserat på aktiva veckor</button>
      <h3 className="m-2 text-lg">Veckor</h3>
      {foodWeeks.map(f => {
        return (
          <div key={f.id} className="my-2 p-2 rounded-md bg-gray-200">
            <h5 className="text-lg">{f.isActive && <strong>*AKTIV*</strong>} {f.name}</h5>      
            <div className="flex justify-between">

            <button className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline" onClick={() => handleActivate(f.id)}>{f.isActive? 'Avaktivera' : 'Aktivera'}</button>
            <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" onClick={() => handleEdit(f.id)} >Ändra</button>
            </div>
          </div>
        );
      })}
    </div>   
  )
}
