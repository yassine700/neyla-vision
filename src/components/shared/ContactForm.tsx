import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Fields = { nom: string; email: string; telephone: string; sujet: string; message: string };

const empty: Fields = { nom: "", email: "", telephone: "", sujet: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.nom.trim().length < 2) next.nom = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Adresse e-mail invalide.";
    if (values.message.trim().length < 10) next.message = "Décrivez votre projet en quelques mots.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    toast.success("Message envoyé", {
      description: "Notre équipe vous recontacte sous 24h ouvrées.",
    });
    setValues(empty);
  };

  const inputClass =
    "w-full border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="label-eyebrow">
            Nom *
          </label>
          <input id="nom" value={values.nom} onChange={set("nom")} className={`${inputClass} mt-2`} />
          {errors.nom ? <p className="mt-1 text-xs text-primary">{errors.nom}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className="label-eyebrow">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={set("email")}
            className={`${inputClass} mt-2`}
          />
          {errors.email ? <p className="mt-1 text-xs text-primary">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="telephone" className="label-eyebrow">
            Téléphone
          </label>
          <input
            id="telephone"
            value={values.telephone}
            onChange={set("telephone")}
            className={`${inputClass} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="sujet" className="label-eyebrow">
            Sujet
          </label>
          <input
            id="sujet"
            value={values.sujet}
            onChange={set("sujet")}
            placeholder="Captation vidéo, shooting, motion design…"
            className={`${inputClass} mt-2`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label-eyebrow">
          Votre projet *
        </label>
        <textarea
          id="message"
          rows={6}
          value={values.message}
          onChange={set("message")}
          className={`${inputClass} mt-2 resize-none`}
        />
        {errors.message ? <p className="mt-1 text-xs text-primary">{errors.message}</p> : null}
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.2em] text-primary-foreground uppercase transition-colors hover:bg-primary/85"
      >
        Envoyer la demande <Send className="size-4" />
      </button>
    </form>
  );
}
