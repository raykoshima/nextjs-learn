"use client";

import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { login } from '@/action/authaction';
import { useRouter } from "next/navigation";

export default function Loginform() {
    const router = useRouter();
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const hdlChange = (e: { target: { name: any; value: any; }; }) => {
      setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

    const hdlSubmit = async (e: { preventDefault: () => void; })  => {
        try {
            e.preventDefault();
            const result = await login(input)
            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: result.error
                });  
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'คุณเข้าสู่ระบบสำเร็จแล้ว!',
                });
                router.push("/");
            }

        } catch (error) {
            
        }
    }

    return (
        <>
        <title>เข้าสู่ระบบ</title>
                <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10'>
                    <div className="container mx-auto mt-20">
                        <form onSubmit={hdlSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-6 text-center font-semibold">Sign In</h2>
                            {/* {error && <div className="text-red-500 mb-4 text-center">{error}</div>} */}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="email" id="email" name="email" value={input.email} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                                <input type="password" id="password" name="password" value={input.password} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" onChange={hdlSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Sign In</button>
                            <p>ยังไม่มีบัญชี? <a href="/auth/sign-up" className='text-sky-500'>สมัครเลย</a></p>
                        </form>
                    </div>
                </div>
        </>
    )
}
