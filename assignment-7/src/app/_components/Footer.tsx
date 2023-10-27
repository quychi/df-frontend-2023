'use client'

import { IconGithub } from '../_icons/components/IconGithub'

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
        <IconGithub className="opacity-80 hover:opacity-100 w-6 h-6" />
      </a>
    </div>
  </footer>
)
