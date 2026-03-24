import { Providers } from "./app/providers";
import Home from "./pages/Home";
import "./styles/App.css";

function App() {
  return (
    <Providers>
      <Home />
    </Providers>
  );
}

export default App;
