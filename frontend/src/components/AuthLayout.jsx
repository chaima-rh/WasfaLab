import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import img from "../assets/img.png";

const benefits = [
  'Save your favorite recipes',
  'Discover recipes from around the world',
  'Share recipes with friends',
];

export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-light to-white flex items-center justify-center py-10">
      <div className="relative flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white/70 shadow-soft backdrop-blur-xl">
        <div className="flex flex-1 flex-col gap-8 p-8 md:p-12 lg:p-16">
          <div>
            <h1 className="text-3xl font-semibold text-dark">{title}</h1>
            <p className="mt-2 text-sm text-slate-500">
              Experience cooking made easy with a modern recipe hub.
            </p>
          </div>
          {children}
          <div className="text-xs text-slate-400">
            By continuing, you agree to our{' '}
            <span className="text-primary font-medium">Terms of Service</span> and{' '}
            <span className="text-primary font-medium">Privacy Policy</span>.
          </div>
        </div>

        <div  className="hidden flex-1 flex-col justify-between bg-cover bg-center p-10 text-white md:flex" style={{backgroundImage: `url(${img})`}}>
        
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">What will you get?</h2>
            <p className="text-sm text-white/80">
              A curated experience to explore, save, and share recipes with a modern, easy-to-use interface.
            </p>
          </div>

          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-1 text-primary/60">
                  <FiCheckCircle className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/90">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-black/30 p-4 text-xs text-white/80">
            <p className="font-semibold">Tip</p>
            <p className="mt-1">Try searching for “pasta” or “vegan” once you log in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
