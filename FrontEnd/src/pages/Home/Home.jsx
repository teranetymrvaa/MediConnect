import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to={"/login"}>to login</Link>
    </div>
  );
}

export default Home;
