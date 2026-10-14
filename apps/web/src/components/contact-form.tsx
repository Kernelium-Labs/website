import * as React from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { MailCheck, Send } from "lucide-react"

import { CONTACT_EMAIL, useI18n } from "@/lib/i18n"

export function scrollToContact(event: React.MouseEvent) {
  event.preventDefault()
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

export function ContactForm() {
  const { t } = useI18n()
  const [sent, setSent] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const message = String(data.get("message") ?? "")

    const subject = `Kernelium – ${name}`
    const body = `${message}\n\n—\n${name}\n${email}`

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-xl scroll-mt-20 px-4 pt-8 pb-16"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t.contact.title}</CardTitle>
          <CardDescription>{t.contact.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t.contact.name}</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{t.contact.email}</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">{t.contact.message}</FieldLabel>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                />
              </Field>

              {sent && (
                <Alert>
                  <MailCheck />
                  <AlertTitle>{t.contact.successTitle}</AlertTitle>
                  <AlertDescription>
                    {t.contact.successDescription}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" size="lg" className="w-full">
                <Send data-icon="inline-start" />
                {t.contact.submit}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
