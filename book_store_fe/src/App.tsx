import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@asgardeo/auth-react";
import "./App.css";
import { API_URL } from "./constants";

// Define the types for Book and NewBook
interface Book {
  id: number;
  title: string;
  author: string;
}

interface NewBook {
  title: string;
  author: string;
}

const App: React.FC = () => {
  const { state, signIn, signOut, getAccessToken } = useAuthContext();
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<NewBook>({ title: "", author: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get<Book[]>(`${API_URL}/books`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
          "x-jwt-assertion": accessToken,
        }
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  // Add a new book
  const addBook = async () => {
    const accessToken = await getAccessToken();
    try {
      await axios.post<NewBook>(`${API_URL}/books`, newBook,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
          "x-jwt-assertion": accessToken,
        }
      });
      setNewBook({ title: "", author: "" });
      fetchBooks(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  // Delete a book by ID
  const deleteBook = async (id: number) => {
    const accessToken = await getAccessToken();
    try {
      await axios.delete(`${API_URL}/books/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
          "x-jwt-assertion": accessToken,
        }
      });
      fetchBooks(); // Refresh the list after deleting
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(`Error: ${error.response.data.body.message}`);
      } else {
        console.error("Error deleting book", error);
      }
    }
  };

  // Fetch books on initial load
  useEffect(() => {
    if (state.isAuthenticated) {
      fetchBooks();
    }
  }, [state.isAuthenticated]);

  return (
    <div className="app">
      <h1 className="title">Book Store</h1>

      {/* Show login/logout button */}
      {!state.isAuthenticated ? (
        <button className="button" onClick={() => signIn()}>
          Login
        </button>
      ) : (
        <button className="button" onClick={() => signOut()}>
          Logout
        </button>
      )}

      {/* Display error messages */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* If user is authenticated, show the content */}
      {state.isAuthenticated && (
        <>
          <div className="form">
            <h2>Add a New Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="input"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="input"
            />
            <button onClick={addBook} className="button">Add Book</button>
          </div>

          <h2>Book List</h2>
          <ul className="book-list">
            {books.map((book) => (
              <li key={book.id} className="book-item">
                <span>{book.title} by {book.author}</span>
                <button onClick={() => deleteBook(book.id)} className="button delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
