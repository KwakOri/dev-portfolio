# Portfolio Project Details

이 문서는 영화관 컨셉 포트폴리오 사이트에 넣기 위한 프로젝트 원고입니다.

정확성 메모:
- 기간, 팀 규모, 공개 링크, 저장소 링크는 원본 메모에 명시되지 않아 코드/문서 기록 기준으로 보수적으로 작성했습니다. 실제 공개 전 확인이 필요합니다.
- 고객명, 내부 운영 데이터, Supabase 프로젝트 ref, 토큰, 계정 정보는 제외했습니다.
- `temis`는 별도 Nest/Express 서버가 아니라 Next.js API Route와 Supabase를 이용한 풀스택 구현으로 표기했습니다.
- `231EDU`는 Next.js frontend, NestJS API server, Python OMR/exam server, Supabase PostgreSQL로 분리된 풀스택 구현으로 표기했습니다.
- `ssudam`은 프론트엔드 구현과 외부 API 연동/MSW 목업으로 표기했고, 직접 구현한 백엔드/DB는 제외했습니다.
- `flea_market`은 Next.js, NestJS, Supabase/PostgreSQL 기반 풀스택 구현으로 표기했습니다.

---

# TEMIS

## 1. 기본 정보
- 프로젝트명: TEMIS
- 짧은 부제: 크리에이터 일정표 제작과 템플릿 판매를 연결한 운영 플랫폼
- 상태: 운영 중
- 기간: 2025.07 - 운영 중
- 팀 규모: 확인 필요
- 내 역할: 프론트엔드 중심 풀스택 구현
- 구현 범위:
  - Frontend + Backend + DB
  - 단, Backend는 별도 서버가 아니라 Next.js API Route 기반 BFF/서버 기능
- 공개 링크: 확인 필요
- 저장소 링크: 확인 필요
- 공개 가능 범위: 서비스명, 화면 구조, 기술 스택, 구현한 기능 흐름 공개 가능. 사용자 정보, 작가/고객 데이터, 운영 DB, 이메일/스토리지 키는 비공개.

## 2. 한 줄 소개
크리에이터가 일정표와 썸네일 템플릿을 만들고, 판매·구매·운영 관리를 한 서비스 안에서 처리할 수 있도록 만든 웹 플랫폼.

## 3. 시놉시스
크리에이터는 매주 반복되는 일정표 제작, 템플릿 관리, 구매 요청 처리, 파일 전달을 여러 도구에 나눠서 처리해야 했다. TEMIS는 일정표/썸네일 제작 도구와 템플릿 상점, 커스텀 주문, 관리자 운영 기능을 하나의 흐름으로 묶는 것을 목표로 했다. 주요 사용자는 템플릿을 제작·판매하는 크리에이터, 템플릿을 구매하는 사용자, 주문과 정산을 관리하는 운영자다. 나는 Next.js 화면과 API Route, Supabase 스키마, React Query 기반 데이터 흐름, R2 파일 업로드, 이메일 토큰 인증을 연결해 실제 운영 흐름 중심으로 구현했다.

## 4. 내 기여

### Frontend
- 구현한 주요 화면: 랜딩, 로그인/회원가입/비밀번호 재설정, 일정표 편집기, 팀 일정표, 썸네일 템플릿, 템플릿 상점/상세, 커스텀 주문, 마이페이지, 관리자 대시보드
- 상태 관리: React Context와 custom hook으로 편집기 상태를 분리하고, 서버 상태는 React Query hook으로 관리
- API 연동: Next.js API Route를 통해 Supabase, R2, 이메일, 관리자 기능을 호출
- 반응형/접근성: 모바일 헤더, PWA 설치 안내, 폼 기반 입력 흐름, 모달/탭 기반 관리자 UI 구성
- 성능 개선: 템플릿별 중복 편집 로직을 `useTimeTableEditor` 중심으로 통합하고, 이미지/파일 업로드는 검증과 presigned URL 흐름으로 분리
- UI/UX 판단: 사용자가 입력하면 바로 결과물을 확인하고 저장할 수 있도록 편집 폼과 프리뷰를 한 흐름에 배치

### Backend
- 주요 API: 인증, 사용자/관리자, 템플릿, 상점, 구매 요청, 커스텀 주문, 파일 업로드, 포트폴리오 이미지, 이메일, 정산 관련 API Route
- 인증/인가: JWT/cookie 기반 인증, 관리자 체크, 템플릿 접근 권한 확인
- 비즈니스 로직: 템플릿 구매 요청, 접근 권한 부여, 커스텀 주문 상태 관리, 정산/로열티 계산 보조 흐름
- 에러 처리: API Route 단위에서 입력 검증, 권한 검증, 업로드 실패 처리
- 특수 기능: Cloudflare R2 업로드, Nodemailer 기반 이메일 인증/초대/비밀번호 재설정, Twitter 게시 연동

### Database
- 주요 테이블/컬렉션: 사용자, 템플릿, 팀, 구매 요청, 포트폴리오, 렌더 설정, 작가/판매 통계, 정산/로열티 관련 Supabase 테이블
- 관계 설계: 사용자-템플릿 접근 권한, 작가-템플릿 판매, 팀-멤버-팀 일정표, 주문/구매 요청과 파일 관계를 Supabase 기준으로 구성
- 인덱스/쿼리 최적화: 토큰, 이메일, 만료 시간 등 조회가 잦은 컬럼 기준 인덱스 설계 문서화
- 데이터 무결성: 토큰 만료/사용 여부, 업로드 검증, 구매 권한 확인을 서버 로직과 DB 제약으로 함께 관리
- 마이그레이션/시드 데이터: Supabase migration으로 포트폴리오, 템플릿 판매, 렌더 설정, v2 템플릿 스키마, 정산 테이블을 단계적으로 추가

### Infrastructure / Deployment
- 배포 환경: Next.js/Vercel 계열 배포 전제, Supabase, Cloudflare R2
- CI/CD: 확인 필요
- 환경 변수 관리: Supabase, R2, SMTP, JWT 관련 환경 변수 사용
- 모니터링/로그: 이메일 발송 및 API 오류는 서버 로그 중심으로 확인
- 도메인/SSL: 공개 전 확인 필요

## 5. 기술 스택
- Frontend: Next.js, React, TypeScript - App Router 기반 화면과 API Route를 함께 구성하기 위해 사용
- Backend: Next.js API Route - 별도 서버 없이 인증, 업로드, 관리자 기능을 처리하기 위해 사용
- Database: Supabase PostgreSQL - 인증/운영 데이터와 migration 관리를 위해 사용
- Styling: Tailwind CSS, cva - 화면별 빠른 스타일링과 재사용 컴포넌트 variant 관리를 위해 사용
- State/Data fetching: React Query, Context, custom hooks - 서버 상태와 편집기 UI 상태를 분리하기 위해 사용
- Auth: JWT, bcrypt, token email flow - 로그인, 초대, 비밀번호 재설정을 구현하기 위해 사용
- Deployment: Vercel/Supabase/Cloudflare R2 - 프론트 배포, DB, 파일 저장을 분리하기 위해 사용
- Tools: Nodemailer, html-to-image/modern-screenshot, JSZip - 이메일 발송, 이미지 저장, 다운로드 기능을 위해 사용

## 6. 핵심 기능
- 일정표 템플릿 편집기:
  - 사용자가 하는 일: 일정, 휴방, 프로필 이미지, 테마를 입력하고 공유용 이미지로 저장한다.
  - 내가 구현한 부분: 카드 입력 설정 기반 편집 hook, 프리뷰, 저장/복원, 템플릿별 설정 주입 구조.
  - 기술적 포인트: `CardInputConfig` 기반으로 템플릿별 입력 구조를 통합해 중복 hook을 줄임.
- 템플릿 상점/구매 요청:
  - 사용자가 하는 일: 템플릿을 탐색하고 구매 또는 접근 권한을 요청한다.
  - 내가 구현한 부분: 상점 목록/상세, 구매 요청, 사용자 템플릿 접근 확인.
  - 기술적 포인트: React Query hook과 service layer로 조회/변경 흐름을 분리.
- 관리자 운영 대시보드:
  - 사용자가 하는 일: 템플릿, 사용자, 구매 요청, 커스텀 주문, 파일, 정산 상태를 관리한다.
  - 내가 구현한 부분: 관리자 탭 구조, 목록/상세/상태 변경, 권한 부여, 정산 보조 화면.
  - 기술적 포인트: 관리자 탭 순서와 권한 흐름을 별도 API와 UI 컴포넌트로 분리.
- 파일 업로드/R2 연동:
  - 사용자가 하는 일: 주문 파일이나 포트폴리오 이미지를 업로드하고 관리한다.
  - 내가 구현한 부분: 업로드 검증, R2 저장, 파일 조회/삭제, zip 다운로드.
  - 기술적 포인트: 파일 검증과 저장 위치를 서버 유틸로 모아 업로드 실패 영향을 줄임.

## 7. 문제 해결 기록
- 문제: 템플릿 페이지마다 비슷한 일정표 편집 hook이 반복되었다.
- 원인 또는 제약: 각 템플릿의 입력 필드는 다르지만 상태 변경, 저장, 테마 변경 로직은 거의 같았다.
- 해결: `CardInputConfig`를 주입받는 통합 hook 시스템으로 구조를 바꿨다.
- 결과: 템플릿별 코드는 설정 중심으로 줄고, 편집기 로직 수정 지점이 한곳으로 모였다.

- 문제: 이미지/파일 업로드가 커질수록 서버 부하와 실패 복구가 부담이 되었다.
- 원인 또는 제약: 주문 파일과 포트폴리오 이미지가 운영 데이터와 연결되어 orphan 파일을 만들 수 있었다.
- 해결: 업로드 검증, R2 key 생성, DB 레코드 연결, 삭제 유틸을 분리했다.
- 결과: 업로드 성공/실패 흐름을 추적하기 쉬워졌고, 관리자 파일 관리 기능과 연결할 수 있었다.

