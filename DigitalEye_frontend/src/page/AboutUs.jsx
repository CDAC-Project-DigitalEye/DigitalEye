// src/AboutUs.js
import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from './Footer'
import birthday3 from '../photes/birthday3.jpg'
import cm3 from '../photes/cm3.jpg'
import prewed3 from '../photes/prewed3.jpg'
import prewed1 from '../photes/prewed1.jpg'
import travel1 from '../photes/travel1.jpg'
import wed5 from '../photes/wed5.jpg'
import birth from '../Videos/birthday1.mp4'
import cinema from '../Videos/cineman.mp4'
import travel from '../Videos/traveln.mp4'
import wedv from '../Videos/weddingn.mp4'
import prewedv from '../Videos/prewdn.mp4' 


// Sample images and videos with service names and extended descriptions
const media = [
  {
    type: 'image',
    src: birthday3,
    serviceName: 'BirthDay Photography',
    description: 'Turning Birthday Moments into Cherished Memories.'
  },
  {
    type: 'image',
    src: cm3,
    serviceName: 'Cinematic Photography',
    description: 'Capturing the Essence of Emotion Through Cinematic Lenses'
  },
  {
    type: 'image',
    src: prewed3,
    serviceName: 'Prewedding Photography',
    description: 'Where Your Love Story Begins: Pre-Wedding Photography'
  },
  {
    type: 'image',
    src: prewed1,
    serviceName: 'Prewedding Photography',
    description: 'Where Your Love Story Begins: Pre-Wedding Photography'
  },
  {
    type: 'image',
    src: travel1,
    serviceName: 'Traveling Photography',
    description: 'From Faraway Lands to Close Encounters: Photography that Travels'
  },
  {
    type: 'image',
    src: wed5,
    serviceName: 'Wedding Photography',
    description: 'From ‘I Do’ to Ever After: Beautifully Documented'
  },
  {
    type: 'video',
    src:  birth,
    serviceName: 'BirthDay Photography',
    description: 'Turning Birthday Moments into Cherished Memories'
  },
  {
    type: 'video',
    src: cinema,
    serviceName: 'Cinematography',
    description: 'Capturing the Essence of Emotion Through Cinematic Lenses'
  },
  {
    type: 'video',
    src: travel,
    serviceName: 'Travling Photography',
    description: 'From Faraway Lands to Close Encounters: Photography that Travels'
  },
  {
    type: 'video',
    src: wedv,
    serviceName: 'Wedding Photography',
    description: 'From ‘I Do’ to Ever After: Beautifully Documented.'
  },  {
    type: 'video',
    src: prewedv,
    serviceName: 'Wedding Photography',
    description: 'Where Your Love Story Begins: Pre-Wedding Photography'
  },  {
    type: 'video',
    src: birth,
    serviceName: 'Birthday Photography',
    description: 'Turning Birthday Moments into Cherished Memories'
  },
  // Add unique items here
]; 

const AboutUs = () => {
  return (
   <div>
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <Row className="my-5">
          <Col>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4 t-color"
            >
              About Us
              <br />
              <small className="  text-muted ">Capturing Moments, Creating Memories</small>
            </motion.h1>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center papacolor"
            >
              We are dedicated photographers specializing in capturing unforgettable moments. Our goal is to
              deliver stunning images and videos that preserve the beauty of each moment. From portraits to
              events, we focus on providing high-quality photography services.
            </motion.p>
          </Col>
        </Row>
        <Row>
          {media.map((item, index) => (
            <Col md={4} className="mb-4" key={item.src + index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card>
                  {item.type === 'image' ? (
                    <Card.Img variant="top" src={item.src} />
                  ) : (
                    <Card.Body>
                      <video width="100%" controls>
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Card.Body>
                  )}
                  <Card.Body>
                    <Card.Title  className='t-color'>{item.serviceName}</Card.Title>
                    <Card.Text className="text-truncate  pblock" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
    <Footer/>
   </div>
  );
};

export default AboutUs;

