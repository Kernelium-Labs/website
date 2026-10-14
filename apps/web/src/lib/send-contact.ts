import { createServerFn } from "@tanstack/react-start"

// FormSubmit form id for louis-etienne.messier@kernelium.ca.
// The inbox address stays off the request so it is not exposed to visitors.
const FORMSUBMIT_FORM_ID = "5024b99dba1da74c4e0e2e0e18205b38"

type ContactInput = {
  name: string
  email: string
  message: string
  // Honeypot. Real visitors leave this empty.
  company: string
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((input: ContactInput) => {
    if (input.company.trim()) {
      return { name: "", email: "", message: "", spam: true as const }
    }

    const name = input.name.trim()
    const email = input.email.trim()
    const message = input.message.trim()

    if (!name || !email || !message) {
      throw new Error("Missing fields")
    }
    if (name.length > 200 || email.length > 320 || message.length > 5000) {
      throw new Error("Message is too long")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email")
    }

    return { name, email, message, spam: false as const }
  })
  .handler(async ({ data }) => {
    if (data.spam) return { ok: true as const }

    const response = await fetch(
      `https://formsubmit.co/ajax/${FORMSUBMIT_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // FormSubmit rejects requests that look like they came from a local file.
          Origin: "https://kernelium.ca",
          Referer: "https://kernelium.ca/",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `Kernelium – ${data.name}`,
          _replyto: data.email,
          _template: "box",
          _captcha: "false",
        }),
      }
    )

    if (!response.ok) {
      return { ok: false as const, reason: "failed" as const }
    }

    const payload = (await response.json()) as {
      success?: string | boolean
      message?: string
    }
    if (payload.success === true || payload.success === "true") {
      return { ok: true as const }
    }

    const needsActivation = (payload.message ?? "")
      .toLowerCase()
      .includes("activation")
    return {
      ok: false as const,
      reason: needsActivation ? ("activation" as const) : ("failed" as const),
    }
  })
