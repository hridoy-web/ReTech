# 📱 ReTech | Sustainable Peer-to-Peer Gadget Marketplace

[![Live Website](https://img.shields.io/badge/Live-Demo-4f46e5?style=for-the-badge&logo=vercel)](https://re-tech-phi.vercel.app)
[![Frontend Repo](https://img.shields.io/badge/GitHub-Frontend-blue?style=for-the-badge&logo=github)](https://github.com/hridoy-web/ReTech)
[![Backend Repo](https://img.shields.io/badge/GitHub-Backend-darkgreen?style=for-the-badge&logo=github)](https://github.com/hridoy-web/ReTech-Backend)

**ReTech** is a premium, fully responsive, and secure peer-to-peer marketplace built to extend the lifecycle of premium tech gadgets. It bridges the gap between hardware enthusiasts looking to upgrade and buyers searching for high-quality, verified pre-owned hardware (Laptops, Monitors, Components, and Audio gear) at affordable prices.

---

## 📸 Project Previews

Here is a glance at the fully functional interface of ReTech:

| **Home Landing Page** | **Latest Additions (Dynamic)** |
|---|---|
| ![Home Page](https://raw.githubusercontent.com/hridoy-web/ReTech/main/ReTech-Home.png) | ![Latest Additions](https://raw.githubusercontent.com/hridoy-web/ReTech/main/lateast-gadget.png) |

| **Explore Catalog & Filters** | **Manage Inventory Dashboard** |
|---|---|
| ![Explore Catalog](https://raw.githubusercontent.com/hridoy-web/ReTech/main/gadget-explore.png) | ![Manage Inventory](https://raw.githubusercontent.com/hridoy-web/ReTech/main/manage-inventory.png) |

---

## ⚡ Key Features

- **🌐 Complete Responsiveness:** Implements pixel-perfect layout alignment optimized for Mobile, Tablet, and Desktop screens.
- **🛡️ Secure Route Protection (Next.js 16 Proxy):** Utilizing the latest Next.js 16 `proxy.ts` middleware to protect details page access, item listings, and dashboards.
- **🔄 BetterAuth Authentication:** Secure Login and Registration integration, complete with an **Interactive Demo Login Button** for one-click reviewer access.
- **🔍 Advanced Search & Filter Pipeline:** Real-time search query matching with multiple filters (Category, Price range, and Sorting) directly integrated with MongoDB aggregation.
- **📋 Seller Dashboard (Manage Items):** Allows users to view their active listings in a clean responsive data table and instantly delete obsolete listings with sweet toast status alerts.
- **🍃 Eco-friendly Visuals & Glassmorphic UI:** Fully customized using Tailwind CSS v4, dynamic loaders (`loading.tsx`), and error boundaries.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript *(Strict Type-Safety)*
- **Authentication:** BetterAuth
- **Styling:** Tailwind CSS v4 & DaisyUI
- **Icons & Notifications:** React Icons, React Hot Toast

### Backend
- **Runtime & Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via native MongoDB Driver & ODM)
- **Hosting:** Vercel (Frontend), Render/Railway (Backend)

---

## 🧠 Personal Journey & Challenging Part

> 💡 **This project marks my first professional entry into the TypeScript Ecosystem!** As my very first full-fledged TypeScript project, transitioning from JavaScript was highly rewarding yet extremely challenging. I initially faced multiple hurdles regarding:
- Strict type casting for backend dynamic API requests.
- Typing search queries and database documents within Express handlers.
- Configuring correct session structures in Next.js 16's updated `proxy.ts` model.

**The Win:** Overcoming these runtime and static-type errors helped me gain a strong, structural grasp of enterprise full-stack development. I am proud to have completed a medium-level production-ready platform with solid type safety.

---

## 🚀 Future Enhancements & Roadmap

- [ ] **Interactive Visual Analytics:** Integrating `recharts` to render inventory statistics on the user's dashboard.
- [ ] **Advanced Image Upload:** Implementing secure Cloudinary image uploading instead of manual URL input.
- [ ] **TypeScript Deep Dive:** Further refactoring of API Action models to achieve 100% type-safety without using implicit `any`.
- [ ] **Direct Chat Integration:** Direct P2P messaging support between interested buyers and sellers.

---

## 💻 Installation & Setup

To run this project locally, follow these steps:

### 1. Clone the Repositories
```bash
# Clone frontend
git clone [https://github.com/hridoy-web/ReTech.git](https://github.com/hridoy-web/ReTech.git)
cd ReTech

# Clone backend
git clone [https://github.com/hridoy-web/ReTech-Backend.git](https://github.com/hridoy-web/ReTech-Backend.git)
