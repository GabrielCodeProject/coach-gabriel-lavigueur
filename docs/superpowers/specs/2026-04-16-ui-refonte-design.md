# Refonte UI/UX — Coach Gabriel Lavigueur

**Date :** 2026-04-16  
**Statut :** Approuvé  
**Scope :** Refonte complète de toutes les pages du site

---

## Contexte

Site vitrine statique (Next.js 16, export GitHub Pages) pour Gabriel Lavigueur, coach en nutrition et entraînement personnalisé basé au Nutrition Suprême de Sainte-Thérèse, QC. L'application est déjà fonctionnelle avec Decap CMS, Web3Forms, Fitlog et Umami Analytics. La refonte porte uniquement sur le design visuel et les animations — l'architecture, les données et le contenu restent intacts.

---

## Objectif du design

Quand un client potentiel atterrit sur le site, il doit ressentir en moins de 3 secondes :
> "C'est exactement le coach que je cherchais, et il est sérieux."

Reconnaissance + confiance. Pas une marque corporate. Pas un gym générique. Un vrai coach local qui te connaît.

---

## Système visuel

### Palette de couleurs

| Token CSS | Valeur | Rôle |
|---|---|---|
| `--dark` | `#0c1a0c` | Fond sections sombres (hero, méthode, footer) |
| `--dark-mid` | `#162616` | Fond section méthode (légèrement plus clair) |
| `--white` | `#ffffff` | Fond sections claires (hero, services) |
| `--off-white` | `#f7faf3` | Fond colonne photo hero, hover cards |
| `--cream` | `#f0f7e8` | Fond section citation |
| `--lime` | `#84cc16` | Accent électrique principal — CTA, numéros, highlights |
| `--lime-dark` | `#5fa800` | Variante foncée du lime — eyebrows sur fond blanc |
| `--ink` | `#0c1a0c` | Texte principal sur fond blanc |
| `--ink-75` | `rgba(12,26,12,0.75)` | Texte secondaire sur fond blanc |
| `--ink-45` | `rgba(12,26,12,0.40)` | Bordures, texte tertiaire sur fond blanc |
| `--white-65` | `rgba(255,255,255,0.65)` | Texte principal sur fond sombre |
| `--white-30` | `rgba(255,255,255,0.30)` | Texte secondaire sur fond sombre |
| `--white-10` | `rgba(255,255,255,0.08)` | Bordures sur fond sombre |

### Typographie

| Usage | Taille | Poids | Style |
|---|---|---|---|
| H1 Hero | clamp(64px, 7vw, 96px) | 900 | uppercase, tracking -4px |
| H2 Section | clamp(34px, 4vw, 54px) | 900 | uppercase, tracking -2.5px |
| Eyebrow | 11px | 700 | uppercase, tracking 4px |
| Body principal | 18px | 500 | line-height 1.65 |
| Body secondaire | 15px | 400 | line-height 1.70 |
| Description carte | 15px | 400 | line-height 1.65 |
| Labels/footnotes | 11–12px | 500–600 | — |

**Police :** Inter (Google Fonts) — seule police du projet.

### Rayon de bordure

`--radius: 4px` — appliqué aux boutons et badges uniquement. Les cartes et grilles restent à angle droit.

---

## Flow des sections — Page d'accueil

```
NAV        → fond blanc, logo noir, liens 75% ink, CTA fond dark texte lime
HERO       → fond blanc, H1 noir massif, mot-clé lime, bouton dark·lime, photo droite
DIVIDER    → ligne lime sweep (animation)
STATS      → fond dark — bande de choc visuel, 3 chiffres en lime, count-up
DIVIDER    → ligne lime sweep
SERVICES   → fond blanc, grille 2×2, titres 22px, descriptions 15px 75% ink
DIVIDER    → ligne lime sweep
MÉTHODE    → fond dark-mid, 5 étapes numérotées 01–05 en lime géant
DIVIDER    → ligne lime sweep
CITATION   → fond cream, quote centré, accent lime sur mot-clé
DIVIDER    → ligne lime sweep
CTA        → fond lime explosif, titre dark, bouton dark·lime
FOOTER     → fond dark, grille 3 colonnes, adresse + nav + horaires
```

**Règle d'alternance :** blanc → dark → blanc → dark → cream → lime → dark. Jamais deux sections de même tonalité consécutives (sauf nav + hero tous deux blancs — intentionnel pour l'ouverture).

---

## Composants clés

### Navigation
- Sticky, `backdrop-filter: blur(12px)`, fond blanc 96%
- Logo : `COACH GAB` en uppercase tracking 4px
- Liens desktop : uppercase tracking 0.5px, 75% ink
- CTA : fond dark (`#0c1a0c`), texte lime — inversion du bouton principal
- Mobile : hamburger menu (composant existant `MobileNavToggle`)

### Hero
- Grid 2 colonnes : texte (flex-end, padding 56px) | photo (off-white)
- Texte : eyebrow lime → H1 3 lignes → body 2 paragraphes → actions → note
- Photo : placeholder remplacé par `next/image` avec la photo existante du coach
- Badge "Certifié AAT" flottant en haut à gauche de la colonne photo
- Ligne lime 4px en bas de la colonne photo

