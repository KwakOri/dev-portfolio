# Project Detail Page Content Handoff

이 문서는 영화관 컨셉 포트폴리오의 상세 모달/상세 페이지에 들어갈 콘텐츠 스펙입니다.

## 구현 방향
- 카드/포스터 영역은 `src/data/projects.json`의 기존 요약 데이터를 사용합니다.
- 상세 페이지는 아래 순서로 구성합니다.
  1. Hero: title, subtitle, role, period, implementationScope, tagline
  2. Synopsis: 2-3문장 소개
  3. Contribution: Frontend / Backend / Database / Infrastructure 중 해당 항목만 노출
  4. Core Features: 3-5개
  5. Problem Solving: 2-3개
  6. Still Cuts: 4개. 실제 이미지가 없으면 우선 placeholder 카드로 노출
  7. Impact: 정성 결과와 배운 점
  8. Stack: 기술명 + 사용 이유
- `Backend`, `Database`는 직접 구현한 경우에만 강조합니다.
- `SSUDAM`은 Frontend only 프로젝트입니다. Backend/DB 구현처럼 보이게 쓰지 않습니다.
- 공개 링크와 저장소 링크는 아직 확인 필요하므로 `#` 또는 disabled 상태로 처리합니다.
- 학생/사용자/고객/업체명, 내부 데이터, 토큰, 외부 API URL은 노출하지 않습니다.

---

## TEMIS

### Hero
- id: `temis`
- title: TEMIS
- subtitle: Creator Tools & Commerce
- status: 진행중
- period: 2025.12 - 2026.05 (코드 기록 기준)
- role: 풀스택 구현 / 프론트엔드 중심
- implementationScope: Frontend + Backend + DB
- tagline: 크리에이터의 일정표 제작, 템플릿 판매, 운영 관리를 한 흐름으로 묶은 웹 서비스.

### Synopsis
크리에이터가 반복적으로 만드는 일정표와 썸네일 템플릿을 제작, 판매, 관리까지 연결한 프로젝트입니다. 사용자는 템플릿을 탐색하고 구매 요청을 보낼 수 있고, 운영자는 템플릿, 주문, 파일, 권한, 정산 흐름을 관리자 화면에서 처리할 수 있습니다. 저는 Next.js 화면, API Route, Supabase 스키마, React Query 데이터 흐름, R2 업로드, 이메일 토큰 인증을 연결했습니다.

### Contribution
- Frontend: 랜딩, 로그인/회원가입, 일정표 편집기, 팀 일정표, 썸네일 템플릿, 템플릿 상점/상세, 커스텀 주문, 마이페이지, 관리자 대시보드 구현
- Backend: Next.js API Route 기반 인증, 사용자/관리자, 템플릿, 구매 요청, 커스텀 주문, 파일 업로드, 이메일, 정산 보조 API 구현
- Database: 사용자, 템플릿, 팀, 구매 요청, 작가/판매 통계, 정산/로열티 관련 Supabase 테이블과 migration 구성
- Infrastructure: Supabase, Cloudflare R2, Nodemailer 기반 이메일 발송 흐름 연결

### Core Features
- 일정표 템플릿 편집기: 템플릿별 입력 구조를 `CardInputConfig` 기반으로 통합하고, 입력과 프리뷰, 저장/복원 흐름을 연결
- 템플릿 상점/구매 요청: 사용자가 템플릿을 탐색하고 구매 또는 접근 권한을 요청하는 흐름 구현
- 관리자 운영 대시보드: 템플릿, 사용자, 구매 요청, 커스텀 주문, 파일, 정산 상태를 탭 구조로 관리
- 파일 업로드/R2 연동: 업로드 검증, R2 저장, 파일 조회/삭제, zip 다운로드 흐름 구성

### Problem Solving
- 중복 편집 hook 문제: 템플릿별로 반복되던 일정표 편집 로직을 설정 주입형 통합 hook으로 정리
- 업로드 실패/운영 데이터 연결 문제: 파일 검증, R2 key 생성, DB record 연결, 삭제 유틸을 분리해 추적 가능하게 구성
- 구매 권한과 정산 흐름 문제: 템플릿 접근 권한, 작가 판매, 정산 데이터를 Supabase schema와 관리자 화면으로 분리

