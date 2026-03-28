"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Mail, Lock, Eye, EyeOff, Chrome, User } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    childName: "",
    childDob: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // TODO: Create account
      console.log("Signup:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Star className="w-8 h-8 text-legend-gold-500 fill-legend-gold-500" />
            <span className="font-poppins font-bold text-xl text-midnight-800">
              LittleLegend
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-poppins font-bold text-3xl text-midnight-800 mb-2">
              {step === 1 ? "Start Your Child&apos;s Legend" : "Meet Your Little Legend"}
            </h1>
            <p className="text-gray-600">
              {step === 1 ? "Create your free account" : "Tell us about your child"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-center gap-2 mb-6">
              <div className={`w-8 h-1.5 rounded-full ${step >= 1 ? "bg-royal-purple-700" : "bg-gray-200"}`} />
              <div className={`w-8 h-1.5 rounded-full ${step >= 2 ? "bg-royal-purple-700" : "bg-gray-200"}`} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent outline-none"
                        placeholder="Sarah Johnson"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent outline-none"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent outline-none"
                        placeholder="Min 8 characters"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Child&apos;s First Name</label>
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent outline-none"
                      placeholder="Emma"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.childDob}
                      onChange={(e) => setFormData({ ...formData, childDob: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-royal-purple-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div className="bg-cream-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600">
                      You can add more children later from your dashboard.
                    </p>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-royal-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-royal-purple-800 transition-colors"
              >
                {step === 1 ? "Continue" : "Create Account"}
              </button>
            </form>

            {step === 1 && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 hover:bg-gray-50 transition-colors"
                >
                  <Chrome className="w-5 h-5" />
                  <span className="font-medium text-gray-700">Continue with Google</span>
                </button>
              </>
            )}
          </div>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-royal-purple-700 font-semibold hover:text-royal-purple-800">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
