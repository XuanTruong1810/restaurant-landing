# 🍝 Bella Vista Restaurant Landing Page

A modern, responsive restaurant landing page built with React, TypeScript, and Vite. Features a full-screen menu with 3D animations, testimonials, gallery, and contact information.

## 🌟 Features

- **Modern Design**: Clean, professional layout with Italian restaurant branding
- **3D Animations**: Interactive menu with stunning 3D effects and transitions
- **Full-Screen Menu**: Immersive menu experience with category filtering
- **Responsive Design**: Optimized for all devices and screen sizes
- **Star Ratings**: Enhanced testimonial system with visual star ratings
- **Clean Architecture**: Domain-driven design with separation of concerns
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test suite with Vitest
- **CI/CD**: Automated testing, building, and deployment

## 🚀 Live Demo

Visit the live website: [https://xuantruong1810.github.io/restaurant-landing/](https://xuantruong1810.github.io/restaurant-landing/)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS3 with custom properties, 3D transforms
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite with SWC
- **Package Manager**: Bun
- **Deployment**: GitHub Pages, Docker
- **CI/CD**: GitHub Actions

## 📦 Installation

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/XuanTruong1810/restaurant-landing.git
   cd restaurant-landing
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development server**

   ```bash
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

## 🏗️ Build & Deploy

### Local Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview

# Run tests
bun test

# Run linting
bun run lint
```

### GitHub Pages Deployment

The project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Manual Deployment:**

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Visit your GitHub Pages URL

### Docker Deployment

```bash
# Build Docker image
docker build -t restaurant-landing .

# Run container
docker run -p 80:80 restaurant-landing
```

## 📁 Project Structure

```
restaurant-landing/
├── src/
│   ├── components/          # React components
│   │   ├── Header/         # Navigation header
│   │   ├── Hero/           # Hero section
│   │   ├── MenuHighlights/ # Menu preview
│   │   ├── FullScreenMenu/ # 3D full-screen menu
│   │   ├── Gallery/        # Image gallery
│   │   ├── Testimonials/   # Customer reviews
│   │   └── ...
│   ├── domain/             # Domain entities and interfaces
│   ├── application/        # Use cases and business logic
│   ├── infrastructure/     # External services and repositories
│   ├── presentation/       # UI components and hooks
│   └── test/              # Test utilities and setup
├── .github/
│   └── workflows/         # CI/CD pipelines
├── public/                # Static assets
└── dist/                 # Build output
```

## 🎨 Key Components

### Full-Screen Menu

- **3D Animations**: Cards rotate and scale on hover
- **Category Filtering**: Appetizers, Pasta, Pizza, Mains, Desserts, Beverages
- **Interactive Details**: Click items for detailed view
- **Responsive Design**: Adapts to all screen sizes

### Star Rating System

- **Visual Stars**: Filled (★) and empty (☆) stars
- **Container Design**: Elegant boxes with golden accents
- **Responsive**: Scales appropriately on mobile

### 3D Effects

- **Card Transforms**: `rotateX`, `rotateY`, `scale` effects
- **Smooth Transitions**: Cubic-bezier easing functions
- **Hardware Acceleration**: Optimized for 60fps performance

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```env
VITE_API_URL=http://localhost:3000
VITE_CONTACT_EMAIL=info@bellavista.com
```

### GitHub Pages Configuration

The project is configured for GitHub Pages deployment with:

- Base path: `/restaurant-landing/`
- Automatic deployment on `main` branch pushes
- Custom domain support (optional)

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nguyễn Xuân Trường**

- GitHub: [@XuanTruong1810](https://github.com/XuanTruong1810)
- Email: 106485195+XuanTruong1810@users.noreply.github.com

## 🙏 Acknowledgments

- Design inspiration from modern Italian restaurants
- 3D animation techniques from CSS-Tricks community
- Clean Architecture principles by Robert C. Martin
- React and TypeScript best practices

---

⭐ **Star this repository if you found it helpful!**
