import Navbar from "./components/Navbar";
import Knygos from "./components/Knygos";
import ThemeContexProvider from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <ThemeContexProvider>
        <AuthContextProvider>
          <Navbar />
          <Knygos />
          <ThemeToggle />
        </AuthContextProvider>
      </ThemeContexProvider>
    </div>
  );
}

export default App;
