"use client";

import { register } from '@/action/authaction';
import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

export default function Registerform() {
    const router = useRouter();
    const [input, setInput] = useState({
        password: '',
        confirmPassword: '',
        email: '',
    })

    const hdlChange = (e: { target: { name: any; value: any } }) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const [error, setError] = useState('');
    const validateForm = () => {
        if (!input.email.trim() || !input.password.trim() || !input.confirmPassword.trim()) {
            setError('โปรดกรอกชื่อผู้ใช้, รหัสผ่าน, และยืนยันรหัสผ่าน');
            return false;
        }
        if (input.password !== input.confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน');
            return false;
        }
        setError('');
        return true;
    };

    const hdlSubmit = async (e: { preventDefault: () => void; })  => {
        try {
            e.preventDefault();
            const result = await register(input)
            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Register Failed',
                    text: result.error
                });  
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Register Successful',
                    text: 'กำลังพาไปหน้าแรก!',
                });
                router.push("/");
            }

        } catch (error) {
            
        }
    }

    return (
        <>
        <title>สมัครสมาชิก</title>
        <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10'>
                    <div className="container mx-auto mt-20">
                        <form onSubmit={hdlSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-6 text-center font-semibold">Sign Up</h2>
                            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="email" id="email" name="email" value={input.email} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                                <input type="password" id="password" name="password" value={input.password} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={input.confirmPassword} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" onChange={hdlSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Sign Up</button>
                            <p>มีบัญชีอยู่แล้ว? <a href="/auth/sign-in" className='text-sky-500'>เข้าสู่ระบบ</a></p>
                        </form>
                    </div>
                </div>
        </>
    )
}