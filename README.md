# 🏥 MediQueue

MediQueue is a modern healthcare queue and appointment management system built with **Next.js (App Router)** and **Firebase**. It aims to reduce waiting time in hospitals and clinics by providing a smooth digital queue experience for **patients**, **doctors**, and **staff**.

---

## ✨ Features

* 👨‍⚕️ Doctor & Patient role-based flows
* 🕒 Digital queue management
* 🔐 Authentication (Login / Register / Forgot Password)
* ⚡ Fast UI with Next.js App Router
* 🎨 Clean UI with global styling
* 🔥 Firebase integration (Auth + Firestore)

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), TypeScript
* **Backend / BaaS:** Firebase (Auth, Firestore)
* **Styling:** CSS (Global styles)
* **Package Manager:** npm / pnpm

---

## 📂 Project Structure

```
MediQueue/
├── app/                # App Router pages (login, register, queue, etc.)
├── lib/                # Firebase, Firestore, utilities
├── public/             # Static assets (icons, images)
├── styles/             # Global CSS
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/suryanshforcommunity-oss/MediQueue.git
cd MediQueue
```

### 2️⃣ Install dependencies

```bash
npm install
# or
pnpm install
```

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit `.env.local` to GitHub.

---

## ▶️ Run the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 Roadmap

* [ ] Doctor dashboard
* [ ] Live queue updates
* [ ] Appointment history
* [ ] Admin panel
* [ ] Notifications

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Open a Pull Request

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 👤 Author

**Suryansh Shelke**
GitHub: [https://github.com/suryanshforcommunity-oss](https://github.com/suryanshforcommunity-oss)

---

⭐ If you like this project, give it a star!
