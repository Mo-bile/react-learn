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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState('');
  const sortedItem = items.sort((a, b) => b[order] - a[order]);
  const handleNewsClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");
  const handleDeleteFood = (id) => {
      const nextItems = items.filter((item) => item.id !== id);
      setItems(nextItems);
  }
  const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target['search'].value);
    };

  const handleLoad = async (options) =>{
      let result;
      try {
          setIsLoading(true);
          setLoadingError(null);
          result = await getFoods(options); //result 는 후에 또 씀
      }catch (e) {
          setLoadingError(e);
          return;
      }finally {
        setIsLoading(false)
      }
      const {
          foods,
          paging : {nextCursor} //별도명으로 바로 지정이 가능함
      } = result;
      if (options.cursor === '') {
          setItems(foods);
      } else {
          setItems((prevItems) => [...prevItems, ...foods]);
      }
      setCursor(nextCursor);
  }

    const handleLoadMore = () =>{
        handleLoad({order, cursor, limit:LIMIT, search});
    }

  useEffect(() => {
      handleLoad({order, cursor : '', limit:LIMIT, search});
  }, [order, search])

  return (
    <div className="FoodListItem">
      <button onClick={handleNewsClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
        <form onSubmit={handleSearchSubmit}>
            <input name="search" />
            <button type="submit">검색</button>
        </form>
      <FoodList items={sortedItem} onDelete={handleDeleteFood}/>

        {cursor &&
            <button disabled={isLoading} onClick={handleLoadMore}>더 보 기</button>}
        {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;