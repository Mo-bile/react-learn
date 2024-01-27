import { createContext, useContext, useState } from "react";

const Locale = createContext();

export function LocaleProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (
    <Locale.Provider
      value={{
        //프로퍼티로 넘겨줌
        locale,
        setLocale,
      }}
    >
      {children}
    </Locale.Provider>
  );
}

//custom hook 만들어줌

//locale 값을 전달해줌
export function useLocale() {
  const context = useContext(Locale);

  if (!context) {
    throw new Error("반드시 LocaleProvider 안에서 사용해야함");
  }

  return context.locale;
}
//setlocae 값을 가져올때 쓸 것임
export function useSetLocale() {
  const context = useContext(Locale);

  if (!context) {
    throw new Error("반드시 LocaleProvider 안에서 사용해야함");
  }

  return context.setLocale;
}
