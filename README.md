# Klay 🧱

![Klay Banner](https://capsule-render.vercel.app/api?type=waving&color=0:CA2851,100:FFB173&height=300&section=header&text=Klay&fontSize=90&animation=fadeIn&fontAlignY=40&desc=Generative%20UI%20for%20Solopreneurs&descAlign=62&descAlignY=70&fontColor=ffffff)

> **Submission for "The UI Strikes Back" Hackathon** > *Hosted by WeMakeDevs Platform*

![Tambo](https://img.shields.io/badge/Orchestration-Tambo-orange?style=flat&logo=react)
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue?style=flat&logo=google)
![Next.js](https://img.shields.io/badge/Framework-Next.js-black?style=flat&logo=next.js)
![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat&logo=tailwind-css)

## 💡 The Vision

### The Problem: "Admin Friction"
Solopreneurs and Creators spend 80% of their time on "Admin UI"—building proposals, designing media kits, and creating engagement tools. The current workflow is fragmented: you switch to Figma for design, DocuSign for contracts, and Typeform for quizzes. It breaks the flow state.

### The Solution: Klay
**Klay** is a "Generative UI" engine. Instead of chatting with text, you chat with *Interface*.
* Need a contract? Klay renders a **Proposal Card** you can sign interactively.
* Need a sponsor pitch? Klay renders a live **Media Kit** with real data visualization.
* Need to share it? Klay compresses the state into a URL for instant sharing.

---

## 🚀 Key Features (Live)

### 1. The "Deal Closer" (Proposal Engine)
Input a budget and deliverables, and Klay generates a professional contract UI. It features an interactive "Accept" state with a confetti celebration to dopamine-hack the closing process.

### 2. The "Authority Builder" (Media Kit)
Creators can input raw stats, and Klay uses `Recharts` to render a beautiful, interactive growth chart and profile header instantly. No PDFs required.

### 3. The "Engagement" (Quiz Panel)
Klay can generate interactive quizzes for education or community engagement, complete with scoring logic and state management.

### 4. Stateless Sharing Engine (The "Anti-Local" Feature)
We solved the "Localhost Curse." Klay compresses the entire React component state into a Base64 string in the URL.
* **User Action:** Click "Share".
* **Result:** A unique link (`klay.app/share?s=...`) that renders the exact component for anyone, anywhere. No database required.

---

## 🛠️ Tech Stack

* **Orchestration:** [Tambo SDK](https://tambo.co/)
* **Intelligence:** Google Gemini 2.5 Flash
* **Framework:** Next.js 14 (App Router)
* **Styling:** TailwindCSS + Shadcn/UI
* **Visualization:** Recharts

---

## 🗺️ Future Roadmap

We have validated the interface (Phase 1). Post-hackathon, we are moving to **Phase 2: Retention & Speed**.

- **1. "Memory" (The Database Layer)**
    * **The Problem:** Klay currently has "amnesia." If you refresh, context is lost.
    * **The Fix:** We will integrate **PostgreSQL** to create a User Dashboard.
    * **The Vision:** Users will be able to query past work: *"Show me all proposals sent last month"* or *"Compare my follower growth to last week."*

- **2. "Remixing" (Slash Commands)**
    * **The Problem:** Writing full prompts every time is slow.
    * **The Fix:** We will allow users to save **Slash Command Templates**.
        * User types `/invoice` → Auto-fills their standard rate ($100/hr) and terms.
        * User types `/update` → Auto-fetches latest YouTube stats for the Media Kit.
    * **The Vision:** This creates a workflow speed that beats traditional tools like Microsoft Word or Excel.
---

## ⚡ Getting Started

### Prerequisites
* Node.js (v18+)
* npm / pnpm / yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kaushik0010/klay.git
    cd klay
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory.
    
    ```bash
    cp .env.example .env.local
    ```

    Add your Tambo API Key:
    ```env
    NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key_here
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

---

## 🤝 Contributing

This project was built for **The UI Strikes Back** Hackathon. We are open to PRs that align with the roadmap above!