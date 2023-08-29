import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState('cat');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((response) => response.json())
      .then((books) => {
        // console.log(books);
        setBooks(books.items);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [query]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Oups, something went wrong...</p>;

  return (
    <>
      <div className="App">
        <Header />
        <SearchBook setQuery={setQuery} />
        <BookList booksList={books} />
      </div>
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Book App</h1>
    </header>
  );
}

function SearchBook({ setQuery }) {
  const [input, setInput] = useState('');
  console.log(input);
  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(input);
  };
  return (
    <form className="form" onSubmit={handleQuery}>
      <label>enter a topic: </label>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function BookList({ booksList }) {
  return (
    <section>
      {booksList.map((book) => {
        // console.log(book.id);
        return <Book book={book} key="{book.id}" />;
      })}
    </section>
  );
}

function Book({ book }) {
  return (
    <article className="article">
      <h2>Book title: {book.volumeInfo.title}</h2>
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
      />
      <p className="book-description">
        Description: {book.volumeInfo.description}
        {''}
      </p>
    </article>
  );
}

export default App;
