"use client";

import Link from "next/link";
import Image from "next/image";
import { useColorStore } from "@/store/useColorState";
import { useImageStore } from "@/store/useImageState";

export default function Header() {

    const navbarColor = useColorStore((set)=> set.navbarColor)
    const setNavbarColor = useColorStore((set)=> set.setNavbarColor)
    const imageUrl = useImageStore((set)=> set.imageUrl)
    const setImageUrl = useImageStore((set)=> set.setImageUrl)

    let colorButton;
    if (navbarColor === "red") {
        colorButton = (
            <button onClick={() => setNavbarColor("blue")} className="p-2 bg-red-800 text-white rounded border-black border-[2px]"> Red </button>
        )
    }
    else { colorButton = ( <button onClick={() => setNavbarColor("red")} 
    className="p-2 bg-blue-500 text-white rounded border-black border-[2px]"> Blue </button> ) }

    let imageButton;
    if (imageUrl === "/img/Macan.jpg") {
        imageButton = (
            <button onClick={() => setImageUrl("/img/dotaOneLove.jpg")} className="p-2 text-white rounded border-black border-[2px]" style={{backgroundColor: navbarColor}}> Change Image </button>
        )
    }
    else { imageButton = ( <button onClick={() => setImageUrl("/img/Macan.jpg")} 
    className="p-2 text-white rounded border-black border-[2px]" style={{backgroundColor: navbarColor}}> Change Image </button> ) }

    return(
        <header className="flex flex-row w-full items-center" style={{backgroundColor: navbarColor}}>
            <div className="basis-1/4 flex items-center justify start px-4 my-2">
            <Image
                src = {imageUrl}
                alt="Logo"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
                priority
            />
            </div>

            <div className="basis-1/4" />

            <nav className="basis-1/2 flex flex-row items-center justify-end px-4 gap-4">
                {imageButton}
                <Link 
                    href="/"
                    className="my-auto p-2 hover:bg-black rounded text-white hover:text-yellow-300"
                >
                Home
                </Link>
                <Link href="/Labs" className="p-2 hover:bg-black rounded text-white hover:text-yellow-300">
                Lab3
                </Link>
                <Link href="/Login" className="p-2 hover:bg-black rounded text-white hover:text-yellow-300">
                LogIn
                </Link>
                <Link href="/Logout" className="p-2 hover:bg-black rounded text-white hover:text-yellow-300">
                LogOut
                </Link>
                {colorButton}
            </nav>
        </header>
    );
}