### Still Cuts
- 일정표 편집기: 템플릿 입력 폼과 실시간 미리보기
- 템플릿 상점: 목록, 상세, 구매 요청 화면
- 관리자 대시보드: 주문/구매 요청/템플릿 관리 탭
- 정산/권한 관리: 로열티, 사용자 템플릿 권한 관리 화면

### Impact
- 반복 템플릿 제작과 운영 관리를 한 서비스 흐름으로 묶었습니다.
- 정량 성과는 없지만, 중복 hook 제거와 업로드 흐름 분리로 유지보수 비용을 줄였습니다.
- 제작 도구와 커머스가 결합될 때 데이터 권한과 운영 흐름을 먼저 고정해야 한다는 점을 배웠습니다.

### Stack
- Next.js: App Router 화면과 API Route를 함께 구성
- React / TypeScript: 복잡한 편집 UI와 관리자 화면 구현
- Supabase PostgreSQL: 운영 데이터와 migration 관리
- TanStack Query: 서버 상태와 mutation/invalidate 관리
- Tailwind CSS / cva: 반복 UI와 variant 관리
- Cloudflare R2: 주문 파일과 이미지 저장
- Nodemailer: 이메일 인증과 토큰 메일 발송

---

## VSHOT

### Hero
- id: `vshot-v2`
- title: VSHOT
- subtitle: WebRTC Photobooth
- status: 진행중
- period: 2025.12 - 진행중
- role: 풀스택 구현 / 실시간 미디어 처리
- implementationScope: Frontend + Backend + DB
- tagline: 실시간 영상통화와 고해상도 원본 캡처를 분리한 웹 포토부스.

### Synopsis
실시간 영상통화 화면을 그대로 캡처하면 최종 사진 품질이 낮아지는 문제가 있었습니다. VSHOT은 WebRTC를 실시간 미리보기와 상호작용에 사용하고, 촬영 순간에는 각 클라이언트가 원본 이미지를 캡처해 서버에서 합성하는 구조로 설계했습니다. 저는 Host/Guest 촬영 화면, WebSocket 시그널링, Room/Session 관리, R2/Supabase 파일 관리, WebGL 합성 최적화를 구현했습니다.

### Contribution
- Frontend: Host/Guest 준비 및 촬영 룸, Festa 모드, 다운로드 페이지, 관리자 대시보드, 프레임/유저/그룹 관리 화면 구현
- Backend: Express/WebSocket signaling, ICE config, photo upload/merge, frame CRUD, group/user 관리, auth, internal status API 구현
- Database: files, films, frames, groups, user_groups, frame_access, users 관련 Supabase 구조 구성
- Infrastructure: Node server, Supabase, Cloudflare R2, TURN/STUN 설정 전제, status endpoint 구성

### Core Features
- Host/Guest 촬영 룸: WebRTC 연결, 카운트다운, 촬영 트리거, 연결 상태 UI 구현
- 고해상도 원본 캡처: 미리보기 영상과 결과물 캡처를 분리해 원본 품질을 보존
- 프레임/접근 권한 관리: 사용자/그룹별 프레임 접근 정책과 관리자 화면 구현
- 다운로드 결과: 촬영 결과물 저장, QR 다운로드, 파일/필름 record 연결
- WebGL 영상 합성: FFmpeg 후처리 병목을 줄이기 위한 클라이언트 합성 구조 적용

### Problem Solving
- 품질 저하 문제: WebRTC 스트림 캡처 대신 클라이언트 원본 캡처 후 서버 합성 방식으로 변경
- 실시간 연결 복잡도 문제: WebSocket signaling, room/session, host/guest role을 분리
- 프레임 권한 관리 문제: 프레임 접근 권한을 사용자/그룹 단위로 분리하고 관리자 화면에서 관리

### Still Cuts
- Host 촬영 룸: 촬영 제어, 프레임, 카운트다운, 연결 상태
- Guest 사진 선택: 참여자 입장, 촬영, 선택 흐름
- 프레임 관리자: 프레임 등록, 그룹/유저 접근 권한 관리
- QR 다운로드 결과: 결과물 확인과 다운로드 화면

