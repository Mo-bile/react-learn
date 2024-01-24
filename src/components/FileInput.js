import { useRef, useState } from "react";
import { useEffect } from "react";

function FIleInput({ name, value, onChange, initialPreviews }) {
  const [preview, setPreview] = useState(initialPreviews);
  const inputRef = useRef();
  //   const [value, setValue] = useState();
  const handeChange = (e) => {
    // console.log(e.target.files);
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };
  const handleClearClick = () => {
    const inputNode = inputRef.current; // DOM 노드에 참조 함
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    //브라우저 메모리 할당 -> 파일에 해당하는 주소 만듬
    //컴포넌트 상태에서 외부의 것을 바꾸는 것을 사이드이펙트

    //네트워크 Request, 메모리 할당같이
    //컴포넌트 함수에서 외부상태 변경할 때 useEffect 잘 활용함

    setPreview(nextPreview);

    return () => {
      setPreview(initialPreviews);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreviews]); // value 값이 변경할 때 마다 set함

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handeChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FIleInput;
