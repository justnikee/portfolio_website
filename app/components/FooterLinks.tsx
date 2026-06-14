import React from "react";

type LinkItmes = {
  title: string;
  link: string;
};

type Props = {
  links: LinkItmes[];
};

const FooterLinks = ({ links }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {links.map((link, index) => (
        <a
          className="link-underline w-fit font-[outfit] text-[--muted] transition-colors duration-300 hover:text-[--foreground]"
          key={index}
          href={link.link}
          data-cursor="hover"
        >
          {link.title}
        </a>
      ))}
    </div>
  );
};

export default FooterLinks;