### Impact
- 실시간 미리보기와 고화질 결과물 생성을 분리한 구조를 만들었습니다.
- 정량 성과는 없지만, 미디어 처리 병목을 WebGL/개별 캡처 구조로 줄이는 방향을 검증했습니다.
- 실시간 서비스에서는 UX보다 연결 상태와 실패 복구 흐름이 먼저 설계되어야 한다는 점을 배웠습니다.

### Stack
- Next.js: 촬영 화면과 관리자 UI 구성
- Node.js / Express: 이미지 처리와 API 서버 구성
- WebRTC / WebSocket: 실시간 영상 연결과 signaling
- Supabase PostgreSQL: 파일, 프레임, 접근 권한 기록
- Cloudflare R2: 결과 파일 저장
- Zustand / custom hooks: 촬영 세션과 미디어 상태 분리
- WebGL / Sharp / FFmpeg: 이미지와 영상 합성 처리

---

## LUCENT

### Hero
- id: `lucent`
- title: LUCENT
- subtitle: Commerce Platform V2
- status: 진행중
- period: 2026.03 - 진행중
- role: 풀스택 구현 / 커머스 v2 전환
- implementationScope: Frontend + Backend + DB
- tagline: 디지털·실물 상품 쇼핑몰을 v2 커머스 모델로 점진 전환한 프로젝트.

### Synopsis
기존 커머스 구조는 상품, 가격, 재고, 주문, 배송, 디지털 권한이 한 흐름 안에 섞여 있어 확장이 어려웠습니다. LUCENT v2는 운영 중인 테이블을 바로 교체하지 않고 `public.v2_*` 모델을 병행 구축해 기능 단위로 전환하는 프로젝트입니다. 저는 사용자 구매 플로우와 관리자 운영 플로우를 Next.js, NestJS, Supabase migration으로 연결했습니다.

### Contribution
- Frontend: v2 상점 목록/상세, 장바구니, 체크아웃, 주문 완료, 마이페이지 주문/디지털 상품, 카탈로그 관리자, 캠페인/가격 관리자, 제작/배송 관리 구현
- Backend: v2 shop, catalog admin, checkout, admin, fulfillment, products, projects, artists, auth, profiles, cart, orders, images, logs, notifications API 구현
- Database: v2_projects, v2_products, v2_variants, bundle, campaign, price, promotion, cart, order, fulfillment, media, audit 계열 테이블 구성
- Infrastructure: Supabase, Cloudflare R2, SMTP/알림톡, backend CI/CD workflow 구성

### Core Features
- v2 카탈로그 관리자: product, variant, media, bundle, readiness 관리
- v2 상점/체크아웃: 상품 탐색, 장바구니 수정, 주문 검증, 주문 생성
- 캠페인/가격/프로모션: 판매 컨텍스트와 가격 계산 결과를 분리
- 제작/배송/디지털 이행: 실물 배송과 디지털 다운로드 권한을 별도 도메인으로 추적

### Problem Solving
- v1 교체 리스크 문제: 기존 운영 테이블을 유지하고 `public.v2_*` 병행 모델로 점진 전환
- 사용자/운영자 플로우 혼재 문제: 고객 화면은 구매에 집중하고 운영 액션은 관리자/검증 도구로 분리
- 혼합 주문 처리 문제: order, payment, fulfillment, entitlement를 분리해 실물/디지털 혼합 주문 추적 가능하게 구성

### Still Cuts
- v2 상점/상품 상세: 상품 목록, 상세, variant 선택, 가격 표시
- 장바구니/체크아웃: 라인 아이템, 주문자/배송 정보, 금액 요약
- v2 카탈로그 관리자: product, variant, media, campaign, pricing 관리
- 제작/배송 관리: 제작 배치, 배송 배치, 송장/배송 완료 처리

### Impact
- 운영 중인 커머스 구조를 유지하면서 v2 모델을 병행 구축해 전환 리스크를 낮췄습니다.
- 정량 성과는 없지만, API 경계와 query key, BFF, backend service 계층을 정리했습니다.
- 운영 중인 커머스 리팩토링은 새 모델보다 기존 데이터와 화면의 공존 설계가 중요하다는 점을 배웠습니다.

