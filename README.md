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
- app / (sidebar) / contract / page.tsx ('/contract') : 레이아웃이
  다름(sidebar는 읽히지 않음)
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

### Tailwind

```
npm install -D tailwindcss
npx tailwindcss init
```

- global.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### TypeScript

**타입체크**

```
npm run type-check
```

- 해당 명령어를 입력하면 전체 프로젝트 파일에 대한 타입을 체크 할 수 있습니다.

### Prettier설정(공통)

2024.11.25기준

```
  arrowParens: "avoid",
  bracketSameLine: false,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
```

- arrowParens: "avoid": 화살표 함수의 매개변수가 하나일 때 괄호를 생략합니다. 예를 들어, x => x + 1과 같이 변환됩니다.
- bracketSameLine: false: JSX에서 닫는 태그를 새로운 줄에 배치합니다.
- bracketSpacing: true: 객체 리터럴에서 중괄호 안에 공백을 추가합니다. 예를 들어, { foo: bar }와 같이 변환됩니다.
- htmlWhitespaceSensitivity: "css": HTML의 공백 민감도를 CSS 규칙에 따라 설정합니다. 즉, CSS에서 공백을 처리하는 방식에 따라 HTML의 공백을 무시하거나 유지합니다.
- insertPragma: false: 파일의 맨 위에 @format 주석을 삽입하지 않습니다. 이 주석은 Prettier가 파일을 포맷할 수 있음을 나타냅니다.
- jsxSingleQuote: false: JSX에서 문자열을 쌍따옴표로 감쌉니다.
- plugins: ["prettier-plugin-tailwindcss"]: Tailwind CSS를 위한 Prettier 플러그인을 사용하여 Tailwind 클래스의 정렬 및 포맷팅을 지원합니다.
- printWidth: 80: 한 줄의 최대 길이를 80자로 설정합니다. 이 길이를 초과하면 줄이 자동으로 줄 바꿈됩니다.
- proseWrap: "always": 마크다운 텍스트를 항상 줄 바꿈합니다. 즉, 긴 텍스트가 자동으로 줄 바꿈됩니다.
- quoteProps: "as-needed": 객체의 속성 이름을 필요한 경우에만 따옴표로 감쌉니다. 예를 들어, { foo: "bar" }는 따옴표가 필요하지만, { "foo": "bar" }는 필요하지 않습니다.
- requirePragma: false: 파일이 포맷되기 위해 @format 주석을 요구하지 않습니다. 즉, 주석 없이도 포맷팅이 가능합니다.
- semi: true: 문장의 끝에 세미콜론을 추가합니다. 예를 들어, const a = 1이 const a = 1;로 변환됩니다.
- singleQuote: false: 문자열을 쌍따옴표로 감쌉니다. 예를 들어, 'string'이 "string"으로 변환됩니다.
- tabWidth: 2: 탭의 너비를 2로 설정합니다. 즉, 탭을 사용할 경우 2칸의 공백으로 간주됩니다.
- trailingComma: "all": 객체, 배열, 함수 매개변수 등에서 가능한 모든 곳에 후행 쉼표를 추가합니다. 예를 들어, { a: 1, b: 2, }와 같이 변환됩니다.
- useTabs: false: 탭 대신 공백을 사용하여 들여쓰기를 합니다. 즉, 코드에서 들여쓰기를 할 때 공백을 사용합니다.

**프리티어 반영**

```
npm run format
```

해당 명령어를 입력하면 전체 프로젝트에 설정된 프리티어가 반영됩니다.

### 주의사항

- `프리티어`, `타입` 반영 명령어를 사용하기 전에!

1. 먼저, 기존 작업은 commit(and Merge Request)해주세요.
2. 프리티어 혹은 타입 반영 명령어를 입력하고 변경된 사항에 대해서만 별도 MR요청을 해주세요. (그렇지 않으면 수십개의 파일이 변경된 채로 머지되어, 추후 작업시 어떤 작업에 변동사항이 있는지 확인이 어렵습니다.)
3. 속성의 상태를 추가 혹은 변경하는 경우 반드시 팀원에게 별도로 전달해주세요!

### 공통컴포넌트(UI)

**공통 UI 컴포넌트 (components폴더 이하)**

- 해당 컴포넌트는 대부분의 다른 컴포넌트에서 상속받아서 사용하고 있습니다.
- 따라서 해당 컴포넌트에 변경이 필요한 경우, 해당 컴포넌트를 사용하는 모든 페이지를 확인 후에 이상이 없는 경우에만 수정이 가능합니다.
- 만약 반드시 수정을 해야하는 경우에는 다른 페이지에 영향을 미치지 않도록 처리 후에 변경을 해야 합니다.
- 해당 컴포넌트를 변경한 경우 반드시 다른 팀원에게 별도로 전달하고 `코드리뷰`를 받도록 합니다!
