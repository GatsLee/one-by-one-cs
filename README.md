# 한번에 하나씩 CS

<!-- 스크린샷을 찍어서 아래 경로에 넣어주세요 -->
![학습 로드맵](./docs/roadmap-screenshot.png)

> 바이브 코딩 시대, 코드는 AI가 짜주지만 **CS 기본기**는 결국 사람의 몫입니다.
> "한번에 하나씩 CS"는 비전공자와 입문자를 위해 컴퓨터 과학 핵심 개념을 한 입 크기로 정리한 셀프 학습 플랫폼입니다.

## 주요 기능

- **9개 주제 · 57개 학습 문서** — 자료구조, OS, 네트워크, 데이터베이스, 시스템 설계, AI, 인프라, AI 에이전트, 소프트웨어 아키텍처
- **인터랙티브 학습 로드맵** — React Flow 기반 시각화로 학습 순서를 한눈에 파악
- **퀴즈 & 플래시카드** — 주제별 랜덤 출제로 복습 (1,700+ 문항)
- **학습 대시보드** — localStorage 기반 진행률 추적
- **MDX 기반 콘텐츠** — 코드 하이라이팅, Mermaid 다이어그램 지원

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript, React 19 |
| 스타일링 | Tailwind CSS v4 |
| 콘텐츠 | MDX (`next-mdx-remote`) |
| 시각화 | React Flow (`@xyflow/react`), Mermaid |
| 애니메이션 | Framer Motion |
| DB | Prisma + SQLite (학생 데이터) |

## 시작하기

### 필수 조건

- **Node.js** 18 이상
- **npm** (또는 yarn, pnpm)

### 설치 및 실행

```bash
# 레포 클론
git clone https://github.com/GatsLee/one-by-one-cs.git
cd one-by-one-cs

# 의존성 설치
npm install

# Prisma 초기화
npx prisma generate

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
├── content/topics/       # MDX 학습 문서 (9개 주제)
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # UI 컴포넌트
│   ├── data/             # 퀴즈 & 플래시카드 데이터
│   └── lib/              # 유틸리티 (콘텐츠 파싱 등)
├── prisma/               # DB 스키마
└── public/               # 정적 파일
```

## 앞으로 추가될 기능

- [ ] **LLM 채팅 연동** — 학습 중 모르는 개념을 AI에게 바로 질문
- [ ] **개인별 취약점 분석** — 퀴즈 결과 기반으로 약한 주제 추천
- [ ] **스페이스드 리피티션** — 에빙하우스 망각 곡선 기반 복습 스케줄링
- [ ] **코드 실행 환경** — 브라우저에서 직접 코드를 실행하고 결과 확인
- [ ] **다크 모드** — 눈이 편한 다크 테마 지원

## 라이선스

MIT
