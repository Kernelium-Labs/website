import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Button } from "@workspace/ui/components/button"
import { ArrowDown } from "lucide-react"

import logoRotate from "@assets/logo_rotate.lottie?url"
import { scrollToContact } from "@/components/contact-form"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  return (
    <section
      id="top"
      className="mx-auto grid min-h-[70svh] max-w-5xl content-center items-center gap-3 px-4 py-16 md:min-h-[calc(100svh-3.5rem)] md:grid-cols-2 md:gap-8"
    >
      <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          {t.hero.title}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
          {t.hero.description}
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<a href="#contact" />}
          onClick={scrollToContact}
        >
          {t.hero.cta}
          <ArrowDown data-icon="inline-end" />
        </Button>
      </div>

      <div className="order-first mx-auto aspect-square w-full max-w-32 sm:max-w-40 md:order-none md:max-w-56">
        {/* The animation's strokes are white, so invert it on light backgrounds. */}
        <DotLottieReact
          src={logoRotate}
          loop
          autoplay
          className="size-full leading-[0] invert dark:invert-0"
        />
      </div>
    </section>
  )
}
