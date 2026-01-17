"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedHeading from '../components/Animated-heading'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Work = () => {
  const projects = [
    {
      link: "https://export-ready.vercel.app/",
      github: "https://github.com/justnikee/export-ready-battery",
      title: 'Export Ready',
      description: 'A high-performance compliance intelligence platform for global trade regulations.',
      image: '/erbattery.png',
      stack: ["NextJs", "TS", "Supabase", "Golang", "PostgreSQL"]
    },
    {
      link: 'https://vyoma-studio-iota.vercel.app/',
      github: "https://github.com/justnikee/Project-Vyoma",
      title: 'Vyoma Studio',
      description: 'Modern digital studio creating high-impact web products with clean design.',
      image: '/vyoma-studio.png',
      stack: ["ASTRO", "GSAP", "Tailwind", "Lenis"]
    },
    {
      link: 'https://ss-aevi.vercel.app/',
      github: "https://github.com/justnikee/SweetSimmon",
      title: 'SS-Aevi',
      description: 'Modern e-commerce storefront with Next.js, Supabase, and Framer Motion.',
      image: '/Aevi.png',
      stack: ["NextJs", "TS", "Supabase", "Prisma"]
    },
    {
      link: 'https://planetdesert.com',
      title: 'PlanetDesert',
      description: 'US-based Shopify store with optimized performance.',
      image: '/main_images/planetdesert.png',
      stack: ["Shopify", "Javascript", "Liquid"]
    },
    {
      link: 'https://paufashion.com/',
      title: 'Paufashion',
      description: 'Custom Shopify store built from scratch.',
      image: '/main_images/pau-fashion.png',
      stack: ["Shopify", "Liquid", "Javascript"]
    },
    {
      link: 'https://www.knovus.com.au/',
      title: 'Knovus',
      description: 'Feature-rich Shopify store for Australian client.',
      image: '/main_images/knovus.png',
      stack: ["Shopify", "Liquid", "Javascript"]
    }
  ];

  const featured = projects[0];
  const currentProjects = projects.slice(1, 3);
  const pastProjects = projects.slice(3);

  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    cards?.forEach((card, index) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 60,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <div id='Work' ref={sectionRef} className='py-32 px-4 relative'>
      <div className='max-w-[1300px] m-auto'>
        <AnimatedHeading heading='Work' additionalCss='mb-16' />

        {/* Featured Project - Split Layout */}
        {/* Featured Project - Split Layout */}
        <div className='project-card block mb-12 group relative'>
          <Link href={featured.link} target="_blank" className="absolute inset-0 z-10" aria-label={`View ${featured.title}`} />
          <div className='rounded-2xl bg-[#151515] border border-[#2a2a2a] overflow-hidden shadow-lg shadow-black/20 hover:border-[#3a3a3a] transition-colors'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {/* Text Content */}
              <div className='p-8 md:p-12 flex flex-col justify-center'>
                <div className='flex items-center gap-3 mb-4 relative z-20'>
                  <span className='px-4 py-1.5 text-xs font-medium font-[outfit] bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400'>Featured</span>
                  {featured.github && (
                    <Link href={featured.github} target="_blank" onClick={(e) => e.stopPropagation()} className='p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors'>
                      <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </Link>
                  )}
                </div>
                <h3 className='text-3xl md:text-5xl font-[Heading] uppercase mb-4 text-white group-hover:text-[#ccc] transition-colors'>{featured.title}</h3>
                <p className='text-[#888] font-[outfit] text-lg mb-6'>{featured.description}</p>
                <div className='flex gap-2 flex-wrap'>
                  {featured.stack.map((tech, i) => (
                    <span key={i} className='px-3 py-1.5 text-xs font-medium font-[outfit] bg-[#222] border border-[#333] rounded-full text-white/70'>{tech}</span>
                  ))}
                </div>
              </div>
              {/* Image */}
              <div className='relative h-[300px] lg:h-auto overflow-hidden bg-[#0a0a0a]'>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Current Projects Grid - Split Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
          {currentProjects.map((project, index) => (
            <div key={index} className='project-card group relative'>
              <Link href={project.link} target="_blank" className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />
              <div className='rounded-xl bg-[#151515] border border-[#2a2a2a] overflow-hidden h-full shadow-lg shadow-black/20 hover:border-[#3a3a3a] transition-colors'>
                {/* Image */}
                <div className='relative h-[240px] overflow-hidden bg-[#0a0a0a]'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                {/* Text Content */}
                <div className='p-5'>
                  <div className='flex items-center justify-between mb-2 relative z-20'>
                    <h4 className='text-xl font-[Heading] uppercase text-white group-hover:text-[#ccc] transition-colors'>{project.title}</h4>
                    {project.github && (
                      <Link href={project.github} target="_blank" onClick={(e) => e.stopPropagation()} className='p-1.5 bg-[#222] rounded-full hover:bg-[#333] transition-colors'>
                        <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </Link>
                    )}
                  </div>
                  <p className='text-[#777] font-[outfit] text-sm mb-3'>{project.description}</p>
                  <div className='flex gap-2 flex-wrap'>
                    {project.stack.slice(0, 4).map((tech, i) => (
                      <span key={i} className='px-2.5 py-1 text-[11px] font-medium font-[outfit] bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-white/60'>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Projects */}
        <div>
          <h3 className='text-xl font-[outfit] text-center mb-8 text-[#fff] uppercase'>Also Worked On</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {pastProjects.map((project, index) => (
              <Link key={index} href={project.link} target="_blank" className='project-card group'>
                <div className='rounded-lg bg-[#151515] border border-[#2a2a2a] overflow-hidden shadow-md shadow-black/20 hover:border-[#3a3a3a] transition-colors'>
                  {/* Image */}
                  <div className='relative h-[240px] overflow-hidden bg-[#0a0a0a]'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                  {/* Text Content */}
                  <div className='p-5'>
                    <h4 className='text-xl font-[Heading] uppercase text-white/90 group-hover:text-white transition-colors'>{project.title}</h4>
                    <div className='flex gap-2 flex-wrap mt-3'>
                      {project.stack.slice(0, 2).map((tech, i) => (
                        <span key={i} className='px-2.5 py-1 text-[11px] font-medium font-[outfit] bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-white/60'>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <svg aria-hidden="true" className="svg-grid-work"><defs><pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect></svg>
    </div>
  )
}

export default Work
