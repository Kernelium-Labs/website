import { Separator } from "@workspace/ui/components/separator"

import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer>
      <Separator />
      <p className="px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kernelium. {t.footer.rights}
      </p>
    </footer>
  )
}
