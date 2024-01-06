import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import {useEffect, useState} from "react";
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
    };
    const handleLoad = async () => {
        const {reviews} = await getReviews();
        setItems(reviews);
    };

    useEffect(() =>{
        handleLoad();
    },[]);

    return (
    <div>
        <button onClick={handleNewestClick}>createdAt</button>
        <button onClick={handleBestClick}>rating</button>
        <ReviewList items={sortedItems} onDelete={handleDelete}/>
    </div>
    );
}

export default App;
