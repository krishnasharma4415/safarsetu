# SafarSetu - Travel Itinerary Builder

**SafarSetu** is a modern travel itinerary builder built with React, Vite, and Tailwind CSS. Create personalized, day-by-day travel plans with an intuitive interface, interactive maps, and weather forecasts.

---

## 🌟 Key Features

- **Smart Trip Planning**: Generate personalized itineraries based on destination, dates, travel style, and budget
- **Interactive Maps & Weather**: View destinations on OpenStreetMap with 7-day weather forecasts
- **Full Customization**: Edit activities, add notes, and manage day-by-day schedules
- **Local Persistence**: Save itineraries locally without needing a backend
- **Responsive Design**: Mobile-first UI with smooth animations and modern aesthetics

---

## 🏗 Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Home   │  │   Plan   │  │ Itinerary│  │  Saved   │       │
│  │   Page   │  │  Trip    │  │   View   │  │  Trips   │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
└───────┼─────────────┼─────────────┼─────────────┼──────────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                      │
        ┌─────────────▼──────────────┐
        │   REACT ROUTER (v6)        │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │   ZUSTAND STORE            │
        │  ┌──────────────────────┐  │
        │  │ • Trip Details       │  │
        │  │ • Current Itinerary  │  │
        │  │ • Saved Itineraries  │  │
        │  └──────────────────────┘  │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │   PERSISTENCE LAYER        │
        │  ┌──────────────────────┐  │
        │  │  LocalStorage        │  │
        │  │  (24hr cache)        │  │
        │  └──────────────────────┘  │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │   UTILITIES & SERVICES     │
        │  ┌──────────────────────┐  │
        │  │ Itinerary Generator  │  │
        │  │ API Client           │  │
        │  │ Mock Data Fallback   │  │
        │  └──────────────────────┘  │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │   EXTERNAL APIS            │
        │  ┌──────────────────────┐  │
        │  │ • GeoDB Cities       │  │
        │  │ • Open-Meteo         │  │
        │  │ • OpenStreetMap      │  │
        │  │ • Unsplash           │  │
        │  │ • OpenTripMap        │  │
        │  └──────────────────────┘  │
        └────────────────────────────┘
```

### Architecture Highlights

**Frontend Stack:**
- React 19 + Vite for fast development
- Zustand for lightweight state management
- Tailwind CSS for responsive styling
- Leaflet.js for interactive maps

**Data Flow:**
1. User inputs trip details → Zustand store
2. Itinerary generator processes preferences
3. API calls fetch real-time data (with fallbacks)
4. Results cached in LocalStorage
5. UI updates with optimistic rendering

**Key Design Decisions:**
- **Frontend-only**: No backend required, perfect for static hosting
- **Offline-first**: LocalStorage + API fallbacks ensure reliability
- **Deterministic generation**: Predictable, rule-based itinerary creation
- **Graceful degradation**: Mock data when APIs fail

---

## 🚀 Quick Start

### Installation
```bash
# Clone and install
git clone <repository-url>
cd safarsetu
npm install

# Run development server
npm run dev
# Open http://localhost:5173

# Build for production
npm run build
npm run preview
```

### Deploy to Vercel
1. Push to GitHub
2. Import on [Vercel](https://vercel.com)
3. Add API keys (optional)
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/safarsetu)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable components (Button, Card, Modal, Toast)
│   ├── layout/          # Navbar, Footer
│   ├── trip/            # Trip planning UI (Search, Selectors)
│   └── itinerary/       # Itinerary display (DayCard, ActivityCard)
├── pages/               # Route pages (Home, TripPlanner, ItineraryView, SavedTrips)
├── store/               # Zustand state management
├── utils/               # API client, itinerary generator
└── data/                # Mock data for fallbacks
```

---

## 🔧 Core Features

### Itinerary Generation
1. Parse user inputs (destination, dates, style, budget)
2. Filter activities by preferences
3. Distribute 2-3 activities per day
4. Assign time slots (morning/afternoon/evening)
5. Ensure diversity and uniqueness

### Activity Categories
Culture • Food • Adventure • Nature • Relaxation • Shopping

### API Integration
- **GeoDB Cities**: Real-time city search
- **Open-Meteo**: Free weather forecasts
- **OpenStreetMap**: Interactive maps (Leaflet.js)
- **Unsplash**: Destination photos
- **Fallback**: Mock data for offline use

---

## 🎨 Design Philosophy

- **Modern Aesthetics**: Gradients, glassmorphism, micro-animations
- **User-Centric**: Minimal friction, clear feedback, intuitive navigation
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessible**: Semantic HTML, proper contrast ratios

---

## 🎯 Use Cases

**Target Users:** Solo travelers, friend groups, budget planners

**Example Flow:**
1. Enter "Paris, June 10-15, 2 travelers, cultural, moderate budget"
2. Review generated 6-day itinerary (Louvre, Eiffel Tower, Seine cruise)
3. Customize: Remove activities, add notes
4. Save as "Paris Summer 2024"
5. Access anytime from Saved Trips

---

## 🚧 Future Enhancements

- PDF export for itineraries
- Drag & drop activity reordering
- Budget calculator with cost estimates
- Social sharing via links
- Template library for popular destinations

---

## 📄 License & Contact

**License:** Educational/Portfolio project

**Built to demonstrate:**
- Frontend system design
- State management (Zustand)
- UI/UX best practices
- Clean code architecture

Perfect for technical interviews and portfolio showcases!
