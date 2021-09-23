import { useEffect, useState } from "react";
import Header from "./components/Layout/Header";
import axios from "axios";
export function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:3333/api");
      setMessage(result.data.message);
    };
    fetch();
  }, []);

  return (
    <>
      <Header />
      <p>hvorfor fungerer ikke dette?</p>
      <h1>{message}</h1>
    </>
  );
}

export default App;