### Stack
- Next.js: 사용자 구매 플로우와 관리자 화면 구성
- NestJS: 커머스 도메인 API 분리
- Supabase PostgreSQL: 기존 운영 데이터와 v2 모델 병행 관리
- TanStack Query: 서버 상태와 mutation/invalidate 관리
- Tailwind CSS / cva: UI 스타일과 variant 관리
- Cloudflare R2: 이미지와 파일 저장
- Storybook / Vitest / Playwright: UI와 기능 검증

---

## ZUKU

### Hero
- id: `zuku`
- title: ZUKU
- subtitle: Academy Ops Platform
- status: 완료
- period: 2025.08 - 2026.02 (코드 기록 기준)
- role: 풀스택 구현 / 학원 운영 자동화
- implementationScope: Frontend + Backend + DB
- tagline: 학원 학생, 수업, 시간표, 리포트 운영을 한곳에서 관리하는 웹 운영 시스템.

### Synopsis
학원 운영 업무는 학생 정보, 반 편성, 강의실 시간표, 시험 채점, 리포트 발송이 흩어져 있으면 반복 확인과 입력 비용이 커집니다. ZUKU는 학생/수업/시간표 데이터를 한 흐름 안에서 관리하고, OMR 채점과 주간 리포트 알림톡까지 연결하는 운영 시스템입니다. 저는 Next.js 화면, React Query hook, client/server service, API Route, Supabase migration을 연결했습니다.

### Contribution
- Frontend: 로그인/회원가입/초대 검증, 학생 관리, 반 관리, 반 편성, 강의실 시간표, 통합 시간표, 강사 시간표, 중등 기록, OMR 템플릿/채점, 주간 리포트 구현
- Backend: 인증/초대, 학생, 반, 과목, 강사, 반 편성, 시간표, 예외 일정, 시험 기간, OMR, 주간 리포트, 알림톡 API Route 구현
- Database: 학생, 수업, 반 편성, OMR template, weekly_reports, weekly_report_logs, exam periods 관련 Supabase migration 구성
- Infrastructure: Supabase, 알림톡/문자, 이메일/엑셀 처리 연동

### Core Features
- 학생/반/편성 관리: 학생 등록, 수업 등록, 반 편성 관계를 도메인별로 분리
- 강의실/통합 시간표: 강의실별 수업 배치와 이동/시간 변경 흐름 구현
- OMR 템플릿 기반 채점: OMR 이미지 업로드, 템플릿 좌표, 밝기 기준 채점 결과 연결
- 주간 리포트 알림톡: 리포트 row 생성 후 발송하고, 결과를 로그로 저장

### Problem Solving
- 학생-반편성 관계 문제: `student_compositions`를 추가해 학생 등록과 반 구성 관계를 분리
- OMR 인식 안정성 문제: 템플릿 좌표와 밝기/차이 임계값으로 마킹 여부를 판정
- 리포트 중복 발송 문제: 리포트를 먼저 저장하고 발송 로그를 남기며 주차/학생/과목 기준 중복 방지

### Still Cuts
- 학생/수업 관리: 학생 목록, 상세, 수업 등록 상태
- 강의실/통합 시간표: 강의실별 시간표, 수업 이동/시간 변경
- OMR 자동 채점: 템플릿, 이미지 업로드, 채점 결과
- 주간 리포트 알림톡: 리포트 작성/발송 화면, 발송 로그

### Impact
- 흩어진 학원 운영 업무를 하나의 관리 흐름으로 묶었습니다.
- 정량 지표는 없지만, React Query hook과 service layer로 화면별 데이터 흐름을 정리했습니다.
- 운영 도메인에서는 화면보다 데이터 관계 안정화가 먼저라는 점을 배웠습니다.

