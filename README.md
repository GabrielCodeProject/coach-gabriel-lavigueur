# Coach Gabriel Lavigueur — site statique

Site marketing statique pour le coach fitness Gabriel Lavigueur, basé au Nutrition Suprême de Sainte-Thérèse. Next.js 16 en mode `output: "export"`, contenu géré via Decap CMS, déploiement GitHub Pages.

## Stack

- **Next.js 16** (App Router, Turbopack, static export)
- **React 19** + **TypeScript 5** strict
- **Tailwind CSS v4** (config inline, palette ambre chaud + charbon)
- **shadcn/ui** (preset `base-nova` — composants basés sur Base UI)
- **gray-matter** + **react-markdown** pour le chargement du contenu à la compilation
- **TanStack Form** + **Zod v4** pour le questionnaire
- **Web3Forms** pour la soumission du questionnaire (aucun serveur requis)
- **Decap CMS** pour l'édition visuelle du contenu via GitHub OAuth
- **Lucide React** pour les icônes (aucun emoji)

## Architecture

Le projet suit une séparation **MVC** stricte :

| Couche | Emplacement | Rôle |
|---|---|---|
| **Model** | `content/**/*.md`, `src/types/*.types.ts`, `src/lib/business-data.ts`, `src/lib/routes.ts`, `src/lib/constants.ts` | Contenu markdown, types TypeScript, SSOT (business, routes, constantes, env) |
| **Controller** | `src/lib/content/*`, `src/lib/schema/*`, `src/lib/seo/*`, `src/lib/forms/*` | Fonctions pures : chargement markdown, génération JSON-LD, construction des métadonnées, soumission de formulaire |
| **View** | `src/app/**/page.tsx`, `src/components/**/*.tsx` | Server Components par défaut ; client uniquement pour le questionnaire, le menu mobile et l'accordéon FAQ |

**Règle non négociable :** les composants ne lisent jamais `fs` directement — ils appellent toujours un loader de `src/lib/content/`. Les loaders ne retournent jamais de JSX.

## Scripts

```bash
pnpm dev          # Démarre le serveur de développement (Turbopack)
pnpm build        # Build statique (génère /out avec HTML + CSS + JS)
pnpm start        # Sert le build (non utilisé pour GitHub Pages)
pnpm lint         # ESLint (remplace l'ancien `next lint` retiré en Next 16)
pnpm typecheck    # Typecheck sans émettre
```

## Développement local

```bash
pnpm install
pnpm dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

**Arrête le serveur de dev après chaque session :**

```bash
fuser -k 3000/tcp 3001/tcp 3002/tcp 3003/tcp 2>/dev/null
```

## Variables d'environnement

Crée un fichier `.env.local` (non commité) avec :

```env
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=TODO_COLLER_LA_CLE_DEPUIS_WEB3FORMS
```

- `NEXT_PUBLIC_BASE_PATH` — vide en local. En production GitHub Pages, défini à `/coach-gabriel-lavigueur` dans les secrets d'Actions.
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — clé publique fournie par [web3forms.com](https://web3forms.com) (gratuit, 250 soumissions/mois).

## Contenu éditable

Tout le contenu est géré via **Decap CMS** accessible à `/admin/`. Les changements sont commités directement dans le dépôt GitHub, ce qui déclenche une reconstruction automatique.

### Configuration initiale de Decap (à faire une seule fois)

Decap utilise GitHub OAuth via un **proxy externe** (aucun serveur de notre côté). Étapes :

1. **Créer une app GitHub OAuth**
   - Va sur [github.com/settings/developers](https://github.com/settings/developers) → OAuth Apps → New OAuth App
   - Homepage URL : `https://gabrielcodeproject.github.io/coach-gabriel-lavigueur/`
   - Authorization callback URL : `https://coach-gabriel-oauth.onrender.com/callback` (le proxy que tu vas déployer)
   - Note le `client_id` et le `client_secret`

2. **Déployer le proxy OAuth sur Render.com** (gratuit)
   - Fork : [vencax/netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider)
   - Crée un nouveau **Web Service** sur Render pointant vers ce fork
   - Nom : `coach-gabriel-oauth`
   - Variables d'environnement Render :
     - `OAUTH_CLIENT_ID` = client_id GitHub
     - `OAUTH_CLIENT_SECRET` = client_secret GitHub
     - `ORIGIN` = `https://gabrielcodeproject.github.io`
   - Démarre le service

