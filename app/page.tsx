import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Users, Briefcase, Heart, Sparkles, Crown, Trophy } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-slate-700 font-sans tracking-tight overflow-x-hidden">

      {/* Background Sophistication - Subtle Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-slate-200/50 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-amber-50/50 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl">
            <ShieldCheck className="text-amber-400 w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 uppercase">
            Admin<span className="text-amber-600">Grace</span>
          </span>
        </div>

        <div className="flex gap-8 items-center">
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Solution</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4 border-l pl-8 border-slate-200">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-slate-600 font-bold hover:bg-transparent hover:text-slate-900">
                Sign In
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-none px-8 h-11 transition-all font-bold tracking-wide">
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-y border-slate-200 text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">
              Premium Enterprise Solution
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-light leading-tight text-slate-900 tracking-tight">
              Elevate Your <span className="italic font-normal border-b-4 border-amber-200">Business</span> Control.
            </h1>

            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
              Kelola infrastruktur operasional Anda dengan presisi tinggi. Keamanan tingkat korporat dipadukan dengan desain minimalis untuk efisiensi tanpa batas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
              <Link href="/admin/dashboard">
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-12 h-14 rounded-none text-sm tracking-[0.2em] transition-all font-bold shadow-2xl">
                  ENTER DASHBOARD
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-10 h-14 rounded-none text-sm tracking-[0.2em] border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold transition-all">
                VIEW SHOWCASE
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section - Modern Minimalist Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-100">

            {/* Feature 1 */}
            <div className="p-16 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group">
              <Crown className="w-10 h-10 text-amber-600 mb-10 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-sm font-black text-slate-900 mb-4 tracking-[0.2em] uppercase">Executive Rights</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">Sistem otorisasi tingkat tinggi untuk mengelola hierarki admin dengan kontrol penuh dan audit log transparan.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-16 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group">
              <Trophy className="w-10 h-10 text-amber-600 mb-10 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-sm font-black text-slate-900 mb-4 tracking-[0.2em] uppercase">Clarity Data</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">Visualisasi database pelanggan yang tajam. Fokus pada metrik yang benar-benar bermakna bagi pertumbuhan bisnis.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-16 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group">
              <Briefcase className="w-10 h-10 text-amber-600 mb-10 opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-sm font-black text-slate-900 mb-4 tracking-[0.2em] uppercase">Unified Service</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">Integrasi katalog layanan secara dinamis. Memungkinkan penyesuaian strategi harga dalam satu dashboard tunggal.</p>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50 grayscale">
            <ShieldCheck className="text-slate-900 w-5 h-5" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-slate-900">AdminCore</span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            © 2026 Crafted for Professional Excellence
          </p>
          <div className="flex gap-6">
            <Heart className="w-4 h-4 text-slate-200" />
          </div>
        </div>
      </footer>
    </div>
  )
}