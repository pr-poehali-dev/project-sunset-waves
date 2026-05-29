import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedBackground } from "@/components/ui/animated-background"
import Icon from "@/components/ui/icon"
import funcUrls from "../../backend/func2url.json"

const UPLOAD_URL = funcUrls["upload-image"]

const categories = ["Электроника", "Одежда", "Красота", "Ремонт", "Обучение", "Другое"]
const types = ["Товары", "Услуги"]

export default function NewListing() {
  const [form, setForm] = useState({
    title: "",
    category: "Электроника",
    type: "Товары",
    price: "",
    location: "",
    description: "",
  })
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })

  const handleFiles = async (files: FileList) => {
    if (images.length + files.length > 5) {
      setError("Максимум 5 фотографий")
      return
    }
    setError("")
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue
      const base64 = await toBase64(file)
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          fileName: file.name,
          contentType: file.type,
        }),
      })
      const data = await res.json()
      if (data.url) urls.push(data.url)
    }
    setImages((prev) => [...prev, ...urls])
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
  }

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.price || !form.location) {
      setError("Заполните обязательные поля: название, цену и город")
      return
    }
    setSubmitted(true)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 relative pt-24 pb-16">
            <AnimatedBackground variant="dots" color="rgba(34, 197, 94, 0.04)" />

            <div className="container px-4 md:px-8 max-w-2xl mx-auto">
              <ScrollReveal>
                <div className="mb-8 text-center space-y-2">
                  <h1 className="text-3xl font-heading font-bold tracking-tighter sm:text-4xl gradient-text">
                    Подать объявление
                  </h1>
                  <p className="text-muted-foreground opacity-70">
                    Расскажите о своём товаре или услуге
                  </p>
                </div>
              </ScrollReveal>

              {submitted ? (
                <ScrollReveal>
                  <Card className="glassmorphic-card border-green-500/30 text-center py-12">
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        <div className="rounded-full bg-green-500/20 p-4">
                          <Icon name="CheckCircle" className="h-12 w-12 text-green-400" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-heading font-bold">Объявление подано!</h2>
                      <p className="text-muted-foreground opacity-70">Ваше объявление отправлено на модерацию и скоро появится в каталоге.</p>
                      <div className="flex gap-3 justify-center pt-2">
                        <Button variant="outline" asChild>
                          <a href="/catalog">Перейти в каталог</a>
                        </Button>
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => { setSubmitted(false); setForm({ title: "", category: "Электроника", type: "Товары", price: "", location: "", description: "" }); setImages([]) }}
                        >
                          Подать ещё
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Фотографии */}
                  <ScrollReveal delay={0.05}>
                    <Card className="glassmorphic-card border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <Icon name="Image" className="h-4 w-4 text-green-400" />
                          Фотографии
                          <span className="text-xs font-normal text-muted-foreground opacity-60">до 5 фото</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Дроп-зона */}
                        <div
                          className="border-2 border-dashed border-white/10 hover:border-green-500/40 rounded-xl p-8 text-center cursor-pointer transition-colors"
                          onDrop={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {uploading ? (
                            <div className="flex flex-col items-center gap-2 text-green-400">
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Icon name="Loader2" className="h-8 w-8" />
                              </motion.div>
                              <span className="text-sm">Загружаю...</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-60">
                              <Icon name="Upload" className="h-8 w-8" />
                              <span className="text-sm">Нажмите или перетащите сюда фото</span>
                              <span className="text-xs">JPG, PNG, WEBP до 10 МБ</span>
                            </div>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => e.target.files && handleFiles(e.target.files)}
                        />

                        {/* Превью загруженных фото */}
                        {images.length > 0 && (
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            {images.map((url, idx) => (
                              <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-white/10">
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                >
                                  <Icon name="X" className="h-5 w-5 text-white" />
                                </button>
                                {idx === 0 && (
                                  <span className="absolute bottom-1 left-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">
                                    Главное
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollReveal>

                  {/* Основная информация */}
                  <ScrollReveal delay={0.1}>
                    <Card className="glassmorphic-card border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <Icon name="FileText" className="h-4 w-4 text-green-400" />
                          Информация
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-sm text-muted-foreground">Название *</label>
                          <Input
                            name="title"
                            placeholder="Например: iPhone 14 Pro, 256GB"
                            value={form.title}
                            onChange={handleChange}
                            className="glassmorphic-card border-white/10 focus:border-green-500/50"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-sm text-muted-foreground">Тип</label>
                            <select
                              name="type"
                              value={form.type}
                              onChange={handleChange}
                              className="w-full h-10 rounded-md border border-white/10 bg-background/60 px-3 text-sm focus:border-green-500/50 focus:outline-none"
                            >
                              {types.map((t) => <option key={t}>{t}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm text-muted-foreground">Категория</label>
                            <select
                              name="category"
                              value={form.category}
                              onChange={handleChange}
                              className="w-full h-10 rounded-md border border-white/10 bg-background/60 px-3 text-sm focus:border-green-500/50 focus:outline-none"
                            >
                              {categories.map((c) => <option key={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm text-muted-foreground">Описание</label>
                          <textarea
                            name="description"
                            placeholder="Расскажите подробнее о товаре или услуге..."
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-md border border-white/10 bg-background/60 px-3 py-2 text-sm focus:border-green-500/50 focus:outline-none resize-none"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>

                  {/* Цена и местоположение */}
                  <ScrollReveal delay={0.15}>
                    <Card className="glassmorphic-card border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <Icon name="MapPin" className="h-4 w-4 text-green-400" />
                          Цена и город
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-sm text-muted-foreground">Цена *</label>
                            <Input
                              name="price"
                              placeholder="Например: 5000 ₽"
                              value={form.price}
                              onChange={handleChange}
                              className="glassmorphic-card border-white/10 focus:border-green-500/50"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm text-muted-foreground">Город *</label>
                            <Input
                              name="location"
                              placeholder="Москва"
                              value={form.location}
                              onChange={handleChange}
                              className="glassmorphic-card border-white/10 focus:border-green-500/50"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>

                  {error && (
                    <p className="text-sm text-red-400 text-center">{error}</p>
                  )}

                  <ScrollReveal delay={0.2}>
                    <Button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-base font-semibold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                    >
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Опубликовать объявление
                    </Button>
                  </ScrollReveal>
                </form>
              )}
            </div>
          </main>
        </PageTransition>
        <SiteFooter />
      </div>
    </ThemeProvider>
  )
}
