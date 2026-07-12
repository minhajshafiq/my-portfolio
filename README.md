# Portfolio Personnel - Minhaj Zubair

**Développeur Full-Stack passionné par Next.js, Spring Boot et React Native**

Un portfolio moderne et professionnel construit avec Next.js 15, TypeScript et Tailwind CSS, conçu pour présenter mes compétences et attirer les opportunités de CDI et de freelance.

## Structure du Projet

```text
my-portfolio/
|- app/                    # Routes, metadata, sitemap and manifest
|  `- [locale]/            # Pages FR/EN and shared localized layout
|- components/             # Reusable presentation components
|  |- analytics/           # Analytics and scroll tracking
|  |- layout/              # Header, footer and global loader
|  `- ui/                  # Design-system primitives and interactions
|- features/               # Components grouped by product domain
|  |- about/
|  |- contact/
|  |- cv/
|  |- home/
|  |- maintenance/
|  |- projects/
|  `- services/
|- data/                   # Project and offer content
|- hooks/                  # Shared React hooks and client stores
|- lib/                    # Framework-agnostic helpers
|  `- i18n/                # Locale configuration and server translations
|- locales/                # FR/EN translation dictionaries
`- public/                 # Static assets, media and favicons
```

Each feature exposes a small `index.ts` entry point. Routes therefore only compose pages and keep their SEO metadata close by.
## 🎨 Palette de Couleurs

```css
/* Couleurs principales */
--primary: #8C0605        /* Rouge principal */
--dark: #1F1F1F          /* Texte/fond sombre */
--light: #FFFFFF         /* Texte clair/fond clair */
--background-secondary: #F5F5F5  /* Sections */
--text-secondary: #B0A9A9        /* Textes secondaires */
```

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone https://github.com/minhajshafiq/my-portfolio.git
cd my-portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## ⚙️ Configuration

### Personnalisation

1. **Informations personnelles** : Modifier les données dans les composants
2. **Liens sociaux** : Mettre à jour les URLs dans `Header.tsx` et `Footer.tsx`
3. **Projets** : Éditer le tableau `projects` dans `Projects.tsx`
4. **Contact** : Configurer les méthodes de contact dans `Contact.tsx`

## 📱 Responsive Design

- **Mobile First** : Optimisé pour les petits écrans
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation** : Menu burger sur mobile
- **Images** : Optimisation automatique Next.js

## 🌐 Internationalisation

- **Français** : Langue par défaut
- **Anglais** : Traduction complète
- **Switch** : Bouton dans le header
- **Persistance** : Sauvegarde en localStorage

## ♿ Accessibilité

- **Navigation clavier** : Tous les éléments accessibles
- **Contrastes** : Respect des standards WCAG
- **Alt text** : Images avec descriptions
- **Focus visible** : Indicateurs de focus
- **Screen readers** : Structure sémantique

## 🔧 Scripts Disponibles

```bash
npm run dev          # Développement
npm run build        # Production
npm run start        # Serveur de production
npm run lint         # Linting
```

## 📈 Performance

- **Build de production vérifié** : pages statiques générées avec Next.js
- **Images optimisées** : formats AVIF/WebP servis par Next Image
- **Animations accessibles** : respect de `prefers-reduced-motion`
- **Mesure réelle** : Vercel Speed Insights et Analytics intégrés

## 🎯 Mes Projets

### Luxa
Application mobile de gestion budgétaire développée avec React Native/Expo, Clean Architecture et Supabase.

### Mets & Merveilles
Plateforme web de gestion de recettes avec Next.js, Spring Boot et PostgreSQL.

### Wuthering Waves Project
Site de présentation de jeu avec Next.js, GSAP et Tailwind CSS.

### Portfolio Personnel
Ce portfolio actuel, développé avec Next.js 15 et optimisé pour le SEO.

## 🤝 Contact

Je suis ouvert aux opportunités de collaboration et aux discussions professionnelles :

- 📧 **Email** : contact@minhajshafiq.com
- 💼 **LinkedIn** : [linkedin.com/in/minhajshafiq](https://www.linkedin.com/in/minhajshafiq/)
- 🐙 **GitHub** : [github.com/minhajshafiq](https://github.com/minhajshafiq)
- 🌐 **Portfolio** : [minhajshafiq.com](https://www.minhajshafiq.com)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ par Minhaj Zubair**

*Développeur Full-Stack | Next.js, Spring Boot, React Native*
