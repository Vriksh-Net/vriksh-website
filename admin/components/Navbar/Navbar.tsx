"use client";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";


const Navbar = () => {
    const route = useRouter();
    return (
        <div className="flex justify-between items-center p-1 bg-white shadow-sm">
            {/* Logo */}
            <Image
                src="/Giflogo.gif"
                alt="Logo"
                width={160}
                height={120}
                className="cursor-pointer object-cover"
                onClick={() => route.push("/")}
            />

            {/* Avatar */}
            <Avatar>
                <AvatarImage src="/path-to-avatar-image.jpg" alt="User Avatar" className="cursor-pointer" />
                <AvatarFallback>R</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default Navbar;