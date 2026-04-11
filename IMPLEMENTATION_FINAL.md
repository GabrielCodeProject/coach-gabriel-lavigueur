# Plan d'implémentation final — Coach Gabriel Lavigueur

Tous les points ont été discutés, critiqués, et approuvés.
Audit triple itération appliqué — basé sur le code réel, pas des suppositions.

**Responsabilités :**
- `[CODE]` → Implémentation technique
- `[DESIGN]` → Interface et layout — exécutée par `/frontend-design:frontend-design` sous ces instructions
- `[GABRIEL]` → Action manuelle requise de Gabriel (hors code)
- `[DATA]` → Mise à jour de `business-data.ts` uniquement

---

## TODO LATER (hors scope implémentation immédiate)

- **Migration GitHub Actions** — retirer `NEXT_PUBLIC_BASE_PATH` du workflow quand `coachgab.nutrition-supreme.com` est activé en production. `next.config.ts` est déjà correct (env-var driven, aucune modification requise).

---

## Phase 1 — Fondation technique
*Aucune dépendance externe. À faire en premier. Débloque tout le reste.*

### 1.1 Domaine custom `[CODE]`
**Réf: Point 18**
- Créer enregistrement CNAME dans Cloudflare : `coachgab` → `gabrielcodeproject.github.io`
- Ajouter fichier `CNAME` dans `/public/` avec `coachgab.nutrition-supreme.com`
- Activer le custom domain dans les settings du repo GitHub Pages
- `next.config.ts` : AUCUNE modification — config déjà pilotée par env var
- Mettre à jour `contact.website` dans `business-data.ts` → `https://coachgab.nutrition-supreme.com`
- Vérifier HTTPS activé via Cloudflare (automatique)

### 1.2 Remplir `business-data.ts` `[DATA]`
**Réf: Points 2, 13, 16 — corrections audit itération 2 et 3**

