import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
};

/**
 * Affiche l'image si le fichier existe dans /public, sinon un placeholder élégant.
 * Permet de construire le site avant l'import des vrais assets.
 */
export function SafeImage({ src, alt, className, imgClassName, label }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-background text-muted-foreground",
          className,
        )}
        aria-label={alt}
        role="img"
      >
        <ImageIcon className="size-6" aria-hidden />
        <span className="px-3 text-center text-[10px] uppercase tracking-[0.18em]">{label ?? alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("size-full object-cover", imgClassName, className)}
    />
  );
}
