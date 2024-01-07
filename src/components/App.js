import "./FoodList.css";
// import mockItems from "../mock.json";
import FoodList from "./FoodList";
import {useEffect, useState} from "react";
import {getFoods} from "../api";

function App() {

    const LIMIT = 10;

    const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState('');
  const sortedItem = items.sort((a, b) => b[order] - a[order]);
  const handleNewsClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");
  const handleDeleteFood = (id) => {
      const nextItems = items.filter((item) => item.id !== id);
      setItems(nextItems);
  }

  const handleLoad = async (options) =>{
      const {
          foods,
          paging : {nextCursor} //별도명으로 바로 지정이 가능함
      } = await getFoods(options);
      if (options.cursor === '') {
          setItems(foods);
      } else {
          setItems((prevItems) => [...prevItems, ...foods]);
      }
      setCursor(nextCursor);
  }

    const handleLoadMore = () =>{
        handleLoad({order, cursor, limit:LIMIT});
    }

  useEffect(() => {
      handleLoad({order, cursor : '', limit:LIMIT});
  }, [order])

  return (
    <div className="FoodListItem">
      <button onClick={handleNewsClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItem} onDelete={handleDeleteFood}/>

        {cursor &&
            <button onClick={handleLoadMore}>더 보 기</button>}
    </div>
  );
}

export default App;