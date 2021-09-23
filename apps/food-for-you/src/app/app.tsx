import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import axios from "axios";
export function App() {
  return (
    <>
      <Header />
      <div>
        <h1>Ny dag, nye muligheter</h1>
      </div>
    </>
  );
}

export default App;
