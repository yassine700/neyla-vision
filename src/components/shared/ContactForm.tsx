import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ACCESS_KEY = "6af5d050-0055-4dec-b4a7-16b22ad9c541";
const ENDPOINT = "https://api.web3forms.com/submit";

type Fields = { name: string; email: string; phone: string; service: string; message: string };

const empty: Fields = { name: "", email: "", phone: "", service: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheck) return;

    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Adresse e-mail invalide.";
    if (values.phone.trim().length < 6) next.phone = "Merci d'indiquer un numéro joignable.";
    if (values.service.trim().length < 2) next.service = "Merci de préciser le sujet.";
    if (values.message.trim().length < 10) next.message = "Décrivez votre projet en quelques mots.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "🎯 Nouvelle demande de devis — Neyla Production",
          from_name: "Neyla Production Web",
          botcheck: false,
          name: values.name.trim().slice(0, 255),
          email: values.email.trim().slice(0, 255),
          phone: values.phone.trim().slice(0, 255),
          service: values.service.trim().slice(0, 255),
          message: values.message.trim().slice(0, 2000),
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || data.success !== true) throw new Error("send_failed");
      toast.success("Message envoyé", {
        description: "Notre équipe vous recontacte sous 24h ouvrées.",
      });
      setValues(empty);
    } catch {
      toast.error("Échec de l'envoi", {
        description: "Réessayez dans un instant ou appelez-nous directement.",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-eyebrow">
            Nom complet *
          </label>
          <input
            id="name"
            name="name"
            maxLength={255}
            value={values.name}
            onChange={set("name")}
            className={`${inputClass} mt-2`}
          />
          {errors.name ? <p className="mt-1 text-xs text-primary">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className="label-eyebrow">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={255}
            value={values.email}
            onChange={set("email")}
            className={`${inputClass} mt-2`}
          />
          {errors.email ? <p className="mt-1 text-xs text-primary">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className="label-eyebrow">
            Téléphone / WhatsApp *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={255}
            value={values.phone}
            onChange={set("phone")}
            className={`${inputClass} mt-2`}
          />
          {errors.phone ? <p className="mt-1 text-xs text-primary">{errors.phone}</p> : null}
        </div>
        <div>
          <label htmlFor="service" className="label-eyebrow">
            Sujet *
          </label>
          <textarea
            id="service"
            name="service"
            rows={2}
            maxLength={255}
            value={values.service}
            onChange={set("service")}
            placeholder="Captation vidéo, shooting, relation presse…"
            className={`${inputClass} mt-2 resize-none`}
          />
          {errors.service ? <p className="mt-1 text-xs text-primary">{errors.service}</p> : null}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label-eyebrow">
          Votre projet *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={2000}
          value={values.message}
          onChange={set("message")}
          className={`${inputClass} mt-2 resize-none`}
        />
        {errors.message ? <p className="mt-1 text-xs text-primary">{errors.message}</p> : null}
      </div>
      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Envoi en cours…" : "Envoyer la demande"} <Send className="size-4" />
      </button>
    </form>
  );
}
