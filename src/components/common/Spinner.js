import React from "react";
import styled from "styled-components";

const Spinner = ({ loading }) => {
  return loading ? (
    <StyledSpinner>
      <div className='spinner'></div>
    </StyledSpinner>
  ) : null;
};

export default Spinner;

const StyledSpinner = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);

  & .spinner {
    position: absolute;
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.2);
    border-top-color: rgba(0, 0, 0, 0.9);
    border-radius: 50%;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    animation: spin 1500ms infinite;
  }
`;