### Stack
- Next.js: 운영자 화면과 API Route 구성
- Supabase PostgreSQL: 학생, 수업, 편성, 리포트 데이터 관리
- TanStack Query: 서버 상태 캐싱과 mutation 관리
- Tailwind CSS / cva: 운영 UI와 variant 구성
- JWT / bcrypt: 초대 기반 가입과 로그인 처리
- OMR image processing: 템플릿 기반 채점
- xlsx / nodemailer / Alimtalk API: 엑셀 처리, 이메일, 알림톡 발송

---

## SSUDAM

### Hero
- id: `ssudam`
- title: SSUDAM
- subtitle: Mental Care & Support Finder
- status: 완료
- period: 2024.11 (Git 기록 기준)
- role: 프론트엔드 구현 / 해커톤 서비스
- implementationScope: Frontend only
- tagline: AI 상담, 지원사업 정보, 주변 시설 탐색을 모바일 화면 안에 묶은 해커톤 서비스.

### Synopsis
지원이 필요한 사용자는 심리적 도움, 정책 정보, 주변 시설 정보를 여러 경로에서 찾아야 합니다. SSUDAM은 AI 상담을 진입점으로 삼고, 상담 중 필요한 경우 지원사업 정보와 주변 시설 안내로 이어지도록 만든 모바일 해커톤 서비스입니다. 저는 Next.js 모바일 UI, 상담 온보딩/채팅, 지원정보 목록/상세, 지도, 회원가입/로그인 플로우를 구현하고 외부 API와 MSW 목업을 연결했습니다.

### Contribution
- Frontend: 홈, AI 상담 온보딩, 상담 채팅, 지원사업 목록/상세, 스크랩, 주변 시설 지도, 자가진단, 로그인/회원가입 구현
- API Integration: axios service layer로 인증, 상담, 지원정보 API 연동
- Mocking: MSW handler와 Express 기반 mock server로 상담/사용자 API 응답 대체
- UI System: atom/molecule/organism/template 구조와 Storybook stories 구성

### Core Features
- AI 상담 온보딩/채팅: 안내 동의, 호칭 입력, 반말/존댓말 선택, 상담 응답 UI 구현
- 지원사업 정보 탐색: 지원사업 목록, 정렬, 칩 필터, 상세 이동 구현
- 주변 시설 지도: Kakao Maps SDK로 병원/시설 키워드 검색과 마커 표시
- 회원가입/로그인 퍼널: 이메일 인증, 비밀번호 검증, 주소 검색, 약관 동의 흐름 구현

### Problem Solving
- 외부 API 불안정 문제: service layer와 MSW 목업 서버로 API 연결 전에도 UI와 상태 흐름 검증
- 상담 응답 타입 문제: `messageType`에 따라 긴급 안내, 장소 카드, 지원정보 추천 카드를 조건부 렌더링
- 지도 SDK 로딩 문제: Kakao Maps loader hook과 타입 선언으로 클라이언트 지도 연동

### Still Cuts
- AI 상담 온보딩: 안내, 동의, 호칭 입력, 모드 선택
- 상담 채팅: 말풍선, 로딩, 긴급 안내, 지원정보 추천
- 지원사업 정보: 목록, 정렬, 칩 필터, 상세 이동
- 주변 시설 지도: 지도, 시설 마커, 검색 입력, 마커 정보

### Impact
- 짧은 해커톤 기간 안에 상담, 정보 탐색, 지도, 회원가입까지 핵심 모바일 플로우를 연결했습니다.
- 정량 성과는 없지만, 화면별 API 호출을 service layer로 정리해 변경 대응이 쉬운 구조를 만들었습니다.
- 제한된 시간의 프로토타입에서는 직접 구현 범위와 외부 API 의존 범위를 명확히 나누는 것이 중요하다는 점을 배웠습니다.

### Stack
- Next.js: 모바일 화면과 App Router 구조 구현
- React / TypeScript: 컴포넌트 기반 UI 구현
- TanStack Query: 지원정보 조회와 상담 mutation 처리
- Tailwind CSS / cva: 모바일 UI와 variant 관리
- Storybook: 컴포넌트 단위 검증
- MSW: 개발 중 API 응답 목업
- Kakao Maps SDK / Daum Postcode: 지도와 주소 검색 연동

---

## FLEA MARKET