- 문제: 구매 권한, 작가 판매, 정산 흐름이 단순 구매 요청만으로는 관리하기 어려웠다.
- 원인 또는 제약: 템플릿 접근 권한과 판매/정산 기준이 사용자·작가·템플릿 관계에 걸쳐 있었다.
- 해결: 관련 Supabase migration과 관리자 화면을 추가하고, React Query hook으로 정산/권한 데이터를 분리했다.
- 결과: 운영자가 구매 요청 처리와 정산 확인을 같은 관리자 흐름에서 다룰 수 있게 되었다.

## 8. 스틸컷 구성
- 스틸컷 제목: 일정표 편집기
- 보여줄 화면: 템플릿 입력 폼과 실시간 미리보기 화면
- 설명 문구: 템플릿마다 다른 입력 구조를 설정 기반으로 주입해 일정표 이미지를 빠르게 제작합니다.
- 이 화면에서 강조할 기여: 통합 hook, 프리뷰, 저장/복원 흐름

- 스틸컷 제목: 템플릿 상점
- 보여줄 화면: 상점 목록 또는 템플릿 상세/구매 요청 화면
- 설명 문구: 사용자는 필요한 템플릿을 확인하고 접근 권한을 요청할 수 있습니다.
- 이 화면에서 강조할 기여: React Query 기반 조회, 구매 요청, 접근 권한 확인

- 스틸컷 제목: 관리자 대시보드
- 보여줄 화면: 관리자 탭, 주문/구매 요청/템플릿 관리 화면
- 설명 문구: 운영자가 템플릿과 요청 상태를 한 곳에서 관리할 수 있도록 정리했습니다.
- 이 화면에서 강조할 기여: 관리자 UI, 권한 체크, 상태 변경 API

- 스틸컷 제목: 정산/권한 관리
- 보여줄 화면: 로열티/정산 또는 사용자 템플릿 권한 관리 화면
- 설명 문구: 판매 이후의 권한 부여와 정산 확인까지 운영 흐름에 포함했습니다.
- 이 화면에서 강조할 기여: Supabase schema, 관리자 hook, 정산 보조 화면

## 9. 결과와 임팩트
- 사용자/팀/개발 경험 측면의 변화: 반복 제작이 많은 일정표 템플릿을 설정 기반 편집기로 정리해 신규 템플릿 추가와 운영 관리를 쉽게 만들었다.
- 성능 개선: 정량 지표는 없음. 중복 hook 제거와 업로드 흐름 분리로 유지보수 비용을 줄였다.
- 유지보수 개선: Page/UI, React Query hook, service/API Route, Supabase migration 흐름이 분리되어 변경 영향 범위를 추적하기 쉬워졌다.
- 출시/운영 여부: 운영 여부 확인 필요.
- 배운 점: 제작 도구와 커머스/관리 기능이 결합될 때는 UI 편의성보다 데이터 권한과 운영 흐름을 먼저 고정해야 한다.

## 10. 포트폴리오용 최종 요약
- title: TEMIS
- subtitle: Creator Tools & Commerce
- role: 풀스택 구현 / 프론트엔드 중심
- period: 2025.07 - 운영 중
- implementationScope: Frontend + Backend + DB
- tagline: 크리에이터의 일정표 제작, 템플릿 판매, 운영 관리를 한 흐름으로 묶은 웹 서비스.
- description: Next.js App Router에서 일정표/썸네일 편집, 템플릿 상점, 커스텀 주문, 관리자 운영 화면을 구현했습니다. Supabase 스키마와 API Route, React Query hook, R2 업로드, Nodemailer 기반 이메일 토큰 흐름을 연결했습니다.
- highlights: 일정표 템플릿 편집기, 템플릿 상점, 관리자 운영 대시보드, 파일 업로드/R2 연동
- stack: Next.js, React, TypeScript, Supabase, TanStack Query, Tailwind CSS, Cloudflare R2, Nodemailer
- shots: 일정표 템플릿 편집, 템플릿 상점/구매 요청, 관리자 운영 대시보드, 정산/권한 관리
- contributionSummary: 프론트엔드 화면, API Route, Supabase migration, 파일/이메일 연동까지 구현한 풀스택 프로젝트
- problemSolving: 중복 편집 hook 통합, R2 업로드 흐름 분리, 구매/권한/정산 데이터 구조 정리
- impact: 정량 성과는 없지만, 반복 템플릿 제작과 운영 관리가 한 서비스 흐름 안에서 가능해졌다.
- links: 공개 링크/저장소 링크 확인 필요

---

# VSHOT V2

## 1. 기본 정보
- 프로젝트명: VShot v2
- 짧은 부제: WebRTC 기반 실시간 포토부스와 고해상도 합성 시스템
- 상태: 완료
- 기간: 2026.01 - 2026.04
- 팀 규모: 확인 필요
- 내 역할: 풀스택 구현 / 실시간 미디어 처리
- 구현 범위:
  - Frontend + Backend + DB
- 공개 링크: 확인 필요
- 저장소 링크: 확인 필요
- 공개 가능 범위: 서비스 컨셉, WebRTC/합성 구조, 화면 흐름, 기술 스택 공개 가능. 사용자 계정, 이벤트 운영 데이터, 스토리지/서버 키는 비공개.

## 2. 한 줄 소개
Host와 Guest가 실시간으로 연결되고, 촬영 순간에는 각자의 원본 이미지를 서버에서 합성해 고화질 결과물을 만드는 웹 포토부스.

## 3. 시놉시스
실시간 영상통화 화면을 그대로 캡처하면 네트워크 압축과 canvas 캡처 과정 때문에 최종 사진 품질이 떨어지는 문제가 있었다. VShot v2는 WebRTC를 실시간 미리보기와 상호작용에 사용하고, 최종 결과물은 각 클라이언트가 로컬 원본을 캡처해 서버에서 합성하는 구조로 설계했다. 주요 사용자는 포토부스 Host, 촬영에 참여하는 Guest, 프레임과 사용자를 관리하는 운영자다. 나는 Next.js 클라이언트, WebSocket 시그널링 서버, Room/Session 관리, Supabase/R2 파일 관리, WebGL 영상 합성 최적화를 나눠 구현했다.

## 4. 내 기여

### Frontend
- 구현한 주요 화면: 홈, 로그인, Host 준비/촬영 룸, Guest 준비/촬영 룸, Festa 모드, 다운로드 페이지, 관리자 대시보드, 프레임/유저/그룹 관리
- 상태 관리: Zustand로 촬영 세션 상태를 관리하고, custom hook으로 WebRTC, signaling, media device, chroma key, capture flow를 분리
- API 연동: Express API, Next API Route, Supabase, R2, WebSocket signaling 연동
- 반응형/접근성: 모바일 촬영 흐름, QR 다운로드, 연결 상태/카운트다운/플래시/처리중 UI 제공
- 성능 개선: FFmpeg 기반 후처리 병목을 WebGL 합성 및 개별 녹화 방식으로 줄이는 구조를 적용
- UI/UX 판단: Host는 설정과 촬영 제어에 집중하고, Guest는 입장·촬영·선택·다운로드 흐름만 보도록 역할별 화면을 분리

### Backend
- 주요 API: WebSocket signaling, ICE server config, photo-v3 upload/merge, frame CRUD, frame access, group/user 관리, auth, Festa file/film API, internal status
- 인증/인가: API key middleware, JWT auth, admin role guard
- 비즈니스 로직: room 생성/참여/재입장, host/guest signaling, guest rotation, photo upload coordination, frame access policy
- 에러 처리: WebSocket message parsing error, room join 실패, upload chunk offset 검증, auth/role 오류 처리
- 특수 기능: resumable chunk upload, R2 파일 저장, Supabase file/film/frame record, server-side image merge, WebGL client-side video composition

### Database
- 주요 테이블/컬렉션: `files`, `films`, `frames`, `groups`, `user_groups`, `frame_access`, `users`
- 관계 설계: 프레임 접근 권한을 사용자/그룹 단위로 분리하고, 촬영 결과는 file/film record와 연결
- 인덱스/쿼리 최적화: migration 기준으로 파일/필름/프레임 조회 흐름 구성
- 데이터 무결성: 파일 업로드 시 DB record와 R2 object 상태를 함께 관리하고, 실패 시 rollback/cleanup 처리
- 마이그레이션/시드 데이터: client migrations 001-008로 파일, 필름, 프레임, 그룹, 접근 권한 구조를 추가

### Infrastructure / Deployment
- 배포 환경: Next.js client, Node/Express server, Supabase, Cloudflare R2, TURN/STUN 구성 전제
- CI/CD: server GitHub Actions deploy workflow 존재
- 환경 변수 관리: API key, JWT secret, Supabase, R2, TURN/STUN, CORS origin 사용
- 모니터링/로그: `/api/internal/status`로 process, memory, event loop delay, room/session 상태 snapshot 제공
- 도메인/SSL: 공개 전 확인 필요

## 5. 기술 스택
- Frontend: Next.js, React, TypeScript - 역할별 촬영 화면과 관리자 화면을 구성하기 위해 사용
- Backend: Node.js, Express, ws - WebSocket signaling과 이미지/프레임 API를 가볍게 운영하기 위해 사용
- Database: Supabase PostgreSQL - 사용자, 파일, 필름, 프레임, 접근 권한 기록을 관리하기 위해 사용
- Styling: Tailwind CSS - 촬영 UI와 관리자 UI를 빠르게 구성하기 위해 사용
- State/Data fetching: Zustand, custom hooks - 실시간 촬영 상태와 장치/연결 상태를 분리하기 위해 사용
- Auth: JWT, API key - 관리자 기능과 내부 API를 보호하기 위해 사용
- Deployment: Vercel, Vultr/Node server, Cloudflare R2 - client/server/storage를 분리하기 위해 사용
- Tools: WebRTC, WebSocket, Sharp, FFmpeg, WebGL, MediaRecorder - 실시간 통신, 이미지 합성, 영상 합성을 위해 사용

