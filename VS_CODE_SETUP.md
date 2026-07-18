# VS Code mein Portfolio Chalane ka Guide

## Step 1 — Code apne PC pe lao

### Option A: Replit se ZIP download (sabse aasaan)
1. Replit mein upar-right ke **3 dots (⋮)** pe click karo
2. **"Download as ZIP"** select karo
3. ZIP ko kisi folder mein extract karo (e.g. `C:\Projects\ManishSvaveg`)

### Option B: GitHub se (agar connected ho)
```bash
git clone https://github.com/TERA_USERNAME/TERA_REPO.git
cd TERA_REPO
```

---

## Step 2 — Node.js install karo (ek baar)

👉 https://nodejs.org pe jao → **LTS version** download karo → install karo

Check karo:
```bash
node --version   # v18 ya usse upar hona chahiye
npm --version
```

---

## Step 3 — pnpm install karo (ek baar)

```bash
npm install -g pnpm
```

Check karo:
```bash
pnpm --version
```

---

## Step 4 — Dependencies install karo

VS Code ka **Terminal** kholo (`Ctrl + \``) aur project ke **root folder** mein jao:

```bash
# Pehle root folder mein jao (jahan pnpm-workspace.yaml hai)
cd C:\Projects\ManishSvaveg

# Saari dependencies install karo
pnpm install
```

---

## Step 5 — Portfolio run karo

```bash
pnpm --filter @workspace/portfolio run dev
```

Browser mein kholo: **http://localhost:3000**

---

## Dobara chalana (next time)

Sirf yeh ek command kafi hai:

```bash
pnpm --filter @workspace/portfolio run dev
```

---

## Folder Structure

```
ManishSvaveg/
├── attached_assets/              ← Logo aur images
│   └── Copilot_20260718_...png
├── artifacts/
│   └── portfolio/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── index.css
│       ├── package.json
│       └── vite.config.ts
├── pnpm-workspace.yaml
└── package.json
```

> **.env file banana zaruri NAHI hai** — sab defaults already set hain (port 3000, base path /).

---

## Common Errors aur Fix

| Error | Fix |
|-------|-----|
| `pnpm not found` | Step 3 dobara karo, terminal restart karo |
| `Cannot find module` | `pnpm install` root mein dobara run karo |
| Port 3000 busy | Koi aur app 3000 pe chal rahi hai — use band karo ya port change karo: `$env:PORT=3001; pnpm --filter @workspace/portfolio run dev` |
| Logo nahi dikh raha | `attached_assets/` folder root mein check karo |

---

## VS Code Extensions (Recommended)

- **ESLint** — code errors
- **Tailwind CSS IntelliSense** — CSS autocomplete
- **TypeScript** — built-in hota hai VS Code mein
