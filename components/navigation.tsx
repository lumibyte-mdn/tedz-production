'use client'

import tedz from "@/public/tedz.svg"

import Image from 'next/image'
import Link from "next/link"

const navigation = [
  { name: 'HOME', href: '#' },
  { name: 'TEDZ PROJECT', href: '#' },
  { name: 'INSTAGRAM', href: '#' },
  { name: 'CONTACT', href: '#' },
]

export default function Navigation() {
  return (
    <>
      <div className='bg-[#040b11] absolute top-0 z-50 w-full'>
        <header className='max-w-7xl py-4 mx-auto'>
          <div className="grid grid-cols-4">
            <div>
              <Image
                src={tedz}
                alt=""
                width={120}
              />
            </div>
            <div className="flex gap-12 col-span-2 items-center justify-center">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className= {"text-sm hover:text-[#065dc6] text-white font-semibold"}>
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-end items-center">
              <button className="bg-[#065dc6] hover:bg-[#065cc6bf] py-2 px-4 text-white rounded-md font-semibold text-sm cursor-pointer">
                Chat WhatsApp
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
