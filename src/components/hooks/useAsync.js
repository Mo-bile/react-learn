import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    //네트워크 req 할때 쓸 fundtion임
    //이 함수 실행시 try catch 문 비동기 실행하며
    //    asyncFunction 함수를 실행할때
    //    기존사용하던 api 함수라고 생각하면됨

    try {
      setPending(true);
      setError(null);
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
  //로딩, 에러, 콜백 실행 3가지를 배열형태로 return
}

export default useAsync;
