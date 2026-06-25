# Portfolio Project Analysis

이 문서는 현재 포트폴리오에 등록된 6개 프로젝트를 포트폴리오 상세 페이지, 이력서, 면접 답변에 활용할 수 있도록 분석한 정리본이다.

작성 기준:
- 근거는 현재 저장소의 `src/data/projects.json`, `src/data/project-details.json`, `src/data/project-details.md`에 있는 내용이다.
- 실제 수치, 운영 지표, 팀 규모, 공개 링크, 저장소 링크는 확인되지 않은 경우 `확인 필요`로 둔다.
- 민감 정보, 고객 데이터, 내부 운영 데이터, 계정/토큰/DB ref는 공개하지 않는 전제로 작성한다.
- 스크린샷과 링크는 별도로 준비된 뒤 이 문서의 `증거로 보여줄 자료` 항목에 연결한다.

## 전체 포지셔닝

현재 포트폴리오는 단순 프론트엔드 화면 모음보다 `프론트엔드 주도 제품 구현`에 가깝다. 가장 강한 메시지는 다음이다.

> Next.js/React 화면 구현에서 멈추지 않고, API, DB schema, 운영 흐름까지 연결해 실제로 굴러가는 제품을 만드는 프론트엔드 개발자.

대표 상영작 우선순위:
1. `LUCENT` - 커머스 v2 전환, 점진 마이그레이션, 운영 중 시스템 리팩토링
2. `VSHOT` - WebRTC, WebSocket, 미디어 처리, 실시간 UX
3. `FLEA MARKET` - 엑셀 업무의 도메인 모델링, 정산 계산, PDF 출력
4. `TEMIS` - 제작 도구 + 커머스 + 관리자 운영을 한 흐름으로 묶은 풀스택 구현
5. `231EDU` - 학원 운영 도구, OMR, 시간표, 알림톡
6. `SSUDAM` - 해커톤/프론트엔드 집중 프로젝트, 짧은 기간 완성도 증명

프로젝트별 대표 어필 축:

| 프로젝트 | 가장 강한 어필 | 보여줘야 할 증거 |
| --- | --- | --- |
| TEMIS | 제작 도구와 커머스/관리 운영을 연결 | 편집기, 상점, 관리자, 권한/정산 화면 |
| VSHOT | 실시간 연결과 고화질 결과물을 분리한 미디어 아키텍처 | Host/Guest 룸, 연결 상태, 결과 다운로드, 프레임 관리자 |
| LUCENT | 운영 중 커머스를 v2 모델로 점진 전환 | v2 상품/variant, checkout, admin, fulfillment |
| 231EDU | 학원 운영 업무를 데이터 관계 중심으로 정리 | 학생/반/시간표, OMR, 리포트/알림톡 |
| SSUDAM | 짧은 기간 안에 모바일 사용자 흐름 완성 | 온보딩, 채팅, 지원정보, 지도 |
| FLEA MARKET | 엑셀 수식을 웹 정산 도메인으로 변환 | 영수증 입력, 정산 preview, snapshot, PDF |

## 1. TEMIS

### 포트폴리오 포지션

TEMIS는 `크리에이터 운영 플랫폼` 사례로 보여주는 것이 좋다. 단순한 편집기 프로젝트가 아니라 제작 도구, 템플릿 상점, 구매 요청, 관리자 운영, 파일 저장, 권한/정산 흐름까지 연결한 점이 핵심이다.

추천 분류:
- 역할: 풀스택 구현 / 프론트엔드 중심
- 도메인: Creator Tools, Commerce, Admin Ops
- 난이도 키워드: 편집기 상태, 서버 상태 분리, 파일 업로드, 권한 관리, 운영 대시보드

### 포트폴리오용 한 줄 카피

크리에이터가 반복적으로 만드는 일정표와 썸네일 템플릿을 제작, 판매, 권한 관리까지 한 흐름으로 운영할 수 있게 만든 웹 플랫폼.

### 상세 상단 요약

- 문제: 일정표/썸네일 제작, 템플릿 판매, 구매 요청, 파일 전달, 정산 확인이 분산되어 있었다.
- 내 역할: Next.js 화면, API Route, Supabase schema, React Query hook, R2 업로드, 이메일 토큰 흐름을 연결했다.
- 핵심 결정: 템플릿별 편집 로직을 설정 주입형 hook으로 통합하고, 운영 데이터는 관리자 화면과 DB schema로 분리했다.
- 결과: 제작 도구와 커머스/운영 흐름을 하나의 서비스 경험으로 묶었다.

### 어필 포인트

