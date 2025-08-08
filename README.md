# Système Fluide - Fitness Tracking Application

**Rendre l'excellence physique accessible à tous grâce à un système de progression infini**

Système Fluide is a modern fitness tracking application built with Nuxt 4, Vue 3, and TypeScript. It provides a comprehensive platform for tracking daily fitness metrics including calories, macronutrients, body weight, steps, and workouts. The application follows a scientific-based progression system designed to help users achieve their ideal physical aesthetics with complete autonomy.

## ✨ Key Features

### 🎯 Fitness Tracking System
- **Daily Metrics**: Track calories, macronutrients (proteins, carbs, fats), body weight, and daily steps
- **Workout Logging**: Record training sessions with custom workout names
- **Progress Analytics**: Weekly averages and trends visualization
- **Dashboard Interface**: Clean, intuitive dashboard for daily data entry and monitoring

### 🏆 Core Philosophy
- **Infinite Progress System**: Adaptable methodology that evolves with your lifestyle
- **Complete Autonomy**: No rigid programs - full control over your fitness journey
- **Science-Based**: Built on recent scientific research and decades of coaching experience
- **Universal Application**: Suitable for all levels, ages, and genders

### 💻 Technical Features
- **Modern Framework**: Built with Nuxt 4 and Vue 3.5
- **TypeScript Support**: Full TypeScript integration with type checking
- **Responsive Design**: Beautiful UI with Tailwind CSS and dark mode support
- **PWA Ready**: Progressive Web App capabilities for mobile usage
- **State Management**: Pinia integration for reactive data handling
- **Performance Optimized**: Fast loading and smooth interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd systeme-fluide

# Install dependencies
npm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Generate static site (optional)
npm run generate

# Preview production build
npm run preview
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |
| `npx eslint .` | Run ESLint code quality checks |
| `npx vue-tsc --noEmit` | Run TypeScript type checking |

## 🛠 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **PWA**: [Vite PWA](https://vite-pwa-org.netlify.app/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Code Quality**: [ESLint](https://eslint.org/)
- **Utilities**: [VueUse](https://vueuse.org/)

## 📁 Project Structure

```
├── assets/           # Static assets (CSS, images, banner)
│   ├── css/         # Global styles and Tailwind imports
│   └── banner.png   # Hero section background image
├── components/       # Vue components
│   └── PatreonButton.vue # Patreon integration component
├── pages/           # Application pages (file-based routing)
│   ├── index.vue    # Homepage with hero and features
│   ├── about.vue    # About page with philosophy and FAQ
│   └── dashboard.vue # Main tracking dashboard
├── public/          # Public static assets
│   ├── favicon.ico  # Site favicon
│   └── robots.txt   # SEO robots configuration
├── app.vue          # Root application component
├── nuxt.config.ts   # Nuxt configuration with modules
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json    # TypeScript configuration
```

## 🎨 Design System

The application features a sophisticated design system built with Tailwind CSS:

### Visual Identity
- **Color Scheme**: Custom gradient-based color palette with dark mode support
- **Typography**: Clean, modern typography with French localization
- **Cards & Metrics**: Glass morphism effects with hover animations
- **Responsive**: Mobile-first design approach

### Key Components
- **Dashboard Cards**: Interactive metric tracking cards with hover effects
- **Form Inputs**: Modern input styling with focus states
- **Navigation**: Clean header with profile and navigation elements
- **Progress Visualization**: Weekly averages and trend displays

## 🧪 Testing

Run tests using Vitest:

```bash
npm test
```

## 📚 Documentation

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)

## 🎯 Application Pages

### Homepage (`/`)
- Hero section with mission statement and key statistics
- Feature overview (4 essential metrics: calories, weight, steps, workouts)
- Philosophy section explaining the infinite progression system
- Call-to-action sections with Patreon integration

### About Page (`/about`)
- Detailed explanation of the Système Fluide methodology
- Target audience breakdown (beginners, experienced users, coaches)
- Fundamental principles and FAQ section
- Scientific backing and philosophy

### Dashboard (`/dashboard`)
- Daily metrics input form (calories, macronutrients, weight, steps)
- Workout tracking with custom session names
- Real-time progress visualization
- Weekly averages and trends analysis

## 🚀 Deployment

This application can be deployed to various platforms:

- **Static Hosting**: Use `npm run generate` for JAMstack deployment
- **Server Deployment**: Use `npm run build` for full SSR capabilities
- **Vercel/Netlify**: Optimized for modern hosting platforms
- **PWA Support**: Install as a mobile application

Check the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for platform-specific instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
# systeme-fluide
