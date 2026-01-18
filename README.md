# 🌍 SafarSetu - Travel Itinerary Builder

> **Version 1.3.0** - A modern, feature-rich Progressive Web App for planning personalized travel itineraries

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success)](https://web.dev/progressive-web-apps/)
[![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Enabled-blue)](https://tailwindcss.com/docs/dark-mode)
[![Offline Support](https://img.shields.io/badge/Offline-Supported-green)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook)

## ✨ Features

### 🎯 Core Features
- **Smart Itinerary Generation** - AI-powered day-by-day planning
- **Budget Tracking** - Comprehensive cost estimation and breakdown
- **Interactive Maps** - Visualize your entire trip with color-coded markers
- **Weather Forecasts** - 7-day weather predictions for your destination
- **PDF Export** - Professional downloadable itineraries

### 🚀 Advanced Features
- **📱 Progressive Web App** - Install on any device, works offline
- **🌙 Dark Mode** - Eye-friendly theme with smooth transitions
- **🎯 Drag & Drop** - Reorder activities with intuitive gestures
- **🔍 Search & Filter** - Find activities by name, category, or cost
- **🖨️ Print Optimized** - Clean, professional print layouts
- **⌨️ Keyboard Shortcuts** - Power user navigation (Ctrl+H, Ctrl+P, etc.)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 PWA Installation

### Desktop
1. Visit the site in Chrome/Edge
2. Click the install icon in the address bar
3. Enjoy the standalone app experience!

### Mobile
1. Open in browser
2. Tap "Add to Home Screen"
3. Access like a native app!

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+H` | Go to Home |
| `Ctrl+P` | Plan New Trip |
| `Ctrl+S` | View Saved Trips |
| `Ctrl+K` | Focus Search |
| `Esc` | Close Modal |
| `?` | Show All Shortcuts |

## 🎨 Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Maps:** Leaflet
- **PDF Generation:** jsPDF
- **Drag & Drop:** @dnd-kit
- **PWA:** vite-plugin-pwa + Workbox
- **Icons:** Lucide React

## 📦 Project Structure

```
safarsetu/
├── src/
│   ├── components/
│   │   ├── itinerary/      # Itinerary-related components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React contexts (Theme)
│   ├── data/               # Static data (activities)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── store/              # Zustand store
│   └── utils/              # Utility functions
├── public/                 # Static assets
└── vite.config.js         # Vite + PWA configuration
```

## 🌟 Key Features Breakdown

### 💰 Budget Calculator
- Automatic cost estimation for activities, meals, accommodation
- Per-person and total trip costs
- Visual breakdown with progress bars
- Smart insights and money-saving tips

### 🗺️ Interactive Maps
- Color-coded markers for each day
- Suggested routes with polylines
- Interactive popups with activity details
- Auto-zoom to fit all locations

### 📄 PDF Export
- Professional formatting
- Complete trip details
- All activities with descriptions
- Notes and reminders included

### 🎯 Drag & Drop
- Reorder activities within days
- Smooth animations
- Auto-save changes
- Visual feedback

### 🔍 Search & Filter
- Real-time search
- Filter by category (culture, food, adventure, etc.)
- Filter by cost level ($, $$, $$$)
- Combine multiple filters

## 🌙 Dark Mode

Toggle between light and dark themes with the sun/moon icon in the navbar. Your preference is saved automatically!

## 📱 Offline Support

SafarSetu works offline! Once installed as a PWA:
- ✅ View saved itineraries
- ✅ Access all pages
- ✅ Cached weather data (6 hours)
- ⚠️ Creating new trips requires internet

## 🖨️ Printing

Press `Ctrl+P` (or `Cmd+P` on Mac) to print your itinerary with:
- Clean, professional layout
- Smart page breaks
- Hidden UI elements
- Optimized for A4 paper

## 🎯 Usage

1. **Plan a Trip**
   - Enter destination, dates, and travelers
   - Select travel style and budget
   - Generate personalized itinerary

2. **Customize**
   - Drag activities to reorder
   - Add personal notes
   - Remove unwanted activities
   - View on interactive map

3. **Save & Share**
   - Save itineraries locally
   - Export as PDF
   - Print for offline use
   - Install as PWA for quick access

## 🔧 Configuration

### PWA Settings
Edit `vite.config.js` to customize:
- App name and description
- Theme colors
- Icons
- Caching strategies

### Theme Colors
Edit `tailwind.config.js` to customize:
- Primary colors
- Secondary colors
- Dark mode colors

## 📊 Performance

- ⚡ **Fast Loading** - Optimized with Vite
- 💾 **Small Bundle** - Code splitting
- 🚀 **Instant Updates** - Service worker
- 📱 **Mobile Optimized** - Responsive design

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data from [Open-Meteo API](https://open-meteo.com/)
- Maps powered by [Leaflet](https://leafletjs.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

Created by Krishna Sharma - Feel free to reach out!

---

**Made with ❤️ for travelers worldwide**

*SafarSetu - Your bridge to perfect travel planning* 🌉✈️
