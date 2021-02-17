//läs in veckans rätter
//lägga till fler items
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { getEntry, updateEntry } from "@utils/contentfulService";

const shoppingListId = '3ILfSiNkSomyMSBksia4Iz';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      const list = await getEntry(shoppingListId);
      setItems(list.items);
    };
    fetchList();
  }, []);

  const handleChange = (ev) => {
    setTaskText(ev.target.value);
  };

  const sortByDone = (a,b) => {
    if (a.isDone && !b.isDone) {
      return 1;
    }
    if (b.isDone && !a.isDone) {
      return -1;
    }
    return 0;
  };

  const addItem = (ev) => {
    if (ev.key !== 'Enter') {
      return false;
    }
    const item = { text: ev.target.value, isDone: false };
    const newItems = [item, ...items];
    newItems.sort(sortByDone);
    setItems(newItems);
    setTaskText('');
  };

  const isDone = (index) => {
    const newItems = [...items];
    const item = items[index];
    item.isDone = !item.isDone;
    newItems[index] = item;
    newItems.sort(sortByDone);
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];  
    newItems.splice(index, 1);
    newItems.sort(sortByDone);
    setItems(newItems);
  };

  const saveChanges = async () => {
    const result = await updateEntry(shoppingListId, { 
      title: 'Inköpslistan',
      items: items,  
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Inköpslista</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container px-3 max-w-md mx-auto">
          <div className="bg-white rounded shadow px-4 py-4">
            <h3 className="title font-bold text-lg">Inköpslista</h3>
            <input
              type="text"
              placeholder="skriv in varor som ska handlas"
              className="rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full mt-4"
              value={taskText}
              onChange={handleChange}
              onKeyUp={addItem}
            />
            <div className="text-sm mt-2">{items.filter(i => !i.isDone).length} varor kvar att handla</div>
            <button onClick={saveChanges}>Spara</button>

            <ul className="todo-list mt-4">
              {items.map((item, i) => {
                return (
                  <li key={i} className="flex justify-between items-center mt-3">
                    <div className={item.isDone ? 'flex items-center line-through text-gray-400': 'flex items-center'}>                      
                      <div className="capitalize ml-3 text-sm font-semibold" onClick={() => isDone(i)}>
                        {item.text}
                      </div>
                    </div>
                    <div>
                      <button onClick={() => removeItem(i)}>
                        <svg className=" w-4 h-4 text-gray-600 fill-current" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}              
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
