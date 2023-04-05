import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BooksService from '../../services/BooksService';
import ErrorModal from '../ErrorModal/ErrorModal';

function CreateBookModal(props) {
  const isEditBook = !!props.editBook._id
  const [title, setTitle] = useState(props.editBook.title ?? '');
  const [description, setDescription] = useState(props.editBook.description ?? '');
  const [author, setAuthor] = useState(props.editBook.author ?? '');
  const [publishedDate, setPublishedDate] = useState(props.editBook.publishedDate ?? '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBook = { title, description, author, publishedDate };
    try {
      if (!isEditBook) {
        const response = await BooksService.post(newBook);
        props.onBookCreated(response);
      } else {
        newBook._id = props.editBook._id;
        const response = await BooksService.put(newBook);
        props.onBookUpdated(response);
      }
    } catch(error) {
      setMessage(error.message)
    }
  };

  const onErrorModalHide = () => {
    setMessage('');
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isEditBook ? 'Edit book' : 'Create New Book'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} required />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={author} onChange={(event) => setAuthor(event.target.value)} required />
          </Form.Group>
          <Form.Group controlId="publishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control type="date" value={publishedDate} onChange={(event) => setPublishedDate(event.target.value)} required />
          </Form.Group>
          <Button type="submit" className='mt-3'>{isEditBook ? 'Edit book' : 'Create New Book'}</Button>
        </Form>
      </Modal.Body>
      <ErrorModal message={message} show={message} onHide={onErrorModalHide}/>
    </Modal>
  );
}

export default CreateBookModal;