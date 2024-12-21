"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const leftContainer = useRef<HTMLDivElement>(null);
  const rightContainer = useRef<HTMLDivElement>(null);
  const moreAboutMeRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (leftContainer.current && rightContainer.current) {
      gsap.fromTo(leftContainer.current, {
        y: 100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out'
      });

      gsap.fromTo(rightContainer.current, {
        y: 100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out'
      });
    }
  }, []);

  const handleMoreAboutMeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetElement = document.getElementById('MoreAboutMe');
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div id='About' className='flex justify-center sm:py-32 py-4'>
      <div className='px-5 sm:px-[32px] sm:py-0 max-w-[1300px] m-auto'>
        <div className='flex flex-col gap-8 md:flex-row lg:gap-32'>
          <div ref={leftContainer} className='flex-1 opacity-0'>
            <h3 className='sm:text-[4rem] text-[2.5rem] leading-[3rem] max-w-[500px] font-[Heading] uppercase lg:leading-[5rem]'>Hi, I'm 
              <span className='text-linkTextColor' style={{
                background: '-webkit-linear-gradient(#610000, #FD511D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}> Nikhil</span>,<br/>
              I’m a digital chef who cooks up creative solutions for the web. 
            </h3>
          </div>
          <div ref={rightContainer} className='flex-1 opacity-0'>
            <p className='mb-6 font-[outfit] text-lg leading-6 font-light'>I&apos;m a frontend developer from India with 2 years of experience crafting engaging and accessible web experiences. I specialize in using Next.js, React, and Node.js to create solutions that are both functional and visually stunning.
            </p>
            <p className='mb-6 font-[outfit] text-lg leading-6 font-light'>
              As someone who cooks things for the web, I enjoy blending design and engineering to build seamless and impactful projects.
            </p>
            <div>
              <a
                ref={moreAboutMeRef}
                className='font-[Heading] uppercase text-2xl sm:text-3xl flex gap-2 cursor-pointer'
                href='#MoreAboutMe'
                onClick={handleMoreAboutMeClick}
              >
                More about me 
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 30 30" fill="none"><path fill="currentColor" d="M0 0h29.998L30 7.058 0 7.06V.001Z"></path><path fill="currentColor" d="M29.998 0 30 30h-7.06V0h7.058Z"></path><path fill="currentColor" d="M27.452 6.757 4.992 29.218 0 24.227l22.46-22.46 4.992 4.99Z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;