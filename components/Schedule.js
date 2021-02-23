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
      <button onClick={onGenerateSchedule}>Generera schema baserat på aktiva veckor</button>
      <h3>Veckor</h3>
      {foodWeeks.map(f => {
        return (
          <div key={f.id}>
            <h5>{f.isActive && <strong>*AKTIV*</strong>} {f.name}</h5>            
            <button onClick={() => handleActivate(f.id)}>{f.isActive? 'Avaktivera' : 'Aktivera'}</button>
            <button onClick={() => handleEdit(f.id)} >Ändra</button>
          </div>
        );
      })}
    </div>   
  )
}
