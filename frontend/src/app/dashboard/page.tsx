"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  Plus, 
  User, 
  Trophy,
  Calendar,
  TrendingUp,
  Award,
  ChevronRight
} from "lucide-react";

// Mock data for demo
const mockChild = {
  id: "1",
  name: "Emma",
  age: 8,
  avatar: "👧",
  totalActivities: 47,
  categories: 12,
  thisMonth: 3,
};

const mockActivities = [
  { id: 1, title: "Swimming Level 3 Passed", date: "Mar 15, 2026", category: "🏊 Sports", icon: "🏆" },
  { id: 2, title: "Piano Recital - First Performance", date: "Mar 10, 2026", category: "🎵 Arts", icon: "🎹" },
  { id: 3, title: "Science Fair Winner", date: "Feb 28, 2026", category: "📚 Academic", icon: "🔬" },
];

const mockCategories = [
  { name: "Sports", count: 15, icon: "🏊", color: "bg-blue-100" },
  { name: "Arts", count: 12, icon: "🎵", color: "bg-purple-100" },
  { name: "Academic", count: 10, icon: "📚", color: "bg-green-100" },
  { name: "Awards", count: 7, icon: "🏆", color: "bg-yellow-100" },
  { name: "Community", count: 3, icon: "🤝", color: "bg-rose-100" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Star className="w-7 h-7 text-legend-gold-500 fill-legend-gold-500" />
              <span className="font-poppins font-bold text-lg text-midnight-800">LittleLegend</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-royal-purple-700 text-white p-2 rounded-lg hover:bg-royal-purple-800 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-full bg-royal-purple-100 flex items-center justify-center">
                <User className="w-5 h-5 text-royal-purple-700" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-2xl text-midnight-800">
            👋 Hello, Sarah!
          </h1>
          <p className="text-gray-600 mt-1">Here&apos;s how {mockChild.name} is growing today</p>
        </div>

        {/* Child Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-legend-gold-100 flex items-center justify-center text-3xl">
                {mockChild.avatar}
              </div>
              <div>
                <h2 className="font-poppins font-bold text-xl text-midnight-800">{mockChild.name}&apos;s Legend</h2>
                <p className="text-gray-500">Age {mockChild.age} • Growing every day 🌱</p>
              </div>
            </div>
            <Link 
              href="#"
              className="text-royal-purple-700 font-semibold text-sm hover:text-royal-purple-800 flex items-center gap-1"
            >
              View Profile
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-cream-50 rounded-xl p-4 text-center">
              <div className="font-poppins font-bold text-3xl text-royal-purple-700">{mockChild.totalActivities}</div>
              <div className="text-sm text-gray-600 mt-1">Activities</div>
            </div>
            <div className="bg-cream-50 rounded-xl p-4 text-center">
              <div className="font-poppins font-bold text-3xl text-royal-purple-700">{mockChild.categories}</div>
              <div className="text-sm text-gray-600 mt-1">Categories</div>
            </div>
            <div className="bg-cream-50 rounded-xl p-4 text-center">
              <div className="font-poppins font-bold text-3xl text-royal-purple-700">{mockChild.thisMonth}</div>
              <div className="text-sm text-gray-600 mt-1">This Month</div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link
              href="#"
              className="flex-1 bg-royal-purple-700 text-white py-3 rounded-xl font-semibold text-center hover:bg-royal-purple-800 transition-colors"
            >
              View Timeline
            </Link>
            <Link
              href="#"
              className="flex-1 border-2 border-royal-purple-700 text-royal-purple-700 py-3 rounded-xl font-semibold text-center hover:bg-royal-purple-50 transition-colors"
            >
              Preview CV
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "recent", label: "Recent", icon: Calendar },
            { id: "categories", label: "Categories", icon: Award },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-royal-purple-700 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-poppins font-bold text-lg text-midnight-800">Recent Activity</h3>
                <Link href="#" className="text-royal-purple-700 text-sm font-medium hover:text-royal-purple-800">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-cream-50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl shadow-sm">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-midnight-800">{activity.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{activity.date} • {activity.category}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-royal-purple-400 hover:text-royal-purple-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Activity
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-poppins font-bold text-lg text-midnight-800 mb-4">Categories</h3>
              <div className="space-y-3">
                {mockCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center text-lg`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-midnight-800">{cat.name}</span>
                        <span className="text-gray-500">{cat.count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                        <div 
                          className="bg-royal-purple-500 h-2 rounded-full"
                          style={{ width: `${(cat.count / 15) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-royal-purple-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-legend-gold-400" />
                <h3 className="font-poppins font-bold">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {[
                  "Add a new milestone",
                  "Upload a certificate",
                  "Generate CV preview",
                  "Share with family",
                ].map((action) => (
                  <button key={action} className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/10 transition-colors text-sm">
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
