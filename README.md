# Docthru Frontend Documentation

## 기술 스택

### 핵심 기술

- **Framework**: Next.js 15.3.2
- **Language**: JavaScript/TypeScript
- **UI Library**: React 19.0.0
- **Styling**: TailwindCSS

### 주요 라이브러리

- **상태 관리**:

  - @tanstack/react-query v5.76.1 (서버 상태 관리)
  - @tanstack/react-query-devtools v5.76.1 (개발 도구)

- **에디터**:

  - @tiptap/react v2.12.0 (리치 텍스트 에디터)
  - 다양한 Tiptap 확장 기능 (bullet-list, color, text-align 등)

- **HTTP 클라이언트**:

  - fetch

- **UI 컴포넌트**:
  - react-icons v5.5.0 (아이콘)
  - react-textarea-autosize v8.5.9 (자동 크기 조절 텍스트 영역)
  - react-datepicker v.8.4.0 (달력을 통해 날짜 선택)

### 개발 도구

- **코드 품질**:

  - ESLint v9
  - Prettier v3.5.3
  - prettier-plugin-tailwindcss v0.6.11

- **스타일링**:
  - TailwindCSS v4
  - PostCSS

## 프로젝트 구조

```
├── .next/               # Next.js 빌드 출력
├── public/             # 정적 파일
├── src/               # 소스 코드
├── node_modules/      # 의존성 모듈
├── package.json       # 프로젝트 설정 및 의존성
└── various config files (next.config.mjs, postcss.config.mjs, etc.)
```

## 환경 설정

### 개발 환경 설정

1. 의존성 설치

```bash
npm install
```

2. 개발 서버 실행

```bash
npm run dev
```

### 빌드 및 배포

1. 프로덕션 빌드

```bash
npm run build
```

2. 프로덕션 서버 실행

```bash
npm run start
```

## 코드 품질 관리

- ESLint를 통한 코드 품질 검사

```bash
npm run lint
```

- Prettier를 통한 코드 포맷팅 적용
  - `.prettierrc` 설정을 통한 일관된 코드 스타일 유지

## 주요 기능

1. 리치 텍스트 에디터 (Tiptap)

   - 텍스트 스타일링
   - 리스트 관리
   - 색상 지원
   - 텍스트 정렬

2. 서버 상태 관리 (React Query)

   - 데이터 페칭
   - 캐싱
   - 실시간 업데이트

3. 반응형 UI (TailwindCSS)
   - 모던한 디자인 시스템
   - 유연한 레이아웃

## 참고사항

- Node.js 18.x 이상 버전 권장
- 개발 시 Chrome 최신 버전 사용 권장
- 환경 변수 설정 필요 (필요한 경우 `.env.local` 파일 생성)