## 6. 핵심 기능
- Host/Guest WebRTC 촬영 룸:
  - 사용자가 하는 일: Host가 방을 만들고 Guest가 참여해 실시간 화면을 확인한다.
  - 내가 구현한 부분: 방 생성/참여, signaling message, ICE 교환, 연결 상태 UI.
  - 기술적 포인트: WebRTC는 미리보기용, 최종 캡처는 로컬 원본 기반으로 분리.
- 고해상도 사진 캡처/합성:
  - 사용자가 하는 일: 촬영 버튼을 누르면 양쪽 클라이언트가 동시에 원본 이미지를 캡처한다.
  - 내가 구현한 부분: 카운트다운, 캡처, upload, server merge, 결과 URL 반환.
  - 기술적 포인트: alpha 채널과 원본 해상도를 유지하기 위해 base64/resumable upload와 서버 merge를 조합.
- 프레임/권한 관리자:
  - 사용자가 하는 일: 운영자가 프레임을 등록하고 사용자 또는 그룹별 접근 권한을 부여한다.
  - 내가 구현한 부분: frame CRUD, thumbnail/frame file upload, user/group access API와 관리자 UI.
  - 기술적 포인트: public/private frame을 권한에 따라 필터링.
- 영상 합성 최적화:
  - 사용자가 하는 일: 선택된 촬영 결과를 영상 프레임으로 생성한다.
  - 내가 구현한 부분: WebGL video composer, 개별 세그먼트 녹화, MediaRecorder 기반 결과 생성.
  - 기술적 포인트: 문서 기준 합성 단계가 FFmpeg.wasm 재인코딩보다 크게 단축되도록 GPU 렌더링을 사용.

## 7. 문제 해결 기록
- 문제: WebRTC 스트림 화면을 그대로 캡처하면 최종 사진 품질이 낮아졌다.
- 원인 또는 제약: WebRTC 압축, 네트워크 상태, canvas 캡처 해상도 저하가 결과물에 영향을 줬다.
- 해결: WebRTC는 실시간 미리보기로만 사용하고, 촬영 순간에는 각 클라이언트의 로컬 원본을 캡처해 서버에서 합성했다.
- 결과: 실시간 연결 경험과 최종 이미지 품질을 분리해 관리할 수 있게 되었다.

- 문제: 영상 합성에서 FFmpeg.wasm 재인코딩이 오래 걸렸다.
- 원인 또는 제약: 브라우저 WebAssembly 기반 인코딩은 CPU 부담이 크고 4개 영상을 합성할 때 병목이 컸다.
- 해결: WebGL로 2x2 비디오 텍스처를 렌더링하고, `canvas.captureStream()`과 MediaRecorder로 결과를 녹화했다.
- 결과: 문서화된 테스트 기준 합성 단계가 60-120초에서 5-10초 수준으로 줄어드는 개선을 확인했다.

- 문제: 연속 녹화 후 영상을 자르는 과정이 전체 처리 시간을 늘렸다.
- 원인 또는 제약: 촬영 후 FFmpeg로 8개 세그먼트를 분할하는 단계가 추가 병목이었다.
- 해결: 각 사진 촬영 시점마다 개별 녹화 세그먼트를 만들고, 실시간 송출 stream은 유지하도록 recorder lifecycle을 조정했다.
- 결과: 분할 단계가 사라지고, 문서 기준 전체 후처리 시간이 5-10초 수준으로 단축되는 구조가 되었다.

## 8. 스틸컷 구성
- 스틸컷 제목: Host 촬영 룸
- 보여줄 화면: Host 영상 미리보기, 프레임, 설정 패널, 촬영 버튼
- 설명 문구: Host가 방을 열고 화면/카메라, 프레임, 촬영 타이밍을 제어합니다.
- 이 화면에서 강조할 기여: WebRTC 연결, 설정 상태, 촬영 orchestration

- 스틸컷 제목: Guest 사진 선택
- 보여줄 화면: Guest 촬영 결과 그리드와 선택 UI
- 설명 문구: Guest는 촬영된 사진 중 결과물에 사용할 컷을 선택합니다.
- 이 화면에서 강조할 기여: 실시간 선택 동기화, 선택 제한, 다운로드 흐름

- 스틸컷 제목: 프레임 관리자
- 보여줄 화면: 프레임 업로드, 슬롯 위치, 접근 권한 관리 화면
- 설명 문구: 운영자는 이벤트용 프레임을 등록하고 사용자/그룹별 공개 범위를 제어합니다.
- 이 화면에서 강조할 기여: Supabase/R2 연동, frame access 모델

- 스틸컷 제목: QR 다운로드 결과
- 보여줄 화면: 촬영 결과 다운로드 페이지와 QR 코드
- 설명 문구: 촬영 후 사용자에게 결과물 접근 경로를 제공하는 화면입니다.
- 이 화면에서 강조할 기여: film record, file relation, 다운로드 UX

## 9. 결과와 임팩트
- 사용자/팀/개발 경험 측면의 변화: 실시간 통화, 촬영, 선택, 다운로드, 프레임 운영까지 포토부스 운영에 필요한 흐름을 하나의 웹 시스템으로 구성했다.
- 성능 개선: 문서화된 테스트 기준 WebGL 합성은 FFmpeg.wasm 방식 대비 합성 단계 시간을 크게 줄였다. 개별 녹화 방식으로 분할 병목도 제거했다.
- 유지보수 개선: signaling, room/session, capture, frame, file, auth를 모듈로 분리해 기능별 수정 범위를 좁혔다.
- 출시/운영 여부: 공개/운영 상태 확인 필요.
- 배운 점: 실시간 미디어 프로젝트에서는 "보이는 화면"과 "최종 산출물"의 품질 요구가 다르므로 데이터 경로를 처음부터 분리하는 것이 중요하다.

## 10. 포트폴리오용 최종 요약
- title: VSHOT
- subtitle: WebRTC Photobooth
- role: 풀스택 구현 / 실시간 미디어 처리
- period: 2026.01 - 2026.04
- implementationScope: Frontend + Backend + DB
- tagline: 실시간 영상통화와 고해상도 원본 캡처를 분리한 웹 포토부스.
- description: Host와 Guest가 WebRTC로 연결되고, 촬영 순간에는 각 클라이언트가 원본 이미지를 캡처해 서버에서 합성하도록 설계했습니다. Next.js 클라이언트, Express/WebSocket 시그널링 서버, Room/Session 관리, R2/Supabase 파일·프레임 관리, WebGL 영상 합성 최적화를 구현했습니다.
- highlights: WebRTC 촬영 룸, 고해상도 캡처/합성, 프레임/권한 관리자, WebGL 영상 합성
- stack: Next.js, React, TypeScript, Node.js, Express, WebRTC, WebSocket, Supabase, Cloudflare R2, WebGL, Sharp
- shots: Host 촬영 룸, Guest 사진 선택, 프레임 관리자, QR 다운로드 결과
- contributionSummary: 실시간 연결부터 서버 합성, 파일 저장, 프레임 운영까지 맡은 풀스택 미디어 프로젝트
- problemSolving: WebRTC 압축 품질 문제 분리, WebGL 합성 최적화, 개별 녹화로 분할 병목 제거
- impact: 정량 성과는 문서 기준이며, 후처리 시간을 크게 줄이는 구조를 만들었다.
- links: 공개 링크/저장소 링크 확인 필요

---

# LUCENT

## 1. 기본 정보
- 프로젝트명: LUCENT
- 짧은 부제: 디지털·실물 상품 쇼핑몰의 v2 커머스 전환 프로젝트
- 상태: 운영 중
- 기간: 2026.03 - 운영 중
- 팀 규모: 확인 필요
- 내 역할: 풀스택 구현 / 커머스 v2 전환
- 구현 범위:
  - Frontend + Backend + DB
- 공개 링크: 확인 필요
- 저장소 링크: 확인 필요
- 공개 가능 범위: 커머스 도메인 구조, v2 전환 전략, 화면/기술 스택 공개 가능. 고객명, 주문 데이터, 결제/배송 운영 정보, API key는 비공개.

## 2. 한 줄 소개
기존 쇼핑몰을 유지하면서 디지털·실물 상품, 캠페인 가격, 주문/이행, 관리자 운영을 v2 커머스 모델로 점진 전환한 프로젝트.

## 3. 시놉시스
기존 커머스 구조는 상품, 가격, 재고, 주문, 배송, 디지털 권한이 한 흐름 안에 섞여 있어 번들, 캠페인, 혼합 주문을 안정적으로 다루기 어려웠다. LUCENT v2는 운영 중인 테이블을 바로 교체하지 않고 `public.v2_*` 모델을 병행 구축해 기능 단위로 전환하는 것을 목표로 했다. 주요 사용자는 상품을 구매하는 고객과 상품/캠페인/주문/배송을 관리하는 운영자다. 나는 Next.js 프론트, React Query API layer, Next BFF, NestJS backend, Supabase migration을 연결해 사용자 구매 플로우와 관리자 운영 플로우를 함께 전환했다.

## 4. 내 기여

### Frontend
- 구현한 주요 화면: 프로젝트/상품 공개 페이지, v2 상점 목록/상세, 장바구니, 체크아웃, 주문 완료, 마이페이지 주문/디지털 상품, v2 카탈로그 관리자, 캠페인/가격 관리자, 제작/배송 관리, v2 ops/stats
- 상태 관리: React Query로 서버 상태를 관리하고, query key/invalidate 정책을 도메인별 hook에 명시
- API 연동: `lib/client/api/*`, `lib/client/hooks/*`, `app/api/*` BFF route를 통해 NestJS backend와 연동
- 반응형/접근성: Tailwind 기반 사용자/관리자 화면, Storybook 기반 재사용 UI 컴포넌트 일부 구성
- 성능 개선: 사용자 화면과 관리자 테스트 도구를 분리하고, v2 read/write 경로를 명확히 나눠 불필요한 직접 호출을 줄임
- UI/UX 판단: 고객 화면은 구매에 필요한 정보만 남기고, 운영 화면은 주문/제작/배송 상태를 처리 우선순위 중심으로 볼 수 있게 구성

