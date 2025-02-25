import React, { useState } from "react";
import { motion } from "framer-motion";
import "./contactme.css";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-container">
      <div className="cosmic-bg" />
      <motion.div
        className="form-wrapper"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {submitted ? (
          <motion.div
            className="warp-effect"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2 }}
          >
            <h2 className="warp-text">Message Sent!</h2>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Contact Me</h2>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required />
            <motion.button whileHover={{ scale: 1.1 }} type="submit">
              Send
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ContactPage;