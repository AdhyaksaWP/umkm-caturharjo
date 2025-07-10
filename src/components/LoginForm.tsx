'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
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
      console.log('Form submitted:', { email, password });
    }
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <p className='text-2xl font-bold text-white'>Login</p>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit} noValidate>
        <Input className='text-white' onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        <Input className='text-white' onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default LoginForm;
