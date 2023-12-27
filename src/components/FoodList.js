function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content } = item;

  return (
    <div>
      <img src={imgUrl} alt={title} className="FoodListItem-img" />
      <div>제목 : {title}</div>
      <div>칼로리 : {calorie}</div>
      <div>내용 : {content}</div>
      <div>{formatData(item.createdAt)}</div>
    </div>
  );
}

function FoodList({ items }) {
  return (
    <ul>
      {items.map((item) => {
        return <FoodListItem item={item} />;
      })}
    </ul>
  );
}

export default FoodList;