Champs TODO à remplir (recherche en ligne pour l'adresse) :
- `location.streetAddress` → adresse exacte Nutrition Suprême Sainte-Thérèse
- `location.postalCode` → code postal exact
- `location.coordinates` → affiner avec l'adresse précise
- `location.googleMapsEmbedSrc` → obtenir via Google Maps → Partager → Intégrer
- `contact.email` → `gabrielprivermsg@gmail.com` (**était encore `TODO@coachgabriellavigueur.ca`**)
- `contact.phone` → numéro de la boutique Nutrition Suprême (recherche en ligne)
- `contact.website` → `https://coachgab.nutrition-supreme.com`

Champs coach à remplir :
- `coach.certifications` → `["Diplômé de l'Institut AAT"]`
- `coach.yearsOfExperience` → `13`

Horaires de consultation (**SSOT — à mettre à jour ici uniquement quand ils changent**) :
```ts
businessHours: {
  timezone: "America/Toronto",
  schedule: [
    { days: ["Thursday", "Friday"], opens: "10:00", closes: "12:00" },
    { days: ["Saturday"], opens: "08:00", closes: "09:30" },
    { days: ["Saturday"], opens: "17:00", closes: "19:00" },
  ],
}
```

Nouveaux champs à ajouter :
```ts
cta: {
  primary: "Dis-moi où tu en es",
  nav: "Commencer",
},
stats: [
  { value: "13 ans", label: "de pratique personnelle" },
  { value: "Certifié", label: "Institut AAT" },
  { value: "3", label: "transformations documentées" },
],
socials: [
  { platform: "instagram" as const, url: "", enabled: false },
  { platform: "facebook" as const, url: "", enabled: false },
],
testimonials: {
  enabled: false,
  philosophyQuote: "Je ne vends pas une transformation express. Je construis avec toi les habitudes qui durent.",
  items: [] as readonly { name: string; quote: string; enabled: boolean }[],
},
transformations: {
  enabled: false,
},
credentials: {
  formation: "Diplômé de l'Institut AAT — formation qui a confirmé 13 ans de pratique personnelle",
  equipe: "Coach au sein de l'équipe Nutrition Suprême, Sainte-Thérèse",
},
```

### 1.3 Audit copy et tutoiement `[CODE]`
**Réf: Points 4, 12**
- `CtaQuestionnaireBanner` : mettre à jour les valeurs **par défaut** des props (`title`, `body`, `ctaLabel`) — la structure du composant est déjà correcte, aucun refacto
- Remplacer "Questionnaire" dans le nav par "Commencer"
- Audit tutoiement/vouvoiement — toutes les pages et composants, uniformiser en tutoiement
- Lire `business-data.ts → cta.primary` pour le CTA (SSOT)

### 1.4 Umami Analytics `[CODE]`
**Réf: Point 17 — correction audit**
- Créer compte umami.is + ajouter le site
- Ajouter dans `layout.tsx` à l'intérieur de `<body>` :
  ```tsx
  import Script from "next/script";
  // ...
  <Script
    src="https://analytics.umami.is/script.js"
    data-website-id="[ID_UMAMI]"
    strategy="afterInteractive"
  />
  ```
- Ne PAS mettre dans `<head>` — `strategy="afterInteractive"` gère le timing

### 1.5 SEO local JSON-LD `[CODE]`
**Réf: Point 16**
- Vérifier que `buildLocalBusinessSchema()` dans `src/lib/schema/local-business.ts` lit bien depuis `business-data.ts`
- Vérifier que les horaires (`businessHours.schedule`) sont convertis en `openingHoursSpecification` JSON-LD
- Aucun champ vide ou `"TODO"` restant après 1.2

### 1.6 Types pour nouveaux champs `[CODE]`
**Réf: Règles `typescript.md` — correction audit**
- Les nouveaux champs de `business-data.ts` sont auto-typés via `type BusinessData = typeof BUSINESS`
- `testimonial.types.ts` : NE PAS créer maintenant — YAGNI, créer uniquement quand `testimonials.enabled` passe à `true`
- Const maps pour disponibilités questionnaire dans `questionnaire.types.ts` :
  ```ts
  export const PLAGE_HORAIRE = {
    MATIN: "matin",
    APRES_MIDI: "apres-midi",
    SOIR: "soir",
  } as const;
  export type PlageHoraire = (typeof PLAGE_HORAIRE)[keyof typeof PLAGE_HORAIRE];

  export const JOUR_SEMAINE = {
    LUNDI: "lundi", MARDI: "mardi", MERCREDI: "mercredi",
    JEUDI: "jeudi", VENDREDI: "vendredi", SAMEDI: "samedi", DIMANCHE: "dimanche",
  } as const;
  export type JourSemaine = (typeof JOUR_SEMAINE)[keyof typeof JOUR_SEMAINE];
  ```

---

## Phase 2 — Design & Layout
*Exécutée par `/frontend-design:frontend-design`. Lire CHAQUE instruction avant de coder.*

**Règles globales pour toutes les tâches design :**
- Mobile-first — classes base pour mobile, breakpoints pour desktop
- `gap` JAMAIS `space-y` ni `space-y-*`
- Composants shadcn/ui en priorité — jamais de div custom quand un composant shadcn existe
- Lucide React pour les icônes — jamais d'emojis
- Couleurs CSS variables (`bg-muted`, `text-foreground`, `text-primary`) — jamais de hex hardcodé
- Tous les nouveaux composants = Server Components par défaut — `"use client"` seulement si état ou event handlers
- Pas de gradients sauf demande explicite

### 2.1 Hero — split layout `[DESIGN]`
**Réf: Points 1, 2, 7, 8, 14**

Layout :
- Desktop : `lg:grid-cols-2` — texte à gauche, image à droite
- Mobile : texte pleine largeur, image en arrière-plan semi-transparent (`opacity-20`) derrière le texte

Colonne texte (gauche) — hiérarchie stricte dans cet ordre :
1. Titre principal (existant)
2. Sous-titre niveau 1 (tous écrans) :
   *"Les plans génériques ne fonctionnent pas parce qu'ils ne te connaissent pas. Moi, je vais te connaître."*
3. Body text niveau 2 (`hidden md:block`, `text-muted-foreground`, `text-sm` ou `text-base`) :
   *"T'as essayé. T'as recommencé. T'as suivi des plans qui ne tenaient pas compte de ta vraie vie. Je construis avec toi la structure qui dure — pas un template, ton plan."*
4. StatBar (voir 2.2 — en dessous du body text, avant le CTA)
5. Bouton CTA : lire depuis `BUSINESS.cta.primary`

Colonne image (droite) — placeholder VISIBLE :
- `next/image` slot avec fond `bg-muted`
- Label centré : `"Photo — Portrait bureau"` + icône `ImageIcon` de Lucide
- Ratio : `aspect-[3/4]` (portrait)
- `rounded-2xl overflow-hidden`

### 2.2 StatBar — section break visuel `[DESIGN]`
**Réf: Points 2, 7**
- Fond `bg-muted` — SEUL break visuel de la page homepage, ne pas répliquer
- Layout : `flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16`
- Dividers verticaux entre stats : `hidden md:block w-px h-10 bg-border`
- Structure par stat : chiffre en `text-4xl font-bold text-primary`, label en `text-sm text-muted-foreground text-center`
- Lire depuis `BUSINESS.stats`
- Flat — aucune Card, aucune ombre

### 2.3 Section "Ton coaching dans ta poche" `[DESIGN]`
**Réf: Point 9**
- Remplace `FitlogHighlightSection` existante
- Titre section : "Ton coaching dans ta poche"
- 3 items : `grid grid-cols-1 gap-6 md:grid-cols-3`
- Chaque item : icône Lucide + titre + description (shadcn `Card`)
- Icônes : `Smartphone`, `MessageCircle`, `TrendingUp`
- Contenu :
  1. **Ton plan partout** — "Accède à ton plan d'entraînement et nutrition n'importe quand, depuis ton téléphone"
  2. **Contact direct** — "Envoie un message directement dans l'app — pas de SMS perdu, pas d'email ignoré"
  3. **Tes progrès visibles** — "Vois tes métriques évoluer semaine après semaine"
- Note discrète sous la grille : `"via l'application Fitlog"` en `text-xs text-muted-foreground text-center`
- Aucune mention de logo ou couleurs Fitlog

### 2.4 Placeholders photo — toutes pages `[DESIGN]`
**Réf: Point 8 — les vraies photos ne sont pas encore disponibles**

Standard placeholder : fond `bg-muted rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground`
- Icône `ImageIcon` de Lucide (`size-8`)
- Label `text-xs` indiquant le shot attendu

Emplacements et ratios :
| Page | Emplacement | Label | Ratio |
|---|---|---|---|
| Homepage (héro) | Colonne droite du split | "Photo — Portrait bureau" | `aspect-[3/4]` |
| À propos (sidebar) | À droite du texte intro | "Photo — Portrait décontracté" | `aspect-[3/4]` |
| À propos (section narrative) | Inline avec le texte | "Photo — En action au bureau" | `aspect-video` |
| Ma méthode | Visuel d'accompagnement | "Photo — Au gym" | `aspect-video` |
| Contact | Section localisation | "Photo — Intérieur Nutrition Suprême" | `aspect-video` |

### 2.5 Timeline mobile — Ma méthode `[DESIGN]`
**Réf: Point 11**
- Desktop : grid `hidden lg:grid lg:grid-cols-5` inchangé
- Mobile : `lg:hidden flex flex-col gap-8 relative`
  - Ligne verticale : `absolute left-4 top-0 bottom-0 w-0.5 bg-primary`
  - Chaque étape : `flex gap-4 items-start`
  - Numéro cerclé : `z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold`
  - Contenu : titre + description à droite du numéro
- Aucune animation — statique

### 2.6 Section ServiceTeaser — homepage `[DESIGN]`
**Réf: Point 3**
- Placée après la section méthode, avant le CTA banner
- Titre section : "Ce que je propose"
- 4 items `grid grid-cols-1 gap-4 md:grid-cols-2`
- Chaque item : shadcn `Card` avec titre + description courte (sans prix)
- Services (lire depuis `business-data.ts` si possible, sinon hardcoder) :
  1. **Consultation initiale** — "On établit ton point de départ ensemble"
  2. **Plan d'entraînement** — "Structuré pour ta réalité, pas un template"
  3. **Plan nutrition** — "Une fois, pour toujours"
  4. **Suivi mensuel** — "Tu n'es jamais seul entre les étapes"
- CTA centré sous la grille : bouton `variant="outline"` → "Voir les tarifs et détails" → `ROUTES.SERVICES`

### 2.7 PhilosophyQuote — homepage `[DESIGN]`
**Réf: Point 5**
- Visible tant que `BUSINESS.testimonials.enabled === false`
- Lire la citation depuis `BUSINESS.testimonials.philosophyQuote`
- Style : bloc centré, guillemets typographiques `"` et `"`, texte `text-xl italic`, nom `text-sm text-muted-foreground mt-2`
- Aucune Card — juste typographie sur fond de page

### 2.8 CTA Banner contextuel — toutes les pages `[DESIGN]`
**Réf: Point 6**
- `CtaQuestionnaireBanner` accepte déjà `title?`, `body?`, `ctaLabel?` — NE PAS recréer
- Mettre à jour les **valeurs par défaut** du composant :
  - `title` default → `"Ton point de départ existe déjà"`
  - `body` default → `"Tu n'as pas besoin d'être prêt — juste honnête sur où tu en es."`
  - `ctaLabel` default → lire `BUSINESS.cta.primary`
- Passer les props contextuelle sur chaque page :

| Page | `title` | `body` |
|---|---|---|
| Accueil | Ton point de départ existe déjà | Tu n'as pas besoin d'être prêt — juste honnête sur où tu en es. |
| À propos | Tu sais qui je suis | Maintenant dis-moi qui tu es et où tu veux aller. |
| Ma méthode | Tu connais comment je travaille | La prochaine étape, c'est toi. |
| Mes services | Le bon service pour toi est là | Choisis ton point d'entrée — on ajuste ensemble. |
| Transformations | Leur point de départ ressemblait peut-être au tien | La seule différence, c'est qu'ils ont envoyé le premier message. |
| FAQ | Tu as encore des questions ? | Je te réponds personnellement — pas un bot, pas un template. |
| Contact | Supprimer le banner — redondant sur cette page | — |

### 2.9 Footer — réseaux sociaux conditionnels `[DESIGN]`
**Réf: Point 10**
- Lire `BUSINESS.socials` — affichage conditionnel sur `enabled`
- Quand `enabled: false` : ne pas rendre l'icône du tout (pas de lien mort)
- Icônes : `Instagram`, `Facebook` de Lucide

### 2.10 Page À propos — credentials + narrative `[DESIGN]`
**Réf: Point 13**
- Sidebar : afficher `BUSINESS.credentials.formation` + `BUSINESS.credentials.equipe`
- Retirer la condition qui cachait la section credentials
- Narrative fil rouge dans le corps de page :
  praticien 13 ans → diplômé Institut AAT → coach équipe Nutrition Suprême

### 2.11 Page "Ma vision des résultats" `[DESIGN]`
**Réf: Point 21**
- Renommer la page : titre H1 → "Ma vision des résultats"
- Retirer `TransformationCard` de Marie L. complètement
- Contenu philosophique permanent :
  - Ce qu'une vraie transformation représente
  - Long terme vs résultats rapides
  - Attentes réalistes
- Section cards conditionnelle : `BUSINESS.transformations.enabled === true` → afficher les cartes, sinon rien (aucun placeholder vide)

### 2.12 Questionnaire — champ disponibilités `[DESIGN + CODE]`
**Réf: Point 20 — correction audit**

**Code d'abord (`[CODE]`) :**
1. Dans `questionnaire.types.ts` : ajouter `PLAGE_HORAIRE`, `PlageHoraire`, `JOUR_SEMAINE`, `JourSemaine` (voir Phase 1.6)
2. Dans `questionnaire.schema.ts` : ajouter le champ optionnel :
   ```ts
   plages_horaires: z.array(z.string()).optional().default([]),
   jours_disponibles: z.array(z.string()).optional().default([]),
   ```
3. Dans `QUESTIONNAIRE_DEFAULT_VALUES` : ajouter `plages_horaires: []`, `jours_disponibles: []`

**Design ensuite (`[DESIGN]`) :**
- Ajouter DANS la Card `<CardTitle>Disponibilités et contexte</CardTitle>` existante (ligne 404 du formulaire)
- Deux groupes de checkboxes côte à côte (`grid grid-cols-2 gap-4`) :
  - Plage horaire : Matin / Après-midi / Soir (checkboxes shadcn)
  - Jours : Lundi → Dimanche (checkboxes shadcn)
- `form.Field` pattern exact identique au champ `consentement_rgpd` existant
- Champ optionnel — ne pas bloquer la soumission

### 2.13 Page Contact — lien FAQ `[DESIGN]`
**Réf: Point 15**
- Ajouter sous le formulaire : `"Une question avant de commencer ? "` + `<Link href={ROUTES.FAQ}>Consulte la FAQ</Link>`
- `text-sm text-muted-foreground`, lien `text-primary underline underline-offset-4`

---

## Phase 3 — Actions Gabriel
*Non techniques. Gabriel doit les faire lui-même.*

### 3.1 Séance photo `[GABRIEL]`
**Réf: Points 1, 8**
Shot list — arriver avec cette liste en main :
1. Portrait debout au bureau — format portrait, regard caméra *(héro)*
2. "En action" au bureau — plan ouvert devant toi, semi-profil *(à propos)*
3. Au gym — mouvement de démonstration ou supervision *(méthode)*
4. Intérieur Nutrition Suprême — ambiance, espace *(contact)*
5. Portrait décontracté — sourire, moins formel *(à propos)*

Formats requis pour chaque shot : portrait ET paysage.
Après la séance → remplacer les placeholders Phase 2.4 un par un.

### 3.2 Image OG — Canva `[GABRIEL]`
**Réf: Point 19**
- canva.com → format 1200×630px
- Fond charcoal · "Gabriel Lavigueur" en grand · "Coach nutrition & entraînement — Sainte-Thérèse" · accent orange
- Exporter en JPG → placer dans `public/images/default/share-default.jpg`
- Vérifier que `og:image` dans les métadonnées pointe vers cette image avec l'URL absolue `https://coachgab.nutrition-supreme.com/...`

### 3.3 Réseaux sociaux — conditions d'activation `[GABRIEL]`
**Réf: Point 10**
Quand prêt :
1. Mettre `enabled: true` + ajouter l'URL dans `BUSINESS.socials`
- Condition Instagram : minimum 12 posts coaching visibles
- Condition Facebook : reformatage professionnel terminé

### 3.4 Témoignages et transformations `[GABRIEL]`
**Réf: Points 5, 21**
- Témoignage client → `BUSINESS.testimonials.enabled = true` + ajouter la citation dans `items`
- Transformation client → `BUSINESS.transformations.enabled = true` + ajouter les données
- Consentement écrit obligatoire avant publication

---

## Dépendances et ordre d'exécution

```
Phase 1.2 (business-data complète) → Phase 1.5 (SEO JSON-LD sans TODO)
Phase 1.2 (business-data complète) → Phase 2 (design lit les vraies données)
Phase 1.6 (types questionnaire) → Phase 2.12 (checkboxes form)
Phase 3.2 (image OG Gabriel) → og:image fonctionnel
Phase 3.1 (séance photo Gabriel) → remplacement placeholders Phase 2.4
```

**Peut démarrer immédiatement sans attendre Gabriel :**
Toute la Phase 1 + toute la Phase 2 (placeholders visibles)

**Attend Gabriel :**
- Photos (3.1) → placeholders Phase 2.4
- Image OG (3.2) → og:image Phase 1.5
- Réseaux prêts (3.3) → footer Phase 2.9
- Clients consentants (3.4) → testimonials/transformations

---

## Reporté — Hors scope

- **Migration GitHub Actions** (TODO LATER) — retirer `NEXT_PUBLIC_BASE_PATH` quand le domaine est activé
- **Point 22** — Pages régionales SEO : réévaluer dans 6-12 mois
- **Logo** — Générer avec Google Studio, slot prévu dans le header
- **Email custom** `gabriel@nutrition-supreme.com` — configurer si Cloudflare email disponible
- **`testimonial.types.ts`** — créer seulement quand `testimonials.enabled` passe à `true`
