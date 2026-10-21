# 🏡 StayHub — Modern Full-Stack Airbnb Clone

[![Java](https://img.shields.io/badge/Java-21-orange.svg?style=flat&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.4-brightgreen.svg?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, high-performance vacation rental web application built from scratch with **Java 21, Spring Boot 3, Spring Security JWT, PostgreSQL, Next.js, and Tailwind CSS**.

---

## ✨ Features

- **🛡️ Secure Authentication & Authorization**: Stateless JWT (JSON Web Tokens) with Spring Security 6, supporting `GUEST` and `HOST` roles.
- **🔍 Dynamic Property Catalog**: Filter properties by categories (Beachfront, Cabins, Luxe, Tropical, Mansions, etc.) and location.
- **📅 Concurrency-Safe Booking Engine**: Prevents double-booking collisions using serialized database queries and dynamic date range overlap validation.
- **🎨 Modern Airbnb-Inspired UI**:
  - Floating rounded search pill (*Location | Dates | Guests*).
  - Horizontal scrollable category icons.
  - Responsive 1-to-4 column property grid with interactive favorite heart toggles.
  - Dedicated Property Detail Page (`/listings/[id]`) with a 5-image collage, host info, amenities, and a floating sticky **Booking Widget** with real-time price calculations.
- **⚡ Automated Data Seeding**: Populates initial luxury listings (Santorini, Swiss Alps, Kyoto, Malibu) on startup via `DataInitializer`.

---

## 🛠️ Tech Stack

### Backend
- **Language**: Java 21 (LTS)
- **Framework**: Spring Boot 3.3.4
- **Security**: Spring Security 6 with JJWT (HMAC-SHA256)
- **Database / ORM**: PostgreSQL with Spring Data JPA / Hibernate
- **API Documentation**: SpringDoc OpenAPI / Swagger 3 UI
- **Build Tool**: Apache Maven

### Frontend
- **Framework**: Next.js 14 / React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## 📁 Project Structure

```text
airbnb_listing/
├── backend/                       # Spring Boot 3 Java Backend
│   ├── src/main/java/com/stayhub/
│   │   ├── config/                # Security, JWT & Data Initializer
│   │   ├── controllers/           # REST API Endpoints (/auth, /listings, /bookings)
│   │   ├── models/                # JPA Database Entities (User, Listing, Booking)
│   │   ├── repositories/          # Spring Data JPA Interfaces
│   │   ├── services/              # Business Logic & Reservation Engine
│   │   └── StayhubApplication.java# Main Application Entry Point
│   ├── src/main/resources/
│   │   └── application.yml        # PostgreSQL & JWT Configuration
│   └── pom.xml                    # Maven Dependencies
├── frontend/                      # Next.js React Frontend
│   ├── src/
│   │   ├── components/            # Header, PropertyCard, BookingWidget, CategoriesBar
│   │   ├── pages/                 # Home (index.tsx) & Detail view (/listings/[id].tsx)
│   │   ├── services/              # API Fetch Client
│   │   └── styles/globals.css     # Tailwind Directives
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── .gitignore
└── README.md
