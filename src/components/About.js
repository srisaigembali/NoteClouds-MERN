import React from 'react';
import { Accordion } from 'react-bootstrap';

const About = () => {
  return (
    <div className="container my-3">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Store Notes</Accordion.Header>
          <Accordion.Body>
            NoteClouds is an application where you can store your notes in the
            cloud and access them whenever and wherever you want to.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Free to use</Accordion.Header>
          <Accordion.Body>
            NoteClouds app is totally free to use. Just sign up with your email.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>My Profile</Accordion.Header>
          <Accordion.Body>
            Want to know more about me? <br />
            Click here:{' '}
            <a
              href="https://srisaigembali.github.io/portfolio/"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              <i class="fa-solid fa-user"></i>
            </a>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default About;
