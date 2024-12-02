"use client";

import React, { useEffect, useRef } from 'react';
import FooterLinks from '../components/FooterLinks';
import { links, socialLinks } from '../data/footerlinks';
import { gsap } from 'gsap';
import { Observer } from "gsap/Observer";
import Link from 'next/link';
import Image from 'next/image';

// Register the GSAP Observer plugin
gsap.registerPlugin(Observer);

const Footer: React.FC = () => {
  return (
    <div className='flex justify-center sm:pt-32 pt-4'>
      <div className='overflow-hidden'>
        <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto relative w-full'>
          <div className='flex justify-between w-full '>
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
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = animationRef.current;
    if (container) {
      const spans = gsap.utils.toArray(container.children);

      // Create horizontal loop
      const tl = horizontalLoop(spans, {
        speed: 1.5, // Adjust speed as needed
        repeat: -1,
      });

      // Create scroll-based interaction using GSAP's Observer plugin
      Observer.create({
        onChangeY(self) {
          let factor = self.deltaY < 0 ? -1 : 1;
          gsap.timeline()
            .to(tl, { timeScale: factor * 2.5, duration: 0.3 })
            .to(tl, { timeScale: factor / 2.5, duration: 0.8 }, "+=0.3");
        },
      });

      return () => {
        tl.kill();
      };
    }
  }, []);

  return (
    <div className="py-24 overflow-hidden">
      <div
        className="font-[Heading] text-[150px] leading-[400px] gap-32 capitalize flex whitespace-nowrap text-animation"
        ref={animationRef}
        style={{ display: "flex" }} // Ensures spans align horizontally
      >
        <h4 className='gradient-text -mr-6'>chaos coded beautifully — Jinxx way</h4>
        <h4 className='gradient-text -mr-6'>chaos coded beautifully — Jinxx way</h4>
        <h4 className='gradient-text -mr-6'>chaos coded beautifully — Jinxx way</h4>
      </div>
    </div>
  );
};

// TypeScript type for configuration and items
interface HorizontalLoopConfig {
  speed?: number;
  repeat?: number;
  snap?: number | boolean;
  paused?: boolean;
}

function horizontalLoop(items: HTMLElement[], config: HorizontalLoopConfig): GSAPTimeline {
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });

  const length = items.length;
  const startX = items[0].offsetLeft;
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);
  let totalWidth;
  let curX;
  let distanceToStart;
  let distanceToLoop;
  let i;

  // Initialize xPercent and widths for responsive behavior
  gsap.set(items, {
    xPercent: (i, el) => {
      const w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth = items[length - 1].offsetLeft + (xPercents[length - 1] / 100) * widths[length - 1] - startX + items[length - 1].offsetWidth;

  for (i = 0; i < length; i++) {
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = items[i].offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i];

    tl.to(items[i], {
      xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
      duration: distanceToLoop / pixelsPerSecond,
    }, 0)
      .fromTo(items[i], { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      }, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
  }

  return tl;
}




const EndFooter = () => {
  return(
      <div className='sm:px-[32px] sm:py-0 max-w-[1300px] m-auto relative w-full'>
        <div className='py-4 flex justify-between'>
          <div className='flex-1'>
            <h3 className='font-[outfit]'>© 2024 Nikhil.</h3>
          </div>
          <div className='flex-1 flex justify-center'>
          <Link className='h-14' href={'/'}>
             <Image width={90} height={40} alt='Nikhil Logo' src='/main_images/NIKHIL.png' />
          </Link>
          </div>
          <div className='flex-1  justify-end flex'>
            <h3 className='font-[outfit]'>Cooked Chandigarh, IN</h3>
          </div>
        </div>
      </div>
  )
}
export default Footer;
