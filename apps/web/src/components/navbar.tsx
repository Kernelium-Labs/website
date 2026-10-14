import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

import logo from "@assets/logo_medium.svg?url"
import { scrollToContact } from "@/components/contact-form"
import { useI18n, type Locale } from "@/lib/i18n"

export function Navbar() {
  const { locale, setLocale, t } = useI18n()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          {/* The SVG has a white stroke, so it's used as a mask to follow the theme's text color. */}
          <span
            aria-hidden
            className="size-7 bg-foreground"
            style={{
              mask: `url("${logo}") center / contain no-repeat`,
              WebkitMask: `url("${logo}") center / contain no-repeat`,
            }}
          />
          Kernelium
        </a>

        <div className="flex items-center gap-3">
          <ToggleGroup
            variant="outline"
            size="sm"
            spacing={0}
            aria-label={t.nav.language}
            value={[locale]}
            onValueChange={(value) => {
              // Keep one language always selected.
              const next = value[0] as Locale | undefined
              if (next) setLocale(next)
            }}
          >
            <ToggleGroupItem value="en" aria-label="English">
              EN
            </ToggleGroupItem>
            <ToggleGroupItem value="fr" aria-label="Français">
              FR
            </ToggleGroupItem>
          </ToggleGroup>

          <Separator orientation="vertical" className="h-5" />

          <Button
            nativeButton={false}
            render={<a href="#contact" />}
            onClick={scrollToContact}
          >
            {t.nav.reachOut}
          </Button>
        </div>
      </nav>
    </header>
  )
}
