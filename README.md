# 구매팀 프로젝트(PUR-UI)

<br/>

## 프로젝트 설명

- NEXT JS (App route)
- TypeScript
- Tailwind CSS
- Atomic Design Pattern

## 프로젝트 실행 방법

```
git clone http://101.10.1.100/mis/pur-ui.git
```

or

```
git init
git config --global user.name "깃랩 name"
git config --global user.email "깃랩 email"
git remote add origin http://101.10.1.100/mis/pur-ui.git
git branch -M main
```

```
npm install
```

```
npm run dev
```

- 실행포트: localhost:3000

### 폴더(라우트)구조 기본(예시)

- app route
- app / page.tsx 기본 화면 경로 ('/')
- app / tender / page.tsx ('/tender')
- app / (sidebar) / contract / page.tsx ('/contract') : 레이아웃이 다름(sidebar는 읽히지 않음)
- app / contract / [id] / page.tsx ('/contract/:id') : 동적라우팅

### UI 아토믹 구조

- atoms
- molecules (atomic + atomic + ...)
- organism (molecule + molecule + ...)
- template (organism + organism + ...)
- pages (template + template + ...)

### 프로젝트 생성

> NextJS CLI사용

cf) https://nextjs.org/docs/app/api-reference/cli/create-next-app

```
npx create-next-app@latest
```

### Tailwind 설정

```
npm install -D tailwindcss
npx tailwindcss init
```

- tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
```

- global.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
