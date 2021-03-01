import React from "react";
import img1 from "../images/vs.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  width: 10%;
  background-color: #000000;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;

  &:hover {
    background-color: #000000d1;
    opacity: 1px;
  }
`;
const Wrapper = styled.div`
  width: 100;
  text-align: center;
  margin-top: 50px;
`;
const Title = styled.h1`
  font-family: sans-serif;
  text-align: center;
  margin-bottom: 20px;
`;

const MainImage = styled.img`
  width: 50%;
`;
const Field = styled.input`
  width: 30%;
  padding: 12px 30px;
  margin-top: 4%;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
const Field2 = styled.input`
  width: 30%;
  padding: 12px 30px;
  margin-top: 2%;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

function Vs(props) {
  return (
    <Wrapper>
      <Title>MARVEL VS DC CHESS GAME </Title>
      <MainImage src={img1} alt="Cover" />
      <div>
        <Field
          placeholder="MARVEL PLAYER NAME"
          onChange={(e) => props.setText(e.target.value)}
          value={props.text}
        />
      </div>
      <div>
        <Field2
          placeholder="DC PLAYER NAME"
          onChange={(e) => props.setText2(e.target.value)}
          value={props.text2}
        />
      </div>
      <Link to={`/StartGame/`}>
        <Button>Submit</Button>
      </Link>
    </Wrapper>
  );
}

export default Vs;