3. **Mettre à jour `public/admin/config.yml`**
   - Remplace `base_url:` par l'URL Render
   - Commite et pousse

4. **Tester** — visite `/admin/` sur le site déployé, connecte-toi avec GitHub, et vérifie que tu peux éditer une page.

### Structure du contenu

```
content/
├── pages/
│   ├── accueil.md
│   ├── a-propos.md
│   ├── ma-methode.md
│   ├── mes-services.md
│   ├── faq.md
│   ├── contact.md
│   ├── mentions-legales.md
│   └── politique-confidentialite.md
├── services/
│   ├── consultation-initiale.md
│   ├── plan-entrainement.md
│   ├── plan-nutrition.md
│   └── suivi.md
└── transformations/
    └── exemple-marie-l.md
```

Les images téléversées via Decap vont dans `public/images/uploads/`.

## Déploiement

Le déploiement est automatique via **GitHub Actions** à chaque push sur `main` (voir `.github/workflows/deploy.yml`).

### Secret GitHub à configurer

Dans **Settings → Secrets and variables → Actions**, ajoute :

- `WEB3FORMS_ACCESS_KEY` — la clé publique Web3Forms pour le questionnaire

### Activer GitHub Pages

**Settings → Pages → Source : GitHub Actions** (pas de branche `gh-pages`).

## TODOs avant mise en ligne

Ces éléments sont marqués `TODO` dans le code et doivent être complétés par Gabriel :

- [ ] Adresse exacte du Nutrition Suprême de Sainte-Thérèse → `src/lib/business-data.ts`
- [ ] Code postal, téléphone, courriel → `src/lib/business-data.ts`
- [ ] `src/public/admin/config.yml` — nom réel du dépôt GitHub + URL du proxy OAuth
- [ ] Certifications et années d'expérience → `src/lib/business-data.ts`
- [ ] Clé Web3Forms → variables d'environnement et secret GitHub
- [ ] Coordonnées Google Maps et src de l'iframe → `src/lib/business-data.ts`
- [ ] Horaires de consultation → `src/lib/business-data.ts`
- [ ] Au moins une vraie transformation client (avec photos) → via Decap
- [ ] Logo → `public/images/default/logo.png`
- [ ] Vraies photos avant/après pour l'exemple → `public/images/default/` ou via Decap

Pour voir toutes les mentions :

```bash
grep -r "TODO" src/ public/admin/
```

## Migration future vers VPS

Si Gabriel veut passer à l'auto-hébergement sur son VPS Ubuntu plus tard :

1. Acheter un nom de domaine et le pointer vers le VPS
2. Mettre à jour `src/lib/business-data.ts` → `contact.website`
3. Supprimer `NEXT_PUBLIC_BASE_PATH` du workflow (le site sera à la racine)
4. Ajouter un job Actions qui `rsync` le dossier `out/` vers le VPS après le build
5. Configurer Caddy/nginx sur le VPS pour servir `out/` avec TLS automatique
6. Re-héberger le proxy OAuth Decap en tant que container Docker sur le VPS
7. Mettre à jour l'URL du callback dans l'app GitHub OAuth et dans `config.yml`

Aucun changement de code source n'est requis — seulement de la configuration.

## Règles de développement

Ce projet suit les règles globales documentées dans `~/.claude/rules/` :

- **MVC** (`mvc.md`) — séparation Model/View/Controller stricte
- **SSOT** (`ssot.md`) — chaque pièce de connaissance a une seule source canonique
- **Workflow** (`workflow.md`) — lire 3 fichiers avant d'éditer, `pnpm build` avant de livrer, pas de sur-ingénierie
- **TypeScript** (`typescript.md`) — `type` plutôt que `interface`, pas d'enums, pas de `any`
- **Next.js** (`nextjs-patterns.md`) — Server Components par défaut, `PageProps<'/route'>` global
- **Styling** (`styling.md`) — mobile-first, `gap` plutôt que `space-y`, shadcn d'abord, pas d'emoji, pas de dégradé
- **Forms** (`forms.md`) — TanStack Form + Zod (le questionnaire utilise un `fetch` client plutôt que `next-safe-action` car le site est en export statique)
