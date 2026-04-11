# Plan d'améliorations — Coach Gabriel Lavigueur

Chaque point a été discuté, critiqué, et approuvé avant d'être documenté ici.
Ce fichier sert de base pour le plan d'implémentation final.

---

## Point 1 — Héro : ancre visuelle (photo de Gabriel)

**Problème:** Le héro est 100% texte. En coaching personnel, le coach est le produit. Sans photo, le visiteur ne sait pas à qui il parle.

**Consensus:**
- Layout : split layout — texte à gauche, photo portrait à droite
- Photo principale (héro) : Gabriel debout dans son bureau, format portrait, ton professionnel mais accessible
- Photo gym : réservée pour la section "Ma méthode" ou "À propos" — contexte plus pertinent
- Séance photo à planifier avec 4 livrables minimum :
  1. Portrait debout au bureau (héro)
  2. Photo "en action" au bureau (consultation, plan ouvert)
  3. Photo au gym (sections secondaires)
  4. Formats portrait ET paysage pour les deux layouts

**Implémentation technique:**
- Modifier le composant héro pour un split layout `lg:grid-cols-2`
- Slot image à droite avec `next/image` (placeholder → vraie photo après séance)
- Conserver le texte + CTA existant à gauche
- Responsive : photo passe en arrière-plan semi-transparent sur mobile (ne pas cacher)

---

---

## Point 2 — Preuve sociale au-dessus du fold

**Problème:** Aucun signal de crédibilité visible avant de scroller. Les visiteurs quittent avant d'atteindre la section Transformations.

