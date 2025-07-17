import Image from "next/image"
import Link from "next/link"

import tedz from "@/public/tedz.svg"

export default function Footer() {
    return (
        <footer className="text-white bg-[#141B22]">
            <div className="flex justify-around max-w-7xl mx-auto py-32">
                {/* Left */}
                <div className="w-[40%]">
                    <Image src={tedz} alt="icon" className="w-44"/>
                    <div className="my-4 text-sm">
                        <p>Jl. Komp. Multatuli Indah Blk. F No.8</p>
                        <p>Sumatera Utara 20212 - Indonesia</p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex justify-between w-[60%]">
                    <div>
                        <h4 className="font-semibold">COMPANY</h4>

                        <ul className="text-gray-500">
                            <li className="my-3"><Link href="">Home</Link></li>
                            <li className="my-3"><Link href="">Tedz Project</Link></li>
                            <li className="my-3"><Link href="">Instagram</Link></li>
                            <li className="my-3"><Link href="">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold">SOCIAL MEDIA</h4>

                        <ul className="text-gray-500">
                            <li className="my-3"><Link href="">Instagram</Link></li>
                            <li className="my-3"><Link href="">Tiktok</Link></li>
                            <li className="my-3"><Link href="">WhatsApp</Link></li>
                            <li className="my-3"><Link href="">Email</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold">GET IN TOUCH</h4>

                        <input type="text" className="bg-[#C2C3C526] py-2 px-3 my-3" placeholder="Enter your email" />
                        <button className="bg-[#FFD300] px-6 py-2 text-black">BRIEF</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}