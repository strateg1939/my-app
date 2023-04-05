import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Button } from 'react-bootstrap';
import '../BooksTable/BooksTable.css'
import BooksService from '../../services/BooksService';
import Book from '../Book/Book';

function UserBooksTable() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await BooksService.getAll(); 
      setBooks(response);
    }
    fetchBooks();
    const interval = setInterval(() => fetchBooks(), 10000)
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Published Date</th>
          </tr>
        </thead>
        <tbody>
        {books && books.map(book => (
          <tr key={book._id}>
            <Book key={book._id} title={book.title} description={book.description} author={book.author} publishedDate={book.publishedDate} />
          </tr>
          ))} 
        </tbody>
      </Table>
    </Container>
  );
}

export default UserBooksTable;