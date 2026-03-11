import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Users, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      {/* Header / Navbar */}
      <header className="px-6 h-20 flex items-center border-b justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">AdminPanel.</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/sign-in">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/admin/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
              Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight text-slate-900">
              Kelola Bisnis Anda <br />
              <span className="text-blue-600">Lebih Efisien.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Sistem manajemen terintegrasi untuk mengelola Admin, Pelanggan, dan Layanan dalam satu platform yang cepat dan aman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/admin/dashboard">
                <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-8 h-14 rounded-2xl text-lg">
                  Mulai Sekarang
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 h-14 rounded-2xl text-lg">
                Pelajari Fitur
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <ShieldCheck />
              </div>
              <h3 className="text-xl font-bold">Manajemen Admin</h3>
              <p className="text-slate-500">Kelola akses pengelola sistem dengan keamanan tingkat tinggi dan fitur reset password.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                <Users />
              </div>
              <h3 className="text-xl font-bold">Database Pelanggan</h3>
              <p className="text-slate-500">Pencarian data cepat dengan fitur pagination untuk ribuan data pelanggan secara realtime.</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                <Zap />
              </div>
              <h3 className="text-xl font-bold">Layanan Fleksibel</h3>
              <p className="text-slate-500">Atur harga, min-max penggunaan, dan detail layanan jasa Anda dengan mudah.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t text-center text-slate-400 text-sm">
        <p>© 2026 AdminPanel Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}