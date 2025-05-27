"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

type Props = {
    title: string;
    description: string;
    image: string;
    stack: string[];
    link: string;
}

gsap.registerPlugin(ScrollTrigger)

const Card = ({title, description, image, stack, link}: Props) => {

  const cardElement = useRef<HTMLDivElement>(null)

useGSAP(() => {
  if (!cardElement.current) return;

  gsap.fromTo(cardElement.current, {
    opacity: 0,
    y: 100,
    scale: 0.8,
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.9,
    ease: "power4.out",
    scrollTrigger: {
      trigger: cardElement.current,
      start: "top 85%",
      end: "bottom 60%",
      toggleActions: "play none none reverse",
    },
  });

}, []);



  return (
    <div ref={cardElement} id='card' className='bg-[#222220] relative rounded-lg border border-[#525252] flex-1 px-6 py-6'>
      <div>
        <Link className='hoverTitle' href={link}>
        <h4 className='font-[Heading] text-3xl flex gap-3'>{title} <svg className='hoverIcon h-4 w-4 mt-1' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 30 30" fill="none"><path fill="currentColor" d="M0 0h29.998L30 7.058 0 7.06V.001Z"></path><path fill="currentColor" d="M29.998 0 30 30h-7.06V0h7.058Z"></path><path fill="currentColor" d="M27.452 6.757 4.992 29.218 0 24.227l22.46-22.46 4.992 4.99Z"></path></svg></h4>
        </Link>
        <p className='text-[#fefce899] font-[outfit]'>{description}</p>
        <div className='flex gap-2 mt-4'>
        {stack.map((item, index) => (
             <span className='bg-[#525252] px-3 py-1 font-[outfit] color-[#f4f4f5] text-[12px] rounded-3xl' key={index}>{item}</span>
        ))}
        </div>
        <Image className='w-full h-full bg-white rounded mt-4' src={image} width={400} height={400} alt="" />
      </div>
    </div>
  )
}

export default Card