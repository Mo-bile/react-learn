import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";
import { useLocale } from "../contexts/LocaleContext";

function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

//자식 컴포넌트
function ReviewListItem({ item, onDelete, onEdit }) {
  const locate = useLocale();

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        {/* <p>{item.rating}</p> */}
        <p>{formatData(item.createdAt)}</p>
        <p>{item.content}</p>
        <p>현재 언어 : {locate}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

// 부모컴포넌트
function ReviewList({ items, onDelete, onUpdate, onUpdateSucess }) {
  const [editingId, setEditingId] = useState(null); //현재 수정중인 요소 Id기억

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content, imgFile: null };

          const handleSubmit = (formatData) => onUpdate(id, formatData);

          const handleSubmitSucess = (review) => {
            onUpdateSucess(review);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreviews={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSucess={handleSubmitSucess}
              />
            </li>
          );
        } else {
          return (
            <li key={item.id}>
              <ReviewListItem
                item={item}
                onDelete={onDelete}
                onEdit={setEditingId}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ReviewList;
