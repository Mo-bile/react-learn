import "./FoodList.css";
// import mockItems from "../mock.json";
import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import { createFood, getFoods, updateFood, deleteFood } from "../api";
import FoodForm from "./FoodForm";

function App() {
  const LIMIT = 10;
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");
  const sortedItem = items.sort((a, b) => b[order] - a[order]);
  const handleNewsClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");
  const handleDeleteFood = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options); //result 는 후에 또 씀
    } catch (e) {
      setLoadingError(e);
      return;
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor }, //별도명으로 바로 지정이 가능함
    } = result;
    if (options.cursor === "") {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({ order, cursor, limit: LIMIT, search });
  };

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSucess = (food) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, splitIdx),
        food,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, cursor: "", limit: LIMIT, search });
  }, [order, search]);

  return (
    <div className="FoodListItem">
      <FoodForm onSubmitSucess={handleCreateSuccess} onSubmit={createFood} />
      <button onClick={handleNewsClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodList
        items={sortedItem}
        onDelete={handleDeleteFood}
        onUpdate={updateFood}
        onUpdateSucess={handleUpdateSucess}
      />

      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보 기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
