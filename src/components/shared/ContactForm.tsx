import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { services } from "@/data/site";

const initial = { nom: "", societe: "", email: "", telephone: "", service: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof initial, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (values.nom.trim().length < 2) next.nom = "Merci d'indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Adresse e-mail invalide.";
    if (values.message.trim().length < 10) next.message = "Décrivez votre projet en quelques mots.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    toast.success("Demande envoyée", {
      description: "Merci ! Notre équipe vous recontacte sous 24 h ouvrées.",
    });
    setValues(initial);
  };

  const field =
    "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Nom complet *
          </label>
          <input id="nom" className={field} value={values.nom} onChange={(e) => set("nom", e.target.value)} placeholder="Votre nom" />
          {errors.nom ? <p className="mt-2 text-xs text-primary">{errors.nom}</p> : null}
        </div>
        <div>
          <label htmlFor="societe" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Société
          </label>
          <input id="societe" className={field} value={values.societe} onChange={(e) => set("societe", e.target.value)} placeholder="Votre entreprise" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
            E-mail *
          </label>
          <input id="email" type="email" className={field} value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="vous@societe.ma" />
          {errors.email ? <p className="mt-2 text-xs text-primary">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="telephone" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Téléphone
          </label>
          <input id="telephone" className={field} value={values.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="+212 6 00 00 00 00" />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Service souhaité
        </label>
        <select id="service" className={field} value={values.service} onChange={(e) => set("service", e.target.value)}>
          <option value="">Sélectionnez un service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Votre projet *
        </label>
        <textarea
          id="message"
          rows={5}
          className={field}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Décrivez votre besoin, vos délais et votre budget estimé."
        />
        {errors.message ? <p className="mt-2 text-xs text-primary">{errors.message}</p> : null}
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/85"
      >
        Envoyer ma demande
        <Send className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
