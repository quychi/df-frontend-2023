import Image from 'next/image'
import GithubSvg from '../../../public/github.svg'

export const Footer = () => (
  <footer className="w-full h-20 px-5 flex justify-between items-center border-t border-0.5 border-gray-200">
    <p>Copyright © 2023 Quy Chi</p>
    <div className="flex justify-center items-center gap-2">
      <a
        href="https://github.com/quychi"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4"
      >
        <Image
          src={GithubSvg.src}
          alt="github-logo"
          width="23"
          height="23"
          className="opacity-80 hover:opacity-100"
        />
      </a>
    </div>
  </footer>
)
