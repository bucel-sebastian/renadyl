import Form from './components/Form';
import Header from './components/Header';

import { FaMailBulk, FaMobileAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      
      <div className='content-container'><Header/>
          <img src='/image.png' className='image' />
          <h1>Site-ul nostru se află în construcție.</h1>
          <p>Pentru mai multe informații sau comenzi vă rugăm să ne contactați utilizând:</p>
          <div className='contact-links-container'>
            <a href="mailto: office@healtymedical.ro" className='contact-button'>
              <FaMailBulk />
              office@healtymedical.ro
            </a>
            <a href="tel: +40733566000" className='contact-button'>
              <FaMobileAlt />
              (+40) 733 566 000
            </a>
          </div>
            <Form />
            <div className='social-icons-container'>
              <a className='social-icon'>
                <FaFacebookF/>
              </a>
              <a className='social-icon'>
                <FaTwitter/>
              </a>
              <a className='social-icon'>
                <FaInstagram/>
              </a>
            </div>
      </div>
    </div>
  );
}

export default App;
