import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { motion } from "framer-motion"

export function PricingSection() {
  const plans = [
    {
      name: "Базовый",
      description: "Для частных лиц и начинающих продавцов.",
      price: "Бесплатно",
      duration: "навсегда",
      features: [
        "До 5 активных объявлений",
        "Базовый каталог товаров",
        "Личный кабинет продавца",
        "Отзывы и рейтинг",
        "Поддержка по email",
      ],
      cta: "Начать бесплатно",
      popular: false,
    },
    {
      name: "Продавец",
      description: "Для активных продавцов и малого бизнеса.",
      price: "1 490 ₽",
      duration: "в месяц",
      features: [
        "До 100 активных объявлений",
        "Продвижение в каталоге",
        "Аналитика просмотров",
        "Быстрые ответы покупателям",
        "Приоритетная поддержка",
        "Своя витрина магазина",
        "Выгрузка прайс-листа",
      ],
      cta: "Выбрать план",
      popular: true,
    },
    {
      name: "Бизнес",
      description: "Для интернет-магазинов и крупных поставщиков.",
      price: "4 990 ₽",
      duration: "в месяц",
      features: [
        "Безлимитные объявления",
        "Топ-размещение в поиске",
        "Расширенная аналитика",
        "API-интеграция",
        "Персональный менеджер",
        "Брендированная витрина",
        "Массовая загрузка товаров",
        "Реклама в рассылках",
        "Приоритетная верификация",
      ],
      cta: "Связаться с нами",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">
                Тарифы для продавцов
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Начните бесплатно и масштабируйтесь по мере роста вашего бизнеса.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className={`h-full flex flex-col glassmorphic-card ${plan.popular ? "border-glow-red" : ""}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                    Хит
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="tracking-tight">{plan.name}</CardTitle>
                  <CardDescription className="opacity-70">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 opacity-70">{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.popular ? (
                    <AnimatedGradientBorder
                      colors={["#22c55e", "#10b981", "#22c55e", "#10b981"]}
                      borderWidth={1}
                      duration={8}
                    >
                      <Button className="w-full bg-background border-0 text-foreground hover:text-white">
                        {plan.cta}
                      </Button>
                    </AnimatedGradientBorder>
                  ) : (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full neumorphic-button">{plan.cta}</Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}