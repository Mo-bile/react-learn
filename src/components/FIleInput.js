import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange, initialPreviews }) {
  const [preview, setPreview] = useState(initialPreviews);
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current; //참조할 태그가 무엇인지 정해주어야함
    if (!inputNode) return;
    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
    return () => {
      setPreview(initialPreviews);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreviews]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
}

export default FileInput;