Frontend:
- 일정표 편집기, 템플릿 상점, 커스텀 주문, 마이페이지, 관리자 대시보드까지 제품 전체 화면을 구현했다.
- 편집기 내부 상태와 서버 상태를 분리했다. 편집 UI는 custom hook/Context 중심, 서버 조회/변경은 React Query hook과 service layer 중심으로 정리했다.
- 템플릿별 입력 구조가 다른 문제를 `CardInputConfig` 같은 설정 기반 구조로 통합했다.
- 관리자 화면은 탭 구조로 주문, 구매 요청, 파일, 권한, 정산 상태를 다룰 수 있게 구성했다.

Backend/API:
- Next.js API Route로 인증, 템플릿, 구매 요청, 커스텀 주문, 파일 업로드, 이메일 토큰 흐름을 처리했다.
- Nodemailer 기반 이메일 인증, 초대, 비밀번호 재설정 흐름을 연결했다.
- 업로드 검증, R2 key 생성, DB record 연결, 삭제 유틸을 분리해 파일 운영 흐름을 추적 가능하게 만들었다.

DB/운영:
- 사용자, 템플릿, 팀, 구매 요청, 판매 통계, 정산/로열티 관련 Supabase migration을 구성했다.
- 템플릿 접근 권한과 작가 판매 데이터를 분리했다.
- 사용자-템플릿 접근, 작가-템플릿 판매, 팀-멤버-팀 일정표 관계를 관리했다.

### 포트폴리오에 넣기 좋은 데이터

이미 쓸 수 있는 데이터:
- 기간: 2025.07 - 운영 중
- 범위: Frontend + Backend + DB
- 주요 스택: Next.js, React, TypeScript, Supabase, TanStack Query, Cloudflare R2, Nodemailer
- 주요 화면: 일정표 템플릿 편집기, 템플릿 상점/구매 요청, 관리자 대시보드, 정산/권한 관리
- 문제 해결: 중복 편집 hook 통합, 업로드 실패 추적, 구매 권한/정산 흐름 분리

추가 확인하면 강해지는 데이터:
- 통합한 hook/페이지 수: 예) 템플릿별 hook N개를 통합 hook 1개로 정리
- 관리자 탭/운영 화면 수
- Supabase migration 수 또는 주요 테이블 수
- R2 업로드 흐름에서 다루는 파일 타입/최대 용량
- 실제 운영 여부, 사용자 수, 판매/요청 건수는 공개 가능할 때만 사용

### 증거로 보여줄 자료

스크린샷:
- 일정표 편집기: 입력 폼과 실시간 프리뷰가 함께 보이는 화면
- 템플릿 상점: 목록, 상세, 구매 요청 CTA가 보이는 화면
- 관리자 대시보드: 주문/구매 요청/템플릿 관리 탭
- 권한/정산 관리: 사용자별 템플릿 권한 또는 로열티/정산 상태

링크:
- 공개 서비스 링크 또는 익명화 데모
- 저장소가 private이면 아키텍처 노트 또는 짧은 데모 영상으로 대체

### 면접/상세 페이지용 말거리

- "처음에는 템플릿마다 편집 로직이 흩어져 있었는데, 입력 필드는 다르지만 저장/복원/프리뷰/테마 변경은 공통이라는 점을 보고 설정 주입형 hook으로 정리했습니다."
- "제작 도구와 커머스가 붙으면 화면보다 권한과 운영 상태가 먼저 복잡해집니다. 그래서 구매 요청, 접근 권한, 작가 판매 데이터를 분리했습니다."
- "파일 업로드는 성공 화면보다 실패했을 때 orphan 파일과 DB record가 남지 않도록 흐름을 분리하는 쪽에 신경 썼습니다."

### 보강 필요

- `성과` 문장을 현재보다 구체화한다. 예: "유지보수 비용 감소" 대신 "중복 hook 제거", "업로드 흐름 분리", "권한 관리 화면 추가"처럼 증거 중심으로 쓴다.
- 실제 스틸컷을 넣지 않으면 제작 도구의 설득력이 크게 줄어든다.
- 공개 링크가 없다면 "비공개 프로젝트: 익명화 화면/데모 영상 제공" 문구를 준비한다.

## 2. VSHOT

### 포트폴리오 포지션

VSHOT은 `실시간 미디어 처리와 사용자 경험`을 보여주는 가장 기술적으로 눈에 띄는 프로젝트다. WebRTC, WebSocket, Host/Guest role, 프레임 권한, R2 저장, WebGL/Sharp/FFmpeg 처리까지 연결되어 있어 단순 웹앱보다 훨씬 강한 차별점이 있다.

