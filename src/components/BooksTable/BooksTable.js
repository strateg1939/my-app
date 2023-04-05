import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Button } from 'react-bootstrap';
import './BooksTable.css'
import BooksService from '../../services/BooksService';
import CreateBookModal from '../CreateBookModal/CreateBookModal';
import Book from '../Book/Book';

function BooksTable() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState({});
  const [isOpenModal, setOpenModal] = useState(false);

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


  const onBookCreated = (book) => {
    setBooks([...books, book]);
    toggleModal();
  }

  const onBookUpdated = (book) => {
    const index = books.findIndex(b => b._id === book._id);
    books.splice(index, 1, book);
    setBooks(books);
    toggleModal();
  }

  const toggleModal = () => {
    console.log(isOpenModal)
    setEditBook({});
    setOpenModal(!isOpenModal);   
  }

  const handleDeleteBook = async (bookId) => {
    const response = await BooksService.delete(bookId)
    if (response) {
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
    }
  };

  const openEditModal = (book) => {
    setEditBook(book)
    setOpenModal(true);
  }

  return (
    <Container>
      <Row className='add-button-row'><Button variant='primary' size='lg' className='add-button' onClick={toggleModal}>Add Book</Button></Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books && books.map(book => (
            <tr key={book._id}>
              <Book title={book.title} description={book.description} author={book.author} publishedDate={book.publishedDate} />
              <td>
                <Button variant='success' className='me-3' onClick={() => openEditModal(book)}>Edit</Button>
                <Button variant='danger' onClick={() => handleDeleteBook(book._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isOpenModal && <CreateBookModal show={isOpenModal} onHide={toggleModal} onBookCreated={onBookCreated} onBookUpdated={onBookUpdated} editBook={editBook}></CreateBookModal>} 
    </Container>
  );
}

export default BooksTable;