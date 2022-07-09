import React from "react";
import { useLocation } from "react-router-dom";

const View = () => {
  const location = useLocation();
  const title = location.state.title;
  const languages = location.state.languages;
  const description = location.state.description;

  return (
    <>
      <h1>{title}</h1>
      <h1>{languages}</h1>
      <h1>{description}</h1>
    </>
  );
};

export default View;
