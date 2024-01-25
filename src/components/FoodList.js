import { useState } from "react";
import FoodForm from "./FoodForm";
import { updateFood } from "../api";

function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => {
    onEdit(item.id);
  };
  const { imgUrl, title, calorie, content } = item;

  return (
    <div>
      <img src={imgUrl} alt={title} className="FoodListItem-img" />
      <div>제목 : {title}</div>
      <div>칼로리 : {calorie}</div>
      <div>내용 : {content}</div>
      <div>{formatData(item.createdAt)}</div>
      <button onClick={handleEditClick}>수정하기</button>
      <button onClick={handleDeleteClick}>삭제하기</button>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSucess }) {
  const [editingId, setEditingId] = useState(null);
  const handleCancel = () => setEditingId(null);

  let count = 1;
  return (
    <ul className="FoodList">
      {items.map((item) => {
        {
          count++;
        }
        if (item.id === editingId) {
          const { imgUrl, title, calorie, content, id } = item;
          const initialValues = { title, calorie, content, imgUrl: null };

          const handleUpdate = (formData) => {
            console.log(formData);
            onUpdate(id, formData);
          };

          const handleSubmitSucess = (food) => {
            onUpdateSucess(food);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreviews={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleUpdate}
                onSubmitSucess={handleSubmitSucess}
              />
              ;
            </li>
          );
        } else {
          return (
            <li key={item.id}>
              <FoodListItem
                item={item}
                onDelete={onDelete}
                onEdit={setEditingId}
              />
              ;
            </li>
          );
        }
      })}
    </ul>
  );
}

export default FoodList;
