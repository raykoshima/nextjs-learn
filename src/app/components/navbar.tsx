"use client";

import { User } from "lucia";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { startTransition } from "react";
import { logout } from "@/action/authaction";

export function Navbar({
        user,
        className,
    }: {
        user: User | null;
        className?: string;
    }) {
        
        const logoutUser = async () => {
            startTransition(() => {
                logout();
          Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            text: 'กำลังพาไปหน้าแรก!',
        });
            });
        };
    return ( 
        <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-white font-bold">Your Company</a>
      <ul className="flex space-x-4">
        <li>{ user ? (
            <a href="#" className="text-white">Hello {user.email}</a>
        )   : (
            <a href="#" className="text-white">Hello ds</a>
        ) 
    }
            </li>
        <li><Button className="text-white" color="secondary" onClick={logoutUser}>Logout</Button></li>
      </ul>
    </div>
  </nav>
    )
}