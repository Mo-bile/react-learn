import { useState } from "react";
import "./ReviewForm.css";
import FIleInput from "./FileInput";
import RatingInput from "./RatingInput";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initialValues = INITIAL_VALUES,
  initialPreviews,
  onCancel,
  onSubmit,
  //네트워크 req 를 보내는 함수를 받아서 기존에 사용하던 createReviews 대신함
  onSubmitSucess,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatData = new FormData();
    formatData.append("title", values.title);
    formatData.append("rating", values.rating);
    formatData.append("content", values.content);
    formatData.append("imgFile", values.imgFile);

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formatData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSucess(review);
  };
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FIleInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initialPreviews={initialPreviews}
      />
      <input
        name="title"
        value={values.title}
        onChange={handleInputChange}
      ></input>
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      {onCancel && <button onClick={onCancel}>취소</button>}
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
