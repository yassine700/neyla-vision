# Neyla Vision - Website Assets & Content Guide

This repository contains all official assets and content for the **Neyla Production** website created with Lovable.

---

## 📁 Directory Structure

```
public/
├── assets/
│   ├── nos-references/           # 13 Client / Partner Logos (.png)
│   ├── team/                     # 5 Team member portraits (.avif)
│   └── portfolio/
│       ├── photographie-evenementiel/    # 18 event photography items (.jpg)
│       ├── photographie-institutionnelle/ # 11 institutional items (.jpg/.png)
│       ├── shooting-culinaire/           # 12 culinary shooting items (.jpg)
│       └── shooting-immobilier/          # 13 real estate shooting items (.jpg)
└── data/
    ├── siteData.json             # Structured JSON with all content & paths
    ├── site-data.txt             # Original address & contact info
    ├── video-hero-link.txt       # Hero Vimeo link
    └── video-links.csv           # 11 Video titles & YouTube links

src/
└── data/
    └── siteData.ts               # TypeScript data structures & typed export
```

---

## 🚀 How to use in Lovable / React Components

Import the typed data anywhere:

```tsx
import { siteData } from "@/data/siteData";

// Access Company info
console.log(siteData.company.name); // "Neyla Production"
console.log(siteData.company.address); // "144, RUE MOHAMED SMIHA..."
console.log(siteData.company.phones); // ["+212 663 66 88 17", "+212 665 36 26 73"]

// Access Hero Video
console.log(siteData.heroVideo.url); // "https://vimeo.com/1221114282"

// Access Client Logos
siteData.references.map((item) => (
  <img key={item.name} src={item.logo} alt={item.name} />
));

// Access Team Members
siteData.team.map((member) => (
  <div key={member.name}>
    <img src={member.image} alt={member.name} />
    <h3>{member.name}</h3>
  </div>
));

// Access Realisations / Video Gallery
siteData.realisations.map((video) => (
  <a key={video.title} href={video.url}>
    {video.title}
  </a>
));

// Access Portfolio Categories
siteData.portfolio.evenementiel.map((imgSrc, i) => (
  <img key={i} src={imgSrc} alt={`Event photo ${i + 1}`} />
));
```

---

## 🎬 Video Assets Summary

### Hero Video
- **Vimeo Link:** `https://vimeo.com/1221114282?fl=ip&fe=ec`

### Video Realisations (11 Videos)
1. **BEST OF AFRICAMED NEYLA** - `https://youtu.be/Z_OaRPO3Iko`
2. **DECOMEUBLE CHARKAOUI NADOR** - `https://youtu.be/33h3FSDj1Pk`
3. **8eme EDITION DU SALON INTERNATIONAL DU TEXTILE** - `https://youtu.be/_Xxc2tr09H0`
4. **LAFARGE** - `https://youtu.be/M4zdseMhF_o`
5. **best of all nad publication** - `https://youtu.be/0pbhjZID1Qk`
6. **FORMATION ESCA** - `https://youtu.be/-ZpQdqXDii4`
7. **06 8eme EDITION DU SALON INTERNATIONAL DU TEXTILE 2** - `https://youtu.be/qZgEYe42ql8`
8. **AIEM** - `https://youtu.be/fxsMnF0e1Hs`
9. **mesidor** - `https://youtu.be/piwiymbXf6U`
10. **MARATHON BOUSKOURA** - `https://youtu.be/zFOTCZVWsEU`
11. **charaka** - `https://youtu.be/ojVfYnutpwo`

---

## 👥 Team Members
- Elmehdi MOUTRIB (`/assets/team/Elmehdi MOUTRIB.avif`)
- Nassira MAMCHACH (`/assets/team/Nassira MAMCHACH.avif`)
- Younes BARI (`/assets/team/Younes BARI.avif`)
- Youssef MAADOUR (`/assets/team/Youssef MAADOUR.avif`)
- Zouhir LAALAM (`/assets/team/Zouhir LAALAM.avif`)

---

## 🏢 Reference Clients / Partners (13)
- AFRICAMED
- AIEM
- Clinique Zarhoun
- DISAGRI
- FRMK
- GARDENIA
- GITEX AFRICA MR
- Hyundai
- Lafarge
- MOROCCO FOUNDATION
- Richbond
- Simmons
- UM6P
