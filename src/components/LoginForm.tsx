'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password
        });

        if (res?.error) {
          console.error("Login failed:", res.error);
          alert("Login failed: Email or password is incorrect.");
        } else {
          alert("Login successful!");
        }
      } catch (error) {
        console.error("Unexpected error during login:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <p className='text-2xl font-bold text-white'>Login</p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit} noValidate>
        <Input className='text-white' onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        <Input className='text-white' onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
        <button type='submit' className='bg-green-500 px-4 py-2 text-white rounded animate-slide-in-from-left animate-delay-700 hover:scale-105 hover:bg-green-300 transition-all duration-300 hover:shadow-lg cursor-pointer'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
