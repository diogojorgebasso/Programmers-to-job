import React from "react";
import InitialPhrase from "./InitialPhrase";
import Graph from "../../services/Graph";
import Name from "./Name";
import NewPhrase from "./NewPhrase";
import Header from "./Header";
import Rocket from "./Rocket";
import Toast from "./Toast";
export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Header></Header>
      <h1>Ajudando desenvolvdores a amar API’s🔥!</h1>

      <Toast></Toast>
      <InitialPhrase></InitialPhrase>
      <Graph></Graph>
      <Name></Name>
      <NewPhrase></NewPhrase>
      <Rocket></Rocket>
    </div>
  );
}
