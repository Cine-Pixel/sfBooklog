import React, { useEffect, useState } from "react";
import getBookSelection from "../../api/getBookSelection";
import { useAuth } from "../../contexts/AuthContext";

interface BookType {
  id: number;
  title: string;
}

interface PropTypes {
  handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const BookSelection: React.FC<PropTypes> = ({ handleChange }) => {
  const [books, setBooks] = useState<BookType[]>();
  const { currentUser } = useAuth();

  useEffect(() => {
    getBookSelection(currentUser.token).then((data) => setBooks(data));
  }, []);

  return books ? (
    <select className="book-select" onChange={handleChange} id="book">
        {books.map(book => <option key={book.id} value={book.id}>{book.title}</option>)}
    </select>
  ) : (
    <div>Loading...</div>
  );
};

export default BookSelection;