추천 분류:
- 역할: 풀스택 구현 / 실시간 미디어 처리
- 도메인: Realtime Media, Photobooth, Event Tool
- 난이도 키워드: WebRTC signaling, room/session, high-resolution capture, R2 file pipeline, frame access control

### 포트폴리오용 한 줄 카피

WebRTC는 실시간 미리보기에 사용하고, 최종 결과물은 각 클라이언트 원본 캡처를 서버 합성으로 처리해 품질을 보존한 웹 포토부스.

### 상세 상단 요약

- 문제: WebRTC 스트림을 그대로 캡처하면 네트워크 압축과 canvas 캡처로 결과물 품질이 낮아질 수 있었다.
- 내 역할: Next.js 촬영 UI, WebSocket signaling, Room/Session 관리, Supabase/R2 파일 관리, 프레임 관리자, 합성 흐름을 구현했다.
- 핵심 결정: 실시간 미리보기와 고해상도 결과물 생성을 분리했다.
- 결과: 실시간 UX는 유지하면서 고화질 결과물을 만들 수 있는 구조를 검증했다.

### 어필 포인트

Frontend:
- Host/Guest 촬영 룸, 준비 화면, 카운트다운, 촬영 트리거, 연결 상태, QR 다운로드 화면을 구현했다.
- 역할별 UX를 분리했다. Host는 제어와 진행 상태, Guest는 입장/촬영/선택/다운로드에 집중한다.
- WebRTC, signaling, media device, chroma key, capture flow를 custom hook 단위로 분리했다.
- 연결 상태, 처리중 상태, 촬영 실패 등 실시간 서비스에서 중요한 상태 표현을 다뤘다.

Backend/API:
- Express/WebSocket signaling 서버를 구성하고, ICE config, room/session, host/guest role, 재입장 흐름을 분리했다.
- photo upload/merge, frame CRUD, frame access, group/user 관리 API를 구현했다.
- upload chunk offset 검증, auth/role 오류, room join 실패 등 실패 경로를 고려했다.

DB/Infra:
- `files`, `films`, `frames`, `groups`, `user_groups`, `frame_access`, `users` 구조를 구성했다.
- R2 object와 Supabase file/film record를 연결했다.
- 프레임 접근 권한을 사용자/그룹 단위로 분리했다.
- `/api/internal/status` 같은 상태 endpoint로 process, memory, room/session 상태를 확인할 수 있게 했다.

### 포트폴리오에 넣기 좋은 데이터

이미 쓸 수 있는 데이터:
- 기간: 2026.01 - 2026.04
- 범위: Frontend + Backend + DB
- 주요 스택: Next.js, Node.js/Express, WebRTC, WebSocket, Supabase, Cloudflare R2, WebGL, Sharp, FFmpeg
- 주요 화면: Host 촬영 룸, Guest 사진 선택, 프레임 관리자, QR 다운로드 결과
- 문제 해결: 품질 저하 문제, 실시간 연결 복잡도, 프레임 권한 관리

추가 확인하면 강해지는 데이터:
- 촬영 룸에서 관리하는 상태 수: 연결중, 준비, 카운트다운, 촬영, 업로드, 합성중, 완료 등
- WebRTC signaling message 타입 수
- 프레임 권한 모델: 사용자/그룹/공개 범위
- 결과물 해상도 또는 파일 크기
- WebGL 합성 적용 전후 처리 시간 비교가 있다면 매우 강함

### 증거로 보여줄 자료

스크린샷:
- Host 촬영 룸: 카운트다운, 촬영 버튼, 연결 상태가 보이는 화면
- Guest 화면: 입장/촬영/사진 선택 흐름
- 프레임 관리자: 프레임 등록, 접근 권한 설정
- 결과 다운로드: QR, 결과물 미리보기, 다운로드 CTA

영상/GIF:
- Host와 Guest가 연결되고 촬영되는 짧은 흐름
- 카운트다운 후 결과가 생성되는 흐름

링크:
- 실시간 데모가 공개 어렵다면 녹화 영상 또는 기능별 익명화 데모

### 면접/상세 페이지용 말거리

- "WebRTC preview를 그대로 최종 결과물로 쓰지 않고, 미리보기와 결과물 생성을 분리했습니다. 실시간 UX와 품질 요구사항이 서로 달랐기 때문입니다."
- "실시간 서비스에서는 성공 흐름보다 연결 실패, 재입장, role 분리, 상태 동기화가 더 중요해서 room/session/signaling을 따로 정리했습니다."
- "프레임은 단순 이미지가 아니라 접근 권한과 운영 정책이 붙는 리소스라 사용자/그룹 기반 접근 모델로 분리했습니다."

