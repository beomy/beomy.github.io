import { getYear } from 'date-fns';
import { Anchor, Icon } from '@beomy/design-system-tailwind';

const Footer = () => {
  return (
    <footer className="border-t border-grey-90 bg-grey-100 py-[25px] text-center">
      <nav className="mx-auto mb-[10px] flex w-[100px] items-center justify-around [&_a]:px-[10px] [&_a]:py-[5px]">
        <Anchor
          href="https://github.com/beomy"
          target="_blank"
          aria-label="github"
        >
          <Icon type="BsGithub" size={20} />
        </Anchor>
        <Anchor
          href="https://www.linkedin.com/in/효범-이-930453134"
          target="_blank"
          aria-label="linkedin"
        >
          <Icon type="BsLinkedin" size={20} />
        </Anchor>
      </nav>
      <span className="text-1 text-caption">
        © {getYear(new Date())} Beomy. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
