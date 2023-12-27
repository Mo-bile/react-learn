import "./FoodList.css";
import items from "../mock.json";
import FoodList from "./FoodList";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState("createdAt");
  const sortedItem = items.sort((a, b) => b[order] - a[order]);
  const handleNewsClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  return (
    <div className="FoodListItem">
      <button onClick={handleNewsClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItem} />
    </div>
  );
}

export default App;
