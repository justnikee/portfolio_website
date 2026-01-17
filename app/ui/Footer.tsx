"use client";

import React from 'react';
import { links, socialLinks } from '../data/footerlinks';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className='relative'>
      {/* Main Footer Content */}
      <div className='pt-20 pb-16 px-5 border-t border-[#1a1a1a]'>
        <div className='max-w-[1300px] m-auto'>
          {/* Footer Grid */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
            {/* Brand */}
            <div className='md:col-span-2'>
              <h3 className='font-[Heading] text-4xl uppercase mb-4'>Nikhil</h3>
              <p className='font-[outfit] text-[#777] leading-7 max-w-sm'>
                Frontend Developer crafting beautiful web experiences.
                Turning complex problems into elegant solutions.
              </p>
              <p className='font-[outfit] text-[#555] mt-4 text-sm'>
                Currently at Cybergineer Solutions
              </p>
              {/* Social Icons */}
              {/* <div className='flex gap-4 mt-6'>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target='_blank'
                    className='w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center hover:bg-[#2a2a2a] hover:border-[#3a3a3a] transition-colors'
                    title={link.title}
                  >
                    <span className='font-[outfit] text-xs text-[#888]'>
                      {link.title.charAt(0)}
                    </span>
                  </a>
                ))}
              </div> */}
            </div>

            {/* Navigation */}
            <div>
              <h3 className='text-sm font-[outfit] uppercase tracking-wider text-[#555] mb-5'>Navigation</h3>
              <div className='flex flex-col gap-3'>
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className='font-[outfit] text-[#888] hover:text-white transition-colors w-fit'
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h3 className='text-sm font-[outfit] uppercase tracking-wider text-[#555] mb-5'>Connect</h3>
              <div className='flex flex-col gap-3'>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target='_blank'
                    className='font-[outfit] text-[#888] hover:text-white transition-colors w-fit flex items-center gap-2 group'
                  >
                    {link.title}
                    <svg className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="py-8 border-t border-[#222]">
        <div className="marquee">
          <div className="marquee-content">
            <h4 className='gradient-text text-[60px] md:text-[100px] font-[Heading] uppercase font-bold leading-tight whitespace-nowrap'>
              chaos coded beautifully —
            </h4>
            <h4 className='gradient-text text-[60px] md:text-[100px] font-[Heading] uppercase font-bold leading-tight whitespace-nowrap'>
              chaos coded beautifully —
            </h4>
            <h4 className='gradient-text text-[60px] md:text-[100px] font-[Heading] uppercase font-bold leading-tight whitespace-nowrap'>
              chaos coded beautifully —
            </h4>
            <h4 className='gradient-text text-[60px] md:text-[100px] font-[Heading] uppercase font-bold leading-tight whitespace-nowrap'>
              chaos coded beautifully —
            </h4>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-[#222] bg-[#0a0a0a]'>
        <div className='max-w-[1300px] m-auto px-5 py-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <p className='font-[outfit] text-[#555] text-sm'>© 2026 Nikhil. All rights reserved.</p>
            <Link href={'/'} className='order-first md:order-none'>
              <Image width={80} height={35} alt='Nikhil Logo' src='/main_images/NIKHIL.png' className='opacity-60 hover:opacity-100 transition-opacity' />
            </Link>
            <p className='font-[outfit] text-[#555] text-sm flex items-center gap-2'>
              Made with ❤️ in Chandigarh, India
            </p>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <svg aria-hidden="true" className="svg-grid-bottom">
        <defs>
          <pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
      </svg>
    </footer>
  );
};

export default Footer;
