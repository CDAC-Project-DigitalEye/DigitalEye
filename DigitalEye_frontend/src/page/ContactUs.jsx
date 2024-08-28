import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Footer from './Footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// Sample images with descriptions and taglines
const images = [
  {
    src: 'Available for assignments All India.',
    description: 'With over 4 years of experience in the photography industry, DIGITALEYE has worked with a diverse array of clients, from families and couples to high-profile brands and publications. Our work spans various genres, including portrait, event, commercial, and editorial photography. Our portfolio features captivating images from renowned publications such as , showcasing our commitment to excellence.',
    tagline: 'Lets work together !'
  },
];

const ContactUs = () => {
  const [count, setCount] = useState(0);

  // Notify user when count is updated
  const handleSubmit = (event) => {
    event.preventDefault();
    setCount(count + 1);
    if (count <= 1) {
      toast.success("Message Send SuccessFully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container className="my-5">
          <Row className="mb-4">
            <Col>
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-4 t-color"
              >
                Contact Us
                <br />
                <small className="text-muted pcolor">We'd love to hear from you</small>
              </motion.h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                  <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Your message here" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </Form>
              </motion.div>
            </Col>
            <Col md={6}>
              <Row>
                {images.map((image, index) => (
                  <Col key={index} className="mb-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: index * 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Card>
                        <Card.Text className='papacolor t-color'>{image.src}</Card.Text>
                        <Card.Body>
                          <Card.Title>{image.tagline}</Card.Title>
                          <Card.Text className="font-weight-700">
                                {image.description}
                           </Card.Text>

 
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </motion.div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ContactUs;



         