### 보강 필요

- 실제 연결/촬영 플로우를 영상으로 보여주면 설득력이 크게 올라간다.
- 처리 성능이나 결과물 품질 차이를 수치로 보여줄 수 있으면 대표 프로젝트 1순위로 올릴 수 있다.
- WebRTC/Media 관련 설명은 길어질 수 있으므로 상세에는 구조도 1개를 넣는 것이 좋다.

## 3. LUCENT

### 포트폴리오 포지션

LUCENT는 `운영 중인 커머스 시스템을 v2 모델로 점진 전환한 사례`로 가장 실무적인 프로젝트다. 신규 기능 구현보다 더 어려운 점은 기존 운영 데이터를 유지하면서 새로운 상품/가격/주문/이행 모델을 병행 구축했다는 점이다.

추천 분류:
- 역할: 풀스택 구현 / 커머스 v2 전환
- 도메인: Commerce, Migration, Admin Ops
- 난이도 키워드: v2 schema, phased migration, checkout, fulfillment, admin validation, typed backend query

### 포트폴리오용 한 줄 카피

운영 중인 디지털·실물 상품 쇼핑몰을 멈추지 않고, public.v2_* 커머스 모델로 점진 전환한 프로젝트.

### 상세 상단 요약

- 문제: 기존 운영 테이블을 바로 교체하면 상품, 주문, 배송, 디지털 권한 흐름에 리스크가 컸다.
- 내 역할: v2 상점, 장바구니, 체크아웃, 카탈로그 관리자, 캠페인/가격 관리자, 제작/배송 관리, NestJS API, Supabase typed query를 구현했다.
- 핵심 결정: 기존 운영 구조를 유지한 채 `public.v2_*` 병행 모델을 만들고 기능 단위로 전환했다.
- 결과: 운영 중 시스템의 전환 리스크를 낮추고 사용자/관리자 흐름을 분리했다.

### 어필 포인트

Frontend:
- v2 상점 목록/상세, variant 선택, 장바구니, 체크아웃, 주문 완료, 마이페이지를 구현했다.
- 카탈로그 관리자, 캠페인/가격 관리자, 제작/배송 관리 화면을 구현했다.
- Page -> React Query Hook -> API Service -> Next BFF 흐름으로 서버 상태 접근을 정리했다.
- 사용자 화면은 구매에 집중하고, 운영 액션은 관리자/검증 도구로 분리했다.

Backend/API:
- v2 shop, catalog admin, checkout, fulfillment, products, orders API를 구현했다.
- NestJS Controller/Service와 Supabase 타입 기반 쿼리로 커머스 도메인을 분리했다.
- 주문 생성, 가격 계산, fulfillment, entitlement 같은 커머스 흐름을 API 단위로 나누었다.

DB/운영:
- `v2_projects`, products, variants, bundle, campaign, price, cart, order, fulfillment 계열 테이블을 구성했다.
- 기존 운영 데이터와 v2 모델을 병행 관리했다.
- 실물 배송과 디지털 다운로드 권한을 별도 도메인으로 추적했다.

### 포트폴리오에 넣기 좋은 데이터

이미 쓸 수 있는 데이터:
- 기간: 2026.03 - 운영 중
- 범위: Frontend + Backend + DB
- 주요 스택: Next.js, NestJS, Supabase, TanStack Query, Tailwind CSS, Storybook
- 주요 화면: v2 상점/상품 상세, 장바구니/체크아웃, v2 카탈로그 관리자, 제작/배송 관리
- 문제 해결: v1 교체 리스크, 사용자/운영자 플로우 혼재, 실물/디지털 혼합 주문 처리

추가 확인하면 강해지는 데이터:
- v2 전환 대상 테이블 수 또는 도메인 수
- checkout 단계 수
- 관리자 화면에서 검증 가능한 상태 수: readiness, campaign, price, fulfillment 등
- 기존 모델과 v2 모델의 차이를 한 장 표로 정리
- 운영 중 데이터와 v2 데이터가 공존하는 기간/전략

### 증거로 보여줄 자료

스크린샷:
- v2 상품 상세: variant, 가격, 구매 CTA
- 장바구니/체크아웃: 라인 아이템, 배송/주문자 정보, 금액 요약
- 카탈로그 관리자: product, variant, media, campaign, pricing
- 제작/배송 관리: fulfillment 상태, 송장, 배송 완료 처리

도식:
- 기존 v1 모델과 public.v2_* 모델의 공존 구조
- checkout -> order -> fulfillment -> entitlement 흐름

### 면접/상세 페이지용 말거리

