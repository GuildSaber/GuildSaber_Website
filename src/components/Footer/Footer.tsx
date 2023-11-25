import clsx from "clsx";
import { Link } from "react-router-dom";

interface FooterLink {
  name: string;
  href: string;
}

const FOOTER_LINKS: FooterLink[] = [
  {
    name: "Team",
    href: "/team",
  },
  {
    name: "Github",
    href: "https://github.com/GuildSaber/GuildSaber_Website",
  },
  {
    name: "Api",
    href: "/api",
  },
  {
    name: "Privacy",
    href: "/terms-of-use",
  },
];

export default function Footer({
  className,
  ...otherprops
}: {
  className?: string;
}) {
  return (
    <footer className={clsx(" mt-14 bg-[#0d0e0f]", className)} {...otherprops}>
      <div className="container mx-auto flex flex-wrap items-stretch justify-center gap-10 px-2  py-4 md:px-4 lg:px-8">
        {FOOTER_LINKS.map((link) => (
          <Link
            className="transition-color text-muted hover:text-white"
            to={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
