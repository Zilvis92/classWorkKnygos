import Navbar from "./components/Navbar";
import BookContextProvider from "./contexts/BookContext";
import BookForm from "./components/BookForm";
import BookList from "./components/Knygos";

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Navbar />
        <BookList />
        <BookForm />
      </BookContextProvider>
    </div>
  );
}

export default App;
