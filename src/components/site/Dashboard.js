import React from "react";
import InitialPhrase from "./InitialPhrase";
import Graph from "../../services/Graph";
import Name from "./Name";
import NewPhrase from "./NewPhrase";
import Header from "./Header";
export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Header></Header>
      <InitialPhrase></InitialPhrase>
      <Graph></Graph>
      <Name></Name>
      <NewPhrase></NewPhrase>
    </div>
  );
}