### Backend
- 주요 API: `v2/shop`, `v2/catalog/admin`, `v2/checkout`, `v2/admin`, `v2/fulfillment`, products, projects, artists, auth, profiles, cart, orders, images, logs, notifications
- 인증/인가: session/Bearer token 기반 사용자 인증, 관리자 권한 확인, local admin bypass는 개발 환경으로 제한
- 비즈니스 로직: variant 기반 카탈로그, bundle, campaign/pricing/promotion, cart/checkout/order snapshot, fulfillment/shipping/digital entitlement, admin batch/action flow
- 에러 처리: `successResponse`, `ApiException`, domain service 단위 예외 처리
- 특수 기능: Cloudflare R2 이미지 업로드/멀티파트 업로드, Sendon 알림톡, SMTP 이메일 인증/비밀번호 재설정, PDF 출력/배송 문서

### Database
- 주요 테이블/컬렉션: `v2_projects`, `v2_products`, `v2_product_variants`, `v2_bundle_*`, `v2_campaigns`, `v2_price_lists`, `v2_promotions`, `v2_coupons`, `v2_carts`, `v2_orders`, `v2_order_items`, `v2_fulfillment_*`, `v2_media_assets`, admin batch/audit 관련 테이블
- 관계 설계: 기존 `auth.users`/profiles는 유지하고, 커머스 도메인만 `public.v2_*`로 분리
- 인덱스/쿼리 최적화: 주문/카탈로그/관리자 큐 조회를 위한 view와 migration을 단계적으로 추가
- 데이터 무결성: order snapshot, campaign snapshot, fulfillment status, entitlement/download 권한을 분리해 사후 추적 가능하게 설계
- 마이그레이션/시드 데이터: v2 catalog, bundle, campaign/pricing, checkout/order, fulfillment, admin ops, cutover/migration control migration과 검증 스크립트 구성

### Infrastructure / Deployment
- 배포 환경: Next.js frontend, NestJS backend, Supabase, Cloudflare R2
- CI/CD: backend GitHub Actions CI/CD workflow와 Docker build 대상 구성
- 환경 변수 관리: backend API URL, Supabase, R2, SMTP, Sendon, admin emails, local bypass 환경 변수 사용
- 모니터링/로그: logs API와 admin logs 화면, backend health endpoint, 운영 검증 스크립트
- 도메인/SSL: 공개 전 확인 필요

## 5. 기술 스택
- Frontend: Next.js, React, TypeScript - 사용자 구매 플로우와 관리자 화면을 한 프로젝트에서 구성하기 위해 사용
- Backend: NestJS - Controller/Service 계층으로 커머스 도메인 API를 분리하기 위해 사용
- Database: Supabase PostgreSQL - 기존 운영 데이터와 v2 커머스 모델을 병행 관리하기 위해 사용
- Styling: Tailwind CSS, cva - 일관된 UI와 variant 관리에 사용
- State/Data fetching: TanStack Query - 서버 상태, mutation, invalidate 전략을 명확히 하기 위해 사용
- Auth: Supabase/Auth session, custom auth endpoints - 회원가입, 로그인, 프로필, 관리자 권한을 처리하기 위해 사용
- Deployment: Vercel, Docker, GitHub Actions, Supabase, Cloudflare R2 - frontend/backend/storage 배포와 운영을 분리하기 위해 사용
- Tools: Storybook, Vitest, Playwright, ffmpeg/pdf tooling, xlsx - UI 검증, 테스트, 운영 문서/엑셀 처리에 사용

## 6. 핵심 기능
- v2 카탈로그/상품 관리자:
  - 사용자가 하는 일: 운영자가 project, product, variant, media, bundle을 등록하고 공개 상태를 관리한다.
  - 내가 구현한 부분: 관리자 API, React Query hook, 상품/variant/media form, readiness 화면.
  - 기술적 포인트: 상품 성격과 fulfillment type을 분리하고, media asset upload를 R2와 연결.
- v2 상점/장바구니/체크아웃:
  - 사용자가 하는 일: 고객이 상품을 탐색하고 장바구니에 담아 주문을 생성한다.
  - 내가 구현한 부분: shop read API, cart edit, checkout validate, order create, order complete 화면.
  - 기술적 포인트: variant 기준 거래와 order snapshot을 통해 주문 시점 정보를 보존.
- 캠페인/가격/프로모션:
  - 사용자가 하는 일: 운영자가 이벤트/팝업 판매와 가격표, 쿠폰/프로모션을 관리한다.
  - 내가 구현한 부분: campaign/pricing/promotion API와 관리자 화면, quote/debug 흐름.
  - 기술적 포인트: 상품 정보와 판매 컨텍스트, 가격 계산 결과를 분리.
- 제작/배송/디지털 이행:
  - 사용자가 하는 일: 운영자가 결제 확인, 제작 배치, 배송 배치, 디지털 다운로드 권한을 관리한다.
  - 내가 구현한 부분: fulfillment API, production/shipping admin tabs, batch PDF/download 흐름.
  - 기술적 포인트: order와 fulfillment를 분리해 실물/디지털 혼합 주문을 추적 가능하게 함.

## 7. 문제 해결 기록
- 문제: 기존 구조에서 상품 타입, 가격, 재고, 배송/다운로드 책임이 섞여 있었다.
- 원인 또는 제약: 운영 중인 v1 테이블을 즉시 교체하면 데이터와 화면 회귀 위험이 컸다.
- 해결: 기존 테이블은 유지하고, 새 커머스 도메인을 `public.v2_*`로 병행 구축했다.
- 결과: 사용자/관리자 화면을 기능 단위로 v2 API에 연결하며 점진 전환할 수 있게 되었다.

- 문제: 사용자 cart/checkout 화면에 테스트·운영자 액션이 섞일 위험이 있었다.
- 원인 또는 제약: v2 검증 단계에서는 디버그/결제 콜백/환불 기능이 같은 화면에 붙기 쉬웠다.
- 해결: 사용자 플로우는 장바구니 편집, 검증, 주문 생성으로 단순화하고 운영 액션은 관리자/검증 도구로 분리했다.
- 결과: 고객 화면은 구매에 집중하고, 운영 화면은 상태 변경과 검증에 집중하는 구조가 되었다.

- 문제: 주문 이후 실물 배송과 디지털 권한 발급을 같은 상태로 처리하기 어려웠다.
- 원인 또는 제약: 하나의 주문 안에 실물, 디지털, bundle component가 섞일 수 있었다.
- 해결: order/payment/fulfillment 축을 분리하고, fulfillment group, shipment, entitlement를 별도 도메인으로 설계했다.
- 결과: 주문 상세와 관리자 큐에서 처리해야 할 상태가 더 명확해졌다.

## 8. 스틸컷 구성
- 스틸컷 제목: v2 상점/상품 상세
- 보여줄 화면: 상품 목록, 상품 상세, variant 선택, 가격 표시
- 설명 문구: 고객은 v2 카탈로그 기준으로 판매 가능한 상품과 옵션을 확인합니다.
- 이 화면에서 강조할 기여: shop read API, variant 표시, 가격/재고 상태 처리

- 스틸컷 제목: 장바구니/체크아웃
- 보여줄 화면: 장바구니 라인 아이템, 주문자/배송 정보, 금액 요약, 주문 생성
- 설명 문구: 장바구니 수정부터 주문 확정까지 사용자용 흐름으로 정리했습니다.
- 이 화면에서 강조할 기여: v2 checkout hook, validate/create order, idempotency key

- 스틸컷 제목: v2 카탈로그 관리자
- 보여줄 화면: product/variant/media/campaign/pricing 관리자 화면
- 설명 문구: 운영자는 상품 구조와 판매 컨텍스트를 분리해 관리할 수 있습니다.
- 이 화면에서 강조할 기여: NestJS admin API, React Query hook, form UI

- 스틸컷 제목: 제작/배송 관리
- 보여줄 화면: 제작 배치, 배송 배치, 송장/배송완료 처리 화면
- 설명 문구: 주문 이후 이행 단계를 실물/디지털 처리에 맞게 분리했습니다.
- 이 화면에서 강조할 기여: fulfillment 모델, batch action, PDF/download 흐름

## 9. 결과와 임팩트
- 사용자/팀/개발 경험 측면의 변화: 기존 운영 구조를 보존하면서 새 커머스 모델을 병행 구축해 전환 리스크를 낮췄다.
- 성능 개선: 정량 지표는 없음. 대신 API 경계, query key, BFF route, backend service 계층을 정리해 변경 영향 범위를 줄였다.
- 유지보수 개선: Page/UI -> React Query hook -> API service -> Next BFF -> NestJS API -> Supabase 흐름을 문서와 코드에 맞췄다.
- 출시/운영 여부: 운영 중. 실제 공개/운영 상세 범위는 확인 필요.
- 배운 점: 운영 중인 커머스 리팩토링은 새 모델을 만드는 일보다 기존 데이터와 화면을 안전하게 공존시키는 설계가 더 중요하다.

## 10. 포트폴리오용 최종 요약
- title: LUCENT
- subtitle: Commerce Platform V2
- role: 풀스택 구현 / 커머스 v2 전환
- period: 2026.03 - 운영 중
- implementationScope: Frontend + Backend + DB
- tagline: 디지털·실물 상품 쇼핑몰을 v2 커머스 모델로 점진 전환한 프로젝트.
- description: 기존 운영 테이블을 보존하면서 `public.v2_*` 커머스 모델을 병행 구축하고, 상품/variant, 캠페인·가격, 장바구니·체크아웃, 주문/이행/관리 화면을 단계적으로 전환했습니다.
- highlights: v2 카탈로그 관리자, v2 상점/체크아웃, 캠페인/가격/프로모션, 제작/배송/디지털 이행
- stack: Next.js, React, TypeScript, NestJS, Supabase, TanStack Query, Tailwind CSS, Storybook, Cloudflare R2
- shots: v2 상점/상품 상세, 장바구니/체크아웃, v2 카탈로그 관리자, 제작/배송 관리
- contributionSummary: 프론트, 백엔드, DB migration, 관리자 운영 화면까지 연결한 커머스 v2 전환 프로젝트
- problemSolving: v1/v2 병행 모델, 사용자/운영자 플로우 분리, order/fulfillment 책임 분리
- impact: 정량 성과는 없지만, 운영 중인 쇼핑몰을 점진 전환할 수 있는 구조와 검증 흐름을 만들었다.
- links: 공개 링크/저장소 링크 확인 필요

