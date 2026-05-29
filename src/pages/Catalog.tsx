import { useState } from "react"
import { motion } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageTransition } from "@/components/page-transition"
import { MouseGlow } from "@/components/ui-library/effects/mouse-glow"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedBackground } from "@/components/ui/animated-background"
import Icon from "@/components/ui/icon"

const categories = ["Все", "Товары", "Услуги", "Электроника", "Одежда", "Красота", "Ремонт", "Обучение"]

const listings = [
  { id: 1, title: "iPhone 14 Pro, 256GB", category: "Электроника", type: "Товары", price: "79 900 ₽", location: "Москва", rating: 4.9, reviews: 12, badge: "Хит" },
  { id: 2, title: "Маникюр с покрытием гель-лак", category: "Красота", type: "Услуги", price: "от 2 500 ₽", location: "Санкт-Петербург", rating: 5.0, reviews: 34, badge: "Топ" },
  { id: 3, title: "Ноутбук MacBook Air M2", category: "Электроника", type: "Товары", price: "109 000 ₽", location: "Казань", rating: 4.8, reviews: 8, badge: null },
  { id: 4, title: "Ремонт квартир под ключ", category: "Ремонт", type: "Услуги", price: "от 3 500 ₽/м²", location: "Москва", rating: 4.7, reviews: 56, badge: null },
  { id: 5, title: "Кроссовки Nike Air Max 270", category: "Одежда", type: "Товары", price: "8 900 ₽", location: "Новосибирск", rating: 4.6, reviews: 5, badge: null },
  { id: 6, title: "Репетитор по английскому", category: "Обучение", type: "Услуги", price: "1 200 ₽/час", location: "Онлайн", rating: 4.9, reviews: 89, badge: "Топ" },
  { id: 7, title: "Беспроводные наушники Sony WH-1000XM5", category: "Электроника", type: "Товары", price: "29 500 ₽", location: "Екатеринбург", rating: 4.8, reviews: 21, badge: null },
  { id: 8, title: "Стрижка и укладка волос", category: "Красота", type: "Услуги", price: "от 1 800 ₽", location: "Москва", rating: 4.7, reviews: 47, badge: null },
  { id: 9, title: "Планшет Samsung Galaxy Tab S9", category: "Электроника", type: "Товары", price: "54 990 ₽", location: "Краснодар", rating: 4.5, reviews: 14, badge: null },
  { id: 10, title: "Юридическая консультация", category: "Услуги", type: "Услуги", price: "от 3 000 ₽", location: "Онлайн", rating: 4.9, reviews: 63, badge: "Хит" },
  { id: 11, title: "Зимняя куртка Columbia", category: "Одежда", type: "Товары", price: "15 900 ₽", location: "Уфа", rating: 4.4, reviews: 7, badge: null },
  { id: 12, title: "Настройка и ремонт ПК", category: "Ремонт", type: "Услуги", price: "от 500 ₽", location: "Москва", rating: 4.8, reviews: 102, badge: null },
]

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все")
  const [search, setSearch] = useState("")

  const filtered = listings.filter((item) => {
    const matchCategory = activeCategory === "Все" || item.category === activeCategory || item.type === activeCategory
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 relative pt-24 pb-16">
            <MouseGlow color="rgba(34, 197, 94, 0.10)" size={500} blur={140} opacity={0.5} followSpeed={0.05} pulseEffect pulseSpeed={4} pulseScale={1.04} />
            <AnimatedBackground variant="dots" color="rgba(34, 197, 94, 0.04)" />

            <div className="container px-4 md:px-8">
              {/* Заголовок */}
              <ScrollReveal>
                <div className="mb-10 text-center space-y-3">
                  <h1 className="text-4xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text">
                    Каталог
                  </h1>
                  <p className="text-muted-foreground md:text-lg opacity-70 max-w-xl mx-auto">
                    Тысячи товаров и услуг от проверенных продавцов
                  </p>
                </div>
              </ScrollReveal>

              {/* Поиск */}
              <ScrollReveal delay={0.1}>
                <div className="relative max-w-xl mx-auto mb-8">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Поиск товаров и услуг..."
                    className="pl-10 glassmorphic-card border-green-500/20 focus:border-green-500/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </ScrollReveal>

              {/* Категории */}
              <ScrollReveal delay={0.15}>
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                        activeCategory === cat
                          ? "bg-green-500 text-white border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                          : "bg-background/40 text-muted-foreground border-white/10 hover:border-green-500/40 hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Сетка карточек */}
              {filtered.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground opacity-60">
                  Ничего не найдено. Попробуйте другой запрос.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.map((item, index) => (
                    <ScrollReveal key={item.id} delay={index * 0.05}>
                      <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Card className="h-full flex flex-col glassmorphic-card border-white/10 hover:border-green-500/30 transition-colors group cursor-pointer">
                          {/* Превью */}
                          <div className="relative h-40 rounded-t-xl bg-gradient-to-br from-green-950/40 to-emerald-950/40 flex items-center justify-center overflow-hidden">
                            <Icon
                              name={item.type === "Услуги" ? "Briefcase" : "ShoppingBag"}
                              className="h-14 w-14 text-green-500/30 group-hover:text-green-500/50 transition-colors"
                            />
                            {item.badge && (
                              <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <Badge variant="outline" className="absolute top-2 left-2 text-xs border-white/20 text-muted-foreground bg-background/50">
                              {item.type}
                            </Badge>
                          </div>

                          <CardHeader className="pb-2 pt-4">
                            <CardTitle className="text-base font-semibold leading-tight tracking-tight group-hover:text-green-400 transition-colors line-clamp-2">
                              {item.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex-1 pb-2 space-y-1.5">
                            <div className="text-xl font-bold text-green-400">{item.price}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-70">
                              <Icon name="MapPin" className="h-3 w-3" />
                              {item.location}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-70">
                              <Icon name="Star" className="h-3 w-3 text-yellow-400" />
                              <span className="text-foreground font-medium">{item.rating}</span>
                              <span>· {item.reviews} отзывов</span>
                            </div>
                          </CardContent>

                          <CardFooter className="pt-2">
                            <Button className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 hover:border-green-500/50 transition-all text-sm">
                              Подробнее
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          </main>
        </PageTransition>
        <SiteFooter />
      </div>
    </ThemeProvider>
  )
}
