import React, { useState } from 'react'
import Image from 'next/image'


import img1 from '@/public/images/renadyl_bottles_2_circle.png'
import img2 from '@/public/images/renadyl_bottles_2_circle_blue.png'
import img3 from '@/public/images/renadyl_bottles_3.png'

function ProductImageSlider() {

  const [actualImage, setActualImage] = useState(img1);

  const switchImage = (img) => {
    setActualImage(img);
  }


  return (
    <div className='px-8'>

        <div className='w-full aspect-square'>
            <Image
                src={actualImage}
                width={1000}
                height={1000}
                className='aspect-square max-w-full h-full object-contain'
                alt='Renadyl Product Image'
            />
        </div>
        <div className='w-full flex flex-row gap-4 pt-4'>
            <button className='p-4 aspect-square w-1/3 transition-all duration-300 hover:p-2' onClick={()=>{switchImage(img1)}}>
               <Image
                  src={img1}
                  width={1000}
                  height={1000}   
                  className='object-contain aspect-square'                 
                  alt='Renadyl Product Image - 1'
                />
            </button>
            <button className='p-4 aspect-square w-1/3 transition-all duration-300 hover:p-2' onClick={()=>{switchImage(img2)}}>
               <Image
                  src={img2}
                  width={1000}
                  height={1000}
                  className='object-contain aspect-square'            
                  alt='Renadyl Product Image - 2'
               />
            </button>
            <button className='p-4 aspect-square w-1/3 transition-all duration-300 hover:p-2' onClick={()=>{switchImage(img3)}}>
               <Image
                  src={img3}
                  width={1000}
                  height={1000}   
                  className='object-contain aspect-square' 
                  alt='Renadyl Product Image - 3'
               />
            </button>
        </div>
    </div>
  )
}

export default ProductImageSlider