import { useState } from "react";
import "./ReviewForm.css";
import FIleInput from "./FileInput";
function ReviewForm() {
  //   const [title, setTitle] = useState("");
  //   const [rating, setRating] = useState(0);
  //   const [content, setContent] = useState("");
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value); //title state값을 변경해줌
  // };
  // const handleRatingChange = (e) => {
  //   const nextRating = Number(e.target.value) || 0;
  //   setRating(nextRating);
  // };
  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FIleInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        onChange={handleInputChange}
      ></input>
      <input
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleInputChange}
      ></input>
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
