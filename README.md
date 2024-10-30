# 구매팀 프로젝트(PUR-UI)

<br/>

## 프로젝트 실행 방법

```
npm i
```

```
npm run dev
```

- 실행포트: localhost:3030

### 프로젝트 설명

> NextJS, TypeScript, Tailwind

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
