import Image from "next/image";

const Experience = () => {
  return (
    <section id="MoreAboutMe" className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="m-auto max-w-[1400px]">
        <div
          className="mb-12 flex items-center gap-4"
          data-parallax
          data-speed="25"
        >
          <span className="eyebrow">(03) — Currently</span>
          <span className="rule flex-1" />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h2
            data-parallax
            data-speed="55"
            className="col-span-1 font-[MainFont] text-[2.2rem] uppercase leading-[1.02] tracking-[-0.01em] sm:text-[3.4rem] lg:col-span-7 lg:text-[4.2rem]"
          >
            <span className="block">Building storefronts</span>
            <span className="block">
              at <span className="accent-text">Cybergineer.</span>
            </span>
          </h2>

          <div
            data-parallax
            data-speed="-30"
            className="col-span-1 flex flex-col justify-end lg:col-span-5"
          >
            <p className="mb-6 font-[outfit] text-lg leading-relaxed text-[--ink-soft]">
              These days I build tailored e-commerce stores alongside the
              e-commerce team at Cybergineer Solutions — shipping for clients
              across the US, UK and Israel.
            </p>
            <p className="mb-8 font-[outfit] text-lg leading-relaxed text-[--ink-soft]">
              Before that, a stretch of freelance work: revamps, core products
              and the occasional rescue job.
            </p>
            <div>
              <span className="eyebrow block">Worked with</span>
              <div className="mt-3 inline-block rounded py-3">
                <Image
                  alt="Cybergineer Solutions"
                  height={42}
                  width={92}
                  src={"/main_images/web-logo-removebg-preview.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
