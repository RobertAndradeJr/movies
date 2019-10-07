import React from "react";

const Header = props => {
  const { text } = props;
  return (
    <header className="header">
      <h2>{text}</h2>
    </header>
  );
};

export default Header;
