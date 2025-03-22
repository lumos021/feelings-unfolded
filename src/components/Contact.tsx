'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Define form input types
interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

// Form submission states
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  // Form state handling
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Setup form with react-hook-form
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<ContactFormInputs>();
  
  // Handle form submission
  const onSubmit = async (data: ContactFormInputs) => {
    try {
      setStatus('submitting');
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, you would send the data to your API here
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      // 
      // if (!response.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      reset(); // Reset form after successful submission
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };
  
  // Get status-dependent styles and messages
  const getButtonText = () => {
    switch (status) {
      case 'submitting': return 'Sending...';
      case 'success': return 'Message Sent!';
      case 'error': return 'Try Again';
      default: return 'Send Message';
    }
  };
  
  const getButtonClasses = () => {
    const baseClasses = "px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed text-white ";
    
    switch (status) {
      case 'submitting': return baseClasses + "bg-gray-500 focus:ring-gray-500";
      case 'success': return baseClasses + "bg-green-600 focus:ring-green-600";
      case 'error': return baseClasses + "bg-red-600 focus:ring-red-600";
      default: return baseClasses + "bg-[#2a9d8f] hover:bg-[#264653] focus:ring-[#2a9d8f]";
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#264653]">Get in Touch</h2>
      <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 glass-card">
        <p className="text-lg md:text-xl text-gray-700 text-center mb-12">
          Ready to start your journey towards emotional well-being? Let&apos;s connect and discuss how I can help.
        </p>
        
        {/* Contact form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#264653] font-medium mb-2">Name</label>
                <input 
                  id="name"
                  {...register("name", { 
                    required: "Please enter your name",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none bg-white/50 backdrop-blur-sm
                    ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#2a9d8f]'}`}
                  placeholder="Your name"
                  aria-invalid={errors.name ? "true" : "false"}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[#264653] font-medium mb-2">Email</label>
                <input 
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Please enter your email address",
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: "Please enter a valid email address" 
                    }
                  })}
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none bg-white/50 backdrop-blur-sm
                    ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#2a9d8f]'}`}
                  placeholder="Your email"
                  aria-invalid={errors.email ? "true" : "false"}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-[#264653] font-medium mb-2">Message</label>
              <textarea 
                id="message"
                {...register("message", { 
                  required: "Please enter your message",
                  minLength: { value: 10, message: "Message must be at least 10 characters" }
                })}
                className={`w-full h-[calc(100%-2rem)] px-4 py-2 rounded-lg border focus:outline-none bg-white/50 backdrop-blur-sm resize-none
                  ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#2a9d8f]'}`}
                placeholder="How can I help you?"
                aria-invalid={errors.message ? "true" : "false"}
                disabled={isSubmitting}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-red-600 text-sm">{errors.message.message}</p>
              )}
            </div>
          </div>
          
          {/* Submit button with changing state */}
          <div className="mt-8 text-center">
            <button 
              type="submit"
              className={getButtonClasses()}
              disabled={isSubmitting}
              aria-label="Send your message"
            >
              {getButtonText()}
            </button>
            
            {/* Status messages */}
            {status === 'error' && (
              <p className="mt-4 text-red-600">{errorMessage || 'An error occurred. Please try again.'}</p>
            )}
            
            {status === 'success' && (
              <p className="mt-4 text-green-600">Thank you! I'll get back to you soon.</p>
            )}
          </div>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-gray-700">
            Or call directly: <a 
              href="tel:+918275052015" 
              className="text-[#2a9d8f] hover:underline focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:ring-offset-2 rounded"
              aria-label="Call us at +91 8275 052015"
            >
              +91 8275 052015
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 