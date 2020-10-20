import React from "react";


const Input = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
      <>
        <label className='label' htmlFor={id}>{children}</label>
        &nbsp;
        <input className='input' ref={inputRef}
               id={id}
               type={type}
               value={value}
               onChange={onInputChange}
        />
      </>
  );
};

export default Input
