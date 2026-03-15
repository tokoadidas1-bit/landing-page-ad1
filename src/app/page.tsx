'use client'

import { useState, useEffect } from 'react'
import { 
  Sparkles, 
  Wallet, 
  Users, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  House, 
  Smartphone, 
  MessageCircle, 
  Star,
  Quote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel'

// Testimonial data with AI-generated photos
const testimonials = [
  {
    id: 1,
    name: "Rina Permata",
    profession: "Freelance Graphic Designer",
    location: "Jakarta",
    photo: "/testimonials/rina.png",
    rating: 5,
    text: "Saya sudah 3 bulan bergabung dan penghasilan saya stabil! Kerjanya fleksibel, bisa dikerjakan sambil ngerjain project design lain. Sangat recommended buat freelancer yang mau cari penghasilan tambahan!"
  },
  {
    id: 2,
    name: "Budi Santoso",
    profession: "Mahasiswa Teknik Informatika",
    location: "Bandung",
    photo: "/testimonials/budi.png",
    rating: 5,
    text: "Sebagai mahasiswa, ini sangat membantu buat biaya kuliah dan jajan. Tugasnya gampang, bisa dikerjakan di sela-sela kosong. Terima kasih sudah memberi kesempatan!"
  },
  {
    id: 3,
    name: "Dewi Anggraini",
    profession: "Freelance Content Writer",
    location: "Yogyakarta",
    photo: "/testimonials/dewi.png",
    rating: 5,
    text: "Awalnya ragu, tapi setelah coba ternyata beneran dibayar! Sudah 6 bulan lebih join dan penghasilan konsisten. Cocok banget buat yang kerja serabutan seperti saya. Tim support juga responsif!"
  },
  {
    id: 4,
    name: "Ahmad Fauzan",
    profession: "Mahasiswa Sistem Informasi",
    location: "Surabaya",
    photo: "/testimonials/ahmad.png",
    rating: 5,
    text: "Gimana cara kerjanya? Gampang banget! Tinggal ikuti instruksinya dan selesai. Saya kerja 2-3 jam sehari, hasilnya lumayan banget buat tabungan. Buktinya udah withdraw berkali-kali!"
  },
  {
    id: 5,
    name: "Siti Rahayu",
    profession: "Freelance Social Media Manager",
    location: "Semarang",
    photo: "/testimonials/siti.png",
    rating: 5,
    text: "Saya ibu rumah tangga yang kerja freelance. Platform ini membantu saya dapat penghasilan tambahan tanpa meninggalkan rumah. Anak-anak juga tetap bisa diawasi. Terpercaya!"
  },
  {
    id: 6,
    name: "Rizky Pratama",
    profession: "Freelance Video Editor",
    location: "Makassar",
    photo: "/testimonials/rizky.png",
    rating: 5,
    text: "Sudah join dari tahun lalu, sampai sekarang masih aktif. Pembayaran selalu tepat waktu, ga pernah telat. Platform yang paling legit dibanding yang pernah saya coba. Wajib dicoba!"
  },
  {
    id: 7,
    name: "Anisa Putri",
    profession: "Mahasiswa Akuntansi",
    location: "Medan",
    photo: "/testimonials/anisa.png",
    rating: 5,
    text: "Buat teman-teman mahasiswa yang butuh dana tambahan, ini tempat yang tepat! Saya kerja pas weekend aja, tapi penghasilannya sudah cukup buat kebutuhan sehari-hari. Proses withdraw juga cepat!"
  },
  {
    id: 8,
    name: "Hendra Wijaya",
    profession: "Freelance Web Developer",
    location: "Palembang",
    photo: "/testimonials/hendra.png",
    rating: 5,
    text: "Sebagai developer, saya appreciate banget sistem yang smooth dan profesional. Penghasilan tambahan ini sangat membantu pas lagi low project. Recommended buat semua freelancer!"
  }
]

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

// Testimonial card component with AI-generated photo
function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Quote icon */}
        <div className="mb-4">
          <Quote className="w-8 h-8 text-teal-500/30" />
        </div>
        
        {/* Rating */}
        <StarRating rating={testimonial.rating} />
        
        {/* Testimonial text */}
        <p className="text-gray-700 text-sm leading-relaxed my-4 flex-grow">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        
        {/* User info with real photo */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <Avatar className="w-14 h-14 border-2 border-teal-500/20 shadow-md">
            <AvatarImage 
              src={testimonial.photo} 
              alt={testimonial.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-semibold text-sm">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
            <p className="text-xs text-gray-500">{testimonial.profession}</p>
            <p className="text-xs text-teal-600">{testimonial.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return

    const intervalId = setInterval(() => {
      api.scrollNext()
    }, 4000)

    return () => clearInterval(intervalId)
  }, [api])

  // Track current slide
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Halo, saya ingin mendaftar kerja online.%0ANama: ${formData.name}%0ANo. WhatsApp: ${formData.phone}`
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Top banner */}
        <div className="pt-6 pb-4 px-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>Kesempatan Terbatas - Daftar Sekarang!</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-4 py-8">
          <div className="max-w-lg mx-auto">
            {/* Hero Image - AI Generated */}
            <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
              <div className="aspect-[4/5] relative">
                {/* Main hero image */}
                <img 
                  src="/hero-image.png" 
                  alt="Wanita bahagia bekerja dari rumah dengan laptop"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Top text overlay */}
                <div className="absolute top-6 left-4 right-4 text-center">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">Kerja dari Rumah</h2>
                  <p className="text-white/90 text-sm drop-shadow-md">Penghasilan Menarik Setiap Hari</p>
                </div>
                
                {/* Bottom income card */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Penghasilan Harian</p>
                        <p className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Rp500.000 - Rp2.000.000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Kerja dari Rumah <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Hasilkan Penghasilan</span> Luar Biasa!
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Kami membuka kesempatan untuk Anda yang ingin bekerja online sebagai asisten virtual di seluruh Indonesia. Cocok untuk usia 25+ tahun termasuk ibu rumah tangga!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-gray-100">
                <Users className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">15.000+</p>
                <p className="text-xs text-gray-500">Member Aktif</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-gray-100">
                <TrendingUp className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">98%</p>
                <p className="text-xs text-gray-500">Tingkat Kepuasan</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-gray-100">
                <Clock className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">24/7</p>
                <p className="text-xs text-gray-500">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-4 py-8 bg-gradient-to-b from-transparent to-teal-50/50">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Mengapa Memilih Kami?</h2>
            <div className="space-y-4">
              {[
                { icon: ShieldCheck, title: "Terpercaya & Aman", desc: "Sudah terdaftar resmi dengan sistem yang teraudit", color: "from-teal-500 to-cyan-500" },
                { icon: House, title: "Kerja Dari Rumah", desc: "Tidak perlu keluar rumah, bisa dikerjakan dari mana saja", color: "from-orange-500 to-amber-500" },
                { icon: Wallet, title: "Penghasilan Tinggi", desc: "Potensi penghasilan hingga Rp2.000.000/hari + bonus", color: "from-green-500 to-emerald-500" },
                { icon: Smartphone, title: "Tugas Sederhana", desc: "Tidak perlu pengalaman khusus, mudah dikerjakan", color: "from-purple-500 to-violet-500" }
              ].map((item, i) => (
                <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section with AI Photos */}
        <section className="px-4 py-12 bg-gradient-to-b from-teal-50/50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Apa Kata Mereka?</h2>
              <p className="text-gray-600">Testimoni dari member yang sudah merasakan hasilnya</p>
            </div>

            {/* Testimonial Carousel */}
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 bg-white/90 hover:bg-white border-teal-200 text-teal-600" />
              <CarouselNext className="hidden md:flex -right-4 bg-white/90 hover:bg-white border-teal-200 text-teal-600" />
            </Carousel>

            {/* Slide indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === i ? 'bg-teal-500 w-4' : 'bg-teal-200'
                  }`} 
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Geser untuk lihat testimoni lainnya</p>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="px-4 py-8 pb-32">
          <div className="max-w-lg mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-teal-50/30 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-4 text-white text-center">
                <h2 className="text-xl font-bold">Daftar Sekarang!</h2>
                <p className="text-teal-100 text-sm">Isi data di bawah untuk bergabung</p>
              </div>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="08xxxxxxxxxx"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Gabung via WhatsApp
                  </Button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    Dengan mendaftar, Anda menyetujui untuk dihubungi via WhatsApp
                  </p>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-center items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm">100% Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Terpercaya</span>
              </div>
            </div>
          </div>
        </section>

        {/* Fixed bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 shadow-2xl z-50">
          <div className="max-w-lg mx-auto">
            <Button 
              className="w-full h-14 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg text-lg"
              onClick={() => {
                const message = "Halo, saya ingin mendaftar kerja online!"
                window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
              }}
            >
              Daftar Sekarang - GRATIS!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
