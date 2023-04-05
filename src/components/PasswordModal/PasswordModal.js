import { useState } from "react"
import { Modal, Form, Button, InputGroup } from "react-bootstrap"

export default function PasswordModal({ correctPassword, onCorrectPassword, show }) {
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false)
  const onButtonClick = () => {
    if (password === correctPassword) {
      onCorrectPassword();
    } else {
      setIsInvalid(true);
    }
  }
  const onInput = (event) => {
    setPassword(event.target.value);
    setIsInvalid(false);
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show={show}>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Enter Password
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup hasValidation className="mb-3">
            <Form.Control type="password" value={password} onChange={onInput} required isInvalid={isInvalid}/>
            <Form.Control.Feedback type="invalid">
                Incorrect Password
            </Form.Control.Feedback>
          </InputGroup>
          <Button type="submit" className='mt-3' onClick={onButtonClick}>Go to admin</Button>
        </Modal.Body>
    </Modal>
  )
}