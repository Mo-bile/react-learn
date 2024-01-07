function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete }) {
    const handleDeleteClick = () => onDelete(item.id);
  const { imgUrl, title, calorie, content } = item;

  return (
    <div>
      <img src={imgUrl} alt={title} className="FoodListItem-img" />
      <div>제목 : {title}</div>
      <div>칼로리 : {calorie}</div>
      <div>내용 : {content}</div>
      <div>{formatData(item.createdAt)}</div>
        <button onClick={handleDeleteClick}>삭제하기</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
    let count = 1;
  return (
    <ul className="FoodList">
      {items.map((item) => (
          <li key={item.id}>
              {count++}
            <FoodListItem item={item} onDelete={onDelete} />;
          </li>
      ))}
    </ul>
  );
}

export default FoodList;
