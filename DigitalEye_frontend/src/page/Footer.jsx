import React from 'react';
import { FaHome, FaFacebook, FaGooglePlus, FaInstagram } from 'react-icons/fa';
import { IoIosMailUnread, IoLogoGithub } from 'react-icons/io';
import { MdPermPhoneMsg, MdFax } from 'react-icons/md';
import { CiLinkedin } from 'react-icons/ci';
import { IoCameraOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import './Styles/footer.css'



const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="bg-dark text-light py-5"
    >
      <footer className="text-center text-lg-start">
        {/* Social Media Section */}
        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: '#6351ce' }}
        >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a
              href="https://www.facebook.com/akash.haldar.35574/"
              className="text-light me-4 social-icon"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="/"
              className="text-light me-4 social-icon"
              aria-label="Google Plus"
            >
              <FaGooglePlus />
            </a>
            <a
              href="https://www.instagram.com/akashhaldar_/"
              className="text-light me-4 social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.google.co.in/"
              className="text-light me-4 social-icon"
              aria-label="LinkedIn"
            >
              <CiLinkedin />
            </a>
            <a
              href="/"
              className="text-light me-4 social-icon"
              aria-label="GitHub"
            >
              <IoLogoGithub />
            </a>
          </div>
        </motion.section>

        {/* Footer Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="container text-center text-md-start">
            <div className="row mt-3">
              {/* About Section */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4"
              >
                <h6 className="text-uppercase fw-bold mb-4 about-heading">
                  <IoCameraOutline style={{ color: 'gold', fontSize: '30px',marginLeft :'3px' }}/>  Digital Eye
                </h6>
                <hr className="mb-4" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p>
                  Captured Moments Photography is dedicated to capturing the essence of life's most precious moments through stunning photography. We specialize in a wide range of photography services, including weddings, portraits, events, and commercial photography. Our team of experienced photographers brings creativity, technical expertise, and a passion for storytelling to every project.
                </p>
              </motion.div>

              {/* Services Section */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
              >
                <h6 className="text-uppercase fw-bold mb-4 services-heading">
                  Services Available
                </h6>
                <hr className="mb-4" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p><a href="#!" className="text-light link-hover fh">PUNE</a></p>
                <p><a href="#!" className="text-light link-hover fh">MUMBAI</a></p>
                <p><a href="#!" className="text-light link-hover fh">GOA</a></p>
                <p><a href="#!" className="text-light link-hover fh">BHOPAL</a></p>
               
              </motion.div>

              {/* Useful Links Section */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4"
              >
                <h6 className="text-uppercase fw-bold mb-4 useful-links-heading">
                  Useful links
                </h6>
                <hr className="mb-4" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p><a href="/user/login" className="text-light link-hover fh">Your Account</a></p>
                <p><a href="/user/customer/register" className="text-light link-hover fh">Become a Photographer</a></p>
                <p><a href="/" className="text-light link-hover fh">Services</a></p>
                <p><a href="/contact" className="text-light link-hover fh">Help</a></p>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"
              >
                <h6 className="text-uppercase fw-bold mb-4 contact-heading">
                  Contact
                </h6>
                <hr className="mb-4" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                <p><FaHome className="me-2" /> PUNE, IET, India</p>
                <p><IoIosMailUnread className="me-2" /> akash942437@example.com</p>
                <p><MdPermPhoneMsg className="me-2" /> +91 9132 43 3333</p>
                <p><MdFax className="me-2" /> +91 9132 11 2383</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-center p-3"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          © 2024 Copyright:
          <a href="https://mdbootstrap.com/" className="text-light link-hover"> DigitalEye@.com </a>
        </motion.div>
      </footer>
    </motion.div>
  );
};

export default Footer;
