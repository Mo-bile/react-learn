import "./FoodList.css";
// import mockItems from "../mock.json";
import FoodList from "./FoodList";
import { useState } from "react";
import {getFoods} from "../api";

function App() {
    const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItem = items.sort((a, b) => b[order] - a[order]);
  const handleNewsClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");
  const handleDeleteFood = (id) => {
      const nextItems = items.filter((item) => item.id !== id);
      setItems(nextItems);
  }

  const handleLoadFood = async () =>{
      const {foods} = await getFoods();
      // console.log(foodList);
      setItems(foods);
  }

  return (
    <div className="FoodListItem">
      <button onClick={handleNewsClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItem} onDelete={handleDeleteFood}/>

        <button onClick={handleLoadFood}>불러오기</button>
    </div>
  );
}

export default App;
