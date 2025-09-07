# 🎨 QrZen

<div align="center">
  <img src="./public/stylized-qr-code.png" alt="QrZen Logo" width="120" height="120">
  
  <p align="center">
    <strong>A beautiful, responsive QR code generator built with Next.js, React, and Tailwind CSS</strong>
  </p>
  
  <p align="center">
    <a href="https://qrzen.vercel.app">🌐 Live Demo</a> •
    <a href="#features">✨ Features</a> •
    <a href="#getting-started">🚀 Getting Started</a> •
    <a href="#usage">📱 Usage</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
  </p>
</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Real-time QR Generation**: Instant preview as you type with live updates
- **Multiple Export Formats**: High-quality PNG with logo support, crisp SVG for vectors
- **Logo Overlay**: Add your brand logo with customizable size and rounded corners
- **Advanced Customization**: Custom colors, adjustable margins, error correction levels
- **Copy to Clipboard**: One-click copying for quick sharing

### 🎨 Design & UX
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Smooth Animations**: Polished micro-interactions and transitions
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Modern UI**: Clean, professional interface built with Tailwind CSS

### 🔒 Privacy & Performance
- **Client-Side Only**: No data leaves your device - everything runs in the browser
- **Fast & Lightweight**: Optimized bundle size and performance
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **SEO Optimized**: Proper meta tags and structured data

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm** 8.0 or later (or **yarn**/**pnpm**)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/qrzen.git
   cd qrzen
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
qrzen/
├── public/                  # Static assets
│   └── stylized-qr-code.png # Hero image
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Home page with hero section
│   │   ├── generator/       # QR generator page
│   │   └── globals.css      # Global styles and CSS variables
│   ├── components/          # React components
│   │   ├── layout/          # Layout components (header, footer)
│   │   ├── qr/              # QR-specific components
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts (theme, QR settings)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript definitions
├── Configuration files      # Next.js, Tailwind, TypeScript configs
└── Documentation           # README, package.json
\`\`\`

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[qrcode](https://www.npmjs.com/package/qrcode)** - QR code generation library
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

## 📱 Usage

### Basic QR Code Generation

1. Navigate to the **Generator** page
2. Enter your content (URL, text, contact info, etc.)
3. Customize appearance:
   - **Colors**: Foreground and background colors
   - **Size**: From 128px to 1024px
   - **Margins**: Adjust quiet zone around QR code
   - **Error Correction**: L (Low), M (Medium), Q (Quartile), or H (High) levels

### Adding Logo Overlay

1. Click **"Upload Logo"** in the Branding section
2. Select PNG, JPG, WEBP, or SVG file (recommended: square images)
3. Adjust logo size (10% - 35% of QR width)
4. Set corner radius for rounded appearance
5. **Important**: Use higher error correction (Q or H) for better scanning with logos

### Export Options

- **PNG**: High-quality raster format with logo support, perfect for print and digital use
- **SVG**: Scalable vector format (logo-free), ideal for web and large-scale printing
- **Copy**: Direct clipboard copy for quick sharing in messages and documents

## 🎨 Customization

### Theme Configuration

Modify colors in `tailwind.config.js`:

\`\`\`js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add your custom colors
    }
  }
}
\`\`\`

### Default QR Settings

Update default settings in `src/contexts/qr-context.tsx`:

\`\`\`tsx
const defaultSettings: QRSettings = {
  text: "https://yoursite.com",
  size: 512,
  colorDark: "#your-brand-color",
  colorLight: "#ffffff",
  // ... other defaults
}
\`\`\`

### Custom Styling

- Global styles: `src/app/globals.css`
- Component styles: Tailwind classes in component files
- Dark mode: Automatic with `dark:` prefixes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push to main branch

### Other Platforms

\`\`\`bash
# Build for production
npm run build

# Start production server
npm run start
\`\`\`

### Environment Variables

Create `.env.local` for local development:

\`\`\`bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🧪 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking and IntelliSense
- **Prettier**: Code formatting (if configured)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add TypeScript types for new features
- Test your changes across different devices
- Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **QR Code Generation**: [qrcode](https://www.npmjs.com/package/qrcode) library
- **Icons**: [Lucide](https://lucide.dev/) icon library
- **Framework**: [Next.js](https://nextjs.org/) team
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) team
- **Inspiration**: Modern web design principles and accessibility standards

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/qrzen/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/qrzen/discussions)
- 📧 **Email**: hello@qrzen.dev

## 🌟 Show Your Support

If you find QrZen useful, please consider:

- ⭐ **Starring** the repository
- 🐦 **Sharing** on social media
- 🤝 **Contributing** to the project
- 📝 **Writing** a review or blog post

---

<div align="center">
  <p>Made with ❤️ by the QrZen team</p>
  <p>
    <a href="https://github.com/yourusername/qrzen">⭐ Star on GitHub</a> •
    <a href="https://twitter.com/qrzen">🐦 Follow on Twitter</a>
  </p>
</div>
\`\`\`

```typescriptreact file="package.json"
[v0-no-op-code-block-prefix]{
  "name": "qrzen",
  "version": "1.0.0",
  "description": "A beautiful QR code generator built with Next.js, React, and Tailwind CSS, now known as QrZen",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "autoprefixer": "^10.4.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "geist": "^1.3.1",
    "input-otp": "1.4.1",
    "lucide-react": "^0.294.0",
    "next": "^14.0.0",
    "next-themes": "^0.4.4",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-hook-form": "^7.54.1",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.6",
    "zod": "^3.24.1",
    "qrcode": "^1.5.3"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/qrcode": "^1.5.5",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  },
  "keywords": [
    "qr-code",
    "generator",
    "react",
    "nextjs",
    "tailwindcss",
    "typescript"
  ],
  "author": "QrZen Team",
  "license": "MIT",
  "homepage": "https://qrzen.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/qrzen/qrzen.git"
  },
  "bugs": {
    "url": "https://github.com/qrzen/qrzen/issues"
  }
}