### Stats strip
- 3 colonnes égales sur fond `--dark`
- Chiffre : 52px bold lime, label 11px tracking 2px white-30, détail 13px white-65
- Ligne lime 2px en top (opacity 0.2 → 1 au hover)

### Grille Services
- 2×2, gap 1px (fond `--light-border` visible comme séparateur)
- Chaque carte : numéro 01–04 lime, titre 22px, description 15px, lien "Voir les détails →"
- **Aucun prix affiché** — renvoi vers `/mes-services`
- Hover : fond `--off-white` + barre lime 3px gauche (scale Y de bas en haut)
- Bouton centré sous la grille : "Voir tous les tarifs et détails →"

### Étapes Méthode
- 5 colonnes sur fond `--dark-mid`
- Numéro : 44px bold lime (01 → 05)
- Hover : fond légèrement plus clair `#1e341e`

### Citation
- Fond `--cream`, centrée
- Guillemet géant en watermark (lime, opacity 0.12)
- Séparateur lime 40px entre citation et auteur

### CTA Banner
- Fond `--lime`, texte dark
- Eyebrow 55% ink · Titre H2 · Bouton dark·lime aligné à droite
- Flex `space-between`

### Footer
- Fond `--dark`, 3 colonnes : coordonnées | navigation | horaires
- Labels colonnes en lime (9px uppercase tracking 3px)
- Texte 13px white-65
- Dot lime animé + copyright + liens légaux

---

## Animations

### Règles générales
- **Légères et rapides** — jamais plus de 0.7s. L'animation accompagne, elle ne spectacularise pas.
- **Easing :** `cubic-bezier(0.22, 1, 0.36, 1)` — entrée rapide, fin douce.
- **Déclenché au scroll** via `IntersectionObserver` (threshold 0.12, rootMargin -40px bottom).
- Chaque élément ne s'anime qu'une seule fois (unobserve après déclenchement).

### Catalogue d'animations

| Élément | Animation | Durée | Délai |
|---|---|---|---|
| Hero eyebrow | fadeUp | 0.6s | 0.1s |
| Hero H1 | fadeUp | 0.7s | 0.25s |
| Hero body | fadeUp | 0.6s | 0.4s + 0.5s |
| Hero actions | fadeUp | 0.6s | 0.6s |
| Dividers lime | scaleX 0→1 depuis gauche | 0.8s | au scroll |
| Stats (3) | stagger fadeUp | 0.55s | 0.05 / 0.15 / 0.25s |
| Stat chiffres | count-up (0 → valeur) | 0.9s | au scroll |
| Eyebrow sections | fadeUp | 0.65s | au scroll |
| Titres H2 sections | fadeUp | 0.65s | au scroll |
| Cartes services (4) | stagger fadeUp | 0.5s | 0.05 / 0.15 / 0.25 / 0.35s |
| Étapes méthode (5) | stagger fadeUp | 0.5s | 0 / 0.1 / 0.2 / 0.3 / 0.4s |
| Quote text | fadeUp | 0.65s | au scroll |
| CTA titre | slideFromLeft | 0.6s | au scroll |
| CTA bouton | fadeUp | 0.65s | au scroll |

---

## Pages à refonter

Le système visuel s'applique à **toutes les pages** avec les adaptations suivantes :

| Page | Particularités |
|---|---|
| `/` (accueil) | Layout complet décrit ci-dessus |
| `/mes-services` | Affiche les prix — grille complète avec `PricingNotice` |
| `/ma-methode` | Détail des 5 étapes avec `MethodSteps` existant |
| `/a-propos` | Intro + credentials + photo |
| `/transformations` | Galerie before/after — `TransformationGallery` existant |
| `/faq` | Accordion — `FaqAccordion` existant |
| `/contact` | Formulaire questionnaire + carte + info |
| Pages légales | Minimal, lecture seule |

**Composant partagé `PageHero`** (existant) : adapté au nouveau système — fond blanc, H1 massif, eyebrow lime, cohérent avec le hero de la home.

---

## Contraintes techniques

- **Static export** — pas de SSR dynamique. Animations via CSS transitions + `tw-animate-css` (déjà installé) + `IntersectionObserver` vanilla pour le scroll-trigger. Aucune nouvelle librairie d'animation à installer.
- **Dark mode** : les tokens CSS doivent supporter `.dark` — revoir les variables dans `globals.css` pour que le thème sombre reste cohérent avec la nouvelle palette
- **Images** : Next.js `<Image>` avec `priority` sur le hero, WebP existant conservé
- **Polices** : Inter déjà chargée, pas de nouvelle police à ajouter
- **shadcn/ui** : les composants shadcn (Button, Card, Accordion, etc.) sont recolorés via les tokens CSS — pas de remplacement des composants

---

## Ce qui NE change PAS

- Architecture des routes et pages
- Contenu markdown (`content/`)
- Données business (`lib/business-data.ts`)
- Logique du questionnaire et soumission Web3Forms
- Intégration Decap CMS
- SEO et structured data
- Analytics Umami
- Composants `MobileNavToggle`, `ThemeToggle`, `FaqAccordion`, `QuestionnaireForm`
