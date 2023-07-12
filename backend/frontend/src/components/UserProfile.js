import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

const UserProfile = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setUser = async () => {
    const response = await fetch(`/api/auth/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'),
      },
    });
    const json = await response.json();
    setName(json.name);
    setEmail(json.email);
  };

  useEffect(() => {
    setUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <i className="fa-solid fa-user fa-xl" onClick={handleShow}></i>
      <Offcanvas show={show} onHide={handleClose} placement="end" name="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{email}</Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default UserProfile;