- "운영 중인 커머스는 새 모델을 잘 만드는 것만큼 기존 데이터와 화면이 공존하는 기간을 설계하는 것이 중요했습니다."
- "고객 구매 플로우와 운영자 관리 플로우가 섞이면 화면도 API도 복잡해져서, 사용자 화면과 admin 검증/운영 도구를 분리했습니다."
- "실물 상품과 디지털 권한은 같은 주문 안에 있어도 이행 방식이 달라 order/payment/fulfillment/entitlement를 분리했습니다."

### 보강 필요

- 이 프로젝트는 표나 다이어그램이 있으면 가장 강해진다. v1/v2 병행 구조를 보여주는 이미지가 필요하다.
- 실제 checkout 화면과 admin 화면이 없으면 설명이 추상적으로 보일 수 있다.
- 진행중 프로젝트이므로 완료 성과보다 `전환 리스크를 낮춘 설계`와 `현재 구현 범위` 중심으로 쓴다.

## 4. 231EDU

### 포트폴리오 포지션

231EDU는 `운영 도구와 데이터 모델링`을 보여주는 프로젝트다. 학원 업무는 학생, 반, 강의실, 시간표, OMR, 리포트, 알림톡이 얽혀 있어서 데이터 관계와 예외 흐름을 정리한 점을 어필하는 것이 좋다.

추천 분류:
- 역할: 풀스택 구현 / 학원 운영 자동화
- 도메인: Education Ops, Admin Tool, Workflow Automation
- 난이도 키워드: schedule management, student-class relation, OMR grading, weekly report, Alimtalk

### 포트폴리오용 한 줄 카피

학생, 수업, 강의실 시간표, OMR 채점, 주간 리포트 알림톡을 한 흐름에서 관리하도록 만든 학원 운영 시스템.

### 상세 상단 요약

- 문제: 학생/반/시간표/리포트 업무가 흩어져 반복 입력과 확인 비용이 컸다.
- 내 역할: 학생/반/시간표/OMR/리포트 화면, NestJS API, Python OMR 서버, Supabase migration, React Query hook, 알림톡 발송 흐름을 구현했다.
- 핵심 결정: 학생 등록과 반 편성 관계를 분리하고, OMR/리포트/발송 로그를 운영 데이터로 정리했다.
- 결과: 흩어진 학원 운영 업무를 하나의 관리 흐름으로 묶었다.

### 어필 포인트

Frontend:
- 학생 관리, 반 관리, 반 편성, 강의실 시간표, 통합 시간표, OMR 템플릿/채점, 주간 리포트 화면을 구현했다.
- React Query hook과 client/server service로 운영 데이터를 관리했다.
- 시간표 이동/변경, OMR 템플릿 좌표, 리포트 발송 같은 업무형 UI를 다뤘다.

Backend/API:
- NestJS API 서버로 인증/초대, 학생, 반, 시간표, 예외 일정, 주간 리포트, 알림톡 흐름을 구현했다.
- Python OMR 서버로 OMR 이미지 업로드, 템플릿 좌표 분석, 마킹 판정, 채점 결과 생성을 분리했다.
- 리포트 저장과 발송 로그를 분리했다.
- 주차/학생/과목 기준 중복 발송 방지 흐름을 고려했다.

DB/운영:
- 학생, 수업, 반 편성, OMR template, weekly_reports 관련 Supabase migration을 구성했다.
- `student_compositions`를 추가해 학생 등록과 반 구성 관계를 분리했다.
- OMR 템플릿 좌표와 밝기/차이 임계값으로 마킹 여부를 판정했다.

### 포트폴리오에 넣기 좋은 데이터

이미 쓸 수 있는 데이터:
- 기간: 2025.08 - 운영 중
- 범위: Frontend + Backend + DB
- 주요 스택: Next.js, TypeScript, Supabase, TanStack Query, Alimtalk API, OMR
- 주요 화면: 학생/수업 관리, 강의실/통합 시간표, OMR 자동 채점, 주간 리포트 알림톡
- 문제 해결: 학생-반편성 관계, OMR 인식 안정성, 리포트 중복 발송

추가 확인하면 강해지는 데이터:
- 관리 대상 엔티티 수: 학생, 반, 강의실, 수업, 리포트 등
- 시간표 예외 케이스 수: 이동, 변경, 휴강, 보강 등
- OMR 템플릿 좌표/문항 수
- 리포트 발송 로그 구조와 중복 방지 기준

### 증거로 보여줄 자료

