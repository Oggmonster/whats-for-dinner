import React, { useState } from "react";

export default function Schedule({foodWeeks, onActivate, onGenerateSchedule}) {

  //aktivera
  //visa
  const [foodWeek, setFoodWeek] = useState(null);

  const handleActivate = (id) => {
    onActivate(id);
  };

  const handleShowWeek = (item) => {
    console.log(item);
    setFoodWeek(item);
  };

  

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
            <button onClick={() => handleShowWeek(f)} >Visa</button>
          </div>
        );
      })}
      {foodWeek && (
        <div>
          {JSON.stringify(foodWeek)}
          <button onClick={() => handleShowWeek(null)}>Stäng</button>
        </div>
      )}
    </div>   
  )
}
