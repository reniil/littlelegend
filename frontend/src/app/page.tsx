import { Star, Heart, Award, TrendingUp, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 text-legend-gold-500 fill-legend-gold-500" />
              <span className="font-poppins font-bold text-xl text-midnight-800">
                LittleLegend
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-royal-purple-700 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-royal-purple-700 font-medium">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-royal-purple-700 font-medium">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="/login" className="text-royal-purple-700 font-semibold hover:text-royal-purple-800">
                Log in
              </a>
              <a
                href="/signup"
                className="bg-royal-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-royal-purple-800 transition-colors"
              >
                Start Free
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-legend-gold-100 text-legend-gold-700 px-4 py-2 rounded-full text-sm font-semibold">
                <Star className="w-4 h-4 fill-legend-gold-500" />
                Where every legend begins
              </div>
              <h1 className="font-poppins font-extrabold text-5xl lg:text-6xl text-midnight-800 leading-tight">
                Capture Every Step of Your Child&apos;s{" "}
                <span className="text-royal-purple-700">Journey</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                From first steps to first job — build their story from day one. 
                Transform childhood achievements into lifetime credentials.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/signup"
                  className="bg-royal-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-royal-purple-800 transition-all hover:scale-105 flex items-center gap-2"
                >
                  Start Free
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a
                  href="#demo"
                  className="border-2 border-royal-purple-700 text-royal-purple-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-royal-purple-50 transition-colors"
                >
                  See Demo
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-purple-400 to-royal-purple-600 border-2 border-white"
                    />
                  ))}
                </div>
                <span>Join 10,000+ families</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-royal-purple-200 to-legend-gold-200 rounded-3xl blur-2xl opacity-50" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-legend-gold-100 flex items-center justify-center">
                      <span className="text-2xl">👧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-midnight-800">Emma&apos;s Legend</h3>
                          <p className="text-sm text-gray-500">Age 8 • 47 activities</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: "🏊", label: "Swimming", count: "Level 8" },
                      { icon: "🎹", label: "Piano", count: "Grade 5" },
                      { icon: "🏆", label: "Awards", count: "12" },
                    ].map((item, i) => (
                      <div key={i} className="bg-cream-50 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                        <div className="font-semibold text-midnight-800">{item.count}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-royal-purple-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-royal-purple-700" />
                      <span className="font-semibold text-royal-purple-800">Latest Achievement</span>
                    </div>
                    <p className="text-sm text-gray-600">Science Fair Winner - 1st Place! 🎉</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-midnight-800 mb-4">
              Everything You Need to Build Their Story
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple tools to capture every milestone, big or small
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Track Every Milestone",
                description: "From first steps to graduation, capture it all in one beautiful timeline.",
                color: "text-rose-500",
                bg: "bg-rose-50",
              },
              {
                icon: Award,
                title: "Save Memories Forever",
                description: "Photos, certificates, videos — all safely stored and organized.",
                color: "text-royal-purple-700",
                bg: "bg-royal-purple-50",
              },
              {
                icon: TrendingUp,
                title: "Build Their Future CV",
                description: "Automatically transform childhood achievements into professional credentials.",
                color: "text-legend-gold-600",
                bg: "bg-legend-gold-50",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-cream-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="font-poppins font-bold text-xl text-midnight-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-royal-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-4xl text-white mb-6">
            Start Your Child&apos;s Legend Today
          </h2>
          <p className="text-xl text-royal-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of parents building their child&apos;s future. 
            Free forever plan available.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-royal-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-legend-gold-50 transition-colors"
          >
            Create Free Account
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-6 h-6 text-legend-gold-500 fill-legend-gold-500" />
            <span className="font-poppins font-bold text-lg">LittleLegend</span>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">For Schools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400">hello@littlelegend.app</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 LittleLegend. Where every legend begins.
          </div>
        </div>
      </footer>
    </div>
  );
}
