"use client";
import React, { useState } from 'react'
import { useRef } from 'react';

type Props = {}

const Contact = (props: Props) => {

      const emailRef = useRef<HTMLHeadingElement>(null);
      const [copyText, setCopyText] = useState('Copy')
  
  const handleCopy = () => {
       if(emailRef.current){
          navigator.clipboard.writeText(emailRef.current.textContent || '')
          .then(() => {
              setCopyText('Copied');
              setTimeout(() => {
              setCopyText('Copy');
              }, 2000)
          })
          .catch((error) => {
              console.log('Failed to copy:' , error)
          })
       }
  
  }

  return (
    <div id='Contact' className='flex justify-center py-32 px-5'>
        <div className='sm:px-[32px] w-full sm:py-0 max-w-[1300px] m-auto relative'>
        <h2 className='font-[Heading] text-5xl leading-[3.5rem] md:text-7xl md:leading-[5rem] font-extrabold text-center mb-3'>Let's Build Something Great!!</h2>
       <p className='font-[outfit] text-2xl text-[#fffaf5] max-w-3xl text-center mb-5 sm:text-center sm:m-auto sm:mb-5'>I'm always open to new opportunities, collaborations, and connections. Feel free to reach out to ask a question, share your project idea, talk about cats or the meaning of life.</p>
       <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
       <h4 ref={emailRef} className='font-[Heading] text-4xl sm:text-[56px] leading-[56px] text-[#fffaf5]'>nikhil98161@gmail.com</h4>
       <div onClick={handleCopy} className='text-[19px] w-full text-center sm:w-fit font-[outfit] copy_button h-fit px-6 py-2 rounded-lg cursor-pointer'>{copyText}</div>
       </div>
        </div>
    </div>
  )
}

export default Contact