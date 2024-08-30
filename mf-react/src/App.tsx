import { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { API_REGISTER } from "./core/api-register";

function App() {
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    API_REGISTER.register("react-set-color", setColor);
  }, []);

  return (
    <>
      <h2>React Micro Frontend</h2>
      <Chat color={color} />
    </>
  );
}

export default App;