---

# 231EDU

## 1. 기본 정보
- 프로젝트명: 231EDU
- 짧은 부제: 학원 학생, 수업, 시간표, 리포트 운영을 통합 관리하는 웹 시스템
- 상태: 운영 중
- 기간: 2025.08 - 운영 중
- 팀 규모: 확인 필요
- 내 역할: 풀스택 구현 / 학원 운영 자동화
- 구현 범위:
  - Frontend + Backend + DB
  - Backend는 NestJS API server로 분리
  - OMR/채점 처리는 Python OMR/exam server로 분리
- 공개 링크: 확인 필요
- 저장소 링크: 확인 필요
- 공개 가능 범위: 서비스명, 화면 구조, 기술 스택, 구현 기능 공개 가능. 학생 개인정보, 학원 내부 운영 데이터, 알림톡 템플릿/발송 키, Supabase 정보는 비공개.

## 2. 한 줄 소개
학원 운영자가 학생, 반 편성, 강의실 시간표, OMR 채점, 주간 리포트 발송을 한곳에서 관리할 수 있도록 만든 웹 운영 시스템.

## 3. 시놉시스
학원 운영 업무는 학생 정보, 반 편성, 강의실 시간표, 시험 채점, 학부모 리포트 발송이 서로 떨어져 있으면 반복 입력과 확인 비용이 커진다. 231EDU는 수업 운영 데이터를 한 화면 흐름 안에서 관리하고, 시험/리포트/알림까지 이어지도록 만드는 것을 목표로 했다. 주요 사용자는 학원 관리자와 강사이며, 학생 개인 데이터와 내부 일정은 비공개 운영 정보로 다뤘다. 나는 Next.js 화면, React Query hook/service, NestJS API server, Python OMR/exam server, Supabase migration을 연결해 운영자가 반복 처리하는 업무를 기능 단위로 자동화했다.

## 4. 내 기여

### Frontend
- 구현한 주요 화면: 로그인/회원가입/초대 검증, 학생 관리, 반 관리, 반 편성, 강의실 시간표, 통합 시간표, 강사 시간표, 중등 기록, OMR 템플릿/채점, 주간 리포트
- 상태 관리: TanStack Query로 학생/수업/시간표/리포트 서버 상태를 관리하고, 화면별 form/local state를 분리
- API 연동: `src/services/client`, `src/queries` 계층을 통해 NestJS API server와 Python OMR/exam server 연동
- 반응형/접근성: 운영자 화면 중심의 테이블, 그리드, 캔버스형 시간표 UI 구성
- 성능 개선: 시간표와 편성 데이터 조회/갱신 흐름을 query hook으로 분리해 변경 범위를 줄임
- UI/UX 판단: 학생/반/시간표처럼 서로 참조되는 데이터를 탭과 표, 일정 캔버스 중심으로 배치해 운영자가 확인할 정보를 한곳에서 볼 수 있게 구성

### Backend
- 주요 API: NestJS API server에서 인증/초대, 학생, 반, 과목, 강사, 반 편성, 강의실 시간표, 통합 시간표, 예외 일정, 시험 기간, 주간 리포트, 알림톡 발송 처리
- OMR/채점 API: Python OMR/exam server에서 OMR 이미지 업로드, 템플릿 좌표 분석, 마킹 판정, 채점 결과 생성 처리
- 인증/인가: 로그인, 로그아웃, 현재 사용자, 회원가입, 초대 검증, 토큰 검증 흐름 구현
- 비즈니스 로직: 학생-수업 등록, 반 구성, 강의실 이동/시간 변경, 주간 리포트 생성 및 발송, OMR 템플릿 기반 채점
- 에러 처리: NestJS DTO/service 단위 입력 검증, OMR 서버 처리 실패, 존재하지 않는 리소스/권한/발송 실패 처리
- 특수 기능: Kakao 알림톡 프록시 API, 주간 리포트 발송 로그, OMR 이미지 처리, 엑셀 처리, 이메일/문자 발송 연동

### Database
- 주요 테이블/컬렉션: auth/user, students, classes, class_students, student_compositions, class_composition, schedules, OMR templates, weekly_reports, weekly_report_logs, exam periods 관련 테이블
- 관계 설계: 학생 등록 정보와 반 구성 정보를 분리하고, `student_compositions`로 학생-반편성 관계를 명시
- 인덱스/쿼리 최적화: 학생/수업/편성 조회를 위한 관계 테이블과 Supabase migration 구성
- 데이터 무결성: 주간 리포트 중복 발송 방지를 위한 `(week_of, student_id, subject_id)` 기준 제약 흐름 적용
- 마이그레이션/시드 데이터: 초기 스키마, 인증, 학생 등록, 반 편성, OMR 템플릿, 주간 리포트, 중등 정보, 시험 기간 관련 SQL migration 작성

### Infrastructure / Deployment
- 배포 환경: 확인 필요
- CI/CD: 확인 필요
- 환경 변수 관리: Supabase, 알림톡/문자, 이메일 관련 환경 변수 사용. 실제 키는 비공개
- 모니터링/로그: 주간 리포트 발송 로그, API 응답 로그 중심으로 확인
- 도메인/SSL: 확인 필요

## 5. 기술 스택
- Frontend: Next.js, React, TypeScript - 운영자 화면과 서버 상태 흐름을 구성하기 위해 사용
- Backend: NestJS - 인증, 학생, 수업, 시간표, 리포트, 알림톡 API를 분리된 서버에서 처리하기 위해 사용
- OMR/Exam Server: Python - OMR 이미지 처리와 채점 분석을 운영 API와 분리하기 위해 사용
- Database: Supabase PostgreSQL - 학생, 수업, 편성, 리포트 데이터를 관계형으로 관리하기 위해 사용
- Styling: Tailwind CSS, cva - 운영 화면의 반복 UI와 variant를 정리하기 위해 사용
- State/Data fetching: TanStack Query - 서버 상태 캐싱, mutation, invalidate 흐름을 명확히 하기 위해 사용
- Auth: custom auth API, JWT, bcrypt - 초대 기반 가입과 로그인 흐름을 처리하기 위해 사용
- Deployment: 확인 필요 - 공개 배포 정보는 코드/문서에서 확인되지 않음
- Tools: OMR image processing, xlsx, nodemailer, solapi/alimtalk - 채점, 엑셀 처리, 이메일/문자/알림톡 발송에 사용

## 6. 핵심 기능
- 학생/반/편성 관리:
  - 사용자가 하는 일: 학생을 등록하고 수업, 반, 편성 정보를 관리한다.
  - 내가 구현한 부분: 학생/반/편성 화면, NestJS API, Supabase relation, React Query hook.
  - 기술적 포인트: 학생 등록과 반 편성 상태를 분리해 변경 이력을 다루기 쉬운 구조로 정리.
- 강의실/통합 시간표:
  - 사용자가 하는 일: 강의실별 수업 배치와 시간 변경, 학생 이동을 확인한다.
  - 내가 구현한 부분: 강의실 시간표, 통합 시간표, 변경 API, 일정 캔버스 UI.
  - 기술적 포인트: 시간표 데이터 조회와 수정 mutation을 분리해 화면 갱신 범위를 통제.
- OMR 템플릿 기반 채점:
  - 사용자가 하는 일: OMR 이미지를 업로드하고 답안 인식 결과를 확인한다.
  - 내가 구현한 부분: OMR 템플릿, 업로더, 결과 화면, Python OMR/exam server 처리/채점 API.
  - 기술적 포인트: 기본 템플릿 좌표와 밝기 기준을 사용해 마킹 여부를 판정.
- 주간 리포트 알림톡:
  - 사용자가 하는 일: 학생별 주간 리포트를 생성하고 학부모에게 발송한다.
  - 내가 구현한 부분: 주간 리포트 API, 발송 API, 로그 저장, 알림톡 프록시 연동.
  - 기술적 포인트: 리포트 row를 먼저 생성하고 발송 결과를 로그로 남겨 추적 가능하게 구성.

## 7. 문제 해결 기록
- 문제: 학생의 수업 등록 정보와 세부 반 편성 정보가 한 테이블에 섞여 있었다.
- 원인 또는 제약: `class_students`가 등록과 편성의 책임을 동시에 가져 편성 변경 시 관계가 모호해졌다.
- 해결: `student_compositions` 테이블을 추가해 학생 등록과 반 구성 관계를 분리했다.
- 결과: 학생-수업-반편성 관계를 더 명확하게 조회하고 변경할 수 있는 구조가 되었다.

- 문제: OMR 채점은 이미지 크기와 촬영 상태에 따라 인식 기준이 흔들릴 수 있었다.
- 원인 또는 제약: 마킹 영역을 픽셀 좌표로만 다루면 템플릿 변경과 이미지 스케일에 취약하다.
- 해결: 템플릿 좌표를 기준으로 마커 위치를 관리하고, 밝기/차이 임계값을 이용해 마킹 여부를 판정했다.
- 결과: 기본 OMR 양식 기준으로 업로드-처리-결과 확인 흐름을 구현할 수 있었다.

