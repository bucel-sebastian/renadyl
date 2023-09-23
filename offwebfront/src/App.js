import { useTranslation } from 'react-i18next';
import Form from './components/Form';
import Header from './components/Header';

import { FaMailBulk, FaMobileAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect } from 'react';

function App() {

const {t,i18n} = useTranslation();
document.title = t('Index.pageTitle');
useEffect(()=>{
  const queryParameters = new URLSearchParams(window.location.search);
  const lang = queryParameters.get("lang");
  if(lang !== null){
    i18n.changeLanguage(lang);
    queryParameters.delete("lang");
    window.location.replace('/');
  }
  
},[])

  return (
    <div className="App">
      <Header/>
      <div className='content-container'>
          <img src='/image.png' className='image' />
          <h1>{t('Index.header1')}</h1>
          <p>{t('Index.header2')}</p>
          <div className='contact-links-container'>
            <a href="mailto: office@healthymedical.ro" className='contact-button'>
              <FaMailBulk />
              office@healthymedical.ro
            </a>
            <a href="tel: +40733566000" className='contact-button'>
              <FaMobileAlt />
              (+40) 733 566 000
            </a>
          </div>
            <Form />
            <div className='social-icons-container'>
              <a className='social-icon' href='https://www.facebook.com/profile.php?id=61550768614377'>
                <FaFacebookF/>
              </a>
              <a className='social-icon'>
                <FaTwitter/>
              </a>
              <a className='social-icon' href='https://www.instagram.com/renadylromania/'>
                <FaInstagram/>
              </a>
            </div>
      </div>
    </div>
  );
}

export default App;
