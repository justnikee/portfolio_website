"use client"
import React, { useRef, useState } from 'react';

type Props = {
  title: string;
  description: string;
  email: string;
}

const MaskContainer = ({ title, description, email }: Props) => {

  const emailRef = useRef<HTMLHeadingElement>(null);
  const [copyText, setCopyText] = useState('Copy')

  const handleCopy = () => {
    if (emailRef.current) {
      navigator.clipboard.writeText(emailRef.current.textContent || '')
        .then(() => {
          setCopyText('Copied');
          setTimeout(() => {
            setCopyText('Copy');
          }, 2000)
        })
        .catch((error) => {
          console.log('Failed to copy:', error)
        })
    }

  }

  return (
    <>
      <h2 className='font-[Heading] text-5xl leading-[3.5rem] md:text-7xl md:leading-[5rem] font-extrabold text-center mb-3'>{title}</h2>
      <p className='font-[outfit] text-2xl text-[#fffaf5] max-w-3xl text-center mb-5 '>{description}</p>
      <div className='flex gap-4 justify-center items-center'>
        <h4 ref={emailRef} className='font-[Heading] text-[56px] leading-[56px] text-[#fffaf5]'>{email}</h4>
        <div onClick={handleCopy} className='text-[19px] font-[outfit] copy_button h-fit px-6 py-2 rounded-lg cursor-pointer'>{copyText}</div>
      </div>
    </>
  )
}

export default MaskContainer
