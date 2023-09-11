import React, { useEffect, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

function Form() {


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
    const response = await fetch('/api/contactform.php');
    const data = await response.json();
    if(await data.status === "success"){
      document.getElementById("input-email").value="Adresa de email a fost salvată!";
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
            Abonați-vă, pentru a afla când am lansat website-ul.
        </h2>

        <form className='form-container' id='email-form' onSubmit={handleFormSubmit}>
            <div className='form-input-container-w-button' id='form-input-container-w-button'>
                <input type='email' placeholder='Adresa de email' name='email' id='input-email' onChange={validateEmail} />
                <button type='submit' id='form-submit'>
                  <FaArrowRightLong />
                </button>
            </div>
        </form>
        <span>* Promitem să nu vă trimitem niciodată spam.</span>
    </div>
  )
}

export default Form