- 문제: 주간 리포트 발송은 중복 발송과 발송 실패 추적이 중요했다.
- 원인 또는 제약: 알림톡은 외부 발송 API에 의존하므로 발송 전후 상태를 서비스 내부에 남겨야 했다.
- 해결: 리포트를 먼저 저장하고, 발송 결과를 `weekly_report_logs`에 남기며, 주차/학생/과목 기준 중복을 막는 흐름을 구성했다.
- 결과: 리포트 생성과 발송 이력을 분리해 운영자가 발송 상태를 추적할 수 있게 되었다.

## 8. 스틸컷 구성
- 스틸컷 제목: 학생/수업 관리
- 보여줄 화면: 학생 목록, 학생 상세, 수업 등록/상태 관리
- 설명 문구: 운영자는 학생 정보와 수업 등록 상태를 한 화면에서 확인합니다.
- 이 화면에서 강조할 기여: 학생 도메인 API, Supabase 관계 설계, React Query hook

- 스틸컷 제목: 강의실/통합 시간표
- 보여줄 화면: 강의실별 시간표, 수업 이동/시간 변경 화면
- 설명 문구: 수업 배치와 강의실 사용 현황을 운영 화면에서 바로 확인할 수 있습니다.
- 이 화면에서 강조할 기여: 시간표 UI, 변경 mutation, 일정 데이터 구조

- 스틸컷 제목: OMR 자동 채점
- 보여줄 화면: OMR 템플릿, 이미지 업로드, 채점 결과
- 설명 문구: 시험지 이미지를 업로드해 답안 인식 결과를 확인합니다.
- 이 화면에서 강조할 기여: OMR 템플릿 좌표, 이미지 처리 API, 결과 UI

- 스틸컷 제목: 주간 리포트 알림톡
- 보여줄 화면: 리포트 작성/발송 화면, 발송 로그
- 설명 문구: 학생별 리포트를 생성하고 알림톡 발송 결과를 추적합니다.
- 이 화면에서 강조할 기여: 리포트 생성, 알림톡 API 연동, 중복 발송 방지

## 9. 결과와 임팩트
- 사용자/팀/개발 경험 측면의 변화: 학생, 수업, 편성, 리포트, 발송 기능을 한 시스템 안에서 연결해 반복 운영 업무를 줄일 수 있는 구조를 만들었다.
- 성능 개선: 정량 지표는 없음. 대신 React Query hook과 service layer를 통해 화면별 데이터 흐름과 갱신 범위를 정리했다.
- 유지보수 개선: 학생 등록, 반 편성, 리포트 발송, OMR 채점을 도메인별 API와 테이블로 분리했다.
- 출시/운영 여부: 실제 운영/공개 상태 확인 필요.
- 배운 점: 운영 도메인에서는 화면보다 데이터 관계를 먼저 안정화해야 기능이 확장될 때 흔들리지 않는다.

## 10. 포트폴리오용 최종 요약
- title: 231EDU
- subtitle: Academy Ops Platform
- role: 풀스택 구현 / 학원 운영 자동화
- period: 2025.08 - 운영 중
- implementationScope: Frontend + Backend + DB
- tagline: 학원 학생, 수업, 시간표, 리포트 운영을 한곳에서 관리하는 웹 운영 시스템.
- description: Next.js frontend, NestJS API server, Python OMR/exam server, Supabase PostgreSQL을 기반으로 학생/반/강의실 시간표, OMR 채점, 주간 리포트, 알림톡 발송 흐름을 구현했습니다.
- highlights: 학생/수업 관리, 반 편성, 강의실/통합 시간표, OMR 채점, 주간 리포트 알림톡
- stack: Next.js, React, TypeScript, NestJS, Python OMR Server, Supabase, TanStack Query, Tailwind CSS, Alimtalk API, xlsx
- shots: 학생/수업 관리, 강의실/통합 시간표, OMR 자동 채점, 주간 리포트 알림톡
- contributionSummary: 프론트 화면, NestJS API, Python OMR server, Supabase migration, 외부 발송 연동까지 연결한 학원 운영 자동화 프로젝트
- problemSolving: 학생-반편성 관계 분리, OMR 템플릿 기반 인식, 주간 리포트 발송 로그/중복 방지
- impact: 정량 성과는 없지만, 흩어진 학원 운영 업무를 하나의 관리 흐름으로 묶는 구조를 만들었다.
- links: 공개 링크/저장소 링크 확인 필요

---

# SSUDAM

## 1. 기본 정보
- 프로젝트명: SSUDAM
- 짧은 부제: AI 상담과 지원 정보 탐색을 결합한 모바일 해커톤 서비스
- 상태: 완료
- 기간: 2024.09 - 2024.12
- 팀 규모: 확인 필요
- 내 역할: 프론트엔드 구현
- 구현 범위:
  - Frontend only
  - 외부 API 연동
  - MSW 목업 데이터/목업 서버 사용
- 공개 링크: 확인 필요
- 저장소 링크: 확인 필요
- 공개 가능 범위: 서비스명, 화면 구조, 기술 스택, 프론트엔드 구현 내용 공개 가능. 외부 API 서버 주소, 토큰, 실제 상담/사용자 데이터는 비공개.

## 2. 한 줄 소개
사용자가 AI 상담을 시작하고, 지원사업 정보와 주변 시설을 모바일 화면에서 함께 탐색할 수 있도록 만든 해커톤 서비스.

## 3. 시놉시스
지원이 필요한 사용자는 심리적 도움, 정책 정보, 주변 시설 정보를 각각 다른 경로에서 찾아야 한다. SSUDAM은 AI 상담을 진입점으로 삼고, 상담 중 필요한 경우 지원사업 정보와 주변 시설 안내로 이어지는 모바일 경험을 만드는 것을 목표로 했다. 주요 사용자는 임신/육아/자립 등 지원 정보가 필요한 사용자로 설정했다. 나는 Next.js 기반 모바일 UI, 상담 온보딩/채팅 화면, 지원정보 목록/상세, 지도 화면, 회원가입/로그인 플로우를 구현하고 외부 API와 MSW 목업을 연결했다.

## 4. 내 기여

### Frontend
- 구현한 주요 화면: 홈, AI 상담 온보딩, 상담 채팅, 지원사업 목록/상세, 스크랩 화면, 주변 시설 지도, 자가진단, 로그인/회원가입
- 상태 관리: React Query로 지원정보 조회와 채팅 mutation을 처리하고, Context로 모달/토스트/사이드바/주소 검색 상태를 관리
- API 연동: axios service layer로 인증, 상담, 지원정보 API를 분리하고 access token을 요청 헤더에 주입
- 반응형/접근성: 모바일 앱에 가까운 단일 폭 화면, 터치 중심 버튼/칩/카드 UI 구성
- 성능 개선: 정량 지표는 없음. API 호출을 service layer로 모아 화면 컴포넌트의 책임을 줄임
- UI/UX 판단: 상담 시작 전 안내/동의 플로우를 두고, 반말/존댓말 모드 선택과 위기성 응답에 대한 안내 UI를 조건부로 구성

### Backend
직접 구현한 백엔드는 확인되지 않아 제외합니다.
- API 연동: OpenAPI 문서 기준 인증, 상담, 지원정보, 스크랩, 사용자 API를 외부 백엔드에 연동
- 목업 데이터 사용: MSW handler와 Express 기반 mock server로 상담/사용자 API 응답을 개발 중 대체

### Database
직접 설계하거나 구현한 DB는 확인되지 않아 제외합니다.

### Infrastructure / Deployment
- 배포 환경: 확인 필요
- CI/CD: Chromatic 의존성이 있으나 실제 운영 여부는 확인 필요
- 환경 변수 관리: Kakao Maps app key 등 외부 서비스 키 필요. 실제 키는 비공개
- 모니터링/로그: 별도 운영 로그 확인되지 않음
- 도메인/SSL: 확인 필요

## 5. 기술 스택
- Frontend: Next.js, React, TypeScript - 모바일 중심 화면과 App Router 구조를 빠르게 구성하기 위해 사용
- Backend: 외부 API 연동 - 직접 구현한 백엔드 없이 팀/외부 API에 연결
- Database: 없음 - 프론트엔드 코드에서 직접 DB 구현 확인되지 않음
- Styling: Tailwind CSS, cva - 컴포넌트 variant와 모바일 UI 스타일을 빠르게 구성하기 위해 사용
- State/Data fetching: TanStack Query, React Context - 서버 상태와 전역 UI 상태를 분리하기 위해 사용
- Auth: 외부 인증 API, localStorage token - 로그인 후 API 요청 인증 헤더를 붙이기 위해 사용
- Deployment: 확인 필요 - 공개 배포 정보는 확인되지 않음
- Tools: Storybook, MSW, Chromatic, Kakao Maps SDK, Daum Postcode - 컴포넌트 검증, API 목업, 지도/주소 검색에 사용

## 6. 핵심 기능
- AI 상담 온보딩/채팅:
  - 사용자가 하는 일: 안내에 동의하고 상담 모드와 호칭을 선택한 뒤 AI 상담을 시작한다.
  - 내가 구현한 부분: 온보딩 퍼널, 채팅 화면, 채팅 입력/응답 UI, 상담 API mutation.
  - 기술적 포인트: message type에 따라 긴급 안내, 장소 카드, 지원정보 추천 카드를 조건부 렌더링.
- 지원사업 정보 탐색:
  - 사용자가 하는 일: 지원사업 목록을 정렬/필터링하고 상세 정보를 확인한다.
  - 내가 구현한 부분: 목록/상세 화면, 정렬 UI, React Query 조회, 카드 컴포넌트.
  - 기술적 포인트: 지원정보 API 응답을 화면용 카드 데이터로 변환.
- 주변 시설 지도:
  - 사용자가 하는 일: 지도에서 주변 병원/시설 위치를 확인한다.
  - 내가 구현한 부분: Kakao Maps 화면, 키워드 검색, 마커/인포윈도우 UI.
  - 기술적 포인트: Kakao Maps SDK loader와 타입 선언을 사용해 지도 서비스를 연결.
