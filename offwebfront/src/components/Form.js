import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

function Form() {

  const handleFormSubmit = async (event) =>{
    event.preventDefault();
    const formData = new FormData();
    for(let i=0;i<event.target.length;i++){
      formData.append(event.target[i].name,event.target[i].value);
    }
    const response = await fetch('/contactform.php');
    const data = await response.json();
    if(await data.status === "success"){
      document.getElementById("input-email").value="Adresa de email a fost salvată!";
      document.getElementById("input-email").setAttribute("disabled","");
    }
  }

  return (
    <div>
        <h2>
            Abonați-vă, pentru a afla când am lansat website-ul.
        </h2>

        <form className='form-container' id='email-form' onSubmit={handleFormSubmit}>
            <div className='form-input-container-w-button'>
                <input type='email' placeholder='Adresa de email' name='email' id='input-email' />
                <button type='submit'>
                  <FaArrowRightLong />
                </button>
            </div>
        </form>
        <span>* Promitem să nu vă trimitem niciodată spam.</span>
    </div>
  )
}

export default Form