스크린샷:
- 학생/수업 관리: 학생 목록, 상세, 수업 등록 상태
- 강의실/통합 시간표: 강의실별 시간표, 이동/시간 변경 UI
- OMR 자동 채점: 템플릿 좌표와 채점 결과
- 주간 리포트 알림톡: 리포트 작성 화면과 발송 로그

도식:
- 학생 -> 반 편성 -> 수업 -> 리포트 관계
- OMR 템플릿 -> 이미지 업로드 -> 채점 결과 흐름

### 면접/상세 페이지용 말거리

- "운영 도구는 화면보다 데이터 관계를 먼저 정리해야 나중에 예외 케이스가 생겨도 버틸 수 있다고 느꼈습니다."
- "학생 등록과 반 편성은 비슷해 보이지만 변경 주기가 달라서 관계를 분리했습니다."
- "리포트 발송은 UI에서 버튼 한 번이지만, 실제로는 중복 발송 방지와 발송 로그가 더 중요했습니다."

### 보강 필요

- 학원 운영 도구는 화면만 보면 평범해 보일 수 있으므로 데이터 관계 도식이 필요하다.
- OMR은 기술적으로 흥미로운 포인트이므로 채점 로직을 너무 짧게 넘기지 말고 별도 하이라이트로 둔다.
- 운영 성과 수치가 없다면 "업무가 한 흐름으로 묶였다"보다 "어떤 데이터 관계를 분리했다" 중심으로 쓴다.

## 5. SSUDAM

### 포트폴리오 포지션

SSUDAM은 다른 프로젝트와 달리 `프론트엔드 구현 / 해커톤 서비스`로 솔직하게 보여주는 것이 좋다. 백엔드/DB 직접 구현을 과장하지 않고, 짧은 기간 안에 모바일 사용자 흐름, 외부 API 연동, MSW 목업, Storybook 검증을 수행한 사례로 포지셔닝한다.

추천 분류:
- 역할: 프론트엔드 구현 / 해커톤 서비스
- 도메인: Mobile UX, AI Counseling, Public Support Finder
- 난이도 키워드: mobile flow, external API integration, MSW, Storybook, map/address search

### 포트폴리오용 한 줄 카피

AI 상담, 지원사업 정보, 주변 시설 탐색을 모바일 화면 안에서 끝까지 연결한 해커톤 프론트엔드 프로젝트.

### 상세 상단 요약

- 문제: 짧은 해커톤 기간 안에 상담, 정보 탐색, 지도 흐름을 시연 가능한 형태로 연결해야 했다.
- 내 역할: 모바일 UI, AI 상담 온보딩, 상담 채팅, 지원정보 화면, 지도/주소 검색, axios service layer, React Query, Storybook/MSW 검증을 맡았다.
- 핵심 결정: 외부 API 준비 상태와 무관하게 UI를 검증할 수 있도록 service layer와 MSW 목업을 분리했다.
- 결과: 핵심 사용자 흐름을 데모 가능한 형태로 완성했다.

### 어필 포인트

Frontend:
- AI 상담 온보딩, 상담 채팅, 지원사업 정보, 주변 시설 지도 화면을 구현했다.
- axios service layer와 React Query로 API 연동을 분리했다.
- 상담 응답 타입별 UI 분기와 다음 액션을 구성했다.
- Kakao Maps와 다음 주소 검색을 클라이언트에서 연동했다.
- Storybook/MSW로 API 준비 상태와 무관하게 핵심 화면과 컴포넌트를 검증했다.

Backend/API:
- 직접 구현한 백엔드/DB는 포트폴리오에서 제외한다.
- 대신 외부 API 연동, mock server, service layer 설계를 어필한다.

DB/운영:
- 직접 DB 설계 프로젝트로 어필하지 않는다.
- 데이터 상태 관리와 응답 타입별 UI 분기를 중심으로 보여준다.

### 포트폴리오에 넣기 좋은 데이터

이미 쓸 수 있는 데이터:
- 기간: 2024.09 - 2024.12
- 범위: Frontend only
- 주요 스택: Next.js, TypeScript, TanStack Query, Kakao Maps, Storybook, MSW
- 주요 화면: AI 상담 온보딩, 상담 채팅, 지원사업 정보, 주변 시설 지도
- 문제 해결: 외부 API 의존성 대응, 상담 응답 타입 분기

추가 확인하면 강해지는 데이터:
- 해커톤 기간: 예) N일 또는 N시간
- 팀 규모와 맡은 파트
- Storybook에 등록한 컴포넌트 수
- MSW handler 수
- 발표/수상/배포 여부가 있다면 추가

### 증거로 보여줄 자료

