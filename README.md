# Linknest API

**Linknest** is a lightweight, full-stack alternative to Linktree, built with **NestJS**, **PostgreSQL**, and **Prisma**. It enables users to create customizable profile pages with sharable links, third-party platform integration, and audience analytics.

> ⚠️ **Note:** All features are currently **Work In Progress (WIP)** and under active development.

---

## 🚀 Features

- 🔐 **Custom Usernames**  
  Users register with a unique username, used as the URL for their public profile (e.g., `/johnsmith`).

- 🎨 **Profile Templates**  
  Users can choose from a set of visual templates to customize the appearance of their profile.

- 🔗 **Third-Party Platform Integration**  
  OAuth-based integration with services like Twitter, YouTube, etc., powered by [BetterAuth](https://www.better-auth.com).

- ➕ **Link Management**  
  Users can add, edit, delete, reorder, and toggle visibility of links through a personal dashboard.

- 🛠️ **Admin Panel**  
  Admin access to:

  - Manage user links and enforce visibility rules
  - Preview user profiles
  - View platform connection status
  - Modify or disable profiles

- 📊 **Audience Analytics**  
  Basic tracking of link views and clicks per user.

- 📣 **Sharable Content**  
  Generate posts or visual cards to promote your Linknest profile on other platforms.

---

## 🧱 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + BetterAuth
- **Deployment**: Docker-ready (supports Railway, Render, etc.)
