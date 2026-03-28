"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  Plus, 
  User, 
  Calendar,
  ChevronLeft,
  Filter,
  Download
} from "lucide-react";

interface Activity {
  id: number;
  title: string;
  date: string;
  category: string;
  icon: string;
  description: string;
  grade?: string;
}

interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
}

const mockChild: Child = {
  id: "1",
  name: "Emma",
  age: 8,
  avatar: "👧",
};

const mockActivities: Activity[] = [
  { id: 1, title: "Swimming Level 3 Passed", date: "Mar 15, 2026", category: "Sports", icon: "🏊", description: "Successfully completed Level 3 swimming certification", grade: "Distinction" },
  { id: 2, title: "Piano Recital - First Performance", date: "Mar 10, 2026", category: "Arts", icon: "🎵", description: "First public performance at Spring Concert", grade: "Excellent" },
  { id: 3, title: "Science Fair Winner", date: "Feb 28, 2026", category: "Academic", icon: "🔬", description: "First place in regional science fair", grade: "1st Place" },
  { id: 4, title: "Soccer Team Captain", date: "Feb 15, 2026", category: "Sports", icon: "⚽", description: "Elected captain of under-10 team" },
  { id: 5, title: "Math Olympics Bronze", date: "Jan 20, 2026", category: "Academic", icon: "🧮", description: "Bronze medal in regional math competition" },
  { id: 6, title: "Art Exhibition", date: "Jan 10, 2026", category: "Arts", icon: "🎨", description: "Three paintings displayed at school exhibition" },
];

const categories = ["All", "Sports", "Arts", "Academic", "Community", "Awards"];

export default function ChildProfilePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  const filteredActivities = selectedCategory === "All" 
    ? mockActivities 
    : mockActivities.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-2">
              <Star className="w-7 h-7 text-legend-gold-500 fill-legend-gold-500" />
              <span className="font-poppins font-bold text-lg text-midnight-800">LittleLegend</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-royal-purple-700 text-white rounded-lg hover:bg-royal-purple-800">
                <Download className="w-4 h-4" />
                Export CV
              </button>
              <div className="w-9 h-9 rounded-full bg-royal-purple-100 flex items-center justify-center">
                <User className="w-5 h-5 text-royal-purple-700" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Child Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-legend-gold-100 flex items-center justify-center text-4xl">
              {mockChild.avatar}
            </div>
            <div>
              <h1 className="font-poppins font-bold text-2xl text-midnight-800">{mockChild.name}&apos;s Legend</h1>
              <p className="text-gray-500">Age {mockChild.age} • {filteredActivities.length} activities recorded</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-royal-purple-700 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("timeline")}
              className={`p-2 rounded-lg ${viewMode === "timeline" ? "bg-royal-purple-100 text-royal-purple-700" : "bg-white text-gray-400"}`}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-royal-purple-100 text-royal-purple-700" : "bg-white text-gray-400"}`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative">
                {index !== filteredActivities.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gray-200" />
                )}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-cream-50 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-poppins font-bold text-lg text-midnight-800">{activity.title}</h3>
                        <p className="text-gray-500 mt-1">{activity.description}</p>
                      </div>
                      {activity.grade && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {activity.grade}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {activity.date}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-cream-50 flex items-center justify-center text-2xl mb-4">
                  {activity.icon}
                </div>
                <h3 className="font-semibold text-midnight-800 mb-1">{activity.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{activity.date}</p>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  {activity.category}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add Activity FAB */}
        <Link href="/activity/new" className="fixed bottom-6 right-6 w-14 h-14 bg-royal-purple-700 text-white rounded-full shadow-lg hover:bg-royal-purple-800 transition-all flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