스크린샷:
- AI 상담 온보딩: 사용자 상황 입력 화면
- 상담 채팅: 응답 타입별 UI
- 지원사업 정보: 목록/상세
- 주변 시설 지도: Kakao Maps, 주소 검색, 마커

링크:
- 데모 링크 또는 발표 영상
- 저장소 공개 가능하면 README와 함께 연결

### 면접/상세 페이지용 말거리

- "이 프로젝트는 풀스택으로 과장하지 않고, 프론트엔드 구현과 API 연동 안정성에 집중한 프로젝트로 설명하는 게 맞습니다."
- "해커톤에서는 기능을 많이 벌리는 것보다 사용자가 처음부터 끝까지 갈 수 있는 핵심 흐름을 완성하는 것이 중요했습니다."
- "외부 API가 완전히 준비되지 않아도 화면과 컴포넌트를 검증할 수 있도록 MSW와 Storybook을 활용했습니다."

### 보강 필요

- 다른 프로젝트보다 기술 깊이가 약해 보일 수 있으므로 `해커톤 제약`, `짧은 기간`, `완성된 사용자 흐름`을 강조한다.
- 백엔드/DB를 직접 구현했다고 보이지 않도록 범위를 명확히 한다.
- 가능하면 발표 영상, 수상 여부, 데모 링크를 붙이면 가치가 올라간다.

## 6. FLEA MARKET

### 포트폴리오 포지션

FLEA MARKET은 `엑셀 기반 업무를 웹 운영 시스템으로 이식한 도메인 모델링 프로젝트`로 보여주는 것이 좋다. 프론트엔드 개발자이면서 DB와 백엔드까지 다룬다는 정체성과 잘 맞고, 정산/금액/스냅샷/버전 관리처럼 실무적인 난도가 있다.

추천 분류:
- 역할: 풀스택 구현 / 정산 도메인 설계
- 도메인: Settlement, Operations, Excel Migration
- 난이도 키워드: Excel formula migration, settlement preview, Decimal.js, snapshot/versioning, PDF output

### 포트폴리오용 한 줄 카피

12개 시트와 676개 수식으로 운영되던 플리마켓 정산 흐름을 영수증, 판매 라인, 수수료, 정산 스냅샷 도메인으로 재구성한 웹 운영 시스템.

### 상세 상단 요약

- 문제: 엑셀 기반 정산은 수식 의미와 변경 가능성을 추적하기 어렵고, 확정 이후 기록 보존도 필요했다.
- 내 역할: Next.js 운영 화면, NestJS API, Supabase/PostgreSQL migration, 정산 계산기, Decimal.js 금액 계산, PDF 출력, Docker 개발 환경을 구성했다.
- 핵심 결정: 영수증, 결제수단, 판매 라인, 참가자별 수수료, settlement snapshot/versioning을 분리했다.
- 결과: 엑셀 수식을 웹 도메인 모델과 검증 가능한 정산 흐름으로 옮기는 기반을 만들었다.

### 어필 포인트

Frontend:
- 마켓/참가자 관리, 현장 영수증 입력, 정산 미리보기, 정산 회차/PDF 출력 화면을 구현했다.
- React Query 기반으로 preview/confirm 흐름을 구성했다.
- 운영자가 확정 전 계산 결과를 확인하고, 확정 후 PDF로 출력할 수 있는 흐름을 만들었다.

Backend/API:
- NestJS API와 정산 계산기를 분리했다.
- PDF 출력 흐름을 구현했다.
- Docker 개발 환경을 구성했다.
- Decimal.js로 금액 계산 정밀도를 관리했다.

DB/운영:
- 영수증, 결제수단, 판매 라인, 수수료, 정산 snapshot/versioning 테이블을 구성했다.
- 복합 결제 금액을 판매 라인에 비례 배분했다.
- 정산 확정 이후 데이터 변경 영향을 막기 위해 회차별 snapshot 구조를 설계했다.

### 포트폴리오에 넣기 좋은 데이터

이미 쓸 수 있는 데이터:
- 기간: 2026.05 - 진행 중
- 범위: Frontend + Backend + DB
- 주요 스택: Next.js, NestJS, Supabase/PostgreSQL, Docker, Decimal.js, PDFKit
- 주요 화면: 마켓/참가자 관리, 현장 영수증 입력, 정산 미리보기, 정산 회차/PDF 출력
- 강한 수치: 12개 시트, 30개 Table, 676개 수식 분석
- 문제 해결: 엑셀 수식 도메인화, 복합 결제 비례 배분, snapshot/versioning

추가 확인하면 강해지는 데이터:
- 실제 DB table 수
- 정산 preview에서 계산하는 항목 수
- PDF 출력 양식 수
- Decimal.js를 적용한 금액 계산 케이스
- Excel 원본에서 웹 모델로 바꾼 before/after 도식