**Consensus:**
- Ne PAS afficher "13 ans d'expérience" seul — trompeur (c'est 13 ans de pratique personnelle sous coaching, pas de coaching de clients)
- Transformer ce vécu en actif de différenciation : Gabriel a été client 13 ans → il connaît exactement ce que vit quelqu'un qui commence
- Stats honnêtes à afficher : `13 ans de pratique · 3 transformations · Sainte-Thérèse`
- Ajouter une ligne narrative dans le sous-titre du héro qui exploite ce vécu :
  > *"Pratiquant depuis 13 ans, j'ai vécu chaque étape de ta transformation avant de t'y accompagner."*

**Implémentation technique:**
- Ajouter une rangée de 3 stats (`StatBar` component) dans ou juste sous le héro
- Stats définies dans `business-data.ts` pour respecter le SSOT
- Sous-titre du héro mis à jour avec la ligne narrative
- Mettre à jour `business-data.ts` avec les vraies valeurs (années, transformations, localisation)

---

---

## Point 3 — Pricing sur le homepage

**Problème:** Les visiteurs quittent sans jamais cliquer sur "Mes services" pour voir les prix.

**Consensus:**
- Ne PAS afficher les prix sur le homepage — le visiteur qui voit un prix avant de comprendre la valeur juge sur le prix seul, ce qui nuit à la conversion
- L'ordre correct : valeur → crédibilité → prix (la page services joue ce rôle)
- Résoudre la discoverabilité autrement : ajouter un bloc teaser "services" sur le homepage avec nom + valeur promesse de chaque service, sans prix, avec un CTA fort vers la page dédiée
- Exemple de teaser : "Consultation initiale — On établit ton point de départ ensemble" × 4 services → "Voir les tarifs et détails"

**SSOT critique (prix changent 1-2x par an) :**
- Tous les prix doivent vivre UNIQUEMENT dans `business-data.ts`
- Zéro hardcode de prix dans les composants
- Une seule ligne à changer lors de chaque augmentation, tout le site suit

**Implémentation technique:**
- Ajouter section `ServiceTeaser` sur le homepage (après méthode et transformations)
- Composant lit les services depuis `business-data.ts` — nom + description courte seulement
- CTA : "Voir les tarifs et détails" → `/services`
- Audit `business-data.ts` pour confirmer que tous les prix sont centralisés

---

---

## Point 4 — Copy du CTA principal

**Problème:** "Remplir mon questionnaire" est mécanique et sans invitation. Décrit l'action, pas la promesse.

**Consensus:**
- CTA principal : **"Dis-moi où tu en es"**
- Raison : rencontre le visiteur là où il est (même confus, sans objectif clair) — cohérent avec le positionnement de coach qui a vécu le parcours client
- Tutoiement assumé partout sur le site — audit complet à faire lors de l'implémentation
- Ton cible : coach-ami-confident-professionnel (intime mais sérieux)

**Implémentation technique:**
- Remplacer toutes les occurrences du CTA par "Dis-moi où tu en es"
- Audit tutoiement/vouvoiement sur toutes les pages et composants
- Le CTA est défini dans `business-data.ts` (SSOT) — une seule source pour le texte du bouton principal

---

---

## Point 5 — Témoignages invisibles sans visiter la page Transformations

**Problème:** L'unique témoignage (Marie L., fictif) est enterré sur la page Transformations. Aucun signal de confiance client visible sur le homepage.

**Consensus:**
- Aucun témoignage fictif visible publiquement — honnêteté prioritaire
- Section témoignages construite mais désactivée via flag `enabled: false` dans `business-data.ts`
- Activation simple quand un client accepte de témoigner : changer le flag + ajouter la vraie citation
- Placeholder temporaire sur le homepage : citation philosophique de Gabriel lui-même
  > *"Je ne vends pas une transformation express. Je construis avec toi les habitudes qui durent."*
  > — Gabriel Lavigueur, coach

**Implémentation technique:**
- Ajouter `testimonials: { enabled: boolean, items: [...] }` dans `business-data.ts`
- Section témoignages sur homepage conditionnelle sur `testimonials.enabled`
- Composant `PhilosophyQuote` visible tant que `enabled: false` (citation de Gabriel)
- Marie L. retirée ou marquée `visible: false` dans les données

---

---

## Point 6 — CTA banner identique sur toutes les pages

**Problème:** Le même "Prêt à commencer?" apparaît en bas de chaque page — opportunité de conversion manquée selon le contexte du visiteur.

**Consensus:**
- CTA banner contextuel pour chaque page — titre + sous-texte adaptés
- Bouton uniforme partout : **"Dis-moi où tu en es"** (cohérence + pas de confusion)
- Page Contact : pas de CTA banner (redondant)

**Copy par page :**

| Page | Titre | Sous-texte |
|---|---|---|
| Accueil | Ton point de départ existe déjà | Tu n'as pas besoin d'être prêt — juste honnête sur où tu en es. |
| À propos | Tu sais qui je suis | Maintenant dis-moi qui tu es et où tu veux aller. |
| Ma méthode | Tu connais comment je travaille | La prochaine étape, c'est toi. |
| Mes services | Le bon service pour toi est là | Choisis ton point d'entrée — on ajuste ensemble. |
| Transformations | Leur point de départ ressemblait peut-être au tien | La seule différence, c'est qu'ils ont envoyé le premier message. |
| FAQ | Tu as encore des questions ? | Je te réponds personnellement — pas un bot, pas un template. |

**Implémentation technique:**
- Composant `CtaBanner` accepte des props `title`, `subtitle`, `buttonText`
- Chaque page définit son propre copy dans ses métadonnées ou directement dans la page
- Bouton hardcodé à "Dis-moi où tu en es" comme valeur par défaut (peut être surchargé)
- Supprimer le CTA banner de la page Contact

---

---

## Point 7 — Toutes les sections ont le même rythme visuel

**Problème:** Chaque section suit eyebrow → h2 → paragraphe → grille. Aucune variation, la page ressemble à un template.

**Consensus:**
- Une seule section brise le pattern — suffisant pour donner l'impression d'une page construite avec intention
- Section choisie : la rangée de stats de crédibilité (point 2) — fond légèrement contrasté, chiffres en grand, layout horizontal
- Toutes les autres sections restent cohérentes — pas de sur-design

**Instructions pour `/frontend-design:frontend-design` :**
- La section stats (StatBar) doit avoir un fond `bg-muted` ou une variante légèrement plus claire/contrastée que le fond charcoal principal
- Layout horizontal centré : 3 stats côte à côte séparées par un divider vertical subtil
- Chiffres en typographie grande (`text-4xl` ou `text-5xl`), label en petit en dessous
- Aucun card, aucune ombre — flat, propre, aéré
- Cette section est le seul "break" visuel de la page — ne pas répliquer le traitement sur d'autres sections

---

---

## Point 8 — Aucune photo sur le site

**Problème:** Tous les emplacements d'image sont des placeholders invisibles ou absents. Le site paraît inachevé.

**Consensus:**
- Séance photo à planifier avec shot list précise — arriver préparé pour ne rien manquer
- Shot list minimale validée :
  1. Portrait debout au bureau — format portrait, regard caméra (héro)
  2. "En action" au bureau — plan ouvert devant toi, semi-profil (à propos)
  3. Au gym — mouvement de démonstration ou supervision (méthode)
  4. Intérieur Nutrition Suprême — ambiance, espace de travail (à propos / contact)
  5. Portrait décontracté — sourire, moins formel (à propos)
- Photos avant/après clients : uniquement avec consentement écrit, pas avant

**Instructions pour `/frontend-design:frontend-design` :**
- Tous les emplacements photo doivent afficher un placeholder VISIBLE — pas de div vide, pas de fond invisible
- Placeholder style : fond `bg-muted` avec un label centré indiquant le shot attendu (ex: "Photo — Portrait bureau") et une icône `ImageIcon` de Lucide
- Les placeholders doivent respecter les ratios d'image finaux (ex: portrait = `aspect-[3/4]`, paysage = `aspect-video`)
- L'objectif est de tester et valider le layout AVANT que les vraies photos soient disponibles
- Emplacements à créer : héro (split droit), à propos (sidebar + section méthode), page méthode (accompagnement visuel), page transformations

---

---

## Point 9 — Section Fitlog trop centrée sur l'outil

**Problème:** La section vend l'app Fitlog plutôt que l'expérience client. Screenshots impossibles (droits tiers), et l'outil n'est pas la valeur — ce qu'il permet l'est.

**Consensus:**
- Refocaliser la section sur l'expérience client, pas sur l'outil
- Fitlog = outil de livraison mentionné discrètement, pas le sujet principal
- Nouveau titre de section : "Ton coaching dans ta poche" ou "Toujours connecté"
- Contenu : 3 bénéfices client concrets
  1. Accède à ton plan d'entraînement et nutrition n'importe quand, depuis ton téléphone
  2. Envoie un message directement dans l'app — pas de SMS perdu, pas d'email ignoré
  3. Vois tes métriques évoluer semaine après semaine
- "via l'application Fitlog" mentionné une seule fois comme note de livraison

**Instructions pour `/frontend-design:frontend-design` :**
- Aucun screenshot, aucun mockup — icônes Lucide uniquement (ex: `Smartphone`, `MessageCircle`, `TrendingUp`)
- Layout : 3 cartes horizontales ou grille `grid-cols-3`
- Ton sobre et factuel — pas de marketing excessif sur l'outil
- Retirer toute mise en avant visuelle de la marque Fitlog (logo, couleurs de marque)

---

---

## Point 10 — Liens réseaux sociaux absents

**Problème:** Aucun lien vers les réseaux dans le header ou footer. Beaucoup de visiteurs cherchent un coach sur les réseaux avant de s'engager.

**Consensus:**
- Aucun lien social ajouté pour l'instant — comptes pas encore prêts (Facebook en reformatage, Instagram personnel/irrégulier)
- Un compte fantôme ou personnel fait plus de mal que de bien à la crédibilité
- Emplacement réservé dans le footer — slot prévu mais inactif
- Condition pour activer : Facebook professionnel finalisé + minimum 12 posts coaching sur Instagram
- Activation via flag `enabled` par réseau dans `business-data.ts` (SSOT)

**Instructions pour `/frontend-design:frontend-design` :**
- Footer : prévoir les icônes de réseaux (Instagram, Facebook) avec `enabled: false` — affichage conditionnel
- Quand désactivés : ne pas rendre les icônes du tout (pas de liens morts)
- Structure dans `business-data.ts` : `socials: [{ platform: "instagram", url: "...", enabled: false }]`

---

---

## Point 11 — Étapes de la méthode plates sur mobile

**Problème:** `lg:grid-cols-5` fonctionne sur desktop mais sur mobile les étapes s'empilent sans sens de progression — le visiteur ne ressent pas le processus.

**Consensus:**
- Desktop : grid horizontal `lg:grid-cols-5` inchangé
- Mobile : timeline verticale minimaliste — communique la progression sans complexité
- Contenu des 5 étapes inchangé, déjà finalisé

**Instructions pour `/frontend-design:frontend-design` :**
- Mobile : ligne verticale `border-l-2` en couleur primaire orange à gauche
- Chaque étape : numéro cerclé (`rounded-full bg-primary text-primary-foreground`) positionné sur la ligne
- Layout mobile : `flex flex-col gap-8` avec la ligne en `relative` + pseudo-element ou div absolue
- Aucune animation, aucun scroll effect — statique, lisible, accessible
- Breakpoint : `hidden lg:grid` pour le grid, `lg:hidden` pour la timeline

---

---

## Point 12 — "Questionnaire" dans le nav trop vague

**Problème:** Le bouton CTA du header dit "Questionnaire" — un visiteur qui arrive pour la première fois ne sait pas ce que ça veut dire.

**Consensus:**
- Bouton nav : **"Commencer"** — court, implique une action, pas de mécanisme décrit
- CTA de page : "Dis-moi où tu en es" (point 4) — plus long, contexte différent
- Les deux mènent au questionnaire — copy différent selon le contexte d'affichage

**Implémentation technique:**
- Mettre à jour le composant nav pour afficher "Commencer" au lieu de "Questionnaire"
- Texte défini dans `business-data.ts` ou dans les constantes de navigation (SSOT)

---

---

## Point 13 — Section certifications vide sur la page À propos

**Problème:** `credentials: ["TODO..."]` caché par rendu conditionnel. Sidebar presque vide alors que Gabriel a des credentials réels et forts.

**Contexte révélé :**
- Diplômé de l'Institut AAT (fondé par Mathieu Bouchard — nom reconnu au Québec, aucune mention directe sur le site)
- La formation a confirmé et structuré 13 ans de pratique personnelle
- Coach au sein de l'équipe Nutrition Suprême — Fred y est très connu, l'association transfère automatiquement la crédibilité sans nommer personne
- Aucune autorisation du propriétaire pour le mentionner comme mentor → ne pas nommer

**Consensus:**
- Sidebar À propos, section **"Formation"** : *"Diplômé de l'Institut AAT — formation qui a confirmé 13 ans de pratique personnelle"*
- Sidebar À propos, section **"Équipe"** : *"Coach au sein de l'équipe Nutrition Suprême, Sainte-Thérèse"*
- Aucune mention du propriétaire, aucune mention de Fred — l'association Nutrition Suprême parle d'elle-même
- Narrative fil rouge (page À propos) : praticien 13 ans → certifié AAT → intégré dans l'équipe Nutrition Suprême

**Impact sur Point 2 — Stats héro mises à jour :**
`Certifié Institut AAT · 13 ans de pratique · 3 transformations`

**Implémentation technique:**
- Remplacer le TODO dans `business-data.ts` par les vraies credentials
- Activer le rendu conditionnel de la section credentials (retirer la condition qui la cache)
- Mettre à jour le copy de la page À propos avec la narrative fil rouge

---

---

## Point 14 — Le copy ne décrit pas l'état "avant" du client

**Problème:** Le site décrit ce que Gabriel livre, pas ce que le visiteur ressent en ce moment. Aucune reconnaissance émotionnelle avant la proposition de valeur.

**Profils clients réels identifiés :**
- Couple : lui 7 ans de relâchement, remise en forme complète — elle coureuse devenue molle, veut la nutrition et le renforcement
- Tatoueur : utilisait TikTok pour s'entraîner sans structure, a pris de la masse avec un vrai plan, maintenant en première cut
- Fil commun : tous essayaient quelque chose, manquaient de structure adaptée à leur réalité, pas de motivation

**Différenciation Gabriel :** Plan personnalisé parce qu'il connaît la réalité du client — pas un template.

**Consensus — Copy en deux niveaux :**

**Niveau 1 — Sous-titre héro (visible tous écrans) :**
> *"Les plans génériques ne fonctionnent pas parce qu'ils ne te connaissent pas. Moi, je vais te connaître."*

**Niveau 2 — Body text héro (desktop seulement, `hidden md:block`) :**
> *"T'as essayé. T'as recommencé. T'as suivi des plans qui ne tenaient pas compte de ta vraie vie. Je construis avec toi la structure qui dure — pas un template, ton plan."*

- "Before state" développé davantage dans la page À propos
- Mobile : sous-titre seul suffit — body text masqué (`hidden md:block`)

**Instructions pour `/frontend-design:frontend-design` :**
- Hiérarchie héro : Titre → Sous-titre (niveau 1) → Body text `hidden md:block` (niveau 2) → Stats bar → CTA
- Le body text doit être stylistiquement distinct du sous-titre : taille plus petite, couleur `text-muted-foreground`

---

---

## Point 15 — FAQ isolée, peu visible

**Problème initial:** FAQ enterrée, les visiteurs n'y vont pas spontanément.

**Consensus:**
- Aucune FAQ inline sur les pages — aucune objection identifiée par les vrais prospects, donc pas de problème à résoudre
- Les clients arrivent déjà convaincus (bouche-à-oreille, écosystème Nutrition Suprême)
- Ajouter du contenu FAQ spéculatif = over-engineering inutile
- FAQ page gardée telle quelle — visibilité via nav + footer suffisante
- Seul ajout : lien discret vers la FAQ sur la page Contact (*"Une question avant de commencer ? Consulte la FAQ"*)
- Réévaluer si des objections concrètes émergent avec de nouveaux prospects

**Implémentation technique:**
- Ajouter un lien textuel vers `/faq` sur la page Contact, sous le formulaire

---

---

## Point 16 — Champs TODO dans business-data.ts affectent le SEO local

**Problème:** Schéma `LocalBusiness` JSON-LD incomplet — adresse, coordonnées GPS, téléphone, email vides. SEO local Google Maps non fonctionnel.

**Consensus:**
- Adresse + coordonnées GPS : recherche en ligne lors de l'implémentation (Nutrition Suprême Sainte-Thérèse)
- Téléphone : numéro de la boutique Nutrition Suprême (vérifier que le staff peut transférer les appels pour Gabriel)
- Email : `gabrielprivermsg@gmail.com` pour l'instant
- Migration email → adresse custom (`gabriel@tondomaine.ca`) dès acquisition du domaine (Point 18, dépendance)
- Priorité haute — ROI SEO le plus élevé de toute la liste

**Implémentation technique:**
- Remplir tous les champs TODO dans `business-data.ts` : adresse, coordonnées, téléphone, email
- Vérifier que le JSON-LD `LocalBusiness` est bien injecté dans le `<head>` de chaque page
- Aucun champ vide ou placeholder restant après implémentation

---

---

## Point 17 — Aucune analytics

**Problème:** Aucune donnée sur les visiteurs — impossible de savoir d'où ils viennent, ce qu'ils font, et si le CTA convertit.

**Consensus:**
- Solution retenue : **Umami Analytics** — tier gratuit sur umami.is
- 3 sites, 10 000 événements/mois inclus — largement suffisant pour un site solo en démarrage
- Privacy-first, aucune bannière de consentement requise (RGPD/Québec compliant)
- Données prioritaires à suivre : pages vues, source de trafic, clics CTA

**Implémentation technique:**
- Créer un compte umami.is + ajouter le site lors de l'implémentation
- Injecter le script Umami dans `layout.tsx` (script tag léger, non bloquant)
- Aucune configuration complexe — analytics de base suffisants au démarrage

---

---

## Point 18 — Site sur un sous-domaine GitHub Pages non professionnel

**Problème:** `gabrielcodeproject.github.io/coach-gabriel-lavigueur` — difficile à mémoriser, impossible à partager professionnellement.

**Consensus:**
- Domaine retenu : **`coachgab.nutrition-supreme.com`** — subdomain Cloudflare
- Gabriel contrôle `nutrition-supreme.com` (créateur du site de la boutique) — aucune dépendance
- Double bénéfice : gratuit + crédibilité Nutrition Suprême transférée au domaine
- Upgrade email à considérer : `gabriel@nutrition-supreme.com` → remplace `gabrielprivermsg@gmail.com` (dépendance Point 16)

**Implémentation technique:**
- Créer enregistrement CNAME dans Cloudflare : `coachgab` → `gabrielcodeproject.github.io`
- Ajouter fichier `CNAME` dans `/public` avec `coachgab.nutrition-supreme.com`
- Mettre à jour `basePath` et `assetPrefix` dans `next.config.js` si nécessaire
- Activer HTTPS via Cloudflare (automatique)
- Mettre à jour l'URL canonique dans les métadonnées SEO et JSON-LD

---

---

## Point 19 — Image OG manquante pour les partages sociaux

**Problème:** `share-default.jpg` absent — liens partagés sur Facebook, Instagram, iMessage affichent un carré vide.

**Consensus:**
- Image OG : créer avec **Canva gratuit** lors de l'implémentation
- Contenu : fond charcoal · "Gabriel Lavigueur" en grand · "Coach nutrition & entraînement — Sainte-Thérèse" · accent orange · format 1200×630px
- Logo site : reporté — à intégrer quand généré avec Google Studio (AI), slot prévu dans le header à ce moment
- Header actuel : nom en texte "Gabriel Lavigueur", inchangé jusqu'à la création du logo

**Implémentation technique:**
- Créer l'image OG sur Canva et placer dans `public/images/default/share-default.jpg`
- Vérifier que les balises `og:image` dans les métadonnées pointent vers cette image
- URL absolue dans la balise OG (utiliser le nouveau domaine `coachgab.nutrition-supreme.com`)

---

---

## Point 20 — Aucun mécanisme de réservation de créneau

**Problème:** Flow actuel multi-échanges pour fixer un rendez-vous : questionnaire → contact → négociation de créneau par messages.

**Consensus:**
- Pas de Calendly ni système de booking automatique — trop déshumanisant pour un service en personne personnalisé
- Ajouter au questionnaire un champ disponibilités : cases à cocher (matin / après-midi / soir + jours de la semaine)
- Gabriel contacte ensuite pour confirmer — l'humain reste dans la boucle
- Réévaluer si les consultations Zoom deviennent régulières

**Implémentation technique:**
- Ajouter section "Disponibilités" dans le formulaire questionnaire
- Checkboxes : Matin / Après-midi / Soir (plages horaires) + Lundi→Dimanche (jours)
- Champ optionnel — ne pas bloquer la soumission si non rempli

---

---

## Point 21 — Page Transformations trop sparse, contenu fictif

**Problème:** Une seule transformation fictive (Marie L.) — nuit à la crédibilité. Aucun client prêt à partager des before/after pour l'instant.

**Consensus:**
- Page repositionnée : "Ma vision des résultats" — philosophie de Gabriel sur la transformation réelle
- Marie L. retirée complètement
- Contenu : ce qu'une vraie transformation représente, attentes réalistes, approche long terme vs résultats rapides
- Section transformation cards désactivée via `transformations: { enabled: false }` dans `business-data.ts` — même pattern que Point 5
- Activation simple quand vrais clients prêts : changer le boolean + ajouter les vraies histoires
- Structure de données des cartes conservée dans le code — prête à accueillir du vrai contenu

**Instructions pour `/frontend-design:frontend-design` :**
- La page affiche le contenu philosophique de Gabriel en tout temps
- La section cartes before/after est conditionnelle sur `transformations.enabled`
- Quand désactivée : aucune carte vide ni placeholder visible — section absente proprement

---

---

## Point 22 — Pages régionales pour le SEO local

**Concept:** Pages dédiées par ville desservie (ex: `/regions/blainville`) pour apparaître dans les recherches Google géographiques comme "coach nutrition Blainville."

**Consensus:**
- Reporté à 6-12 mois minimum — over-engineering prématuré au stade actuel
- Les clients viennent du bouche-à-oreille et de Nutrition Suprême, pas de recherches Google locales pour l'instant
- Rien à implémenter — ni structure, ni contenu
- Réévaluer quand le site de base est solide, converti bien, et que la croissance organique devient un objectif actif
