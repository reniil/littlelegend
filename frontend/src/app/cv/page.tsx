"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, 
  ChevronLeft,
  Download,
  Printer,
  Share2
} from "lucide-react";

interface Child {
  name: string;
  age: number;
  avatar: string;
  school: string;
  location: string;
}

interface Activity {
  title: string;
  category: string;
  date: string;
  organization: string;
  description: string;
  grade?: string;
}

const mockChild: Child = {
  name: "Emma",
  age: 8,
  avatar: "👧",
  school: "Springfield Elementary",
  location: "Lagos, Nigeria",
};

const mockActivities: Activity[] = [
  { title: "Swimming Level 3 Certification", category: "Sports", date: "March 2026", organization: "City Aquatics Center", description: "Completed Level 3 swimming certification with distinction", grade: "Distinction" },
  { title: "First Piano Recital", category: "Arts", date: "March 2026", organization: "School Spring Concert", description: "First public piano performance in front of 200+ audience", grade: "Excellent" },
  { title: "Science Fair Winner", category: "Academic", date: "February 2026", organization: "Regional Science Fair", description: "First place in regional science fair with project on renewable energy", grade: "1st Place" },
  { title: "Soccer Team Captain", category: "Sports", date: "February 2026", organization: "Youth Soccer League", description: "Elected captain of under-10 recreational soccer team", grade: "" },
  { title: "Math Olympics Bronze", category: "Academic", date: "January 2026", organization: "Regional Math Competition", description: "Bronze medal in regional mathematics competition", grade: "Bronze" },
  { title: "Art Exhibition", category: "Arts", date: "January 2026", organization: "School Art Show", description: "Three paintings displayed in school-wide art exhibition", grade: "" },
  { title: "Reading Challenge Champion", category: "Academic", date: "December 2025", organization: "School Library", description: "Completed 50 books reading challenge", grade: "Completed" },
  { title: "Gymnastics Level 2", category: "Sports", date: "November 2025", organization: "City Gymnastics Club", description: "Passed Level 2 gymnastics certification", grade: "Pass" },
];

const ageGroups = [
  { age: 5, label: "Ages 3-5" },
  { age: 10, label: "Ages 6-10" },
  { age: 14, label: "Ages 11-14" },
  { age: 16, label: "Ages 15-16" },
  { age: 18, label: "Ages 17-18" },
];

