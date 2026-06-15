# 📦 Product Details

## Overview

Smart Utility Outage Tracker is a real-time, crowdsourced platform that helps users report, track, and respond to utility outages (power and water) in their area. It combines live mapping, community validation, and optional service availability signals to improve situational awareness during outages.

## Target Users

* Homeowners and renters
* Travelers and commuters
* Emergency preparedness communities
* Local municipalities (future)

## Core Value

* Faster awareness than utility companies
* Community-verified outage accuracy
* Visibility into nearby service availability

---

# 🧭 Epics

## Epic 1: Outage Reporting

Enable users to quickly report a power or water outage from their current location.

## Epic 2: Real-Time Map Visualization

Display outages dynamically on a map with clustering and status indicators. Distinguish between different utility types with color-coded markers.

## Epic 3: Community Validation

Allow users to confirm or dispute outage reports to improve accuracy.

## Epic 4: Service Availability Signal

Let users indicate whether they currently have access to the utility service to help others nearby.

## Epic 5: Notifications & Updates (Phase 2)

Notify users about outages and restoration updates in their area.

## Epic 6: Advanced Utility Sharing Network (Phase 3)

Enable opt-in participation for users willing to share access to utility resources.

---

# ⚙️ Features

## MVP Features (Phase 1)

### 1. Report Outage

* Select outage type (Power or Water)
* Capture user geolocation (lat/lng)
* Submit outage report with timestamp
* Store in database

### 2. View Outages on Map

* Interactive map (Leaflet/Mapbox)
* Color-coded markers for each outage type (red for power, blue for water)
* Cluster nearby reports
* Real-time updates

### 3. Confirm Outage

* Users can confirm an existing report
* Increment confirmation count
* Improve reliability scoring

### 4. Service Status Toggle

* Users can mark:

  * "No Service"
  * "I Have Service"
* Helps visualize affected vs unaffected areas

---

## Phase 2 Features

### 5. Push Notifications

* Alerts for nearby outages
* Restoration updates

### 6. Outage History

* View past outages
* Analyze frequency and duration

### 7. Utility API Integration

* Sync with official outage data (if available)
* Support multiple utility providers

---

## Phase 3 Features (Advanced)

### 8. Power Availability Network

* Show nearby users with available power
* Privacy-preserving indicators

### 9. Verified Hosts

* Optional identity verification
* Safety disclaimers and guidelines

### 10. Microgrid Coordination (Experimental)

* Integration with solar/battery systems
* Local energy-sharing insights

---

# 👤 User Stories

## Epic 1: Outage Reporting

* As a user, I want to report a power outage so others know about it.
* As a user, I want my location auto-detected so reporting is fast.
* As a user, I want to submit a report in under 5 seconds.

---

## Epic 2: Map Visualization

* As a user, I want to see outages on a map so I understand affected areas.
* As a user, I want clustered markers so the map isn’t cluttered.
* As a user, I want real-time updates without refreshing.

---

## Epic 3: Community Validation

* As a user, I want to confirm an outage so data becomes more reliable.
* As a user, I want to see how many people confirmed a report.
* As a user, I want outdated reports to be deprioritized.

---

## Epic 4: Power Availability

* As a user, I want to indicate I have power so others know nearby status.
* As a user, I want to see areas with power vs outages.
* As a user, I want this to be anonymous for privacy.

---

## Epic 5: Notifications

* As a user, I want alerts for outages near me so I can prepare.
* As a user, I want updates when power is restored.

---

## Epic 6: Power Sharing (Advanced)

* As a user, I want to optionally signal I can help others charge devices.
* As a user, I want safety guidance before sharing access.
* As a user, I want control over my visibility and privacy.

---

# ✅ Definition of Done (MVP)

* Users can report outages
* Reports appear on map within 2 seconds
* Users can confirm reports
* Data persists in backend
* UI is responsive on mobile and desktop

---

# 🚀 Brand Starter Kit (Next Release)

## Positioning

Community-powered utility intelligence for Puerto Rico, built for faster local awareness and safer response during power and water outages.

## Name Shortlist

* Luz y Agua PR
* BarrioGrid
* Alerta Servicios PR
* Pulso PR

## Tagline Options

* Know outages first. Help neighbors faster.
* Community-powered utility alerts for Puerto Rico.
* La red comunitaria para luz y agua en tiempo real.

## Messaging Hierarchy

### Hero

* EN: Real-time power and water outage tracking for Puerto Rico.
* ES: Monitoreo en tiempo real de interrupciones de energia y agua en Puerto Rico.

### Supporting Copy

* EN: Report outages in seconds, confirm local conditions, and help your community respond faster.
* ES: Reporta interrupciones en segundos, confirma condiciones locales y ayuda a tu comunidad a responder mas rapido.

### Call to Action

* EN: Report an Outage
* ES: Reportar Interrupcion

## Visual Direction

### Brand Colors

* Power: `#E4572E` (warm outage alert)
* Water: `#118AB2` (service/water status)
* Trust Neutral: `#1F2937` (primary text)
* Surface: `#F8FAFC` (background)

### Typography

* Headline: bold, human sans-serif for urgency and clarity
* Body: high-legibility sans-serif for maps/forms and multilingual readability

### Iconography

* Power: bolt symbol
* Water: droplet symbol
* Use shape + color together for accessibility

## Voice and Tone

* Calm and action-oriented under stress
* Community-first and practical
* Bilingual parity with natural phrasing (not literal-only translation)

## Trust Signals

* Confirmation counts visible on map markers and report cards
* Last-updated timestamps on active incidents
* Clear privacy language for optional contact fields
* Public explanation of how crowdsourced data is validated

## Release Asset Checklist

* Final logo lockup (icon + wordmark)
* EN/ES landing headline and supporting copy
* Social announcement kit (10 templates)
* One-page partner brief for municipalities and NGOs
* In-app trust panel (privacy + data use summary)

