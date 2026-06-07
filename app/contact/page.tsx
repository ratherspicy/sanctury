import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ContactForm } from "./contact-form";

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface">
      <SiteHeader minimal />

      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-lg px-6 py-10 lg:px-8 lg:py-14">
          <p className="badge-violet">Get in touch</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Whether you&apos;re a professional wanting to reach homeowners, or just
            want to know more about Sanctury — we&apos;d love to hear from you.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
