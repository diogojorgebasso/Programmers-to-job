import React from "react";
import InitialPhrase from "./InitialPhrase";
import Graph from "../../services/Graph";
import Name from "./Name";
import NewPhrase from "./NewPhrase";
import NavBar from "./NavBar";
export default function Dashboard() {
  return (
    <div className="Dashboard">
      <NavBar></NavBar>
      <InitialPhrase></InitialPhrase>
      <Graph></Graph>
      <Name></Name>
      <NewPhrase></NewPhrase>
    </div>
  );
}
