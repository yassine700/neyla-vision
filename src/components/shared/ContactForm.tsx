import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACCESS_KEY = "6af5d050-0055-4dec-b4a7-16b22ad9c541";
const ENDPOINT = "https://api.web3forms.com/submit";
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

type Fields = { name: string; email: string; phone: string; service: string; message: string };

const empty: Fields = { name: "", email: "", phone: "", service: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaReady, setCaptchaReady] = useState(false);
  const captchaRef = useRef<any>(null);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onVerify = (token: string) => setCaptchaToken(token);

  const onExpire = () => {
    setCaptchaToken(null);
    toast.error("Captcha expiré", { description: "Veuillez valider à nouveau le captcha." });
  };

  const onError = () => {
    setCaptchaToken(null);
    toast.error("Erreur captcha", { description: "Réessayez dans un instant." });
  };

  const resetCaptcha = () => {
    captchaRef.current?.resetCaptcha?.();
    setCaptchaToken(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const botcheck = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (botcheck) return;

    if (!captchaToken) {
      toast.error("Veuillez valider le captcha avant d'envoyer.");
      return;
    }

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
          "h-captcha-response": captchaToken,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || data.success !== true) throw new Error("send_failed");
      toast.success("Message envoyé", {
        description: "Notre équipe vous recontacte sous 24h ouvrées.",
      });
      setValues(empty);
      resetCaptcha();
    } catch {
      toast.error("Échec de l'envoi", {
        description: "Réessayez dans un instant ou appelez-nous directement.",
      });
      resetCaptcha();
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full border border-[#333333] border-b-[#4A4A4A] bg-[#121212] px-4 py-3 text-sm text-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.015)] outline-none transition-colors hover:border-[#444444] focus:border-primary focus:border-b-primary";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-eyebrow">
            Nom complet<span className="ml-0.5 text-primary">*</span>
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
            E-mail<span className="ml-0.5 text-primary">*</span>
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
            Téléphone / WhatsApp<span className="ml-0.5 text-primary">*</span>
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
            Sujet<span className="ml-0.5 text-primary">*</span>
          </label>
          <textarea
            id="service"
            name="service"
            rows={1}
            maxLength={255}
            value={values.service}
            onChange={set("service")}
            placeholder="Captation vidéo, shooting, relation presse…"
            className={`${inputClass} mt-2 resize-none leading-tight`}
          />
          {errors.service ? <p className="mt-1 text-xs text-primary">{errors.service}</p> : null}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label-eyebrow">
          Votre projet<span className="ml-0.5 text-primary">*</span>
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

      <div className="overflow-hidden rounded bg-[#121212] p-4 ring-1 ring-white/10">
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITEKEY}
          theme="dark"
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
          onLoad={() => setCaptchaReady(true)}
        />
      </div>

      <button
        type="submit"
        disabled={sending || !captchaToken}
        className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Envoi en cours…" : "Envoyer la demande"} <Send className="size-4" />
      </button>
    </form>
  );
}