### Hero
- id: `flea-market`
- title: FLEA MARKET
- subtitle: Settlement System
- status: 진행중
- period: 2026.06 - 진행중
- role: 풀스택 구현 / 정산 도메인 설계
- implementationScope: Frontend + Backend + DB
- tagline: 엑셀 기반 플리마켓 정산 흐름을 웹 운영 시스템으로 이식한 프로젝트.

### Synopsis
기존 플리마켓 정산은 엑셀 시트와 수식에 의존해 운영되었고, 업체 수나 결제 방식이 바뀌면 계산식이 깨질 위험이 있었습니다. FLEA MARKET은 한 고객의 결제 묶음, 여러 참가자의 판매 라인, 결제수단 분할, 참가자별 수수료 정책, 정산 회차를 명확한 도메인으로 분리한 웹 운영 시스템입니다. 저는 원본 엑셀 구조를 분석하고 Next.js, NestJS, Supabase/PostgreSQL, Docker 기반으로 영수증 입력부터 정산 확정/PDF 출력까지 연결했습니다.

### Contribution
- Frontend: 로그인, 마켓 목록/상세, 관리 대시보드, 참가자/상품 관리, 현장 판매 입력, 영수증 목록/상세/수정, 정산 미리보기, 정산 회차 이력, 설정 구현
- Backend: auth, markets, participants, products, receipts, settlement preview, settlements, settlement settings, settlement PDF archive API 구현
- Database: users, sessions, markets, participants, market_participants, products, receipts, payment_splits, sale_lines, settlements, settlement_changes migration 구성
- Infrastructure: Docker/Supabase local 개발 환경, health check, build/lint/test 검증 흐름 구성

### Core Features
- 마켓/참가자/상품 관리: 참가자 마스터와 마켓별 참가 설정을 분리
- 현장 영수증 입력: 한 고객의 복합 구매를 receipt, payment split, sale line, item으로 기록
- 정산 미리보기: 참가자별 매출, 수수료, 지급 예정 금액, 마켓 수익 계산
- 정산 확정/회차 이력: 정산 결과를 snapshot으로 저장하고 이전 회차 대비 delta 기록
- 정산 PDF 출력: 참가자별 정산 내역을 PDF ZIP으로 다운로드

### Problem Solving
- 엑셀 수식 분산 문제: 12개 시트, 30개 Excel Table, 676개 수식을 그대로 옮기지 않고 도메인 모델로 재구성
- 복합 결제 배분 문제: 결제수단 금액을 판매 라인의 순매출 비율로 배분하는 계산기 구현
- 정산 이력 추적 문제: 정산 확정 시 snapshot을 만들고 새 회차는 이전 회차를 base로 참조

### Still Cuts
- 마켓/참가자 관리: 마켓 목록, 참가자 연결, 상품 등록, 수수료 설정
- 현장 영수증 입력: 판매 라인, 결제수단 분할, 영수증 저장/수정
- 정산 미리보기: 참가자별 매출, 수수료, 지급 예정 금액
- 정산 회차/PDF 출력: 확정, 회차 이력, 상세, PDF ZIP 다운로드

### Impact
- 엑셀에 흩어진 정산 규칙을 웹에서 검증 가능한 도메인 모델로 옮겼습니다.
- 정량 성능 지표는 없지만, Decimal.js와 DB snapshot으로 계산 재현성과 추적 가능성을 높였습니다.
- 엑셀 자동화 전환은 수식 복제가 아니라 숨어 있는 정책을 명확한 도메인 규칙으로 분리하는 일이 핵심이라는 점을 배웠습니다.

### Stack
- Next.js: 운영 화면과 현장 입력 화면 구성
- NestJS: 인증, 도메인 API, 정산 계산 분리
- Supabase PostgreSQL: 정산 도메인 관계형 데이터 관리
- TanStack Query: 서버 상태와 mutation/invalidate 관리
- Tailwind CSS / cva: 업무 UI와 variant 구성
- Docker: web/API/DB 로컬 개발 환경 구성
- Decimal.js: 원화 금액 계산과 비례 배분 처리
- PDFKit / jszip: 정산 PDF와 ZIP 다운로드 생성
