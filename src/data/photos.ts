export type PhotoCategory = "corporate" | "evenements" | "produit";

export type PhotoItem = {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
};

export const photoCategories: { value: PhotoCategory | "tous"; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "corporate", label: "Corporate" },
  { value: "evenements", label: "Événements" },
  { value: "produit", label: "Produit" },
];

/**
 * TEMPLATE — déposez vos photos haute résolution dans /public/portfolio/
 * et référencez-les ici.
 */
export const photos: PhotoItem[] = [
  { id: "p-01", src: "/portfolio/portfolio-01.jpg", alt: "Shooting corporate en studio", category: "corporate" },
  { id: "p-02", src: "/portfolio/portfolio-02.jpg", alt: "Couverture d'un événement d'entreprise", category: "evenements" },
  { id: "p-03", src: "/portfolio/portfolio-03.jpg", alt: "Photographie produit en lumière contrôlée", category: "produit" },
  { id: "p-04", src: "/portfolio/portfolio-04.jpg", alt: "Portraits d'équipe dirigeante", category: "corporate" },
  { id: "p-05", src: "/portfolio/portfolio-05.jpg", alt: "Conférence annuelle à Casablanca", category: "evenements" },
  { id: "p-06", src: "/portfolio/portfolio-06.jpg", alt: "Packshot produit sur fond noir", category: "produit" },
  { id: "p-07", src: "/portfolio/portfolio-07.jpg", alt: "Tournage en extérieur", category: "corporate" },
  { id: "p-08", src: "/portfolio/portfolio-08.jpg", alt: "Soirée de gala", category: "evenements" },
];
