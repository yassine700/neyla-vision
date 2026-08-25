import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-gradient-to-b from-background/80 to-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="group flex items-center gap-3" aria-label="Neyla Production — accueil">
          <span className="flex size-9 items-center justify-center bg-primary font-display text-lg font-bold text-primary-foreground">
            N
          </span>
          <span className="font-display text-lg font-bold uppercase leading-none tracking-[0.18em] text-foreground">
            Neyla
            <span className="block text-[10px] font-medium tracking-[0.42em] text-muted-foreground">Production</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-foreground after:w-full" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-primary/85 sm:inline-flex"
          >
            Demandez un devis
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
          <ul className="container-page flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="block border-b border-border/60 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                to="/contact"
                className="block bg-primary px-5 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
              >
                Demandez un devis
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
