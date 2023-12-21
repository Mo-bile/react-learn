import "./FoodList.css";
import items from "../mock.json";
import FoodList from "./FoodList";

function App() {
  return (
    <div className="FoodListItem">
      <FoodList items={items} />
    </div>
  );
}

export default App;
