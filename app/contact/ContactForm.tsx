"use client"
import React, { useState, useEffect } from 'react';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import MotionComponent from 'app/components/ui/AnimMotionComponent';
import { FormProps } from 'app/interfaces/ApiProps';

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function ContactForm({ url }: { url: string }) {
  const [formState, setFormState] = useState<FormProps>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormProps>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError,setFormError]=useState('');

  useEffect(() => {
    setErrors({}); // Clear errors on form reset
    setSubmitSuccess(false); // Clear success flag on form reset
  }, [formState]); // Re-run on form state change

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  const handleValidation = () => {
    const newErrors = {} as Partial<FormProps>;

    if (!formState.name) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formState.email || !validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formState.message) {
      newErrors.message = 'Please enter your message.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!handleValidation()) return; // Exit if validation fails

    setIsSubmitting(true);
    setErrors({}); // Clear errors on successful validation

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set appropriate headers for JSON data
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitSuccess(data.success); // Show success message
      } else {
        setFormError(response.statusText);
        console.error('Error:', response.statusText);
        // Handle API errors (e.g., display a generic error message)
      }
    } catch (error) {
        setFormError('Network error');
        console.log(error);
      // Handle network or other errors (e.g., display a generic error message)
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderError = (field: keyof FormProps) => {
    return errors[field] && <span className="text-orange-500">{errors[field]}</span>;
  };

  return (
    <form className={`${isSubmitting ? 'pointer-events-none' : ''} mt-20 order-3 lg:col-span-2`} onSubmit={(e) => handleSubmit(e)}>

        <div className='grid md:grid-cols-2 gap-8 mb-12'>
            <MotionComponent variants="letterSpacing">
            <div className='w-full'>
                <input type='text' name="name" onChange={handleChange} className={`border-b-2  border-opacity-50 h-[60px] w-full block bg-transparent placeholder:text-2xl focus:border-orange-200 transition-[border] duration-300 ease-in-out ${errors.name ? 'border-orange-500' : 'border-gray-100'}`} placeholder='Enter your full name'/>
                {renderError('name')}
            </div>
            </MotionComponent>
            <MotionComponent variants="letterSpacing">
            <div className='w-full'>
                <input type='text' name="email" onChange={handleChange} className={`border-b-2  border-opacity-50 h-[60px] w-full block bg-transparent placeholder:text-2xl focus:border-orange-200 transition-[border] duration-300 ease-in-out ${errors.email ? 'border-orange-500' : 'border-gray-100'}`} placeholder='Enter your email address' />
                {renderError('email')}
            </div>
            </MotionComponent>
        </div>
        <div className='grid md:grid-cols-2 mb-12 gap-8'>
          <MotionComponent variants="letterSpacing">
            <div className='w-full'>
                <input type='text' name="phone" onChange={handleChange} className='border-b-2  border-opacity-50 border-gray-100 h-[60px] w-full block bg-transparent placeholder:text-2xl focus:border-orange-200 transition-[border] duration-300 ease-in-out' placeholder='Enter your phone number'/>
                {renderError('phone')}
            </div>
            </MotionComponent>
            <MotionComponent variants="letterSpacing">
            <div className='w-full'>
                <input type='text' name="address" onChange={handleChange} className='border-b-2  border-opacity-50 border-gray-100 h-[60px] w-full block bg-transparent placeholder:text-2xl focus:border-orange-200 transition-[border] duration-300 ease-in-out' placeholder='Enter your address'/>
                {renderError('address')}
            </div>
            </MotionComponent>
        </div>
        <div className='grid mb-12'>
          <MotionComponent variants="letterSpacing">
            <textarea name="message" onChange={handleChange} className={`border-b-2  border-opacity-50 h-[150px] w-full block bg-transparent placeholder:text-2xl focus:border-orange-200 transition-[border] duration-300 ease-in-out ${errors.message ? 'border-orange-500' : 'border-gray-100'}`} placeholder='Enter your message'/>
            {renderError('message')}
          </MotionComponent>
        </div>
        {
            submitSuccess &&
            <div className='grid'>
                <p className='text-green'>Your message has been sent. We will reply to you asap.</p>
            </div>
        }
        {
            formError != '' &&
            <div className='grid'>
                <p className='text-orange-900'>{formError}</p>
            </div>
        }
        <div className='grid lg:grid-cols-2 mt-8'>
            <div>
              <MotionComponent variants="letterSpacing">
                <ButtonComponent className={`${isSubmitting ? 'pointer-events-none' : ''} text-3xl lg:text-4xl w-auto`} tagType=''>{
                    isSubmitting ? 
                    <>
                        Sending Message 
                        <span className="relative inline-flex h-3 w-3 ml-2">
                            <span className="animate-ping absolute inline-flex w-full h-full bg-gray-900 opacity-75"></span>
                            <span className="relative inline-flex h-full w-full bg-gray-900"></span>
                        </span>
                    </> 
                    : 
                    <> 
                        Send A Message 
                    </>
                    }
                </ButtonComponent>
              </MotionComponent>
            </div>
        </div>
    </form>  
  )
}