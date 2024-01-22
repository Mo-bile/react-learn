import { useState } from "react";
import "./FoodForm.css";
import FileInput from "./FIleInput";

function Foodform() {
  const [values, setValues] = useState({
    title: "",
    calories: 0,
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
    const { name, value } = e.target; //디스트럭쳐링
    console.log(e.target);
    handleChange(name, value);
  };
  //   const [title, setTitle] = useState("");
  //   const [calorie, setcalorie] = useState(0);
  //   const [content, setContent] = useState("");

  //   const handleTitleChange = (e) => {
  //     setTitle(e.target.value);
  //   };
  //   const handleCalorieChange = (e) => {
  //     const nextCalorie = Number(e.target.value) || 0;
  //     setcalorie(nextCalorie);
  //   };
  //   const handleContentChange = (e) => {
  //     setContent(e.target.value);
  //   };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
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
        name="calorie"
        type="number"
        value={values.calorie}
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
export default Foodform;
