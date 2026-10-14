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
import { Check, CircleAlert, CircleCheck, Send } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { sendContactMessage } from "@/lib/send-contact"

export function scrollToContact(event: React.MouseEvent) {
  event.preventDefault()
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

export function ContactForm() {
  const { t } = useI18n()
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "sent" | "error" | "activation"
  >("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending")

    try {
      const result = await sendContactMessage({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          company: String(data.get("company") ?? ""),
        },
      })
      if (!result.ok) {
        setStatus(result.reason === "activation" ? "activation" : "error")
        return
      }
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
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
          <form
            onSubmit={handleSubmit}
            onChange={() => status === "sent" && setStatus("idle")}
          >
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t.contact.name}</FieldLabel>
                <Input id="name" name="name" required autoComplete="name" />
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

              {status === "sent" && (
                <Alert>
                  <CircleCheck />
                  <AlertTitle>{t.contact.successTitle}</AlertTitle>
                  <AlertDescription>
                    {t.contact.successDescription}
                  </AlertDescription>
                </Alert>
              )}

              {(status === "error" || status === "activation") && (
                <Alert variant="destructive">
                  <CircleAlert />
                  <AlertTitle>{t.contact.errorTitle}</AlertTitle>
                  <AlertDescription>
                    {status === "activation"
                      ? t.contact.activationDescription
                      : t.contact.errorDescription}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sent" ? (
                  <>
                    <Check data-icon="inline-start" />
                    {t.contact.successTitle}
                  </>
                ) : (
                  <>
                    <Send data-icon="inline-start" />
                    {status === "sending" ? t.contact.sending : t.contact.submit}
                  </>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