- 회원가입/로그인 퍼널:
  - 사용자가 하는 일: 이메일 인증, 비밀번호, 이름, 주소, 약관 동의를 거쳐 가입하고 로그인한다.
  - 내가 구현한 부분: 단계형 회원가입 UI, 이메일/비밀번호 검증, 주소 검색, 로그인 token 저장.
  - 기술적 포인트: form state와 외부 인증 API 호출을 단계별로 분리.

## 7. 문제 해결 기록
- 문제: 해커톤 일정 안에서 백엔드 API가 완전히 안정되기 전에도 프론트 화면을 만들어야 했다.
- 원인 또는 제약: 인증/상담/지원정보 API가 외부 서버에 의존하고, 개발 중 응답이 바뀔 수 있었다.
- 해결: axios service layer를 두고 MSW handler와 mock server로 주요 응답을 대체할 수 있게 했다.
- 결과: API 연결 전에도 상담/정보 화면의 UI와 상태 흐름을 검증할 수 있었다.

- 문제: 상담 응답의 종류에 따라 화면이 일반 채팅, 긴급 안내, 지원정보 추천으로 달라져야 했다.
- 원인 또는 제약: 단순 텍스트 채팅 UI만으로는 위기성 응답이나 지원정보 추천을 표현하기 어려웠다.
- 해결: `messageType`을 기준으로 채팅 말풍선 아래에 안내 박스, 장소 카드, 지원정보 카드를 조건부 렌더링했다.
- 결과: 상담 흐름 안에서 다음 행동으로 이어지는 화면 구성을 만들 수 있었다.

- 문제: 지도 SDK와 Next.js 클라이언트 컴포넌트를 함께 사용할 때 전역 `kakao` 객체 타입과 로딩 순서를 맞춰야 했다.
- 원인 또는 제약: Kakao Maps SDK는 브라우저 전역 객체에 의존한다.
- 해결: SDK loader hook과 `kakao.d.ts` 타입 선언을 두고 지도 생성 이후 키워드 검색을 실행했다.
- 결과: 주변 시설 지도와 마커 표시를 클라이언트 화면에서 구현할 수 있었다.

## 8. 스틸컷 구성
- 스틸컷 제목: AI 상담 온보딩
- 보여줄 화면: 상담 안내, 동의 체크, 호칭 입력, 반말/존댓말 선택
- 설명 문구: 상담 시작 전 사용자가 서비스의 성격을 이해하고 대화 모드를 선택합니다.
- 이 화면에서 강조할 기여: 단계형 퍼널 UI, toast 검증, 모드 선택 상태

- 스틸컷 제목: 상담 채팅
- 보여줄 화면: 사용자/AI 말풍선, 로딩, 긴급 안내 카드, 지원정보 추천
- 설명 문구: 상담 응답 타입에 따라 필요한 정보와 행동을 함께 제공합니다.
- 이 화면에서 강조할 기여: React Query mutation, 조건부 메시지 UI, 자동 스크롤

- 스틸컷 제목: 지원사업 정보
- 보여줄 화면: 지원사업 목록, 정렬 드롭다운, 칩 필터, 상세 이동
- 설명 문구: 사용자는 필요한 지원사업을 카드 목록에서 탐색합니다.
- 이 화면에서 강조할 기여: API 응답 변환, 카드 컴포넌트, 목록/상세 화면

- 스틸컷 제목: 주변 시설 지도
- 보여줄 화면: 지도, 시설 마커, 검색 입력, 마커 정보
- 설명 문구: 사용자는 현재 화면에서 주변 병원/시설 위치를 확인합니다.
- 이 화면에서 강조할 기여: Kakao Maps SDK 연동, 마커 상태, 클라이언트 타입 처리

## 9. 결과와 임팩트
- 사용자/팀/개발 경험 측면의 변화: 해커톤 기간 안에 상담, 정보 탐색, 지도, 회원가입까지 핵심 모바일 플로우를 연결했다.
- 성능 개선: 정량 지표는 없음. 화면별 API 호출을 service layer로 정리해 변경 대응이 쉬운 구조를 만들었다.
- 유지보수 개선: atom/molecule/organism/template 구조와 Storybook 스토리로 UI 컴포넌트를 분리했다.
- 출시/운영 여부: 해커톤 프로젝트로 완료. 실제 공개/운영 상태 확인 필요.
- 배운 점: 제한된 시간의 프로토타입일수록 직접 구현 범위와 외부 API 의존 범위를 명확히 나누는 것이 중요하다.

## 10. 포트폴리오용 최종 요약
- title: SSUDAM
- subtitle: Mental Care & Support Finder
- role: 프론트엔드 구현 / 해커톤 서비스
- period: 2024.09 - 2024.12
- implementationScope: Frontend only
- tagline: AI 상담, 지원사업 정보, 주변 시설 탐색을 모바일 화면 안에 묶은 해커톤 서비스.
- description: Next.js 기반 모바일 UI를 구현하고, 인증/상담/지원정보 API 연동을 axios service layer로 분리했습니다. React Query, Kakao Maps, Storybook, MSW를 활용해 핵심 화면과 컴포넌트를 빠르게 검증했습니다.
- highlights: AI 상담 온보딩, 상담 채팅, 지원사업 정보, 주변 시설 지도, 회원가입 퍼널
- stack: Next.js, React, TypeScript, TanStack Query, Tailwind CSS, cva, Storybook, MSW, Kakao Maps SDK
- shots: AI 상담 온보딩, 상담 채팅, 지원사업 정보, 주변 시설 지도
- contributionSummary: 백엔드/DB 직접 구현 없이 프론트엔드 화면, API 연동, 목업 서버, 컴포넌트 시스템을 담당한 프로젝트
- problemSolving: 외부 API 의존성 대응, 상담 응답 타입별 UI 분기, Kakao Maps 클라이언트 연동
- impact: 정량 성과는 없지만, 짧은 해커톤 기간 안에 핵심 사용자 흐름을 시연 가능한 형태로 연결했다.
- links: 공개 링크/저장소 링크 확인 필요

---

# FLEA MARKET

## 1. 기본 정보
- 프로젝트명: FLEA MARKET
- 짧은 부제: 엑셀 기반 플리마켓 정산을 웹 시스템으로 전환한 운영 도구
- 상태: 진행 중
- 기간: 2026.05 - 진행 중
- 팀 규모: 확인 필요
- 내 역할: 풀스택 구현 / 정산 도메인 설계
- 구현 범위:
  - Frontend + Backend + DB
- 공개 링크: 확인 필요
- 저장소 링크: 확인 필요
- 공개 가능 범위: 서비스명, 화면 구조, 기술 스택, 정산 도메인 설계 공개 가능. 실제 정산 엑셀 원본, 참여 업체명, 내부 매출 데이터, 계정/토큰은 비공개.

## 2. 한 줄 소개
플리마켓 현장의 영수증 입력, 참가자별 매출 집계, 수수료 계산, 정산 확정을 엑셀 대신 웹에서 처리하도록 만든 정산 운영 시스템.

## 3. 시놉시스
기존 플리마켓 정산은 엑셀 시트와 수식에 의존해 운영되었고, 업체 수나 결제 방식이 바뀌면 계산식이 깨질 위험이 있었다. FLEA MARKET은 한 고객의 결제 묶음, 여러 참가자의 판매 라인, 결제수단 분할, 참가자별 수수료 정책, 정산 회차를 명확한 도메인으로 분리하는 것을 목표로 했다. 주요 사용자는 플리마켓 운영자와 현장 판매 기록 담당자다. 나는 원본 엑셀 구조를 분석하고, Next.js 프론트엔드, NestJS API, Supabase/PostgreSQL migration, Docker 개발 환경을 구성해 영수증 입력부터 정산 확정/PDF 출력까지 연결했다.

## 4. 내 기여

### Frontend
- 구현한 주요 화면: 로그인, 마켓 목록/상세, 관리 대시보드, 참가자/상품 관리, 현장 판매 입력, 영수증 목록/상세/수정, 정산 미리보기, 정산 회차 이력, 설정
- 상태 관리: TanStack Query hook으로 auth, markets, participants, products, receipts, settlement preview/settings/versions 서버 상태를 관리
- API 연동: `src/services/*` API client와 `src/hooks/*` React Query hook을 통해 NestJS API와 연동
- 반응형/접근성: 현장 입력과 관리자 화면을 분리하고, 반복 입력이 많은 영수증/상품/참가자 폼을 업무 단위로 구성
- 성능 개선: 정량 지표는 없음. 화면에서 직접 API를 호출하지 않고 service/hook 계층으로 분리해 데이터 흐름을 단순화
- UI/UX 판단: `/management`는 정산/설정 중심, `/sales`는 현장 영수증 입력 중심으로 나눠 사용 맥락을 분리

### Backend
- 주요 API: auth register/login/refresh/logout/me, markets, participants, products, receipts, settlement preview, settlements, settlement settings, settlement PDF archive
- 인증/인가: NestJS custom auth, access JWT, DB 기반 refresh session, HTTP-only cookie, AuthGuard, 현재 사용자 기반 마켓 접근 제어
- 비즈니스 로직: 마켓/참가자 연결, 상품 등록, 다중 판매 라인 영수증, 결제수단 분할, 정산 미리보기, 정산 확정 snapshot, 회차별 변경 내역, 정산 무효 처리
- 에러 처리: DTO validation, 소유하지 않은 마켓/참가자/영수증 접근 404 처리, 빈 영수증 정산 확정 방지
- 특수 기능: Decimal.js 기반 금액 계산, 결제수단 비례 배분, 정산 PDF ZIP 다운로드, Docker 기반 로컬 검증

### Database
- 주요 테이블/컬렉션: `users`, `user_sessions`, `auth_tokens`, `user_auth_identities`, `markets`, `market_days`, `participants`, `market_participants`, `participant_settlement_settings`, `products`, `receipts`, `receipt_payment_splits`, `sale_lines`, `sale_line_items`, `settlements`, `settlement_participants`, `settlement_changes`
- 관계 설계: 참가자 마스터와 마켓별 참가자 연결을 분리하고, 영수증-결제수단-판매라인-판매아이템을 계층화
- 인덱스/쿼리 최적화: 마켓/참가자/영수증/정산 조회를 위한 migration과 Supabase 타입 생성 흐름 구성
- 데이터 무결성: 정산 확정 시점의 계산 결과를 snapshot으로 저장하고, 새 회차 확정 시 이전 회차를 superseded 상태로 전환
- 마이그레이션/시드 데이터: auth tables, market core tables, settlement snapshots, market participant links, default settlement settings 관련 migration 작성

