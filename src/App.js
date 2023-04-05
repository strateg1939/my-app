import logo from './logo.svg';
import './App.css';
import BooksTable from './components/BooksTable/BooksTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import UserBooksTable from './components/UserBooksTable/UserBooksTable';
import PasswordModal from './components/PasswordModal/PasswordModal';

const ADMIN_PASSWORD = "admin"

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const onGotoAdminClick = () => {
    if (isAdmin) setIsAdmin(false);
    else setShowPasswordModal(true);
  }

  const onCorrectPassword = () => {
    setIsAdmin(true);
    setShowPasswordModal(false);
  }

  return (
    <Fragment>
      <Row><Button variant='primary' size='lg' className='add-button ms-5' onClick={onGotoAdminClick}>{ isAdmin ? 'Go back' : 'Go to admin' }</Button></Row>
      <PasswordModal correctPassword={ADMIN_PASSWORD} onCorrectPassword={onCorrectPassword} show={showPasswordModal}></PasswordModal>
      {isAdmin ? <BooksTable/> : <UserBooksTable></UserBooksTable>}
    </Fragment>
  );
}

export default App;
