"use client";

import React from 'react';
import FooterLinks from '../components/FooterLinks';
import { links, socialLinks } from '../data/footerlinks';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <div className='flex justify-center pt-4 px-5 sm:px-0 sm:pt-32'>
      <div className='overflow-hidden'>
        <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto relative w-full'>
          <div className='flex flex-col gap-8 justify-between w-full sm:flex-row sm:gap-0'>
            <div className=''>
              <h3 className='font-[outfit] text-xl font-semibold mb-4'>Nikhil Thakur</h3>
              <p className='font-[outfit] leading-6 text-[#fefce899]'>FrontEnd Developer at Cybergineer Solutions</p>
              <p className='font-[outfit] leading-6 text-[#fefce899]'>Open for side-projects & collaborations</p>
            </div>
            <div className='flex gap-32'>
              <div>
              <h3 className='text-lg leading-6 mb-4'>Me</h3>
                <FooterLinks links={links} />
              </div>
              <div>
                <h3 className='text-lg leading-6 mb-4'>Connect</h3>
                <FooterLinks links={socialLinks} />
              </div>
            </div>
          </div>
        </div>

        <FooterBottom />
        <EndFooter/>
      </div>
    </div>
  );
};

const FooterBottom: React.FC = () => {
  return (
    <div className="py-24 overflow-hidden">
      <div className="marquee">
        <div className="marquee-content">
          <h4 className='gradient-text text-[100px] font-[outfit] capitalize font-bold sm:text-[150px] leading-[200px]'>chaos coded beautifully — </h4>
          <h4 className='gradient-text text-[100px] font-[outfit] capitalize font-bold sm:text-[150px] leading-[200px]'>chaos coded beautifully — </h4>
          <h4 className='gradient-text text-[100px] font-[outfit] capitalize font-bold sm:text-[150px] leading-[200px]'>chaos coded beautifully — </h4>
          <h4 className='gradient-text text-[100px] font-[outfit] capitalize font-bold sm:text-[150px] leading-[200px]'>chaos coded beautifully — </h4>
        </div>
      </div>
    </div>
  );
};

const EndFooter = () => {
  return(
      <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto relative w-full block before-image-color'>
        <div className='py-4 pt-8 flex justify-between'>
          <div className='flex-1'>
            <h3 className='font-[outfit]'>© 2024 Nikhil.</h3>
          </div>
          <div className='flex-1 flex justify-center'>
          <Link className='h-14' href={'/'}>
             <Image width={90} height={40} alt='Nikhil Logo' src='/main_images/NIKHIL.png' />
          </Link>
          </div>
          <div className='flex-1  justify-end flex'>
            <h3 className='font-[outfit]'>🥔Chandigarh, IN</h3>
          </div>
        </div>
      </div>
  )
}

export default Footer;
