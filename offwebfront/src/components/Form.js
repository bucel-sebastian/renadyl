import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaArrowRightLong } from "react-icons/fa6";

function Form() {

  const {t,i18n} = useTranslation();

  const [isEmailValid, setIsEmailValid] = useState(true);


  const validateEmail = (event) => {
    const email = event.target.value;
    if(email !== ''){
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      setIsEmailValid(regex.test(email));
    } else{
      setIsEmailValid(true);
    }
  }

  const handleFormSubmit = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    for(let i=0;i<event.target.length;i++){
      formData.append(event.target[i].name,event.target[i].value);
    }
    const response = await fetch('/api/contactform.php',{
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if(await data.status === "success"){
      document.getElementById("input-email").value=t('Index.newsletterOK');
      document.getElementById("input-email").setAttribute("disabled","");
      document.getElementById("form-input-container-w-button").classList.add("form-complete");
      document.getElementById("form-submit").remove();
    }
    else{
      console.log(data);
    }
  }

  useEffect(()=>{
    if(!isEmailValid){
      document.getElementById("form-input-container-w-button").classList.add("form-deny");
    } else {
      document.getElementById("form-input-container-w-button").classList.remove("form-deny");
    }
  },[isEmailValid])

  return (
    <div>
        <h2>
        {t('Index.newsletter1')}
        </h2>

        <form className='form-container' id='email-form' onSubmit={handleFormSubmit}>
            <div className='form-input-container-w-button' id='form-input-container-w-button'>
                <input type='email' placeholder={t('Index.newsletterPH')} name='email' id='input-email' onChange={validateEmail} />
                <button type='submit' id='form-submit'>
                  <FaArrowRightLong />
                </button>
            </div>
        </form>
        <span>{t('Index.newsletter2')}</span>
    </div>
  )
}

export default Form