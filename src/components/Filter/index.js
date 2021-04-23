import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Input from "../common/Input";

const Filter = ({ handleChange, filters }) => {
  const [open, toggle] = useState(false);
  const body = useRef(null);

  useEffect(() => {
    body.current.style.height = open ? `${body.current.scrollHeight}px` : `0px`;
    body.current.style.padding = open ? `16px 8px` : `0px 8px`;
  }, [body, open]);

  const mappedFilter = (filter) => {
    switch (filter) {
      case "is_available":
        return "Lediga platser";
      case "is_charging_station":
        return "Laddstation";
      case "is_disabled_parking":
        return "Tillgänglighetsanpassad";
      default:
        return null;
    }
  };

  return (
    <Accordion>
      <Header onClick={() => toggle((prev) => !prev)}>
        <h3>Filtrera</h3>
        <div>
          {filters.length > 0
            ? filters.map((filter, index) => (
                <ActiveFilterLabel key={index}>
                  {mappedFilter(filter)}
                </ActiveFilterLabel>
              ))
            : null}
          <span></span>
        </div>
      </Header>
      <div className='accordion-body' ref={body}>
        <Input
          label={"lediga platser"}
          type={"checkbox"}
          value={"is_available"}
          setValue={handleChange}
        />
        <Input
          label={"Laddstation"}
          type={"checkbox"}
          value={"is_charging_station"}
          setValue={handleChange}
        />
        <Input
          label={"Tillgänglighetsanpassad"}
          type={"checkbox"}
          value={"is_disabled_parking"}
          setValue={handleChange}
        />
      </div>
    </Accordion>
  );
};

export default Filter;

const Accordion = styled.div`
  header {
    padding: 8px;
    background: #e6e6e6;
    cursor: pointer;
    transition: all 150ms ease-in-out;

    &:hover {
      background: #ccc;
    }
  }
  .accordion-body {
    overflow: hidden;
    background: #f9f9f9;
    transition: all 150ms ease-in-out;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActiveFilterLabel = styled.span`
  padding: 4px;
  margin: 0 4px;
  background: #bfbfbf;
  border-radius: 4px;
`;
