import ReviewList from "./ReviewList";
// import mockItems from "../mock.json";
import { useCallback, useEffect, useState } from "react";
import {
  createReviews,
  deleteReviews,
  getReviews,
  updateReviews,
} from "../api";
import ReviewForm from "./ReviewForm";
import useAsync from "./hooks/useAsync";
import Locale from "../contexts/LocaleContext";

function App() {
  const LIMIT = 6;

  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [loadingError, setLoadingError] = useState(null);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = async (id) => {
    const result = await deleteReviews(id);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return; //왜냐 catch 에서 Return 은 undefined임

      const { reviews, paging } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + reviews.length);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSucess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSucess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <Locale.Provider value={"ko"}>
      <div>
        <button onClick={handleNewestClick}>createdAt</button>
        <button onClick={handleBestClick}>rating</button>
        <ReviewForm
          onSubmit={createReviews}
          onSubmitSucess={handleCreateSucess}
        />
        <ReviewList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReviews}
          onUpdateSucess={handleUpdateSucess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </Locale.Provider>
  );
}

export default App;
