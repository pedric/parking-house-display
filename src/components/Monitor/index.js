import React from "react";
import styled from "styled-components";

const Monitor = ({ data, filters }) => {
  const filter = (spot, index) => {
    let returnElement = true;
    if (spot.is_available !== true && filters.indexOf("is_available") >= 0) {
      returnElement = false;
    }
    if (
      spot.is_charging_station !== true &&
      filters.indexOf("is_charging_station") >= 0
    ) {
      returnElement = false;
    }
    if (
      spot.is_disabled_parking !== true &&
      filters.indexOf("is_disabled_parking") >= 0
    ) {
      returnElement = false;
    }

    if (filters.length === 0 || returnElement) {
      return <Spot key={index} spot={spot} />;
    } else {
      return null;
    }
  };

  return (
    <>
      {data.floors && data.floors.length > 0
        ? data.floors.map((floor, index) => {
            return (
              <div key={`${floor}_${index}`}>
                <H4>
                  Våning {floor.floor + 1}
                  <span>
                    {floor.parking_spots && floor.parking_spots.length > 0
                      ? `(${
                          floor.parking_spots.filter(
                            (spot) => spot.is_available === true
                          ).length
                        } lediga platser)`
                      : null}
                  </span>
                </H4>
                <FlexBox>
                  {floor.parking_spots && floor.parking_spots.length > 0
                    ? floor.parking_spots.map((spot, index) =>
                        filter(spot, index)
                      )
                    : null}
                </FlexBox>
              </div>
            );
          })
        : null}
    </>
  );
};

const Spot = (props) => {
  const {
    is_available,
    is_charging_station,
    is_disabled_parking,
    number,
    type,
  } = props.spot;

  return (
    <StyledSpot
      style={{
        "--bgColor": is_available ? "#55ff55" : "#ccc",
        "--color": is_available ? "#000" : "#666",
      }}
    >
      <span className='number'>
        {number ? number : ""}
        {type === "mc" ? "MC" : "BIL"}
      </span>
      <small>{is_available ? " Ledig " : ""}</small>
      <small>{is_charging_station ? "EL" : ""}</small>
      <small>{is_disabled_parking ? "Tillgänglig" : ""}</small>
    </StyledSpot>
  );
};

export default Monitor;

const StyledSpot = styled.div`
  display: inline-block;
  background: var(--bgColor);
  color: var(--color);
  padding: 8px;
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  margin: 2px;
  & span.number {
    display: block;
    text-align: center;
    font-weight: 900;
    font-size: 110%;
  }

  & small {
    display: block;
    text-align: center;
  }
`;

const H4 = styled.h4`
  margin: 32px 0 8px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
  & span {
    margin-left: 4px;
    color: #333;
    font-weight: 400;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
