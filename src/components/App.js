import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useState } from "react";
import {getReviews} from "../api";

function App() {
const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    }
    const handleLoadCLick = async () => {
        const {reviews} = await getReviews();
        setItems(reviews);
    };

  return (
    <div>
      <button onClick={handleNewestClick}>createdAt</button>
      <button onClick={handleBestClick}>rating</button>
      <ReviewList items={sortedItems} onDelete={handleDelete}/>
        <button onClick={handleLoadCLick}>불러오기</button>
    </div>
  );
}

export default App;
