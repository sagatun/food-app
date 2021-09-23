import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import axios from "axios";
export function App() {
  return (
    <>
      <Header />
      <div>
        <h1>Ny dag, nye muligheter</h1>
        <h2>Kanskje teste ut server/klient i dag... </h2>
        <h1>
          <i>BLIR DETTE OPPDATERT? FUNGERER CACHEN?</i>
          <p>Nå da?</p>
        </h1>
      </div>
    </>
  );
}

export default App;