export default function CVPreviewPage() {
  const [selectedAge, setSelectedAge] = useState(10);
  const [cvStyle, setCvStyle] = useState<"simple" | "detailed">("detailed");

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    alert("Share functionality coming soon! (Demo mode)");
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-6 h-6" />
              <span className="font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Star className="w-7 h-7 text-legend-gold-500 fill-legend-gold-500" />
              <span className="font-poppins font-bold text-lg text-midnight-800">LittleLegend</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleShare} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Share2 className="w-5 h-5" />
              </button>
              <button onClick={handlePrint} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Printer className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-royal-purple-700 text-white rounded-lg hover:bg-royal-purple-800">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls - Hidden when printing */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 print:hidden">
          <h2 className="font-poppins font-bold text-lg text-midnight-800 mb-4">CV Preview Settings</h2>
          
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((ag) => (
                  <button
                    key={ag.age}
                    onClick={() => setSelectedAge(ag.age)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedAge === ag.age
                        ? "bg-royal-purple-700 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {ag.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CV Style</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCvStyle("simple")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    cvStyle === "simple"
                      ? "bg-royal-purple-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setCvStyle("detailed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    cvStyle === "detailed"
                      ? "bg-royal-purple-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Detailed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CV Document */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 print:p-8 print:shadow-none" id="cv-document">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-royal-purple-700">
            <div className="w-24 h-24 rounded-full bg-legend-gold-100 flex items-center justify-center text-5xl mx-auto mb-4">
              {mockChild.avatar}
            </div>
            <h1 className="font-poppins font-bold text-3xl text-midnight-800 mb-2">
              {mockChild.name}&apos;s Legend
            </h1>
            <p className="text-gray-600 mb-1">
              Age {selectedAge} • {mockChild.school}
            </p>
            <p className="text-gray-500 text-sm">
              {mockChild.location}
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Sports</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Arts</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Academic</span>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-legend-gold-500 fill-legend-gold-500" />
              About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A curious and driven young learner with a passion for {selectedAge >= 10 ? "academics, sports, and the arts" : "learning and exploring new things"}. 
              {mockChild.name} has participated in {mockActivities.length} activities, demonstrating consistent commitment to personal growth and excellence. 
              {selectedAge >= 10 ? "Showing leadership qualities and a competitive spirit." : "Eager to learn and grow every day."}
            </p>
          </div>

          {/* Activities by Category */}
          {cvStyle === "detailed" && (
            <>
              {/* Sports */}
              <div className="mb-8">
                <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-4 flex items-center gap-2">
                  🏊 Sports & Athletics
                </h2>
                <div className="space-y-4">
                  {mockActivities.filter(a => a.category === "Sports").map((activity, i) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-midnight-800">{activity.title}</h3>
                          <p className="text-gray-500 text-sm">{activity.organization} • {activity.date}</p>
                        </div>
                        {activity.grade && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {activity.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arts */}
              <div className="mb-8">
                <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-4 flex items-center gap-2">
                  🎵 Arts & Music
                </h2>
                <div className="space-y-4">
                  {mockActivities.filter(a => a.category === "Arts").map((activity, i) => (
                    <div key={i} className="border-l-4 border-purple-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-midnight-800">{activity.title}</h3>
                          <p className="text-gray-500 text-sm">{activity.organization} • {activity.date}</p>
                        </div>
                        {activity.grade && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {activity.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic */}
              <div className="mb-8">
                <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-4 flex items-center gap-2">
                  📚 Academic Achievements
                </h2>
                <div className="space-y-4">
                  {mockActivities.filter(a => a.category === "Academic").map((activity, i) => (
                    <div key={i} className="border-l-4 border-green-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-midnight-800">{activity.title}</h3>
                          <p className="text-gray-500 text-sm">{activity.organization} • {activity.date}</p>
                        </div>
                        {activity.grade && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {activity.grade}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Simple List View */}
          {cvStyle === "simple" && (
            <div className="mb-8">
              <h2 className="font-poppins font-bold text-xl text-midnight-800 mb-4">
                Activities & Achievements ({mockActivities.length} total)
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {mockActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-lg">
                      {activity.category === "Sports" ? "🏊" : activity.category === "Arts" ? "🎵" : "📚"}
                    </div>
                    <div>
                      <p className="font-medium text-midnight-800 text-sm">{activity.title}</p>
                      <p className="text-gray-500 text-xs">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gradient-to-r from-royal-purple-700 to-royal-purple-800 rounded-xl p-6 text-white">
            <h2 className="font-poppins font-bold text-lg mb-4">Journey Statistics</h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-bold text-3xl">{mockActivities.length}</div>
                <div className="text-purple-200 text-sm">Activities</div>
              </div>
              <div>
                <div className="font-bold text-3xl">{mockActivities.filter(a => a.category === "Sports").length}</div>
                <div className="text-purple-200 text-sm">Sports</div>
              </div>
              <div>
                <div className="font-bold text-3xl">{mockActivities.filter(a => a.category === "Arts").length}</div>
                <div className="text-purple-200 text-sm">Arts</div>
              </div>
              <div>
                <div className="font-bold text-3xl">{mockActivities.filter(a => a.category === "Academic").length}</div>
                <div className="text-purple-200 text-sm">Academic</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Generated by LittleLegend • littlelegend.app</p>
            <p className="mt-1">Building legends, one achievement at a time ✨</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-document, #cv-document * {
            visibility: visible;
          }
          #cv-document {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}
