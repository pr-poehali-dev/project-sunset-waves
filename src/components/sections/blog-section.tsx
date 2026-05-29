import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight } from "lucide-react"

export function BlogSection() {
  const blogPosts = [
    {
      title: "Как продать товар быстро: 7 советов",
      description: "Разбираем, как правильно оформить объявление, чтобы получить первых покупателей уже в день публикации.",
      date: "20 мая 2026",
      readTime: "5 мин",
    },
    {
      title: "Услуги, которые ищут чаще всего",
      description: "Топ-10 категорий услуг с наибольшим спросом на платформе — узнайте, что покупают прямо сейчас.",
      date: "12 мая 2026",
      readTime: "4 мин",
    },
    {
      title: "Как защитить себя при покупке онлайн",
      description: "Практические советы по безопасным сделкам: на что обращать внимание и как избежать мошенников.",
      date: "5 мая 2026",
      readTime: "6 мин",
    },
  ]

  return (
    <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">Полезные статьи</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Советы для покупателей и продавцов, обзоры трендов и новости платформы.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full glassmorphic-card">
                <CardHeader>
                  <CardTitle className="tracking-tight">{post.title}</CardTitle>
                  <CardDescription className="opacity-70">
                    {post.date} - {post.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground opacity-70">{post.description}</p>
                </CardContent>
                <CardFooter>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm text-primary hover:underline transition-colors"
                  >
                    Читать далее
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}