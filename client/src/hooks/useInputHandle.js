import { useState } from "react";
const useInputHandle = (initialValue) => {
  const [Value, setValue] = useState(initialValue);
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  return [Value, handleValueChange];
};
export default useInputHandle;