### Infrastructure / Deployment
- 배포 환경: 로컬 Docker/Supabase 개발 환경 구성. 공개 배포 상태 확인 필요
- CI/CD: 확인 필요
- 환경 변수 관리: web/API URL, Supabase, JWT/cookie 관련 환경 변수 사용. 실제 키는 비공개
- 모니터링/로그: health check, API build/lint/test, local HTTP 검증 기록
- 도메인/SSL: 확인 필요

## 5. 기술 스택
- Frontend: Next.js, React, TypeScript - 운영 화면과 현장 입력 화면을 빠르게 구성하기 위해 사용
- Backend: NestJS - 인증, 도메인 API, 정산 계산을 Controller/Service 구조로 분리하기 위해 사용
- Database: Supabase PostgreSQL - 정산 도메인을 관계형 데이터로 안정적으로 관리하기 위해 사용
- Styling: Tailwind CSS, cva - 반복되는 업무 UI와 variant를 일관되게 구성하기 위해 사용
- State/Data fetching: TanStack Query - 서버 상태, mutation, invalidate 흐름을 명확히 하기 위해 사용
- Auth: custom JWT + refresh session + HTTP-only cookies - 로그아웃/세션 만료/접근 제어를 직접 관리하기 위해 사용
- Deployment: Docker, Supabase local - web/API/DB를 로컬에서 재현 가능한 개발 환경으로 묶기 위해 사용
- Tools: Decimal.js, PDFKit, jszip, Jest, ESLint - 금액 계산, 정산 PDF 출력, 테스트/검증에 사용

## 6. 핵심 기능
- 마켓/참가자/상품 관리:
  - 사용자가 하는 일: 마켓을 만들고 참가자와 상품을 등록한다.
  - 내가 구현한 부분: 마켓/참가자/상품 API, N:N 참가자 연결, 관리 화면과 React Query hook.
  - 기술적 포인트: 참가자 마스터와 마켓별 참가 설정을 분리해 같은 참가자를 여러 마켓에 연결 가능하게 구성.
- 현장 영수증 입력:
  - 사용자가 하는 일: 한 고객의 결제 묶음 안에 여러 참가자의 판매 항목과 결제수단을 기록한다.
  - 내가 구현한 부분: 영수증 생성/조회/수정 API, 판매 라인/결제수단 입력 UI, 금액 재계산 로직.
  - 기술적 포인트: receipt, payment split, sale line, item을 분리해 복합 결제와 복합 판매를 표현.
- 정산 미리보기:
  - 사용자가 하는 일: 참가자별 매출, 수수료, 지급 예정 금액, 마켓 수익을 확인한다.
  - 내가 구현한 부분: 정산 계산기, preview API, 프론트 정산 요약/표.
  - 기술적 포인트: Decimal.js로 금액을 계산하고 결제수단을 판매 라인 금액 비율로 배분.
- 정산 확정/회차 이력:
  - 사용자가 하는 일: 현재 정산 결과를 확정하고 이후 수정 회차를 확인한다.
  - 내가 구현한 부분: 정산 snapshot API, 회차 목록/상세, 변경 delta 저장, 무효 처리.
  - 기술적 포인트: 확정 시점 계산 결과를 저장하고, 새 회차는 이전 회차를 base로 참조.
- 정산 PDF 출력:
  - 사용자가 하는 일: 참가자별 정산 내역을 파일로 다운로드한다.
  - 내가 구현한 부분: PDF 렌더러, ZIP archive API, 다운로드 응답 헤더 처리.
  - 기술적 포인트: 참가자별 정산 데이터를 PDF 입력 모델로 변환해 일괄 출력.

## 7. 문제 해결 기록
- 문제: 기존 엑셀 정산 규칙이 여러 시트와 셀 수식에 흩어져 있었다.
- 원인 또는 제약: 원본 분석 기준 12개 시트, 30개 Excel Table, 676개 수식이 있었고 일부 수식은 업체/날짜/합계 기준이 서로 달랐다.
- 해결: 엑셀 수식을 그대로 복제하지 않고 영수증, 판매 라인, 결제수단, 참가자 설정, 정산 snapshot 도메인으로 분리했다.
- 결과: 참가자별 수수료율, 카드 수수료 부담 주체, 정산 회차를 코드와 DB에서 명시적으로 관리할 수 있게 되었다.

- 문제: 한 고객이 여러 참가자의 물건을 한 번에 결제할 수 있어 결제수단별 매출을 참가자에게 배분해야 했다.
- 원인 또는 제약: 단일 영수증 안에 여러 판매 라인과 복수 결제수단이 섞일 수 있다.
- 해결: `receipt_payment_splits`와 `sale_lines`를 분리하고, 결제수단 금액을 판매 라인의 순매출 비율로 배분하는 계산기를 구현했다.
- 결과: 카드/현금/계좌이체 매출과 참가자별 지급 예정 금액을 정산 미리보기에서 계산할 수 있게 되었다.

- 문제: 정산은 확정 이후에도 영수증 수정이나 정책 변경으로 다시 계산될 수 있다.
- 원인 또는 제약: 단순히 최신 계산값만 저장하면 이전 정산 결과와 변경 이유를 추적하기 어렵다.
- 해결: 정산 확정 시 snapshot을 만들고, 두 번째 이후 회차는 이전 회차를 `baseSettlementId`로 참조하며 delta를 저장했다.
- 결과: 정산 v1, v2처럼 회차별 결과와 변경 내역을 남길 수 있는 구조가 되었다.

## 8. 스틸컷 구성
- 스틸컷 제목: 마켓/참가자 관리
- 보여줄 화면: 마켓 목록, 참가자 연결, 상품 등록, 수수료 설정
- 설명 문구: 운영자는 마켓별 참가자와 상품, 정산 설정을 한 화면 흐름에서 관리합니다.
- 이 화면에서 강조할 기여: 참가자 N:N 구조, 상품 API, 관리 화면 hook

- 스틸컷 제목: 현장 영수증 입력
- 보여줄 화면: 판매 라인, 결제수단 분할, 영수증 저장/수정 화면
- 설명 문구: 현장에서는 한 고객의 복합 구매를 빠르게 기록할 수 있습니다.
- 이 화면에서 강조할 기여: 영수증 nested DTO, 금액 재계산, 입력 UX

- 스틸컷 제목: 정산 미리보기
- 보여줄 화면: 참가자별 매출, 결제수단별 매출, 수수료, 지급 예정 금액
- 설명 문구: 정산 확정 전 계산 결과를 표로 검토합니다.
- 이 화면에서 강조할 기여: Decimal.js 정산 계산기, 비례 배분, preview API

- 스틸컷 제목: 정산 회차/PDF 출력
- 보여줄 화면: 정산 확정 버튼, 회차 이력, 상세/무효 처리, PDF ZIP 다운로드
- 설명 문구: 확정된 정산은 회차별 snapshot과 파일 출력으로 남깁니다.
- 이 화면에서 강조할 기여: settlement snapshot, change delta, PDF archive

## 9. 결과와 임팩트
- 사용자/팀/개발 경험 측면의 변화: 엑셀에 흩어진 정산 규칙을 도메인 모델로 분리해 웹에서 검증 가능한 흐름으로 옮겼다.
- 성능 개선: 정량 성능 지표는 없음. 대신 Decimal.js와 DB snapshot으로 계산 재현성과 추적 가능성을 높였다.
- 유지보수 개선: Page/UI -> React Query hook -> service -> NestJS API -> Supabase 흐름을 적용해 프론트와 백엔드 책임을 분리했다.
- 출시/운영 여부: 진행중. 로컬 기준 build/lint/test, HTTP 검증, 브라우저 플로우 검증 기록이 있음.
- 배운 점: 엑셀 자동화 전환은 수식을 옮기는 작업보다 숨어 있는 정책을 명확한 도메인 규칙으로 분리하는 일이 핵심이다.

## 10. 포트폴리오용 최종 요약
- title: FLEA MARKET
- subtitle: Settlement System
- role: 풀스택 구현 / 정산 도메인 설계
- period: 2026.05 - 진행 중
- implementationScope: Frontend + Backend + DB
- tagline: 엑셀 기반 플리마켓 정산 흐름을 웹 운영 시스템으로 이식한 프로젝트.
- description: 기존 엑셀 정산 파일을 분석해 영수증, 결제수단, 판매 라인, 참가자별 수수료, 정산 스냅샷 도메인으로 분리했습니다. Next.js 프론트, NestJS API, Supabase/PostgreSQL migration, Docker 개발 환경을 구성하고 정산 미리보기/확정/PDF 출력 흐름을 구현했습니다.
- highlights: 마켓/참가자 관리, 현장 영수증 입력, 정산 미리보기, 정산 확정/회차 이력, PDF 출력
- stack: Next.js, React, TypeScript, NestJS, Supabase PostgreSQL, TanStack Query, Tailwind CSS, Docker, Decimal.js, PDFKit
- shots: 마켓/참가자 관리, 현장 영수증 입력, 정산 미리보기, 정산 회차/PDF 출력
- contributionSummary: 프론트, NestJS API, Supabase migration, 정산 계산기, PDF 출력까지 연결한 플리마켓 운영 시스템
- problemSolving: 엑셀 수식 도메인화, 복합 결제 비례 배분, 정산 snapshot/versioning
- impact: 분석 대상 엑셀의 12개 시트, 30개 Table, 676개 수식을 웹 도메인으로 재구성하는 기반을 만들었다.
- links: 공개 링크/저장소 링크 확인 필요