### 증거로 보여줄 자료

스크린샷:
- 마켓/참가자 관리: 참가자별 수수료/조건
- 현장 영수증 입력: 결제수단, 판매 라인, 검증 메시지
- 정산 미리보기: 참가자별 정산 금액, 수수료, 결제수단 배분
- PDF 출력: 정산 회차, 출력 미리보기

도식:
- Excel sheet/table/formula -> Web domain model 변환
- receipt -> payment split -> sale line -> participant fee -> settlement snapshot 흐름

### 면접/상세 페이지용 말거리

- "이 프로젝트는 화면을 먼저 만든 것이 아니라 엑셀 수식의 의미를 해석하고 도메인으로 분리하는 작업이 먼저였습니다."
- "정산은 금액이기 때문에 floating point 문제를 피하려고 Decimal.js를 사용했고, 확정 이후 변경 영향을 막기 위해 snapshot 구조를 설계했습니다."
- "복합 결제에서는 결제수단 총액과 판매 라인을 비례 배분해야 해서 계산 로직을 화면과 분리했습니다."

### 보강 필요

- 이 프로젝트는 수치가 이미 강하다. `12개 시트 / 30개 Table / 676개 수식`을 상세 상단에 배치하는 것이 좋다.
- 금액/정산 화면은 민감할 수 있으므로 반드시 익명화된 fake data 스크린샷을 사용한다.
- 진행중 프로젝트라면 "확정된 구현"과 "진행 예정"을 분리해 쓴다.

## 상세 페이지에 추가하면 좋은 데이터 필드

현재 `project-details.json`은 기본 케이스스터디 구조가 좋다. 다음 필드를 추가하면 포트폴리오 설득력이 더 올라간다.

```ts
type ProjectProof = {
  heroSummary: {
    problem: string;
    role: string;
    decision: string;
    result: string;
  };
  proofMetrics: {
    label: string;
    value: string;
    note?: string;
  }[];
  qualitySignals: {
    type: "accessibility" | "performance" | "testing" | "error-state" | "maintainability";
    title: string;
    desc: string;
  }[];
  evidence: {
    title: string;
    kind: "screenshot" | "gif" | "video" | "diagram" | "link";
    src?: string;
    alt?: string;
    caption: string;
    privateNote?: string;
  }[];
  talkingPoints: string[];
  privacyNotes: string[];
};
```

우선순위 높은 필드:
1. `heroSummary` - 모바일 상세 상단에서 4줄 요약으로 사용
2. `proofMetrics` - "무엇을 얼마나 다뤘는지"를 보여주는 수치
3. `qualitySignals` - 접근성, 성능, 테스트, 에러 상태, 유지보수성 증거
4. `evidence` - 사용자가 준비할 스크린샷/영상/도식 연결
5. `talkingPoints` - 면접과 상세 페이지 문장으로 재활용

## 프로젝트별 보강 우선순위

1. FLEA MARKET
   - 이미 수치가 강하다.
   - Excel -> 도메인 모델 변환 도식을 만들면 바로 강한 케이스스터디가 된다.

2. LUCENT
   - v1/v2 공존 구조가 실무적으로 강하다.
   - 모델 전환 다이어그램과 checkout/admin 스크린샷이 필요하다.

3. VSHOT
   - 기술적 차별점이 크다.
   - 실시간 연결 영상과 품질 분리 구조도가 필요하다.

4. TEMIS
   - 제품 전체 흐름이 좋다.
   - 편집기와 관리자 화면을 실제로 보여줘야 한다.

5. 231EDU
   - 운영 도구/데이터 관계를 어필하기 좋다.
   - OMR과 시간표 도식이 있으면 강해진다.

6. SSUDAM
   - 해커톤 프로젝트로 솔직하게 배치한다.
   - 기간, 팀 규모, 발표/수상 여부가 있으면 보강한다.

## 최종 추천 문장

포트폴리오 전체 소개에 넣기 좋은 문장:

> 화면을 빠르게 구현하는 데서 멈추지 않고, 그 화면이 기대는 API, 데이터 구조, 운영 예외까지 함께 설계해왔습니다. 커머스, 운영 도구, 실시간 미디어, 정산 시스템처럼 데이터와 사용자 흐름이 복잡한 제품을 Next.js/React 중심으로 구현했습니다.

상세 프로젝트 공통 CTA 주변에 넣기 좋은 문장:

> 공개 링크나 원본 저장소가 제한된 프로젝트는 익명화된 화면과 구현 기록을 중심으로 정리했습니다.
