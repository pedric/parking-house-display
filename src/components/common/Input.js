import React, { useState } from "react";
import styled from "styled-components";

const Input = ({ label, type, value, setValue }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Div>
      <input
        type={type}
        name={value}
        id={value}
        checked={checked}
        value={value}
        onChange={(e) => {
          setChecked((prev) => !prev);
          setValue(e.target.checked, e.target.value);
        }}
      />
      <label htmlFor={value}>{label}</label>
    </Div>
  );
};

export default Input;

const Div = styled.div`
  margin: 8px 0;
`;
