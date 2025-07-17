"use client"

import { BRANDS } from "@/lib/brand"
import Link from "next/link"
import Image from "next/image"

import allBrands from "@/public/images/brands.png"
import pizza from "@/public/images/pizza.png"
import about from "@/public/images/about.png"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

import 'swiper/css'
import "swiper/css/pagination"
import { FloatingWhatsApp } from "react-floating-whatsapp"
import { projects } from "@/lib/project"
import { services } from "@/lib/service"

export default function Home() {
  const brands = BRANDS

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/tedz.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/90 to-transparent z-0" />

        {/* Konten di atas video */}
        <div className="mx-auto max-w-7xl relativem z-10 h-full">
          <div className="relative z-10 h-full flex  top-0 bottom-0 left-0 right-0 items-center justify-start">
            <div className="flex-col">
              <h1 className="text-[#FFD300] text-8xl font-bold font-oswald w-1/2 leading-24">YOUR DIGITAL BESTIE</h1>
              <p className="text-white w-1/2 text-sm mt-8">Tedz menjadi mitra terpercaya dalam solusi digital. Berbagai brand, baik lokal maupun internasional, dan telah membuktikan kualitas layanan yang kami berikan.</p>
              <button className="bg-[#065dc6] hover:bg-[#065cc6bf] py-2 px-6 text-white rounded-md font-semibold text-base cursor-pointer mt-8">
                Chat Tedz Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="absolute z-20 bottom-0 w-full">
          <div className="overflow-hidden">
            <div className="bg-[#065DC6] py-4">
              <div className="animate-scroll flex justify-between gap-24">
                {
                  brands.map((brand) => (
                    <Image
                      src={brand.logo}
                      alt=""
                      key={brand.id}
                      className="transition-all duration-300 grayscale hover:grayscale-0"
                      height={24}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project */}
      <div className="max-w-7xl mx-auto my-20">
        <div className="text-white flex justify-between items-center">
          <h1 className="font-oswald text-6xl font-semibold">OUR PROJECT</h1>
          <Link href="" className="border border-[#065DC6] py-2 px-3 rounded-sm text-sm">Lihat Semua</Link>
        </div>

        <div className="mt-10">
          <Swiper
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            className="!pb-16"
            pagination={{ clickable: true }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <Link
                  href={project.link}
                >
                  <div>
                    <div>
                      <Image
                        src={project.img}
                        alt=""
                      />
                    </div>
                    <div className="mt-4">
                      <h1 className="text-white font-bold mb-1">{project.title}</h1>
                      <p className="text-white text-xs">{project.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Clients and Partners */}
      <div className="bg-[url('/images/clients.png')] bg-cover">
        {/* Opacity */}
        <div className="bg-[#065DC6]/95 text-white py-20">
          <div className="max-w-7xl mx-auto flex items-center">
            {/* Left */}
            <div className="w-[50%]">
              <div className="mb-10">
                <h3 className="font-oswald text-xl font-bold mb-2">CLIENTS AND PARTNERS</h3>
                <h1 className="font-oswald font-bold text-6xl">TEDZ <br /> PRODUCTION</h1>
              </div>

              <div className="w-5/6">
                <p className="mb-6 text-sm text-balance">Tedz Production adalah creative studio yang spesialis dalam pembuatan video pendek berdampak tinggi untuk menyampaikan pesan brand kamu secara kuat, cepat, dan tepat sasaran. Kami percaya bahwa setiap brand punya cerita unik dan kami hadir untuk mengemas cerita itu menjadi konten visual yang menarik dan relevan untuk target audience kamu.</p>

                <p className="text-sm text-balance">Dengan pendekatan yang kreatif, strategis, dan berbasis data, kami membantu brand tampil lebih menonjol di tengah lautan konten digital. Mulai dari konsep hingga eksekusi, tim kami siap berkolaborasi untuk menciptakan video yang bukan hanya estetis, tapi juga efektif dalam menyampaikan pesan dan membangun koneksi emosional.</p>
              </div>
            </div>

            {/* Right */}
            <div className="w-[50%] flex flex-col justify-center items-center text-[#FFD300] leading-none">
              <h1 className="font-oswald text-[250px] tracking-tight mb-2">100+</h1>
              <p className="font-oswald text-6xl">CLIENTS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-32">
        <h1 className="font-oswald text-6xl font-semibold text-center text-white mb-20">
          OUR SERVICES
        </h1>

        <div className="grid grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-center bg-cover h-[400px] rounded-sm"
              style={{ backgroundImage: `url(${service.image})` }}
            >
              {/* Overlay gradient dari bawah ke atas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent " />

              {/* Konten (tulisan + link) */}
              <div className="relative h-full flex flex-col items-center justify-end pb-5">
                <Link href={service.link} className="text-center text-white text-3xl z-10">
                  <p className="font-semibold">{service.title}</p>
                </Link>
              </div>
            </div>

          ))}
        </div>
      </div>

      {/* Showcase */}
      <div>
        <Image src={allBrands} alt="brands" />

        {/* Dynamic content based on latest */}
        <div className="grid grid-cols-2">
          <Image src={pizza} alt="pizza" />
          <Image src={pizza} alt="pizza" />
        </div>
      </div>

      {/* About */}
      <div className="max-w-7xl mx-auto text-white flex justify-between items-center py-32">
        {/* Left */}
        <div className="w-[50%]">
          <div className="text-[#FFD300] mb-10">
            <h3 className="font-oswald text-xl font-bold mb-2">WE ARE</h3>
            <h1 className="font-oswald font-bold text-6xl">TEDZ</h1>
            <h1 className="font-oswald font-bold text-6xl">PRODUCTION</h1>
          </div>

          <div className="w-5/6">
            <p className="mb-6 text-sm text-balance">
              Tedz Production adalah creative studio yang spesialis dalam pembuatan video pendek berdampak tinggi untuk menyampaikan pesan brand kamu secara kuat, cepat, dan tepat sasaran. Kami percaya bahwa setiap brand punya cerita unik dan kami hadir untuk mengemas cerita itu menjadi konten visual yang menarik dan relevan untuk target audience kamu.
            </p>

            <p className="text-sm text-balance">
              Dengan pendekatan yang kreatif, strategis, dan berbasis data, kami membantu brand tampil lebih menonjol di tengah lautan konten digital. Mulai dari konsep hingga eksekusi, tim kami siap berkolaborasi untuk menciptakan video yang bukan hanya estetis, tapi juga efektif dalam menyampaikan pesan dan membangun koneksi emosional dengan audiensmu.
            </p>
          </div>
        </div>

        <Image src={about} alt="about" className="h-[600px] w-[450px]" />
      </div>

      {/* Contact */}
      <div className="max-w-7xl mx-auto flex items-center py-10">
        <div className="text-white text-7xl font-oswald font-bold">
          <h1>SEND</h1>
          <h1>YOUR</h1>
          <h1>BRIEF</h1>
        </div>

        <form className="w-full ml-48">
          <div className="flex mb-3">
            <input type="text" placeholder="Name" className="bg-white w-full mr-2 px-4 py-2" />
            <input type="text" placeholder="Email" className="bg-white w-full px-4 py-2" />
          </div>

          <div className="mb-3">
            <input type="text" placeholder="Phone Number" className="bg-white w-full px-4 py-2" />
          </div>

          <div>
            <textarea rows={5} className="bg-white w-full px-4 py-1" placeholder="Message"></textarea>
          </div>
        </form>
      </div>

      <FloatingWhatsApp
        phoneNumber="6285117305638"
        accountName={"Tedz Productions"}
        avatar="/images/avatar.jpg"
        allowEsc
        className="floating-whatsapp"
        statusMessage="Online"
        chatMessage="Thank you for contacting Tedz Production! Please let us know how we can help you."

      />
    </>
  )
}
