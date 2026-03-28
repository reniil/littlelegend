"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  ChevronLeft,
  Upload,
  Calendar
} from "lucide-react";

const categories = [
  { id: "sports", name: "Sports", icon: "🏊", color: "bg-blue-100", textColor: "text-blue-700" },
  { id: "arts", name: "Arts & Music", icon: "🎵", color: "bg-purple-100", textColor: "text-purple-700" },
  { id: "academic", name: "Academic", icon: "📚", color: "bg-green-100", textColor: "text-green-700" },
  { id: "community", name: "Community", icon: "🤝", color: "bg-rose-100", textColor: "text-rose-700" },
  { id: "awards", name: "Awards & Honors", icon: "🏆", color: "bg-yellow-100", textColor: "text-yellow-700" },
  { id: "leadership", name: "Leadership", icon: "⭐", color: "bg-indigo-100", textColor: "text-indigo-700" },
];

export default function AddActivityPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: "",
    grade: "",
    certificate: null as File | null,
  });
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Activity saved! (Demo mode - no backend connected)");
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-legend-gold-500 fill-legend-gold-500" />
              <span className="font-poppins font-bold text-lg text-midnight-800">LittleLegend</span>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? "bg-royal-purple-700 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {s}
              </div>
              {s < 2 && <div className={`w-16 h-1 mx-2 rounded ${step >= s ? "bg-royal-purple-700" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-6">
                  What type of activity?
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedCategory === cat.id
                          ? "border-royal-purple-700 bg-royal-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center text-2xl mb-3`}>
                        {cat.icon}
                      </div>
                      <p className={`font-semibold ${selectedCategory === cat.id ? "text-royal-purple-700" : "text-gray-700"}`}>
                        {cat.name}
                      </p>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => selectedCategory && setStep(2)}
                  disabled={!selectedCategory}
                  className={`w-full mt-6 py-4 rounded-xl font-semibold transition-colors ${
                    selectedCategory
                      ? "bg-royal-purple-700 text-white hover:bg-royal-purple-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-6">
                  Tell us about it
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activity Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Swimming Level 3 Passed"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-royal-purple-700 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="e.g., City Swimming Club"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-royal-purple-700 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-royal-purple-700 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-royal-purple-700 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Tell us more about this achievement..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-royal-purple-700 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade / Result
                    </label>
                    <input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      placeholder="e.g., First Place, Distinction, A+"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-royal-purple-700 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Certificate (optional)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-royal-purple-400 transition-colors">
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                        <span className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 10MB</span>
                      </div>
                      <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-xl font-semibold bg-royal-purple-700 text-white hover:bg-royal-purple-800 transition-colors"
                  >
                    Save Activity
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
