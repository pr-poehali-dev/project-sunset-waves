import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"

export function FaqSection() {
  const faqs = [
    {
      question: "Как разместить объявление?",
      answer:
        "Зарегистрируйтесь, нажмите «Разместить объявление», заполните описание товара или услуги, добавьте фото и укажите цену. Объявление появится в каталоге в течение нескольких минут.",
    },
    {
      question: "Безопасно ли совершать покупки на платформе?",
      answer:
        "Да. Мы верифицируем продавцов, защищаем платежи и гарантируем возврат средств, если товар не соответствует описанию. Все сделки проходят через защищённую систему.",
    },
    {
      question: "Какую комиссию берёт платформа?",
      answer:
        "На базовом тарифе — 0% комиссии. На платных тарифах комиссия снижена и компенсируется повышенной видимостью ваших объявлений.",
    },
    {
      question: "Можно ли продавать услуги, а не только товары?",
      answer:
        "Конечно! Платформа поддерживает как физические товары, так и услуги: репетиторство, ремонт, дизайн, красота и здоровье, юридическая помощь и многое другое.",
    },
    {
      question: "Как связаться с продавцом?",
      answer:
        "В карточке каждого объявления есть кнопка «Написать» — вы сможете задать вопросы напрямую через встроенный мессенджер без передачи личных контактов.",
    },
  ]

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl">
                Частые вопросы
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 opacity-70">
                Всё, что нужно знать перед началом работы с платформой.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl py-12">
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glassmorphic-accordion-item">
                  <AccordionTrigger className="text-left font-medium tracking-tight">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground opacity-70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}