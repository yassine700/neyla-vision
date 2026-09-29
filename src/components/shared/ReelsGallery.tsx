import { useQuery } from "@tanstack/react-query";
import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { INSTAGRAM_ACCOUNT, instagramReelIds } from "../../data/instagramReels";
import { fetchReels, type Reel } from "../../lib/reels";

function InstagramReel({ id }: { id: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [landscape, setLandscape] = useState(false);

  // Instagram indique la hauteur de son lecteur : un lecteur peu haut = vidéo paysage.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const el = frame.current;
      if (!el || event.source !== el.contentWindow) return;
      try {
        const msg = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const height = msg?.type === "MEASURE" ? Number(msg.details?.height) : 0;
        const width = el.getBoundingClientRect().width;
        if (height && width && height / width < 1.4) setLandscape(true);
      } catch { /* message étranger */ }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // L'en-tête (~56 px) et le pied du lecteur Instagram sont rognés : la vidéo remplit la carte.
  const layout = landscape
    ? "[height:calc(100%_+_200px)] [left:0] [top:calc(50%_-_56px_-_28.125cqw)] [width:100%]"
    : "[height:calc(100%_+_200px)] [left:-22%] [top:-56px] [width:144%]";

  return (
    <div className="relative aspect-[9/16] min-w-0 overflow-hidden bg-black [container-type:inline-size]">
      <iframe
        ref={frame}
        title={`Reel Instagram ${id}`}
        src={`https://www.instagram.com/reel/${id}/embed`}
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
        scrolling="no"
        className={`absolute border-0 ${layout}`}
      />
      {landscape ? (
        <>
          <div aria-hidden="true" className="absolute inset-x-0 top-0 bg-black [height:calc(50%_-_28.125cqw)]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 bg-black [height:calc(50%_-_28.125cqw)]" />
        </>
      ) : null}
    </div>
  );
}

function InstagramReels() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {instagramReelIds.map((id) => <InstagramReel key={id} id={id} />)}
    </div>
  );
}

function InstagramLink() {
  return (
    <p className="mt-12 text-center">
      <a href={`https://www.instagram.com/${INSTAGRAM_ACCOUNT}/`} target="_blank" rel="noopener noreferrer" className="inline-block border border-border px-6 py-3 font-display text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
        Suivez-nous sur Instagram @{INSTAGRAM_ACCOUNT}
      </a>
    </p>
  );
}

function ReelPlayer({ reel, onClose }: { reel: Reel; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={reel.title} className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4" onClick={onClose}>
      <button type="button" aria-label="Fermer la vidéo" onClick={onClose} className="absolute right-4 top-4 z-10 grid size-11 place-items-center border border-border bg-background text-foreground hover:border-primary hover:text-primary"><X className="size-5" /></button>
      <div className="aspect-[9/16] h-auto max-h-[85dvh] w-auto max-w-full overflow-hidden bg-card [width:min(100%,calc(85dvh*9/16))]" onClick={(event) => event.stopPropagation()}>
        {reel.videoUrl ? (
          <video className="size-full object-contain" src={reel.videoUrl} poster={reel.cover} controls autoPlay playsInline aria-label={reel.title} />
        ) : reel.youtubeId ? (
          <iframe title={reel.title} src={`https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&rel=0`} className="size-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : null}
      </div>
    </div>
  );
}

export function ReelsGallery() {
  const [active, setActive] = useState<Reel | null>(null);
  const { data, isPending, isError } = useQuery({ queryKey: ["sanity", "reels"], queryFn: fetchReels, staleTime: 5 * 60_000, retry: 1 });

  if (isPending) return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6" aria-label="Chargement des reels">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[9/16] animate-pulse bg-card" />)}</div>;

  if (isError || !data?.length) return <><InstagramReels /><InstagramLink /></>;

  return <>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {data.map((reel) => <button key={reel.id} type="button" onClick={() => setActive(reel)} aria-label={`Voir ${reel.title}`} className="group min-w-0 text-left">
        <div className="relative aspect-[9/16] overflow-hidden bg-card">
          {reel.cover ? <img src={reel.cover} alt="" loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /> : reel.youtubeId ? <img src={`https://i.ytimg.com/vi/${reel.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <video src={reel.videoUrl} muted playsInline preload="metadata" className="size-full object-cover" aria-hidden="true" />}
          <span className="absolute inset-0 grid place-items-center bg-background/20 transition-colors group-hover:bg-background/10"><span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><Play className="size-5 fill-current" /></span></span>
        </div>
        <h2 className="mt-4 line-clamp-2 font-display text-sm font-semibold uppercase text-foreground">{reel.title}</h2>
      </button>)}
    </div>
    <div className="mt-16"><InstagramReels /></div>
    <InstagramLink />
    {active ? <ReelPlayer reel={active} onClose={() => setActive(null)} /> : null}
  </>;
}