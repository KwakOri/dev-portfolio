# Git History Troubleshooting Candidates

이 문서는 6개 포트폴리오 프로젝트의 git commit 기록을 바탕으로, 상세 페이지나 면접 답변에 사용할 수 있는 트러블슈팅 후보를 정리한 초안이다. 바로 게시용 원고가 아니라, 후보를 넓게 모아 둔 선택지로 본다.

## 작성 기준

- 기능 중심으로 정리한다. `v1 + v2 병행`처럼 내부 상태를 그대로 노출하기보다, 사용자가 이해할 수 있는 기능/운영 문제로 번역한다.
- 각 후보는 `문제 상황 -> 해결 방향 -> 포트폴리오 문구` 흐름으로 정리한다.
- 근거는 commit hash와 변경 파일 흐름이다. 실제 성과 수치, 사용자 수, 매출, 장애 시간은 확인된 경우에만 추가한다.
- 비공개 저장소, 고객 데이터, 토큰, 계정, DB reference, 내부 운영 값은 공개 문구에 넣지 않는다.
- 후보를 고를 때는 프로젝트당 2-3개만 최종 상세 페이지에 싣고, 나머지는 면접 답변용으로 보관한다.

## 참고한 포트폴리오 작성 방향

- 개발자 포트폴리오는 단순 기술 목록보다 문제 해결 능력과 프로젝트 맥락을 보여주는 쪽이 강하다. 참고: [Arc - Software Engineer Portfolio](https://arc.dev/talent-blog/software-engineer-portfolio/), [LinkedIn - Software Engineer Portfolio](https://www.linkedin.com/top-content/career/building-a-personal-portfolio/how-to-create-an-impressive-software-engineer-portfolio/)
- 케이스 스터디는 한 프로젝트 안의 구체적인 문제, 의사결정, 결과를 더 깊게 보여주는 형식이다. 참고: [Proxify - Portfolio vs Case Study](https://proxify.io/knowledge-base/developer-types/how-do-developer-portfolios-differ-from-case-studies)
- 실무 제약, 운영 이슈, trade-off가 보이는 프로젝트가 더 기억에 남는다. 참고: [Refactor Talent - Portfolio Projects](https://refactortalent.com/developer-portfolio-projects-that-impress/)

## 진행 체크리스트

- [x] 공통 분석 기준 작성
- [x] TEMIS 후보 정리
- [x] VSHOT 후보 정리
- [x] LUCENT 후보 정리
- [x] 231EDU 후보 정리
- [x] SSUDAM 후보 정리
- [x] FLEA MARKET 후보 정리
- [x] 최종 선택 후보 표시
- [x] 선택 후보별 상세 원고 작성
- [x] 상세 페이지 데이터 반영

## Repository Map

| 프로젝트 | 분석한 저장소 |
| --- | --- |
| TEMIS | `/Users/kwakori/projects/promotion/temis` |
| VSHOT | `/Users/kwakori/projects/promotion/vshot-v2/client`, `/Users/kwakori/projects/promotion/vshot-v2/server` |
| LUCENT | `/Users/kwakori/projects/promotion/lucent/frontend`, `/Users/kwakori/projects/promotion/lucent/backend` |
| 231EDU | `/Users/kwakori/projects/promotion/231edu/zuku`, `/Users/kwakori/projects/promotion/231edu/node-api-server`, `/Users/kwakori/projects/promotion/231edu/zuku-exam-server` |
| SSUDAM | `/Users/kwakori/projects/promotion/hackathon/ssudam` |
| FLEA MARKET | `/Users/kwakori/projects/promotion/flea_market/apps/web`, `/Users/kwakori/projects/promotion/flea_market/apps/api` |

## TEMIS

추천 포지션: 제작 도구, 커머스, 운영 관리가 하나로 붙으면서 생긴 파일/권한/정산/편집기 문제를 풀어낸 프로젝트.

| 선택 | 후보 | 문제 상황 | 해결 방향 | 근거 commit | 포트폴리오 문구 초안 |
| --- | --- | --- | --- | --- | --- |
| [x] | 커스텀 주문 파일을 R2로 직접 업로드 | API 서버를 경유하는 업로드는 용량, 시간, 실패 추적 부담이 커질 수 있었다. | presign/complete API와 file service를 분리해 R2 object와 DB record를 연결했다. | `4caaac35` | 커스텀 주문 첨부 파일을 presigned upload로 전환해 업로드 책임과 완료 기록을 분리했다. |
| [ ] | 파일 용량 제한과 UI 표시 불일치 정리 | 사용자는 MB 기준으로 보는데 검증 로직과 미리보기 표시가 다르면 실패 원인을 이해하기 어렵다. | `file-utils`, `FilePreview`, `fileService`의 용량 계산 기준을 맞췄다. | `7d8ef747` | 업로드 제한을 UI 표시와 검증 로직에서 동일한 기준으로 맞춰 실패 UX를 줄였다. |
| [ ] | 커스텀 주문 파일 미리보기와 마감일 UX 개선 | 주문 상담/전달 과정에서 파일 확인과 예상 마감일이 분리되어 있었다. | preview API, estimated deadline API, 주문 상세 modal, hook/service/type을 연결했다. | `1a0ed2fc` | 파일 확인과 예상 납기 정보를 주문 상세 흐름에 붙여 운영자가 주문 상태를 한 화면에서 판단하게 했다. |
| [ ] | 로열티 정산 재계산 플로우 개선 | 수동 조정이 들어가면 정산 결과를 다시 계산하는 기준과 화면 반영이 꼬일 수 있었다. | recalculation API와 manual adjustment modal, settlement type을 정리했다. | `0e34114a` | 수동 조정 이후 정산 재계산을 명시적인 API/화면 흐름으로 분리했다. |
| [x] | 작가별 판매 로열티 추적 추가 | 템플릿 판매가 늘면 단순 판매 집계만으로는 작가별 정산 근거가 부족하다. | royalty API, admin 화면, migration으로 판매-작가-정산 관계를 추적했다. | `3385d856`, `c772f56d` | 템플릿 판매 데이터를 작가 로열티 정산 단위로 추적할 수 있게 schema와 관리자 화면을 확장했다. |
| [x] | v2 템플릿 편집기 워크플로우 고도화 | 템플릿별 입력 구조와 편집 상태가 커지면서 화면/상태/저장 로직이 분산될 수 있었다. | editor, properties, runtime resolver, Figma import script를 기능 단위로 재구성했다. | `348d6113` | 템플릿 편집기를 설정 기반 워크플로우로 재정리해 신규 템플릿 추가 비용을 낮췄다. |
| [ ] | stateful scene 처리 안정화 | 장면 단위 상태, style, property, runtime resolver가 맞물리며 프리뷰/저장 결과가 달라질 수 있었다. | scene/style/property resolver를 정리해 상태 기반 렌더링을 안정화했다. | `ce5935e2` | 장면별 상태를 resolver 흐름으로 정리해 편집기 프리뷰와 저장 결과의 일관성을 높였다. |
| [ ] | Figma import 회전/상태 pruning 보정 | 외부 디자인 데이터를 가져올 때 회전값이나 불필요 상태가 누락/잔존할 수 있었다. | Figma import script에서 status pruning과 rotation import를 보정했다. | `5dda3d92` | Figma 기반 템플릿 import에서 회전값과 상태 정리를 보정해 디자인 재현성을 높였다. |
| [ ] | 시간표 time picker overflow 수정 | 좁은 카드 안에서 시간 선택 UI가 넘치면 실제 일정 편집이 막힌다. | `DayCard`의 picker 배치와 overflow 처리를 조정했다. | `2411db79` | 일정 편집 화면의 overflow 문제를 잡아 작은 카드에서도 시간 선택이 가능하게 했다. |
| [ ] | 오프라인/레이어 표시 버그 수정 | 시간표 셀, 메모, 이미지 레이어가 겹치면 운영자가 상태를 잘못 해석할 수 있다. | offline flag 관련 셀/그리드 수정과 레이어 순서를 조정했다. | `9a8a7666`, `16b527aa` | 시간표의 오프라인 상태와 메모/이미지 레이어 표시를 정리해 운영 화면의 판독성을 높였다. |

우선 추천: R2 업로드, 작가 로열티 정산, v2 템플릿 편집기 워크플로우.

## VSHOT

추천 포지션: 실시간 촬영 UX와 고화질 결과물 생성을 분리하면서, 업로드/다운로드/재연결 문제를 해결한 미디어 프로젝트.

| 선택 | 후보 | 문제 상황 | 해결 방향 | 근거 commit | 포트폴리오 문구 초안 |
| --- | --- | --- | --- | --- | --- |
| [x] | 비디오 watchdog과 guest insurance 업로드 | 게스트 기기/네트워크 상태에 따라 녹화나 업로드가 누락될 수 있었다. | capture hook, recorder, server room manager에 provisional merge 흐름을 추가했다. | client `2bd0a75`, server `b3cb984` | 게스트 업로드 실패를 전제로 watchdog과 provisional merge를 두어 촬영 결과 유실 가능성을 낮췄다. |
| [x] | resumable photo upload | 큰 이미지/영상 결과물 업로드가 중간에 끊기면 전체 촬영 흐름이 실패했다. | client resumable upload와 server offset 검증/merge API를 붙였다. | client `180d5e3`, server `e02ea7b` | 업로드를 재개 가능한 흐름으로 바꿔 네트워크 변동에도 촬영 결과를 안정적으로 수집했다. |
| [ ] | R2 CORS 다운로드 우회 | R2 object를 직접 다운로드하면 브라우저 CORS와 cache 상태에 따라 실패할 수 있었다. | app proxy download route를 추가해 다운로드 경로를 서버 경유로 통일했다. | client `09b7abc`, `828cc05` | R2 직접 접근을 proxy download로 감싸 관리자/사용자 다운로드 실패를 줄였다. |
| [ ] | frame overlay CORS cache poisoning 방지 | 프레임 이미지를 canvas/WebGL에 올릴 때 CORS 캐시가 오염되면 합성 결과가 깨질 수 있었다. | frame overlay img에 `crossOrigin="anonymous"`를 명시했다. | client `ddc1b8a` | 프레임 합성 이미지의 CORS 조건을 명시해 canvas 처리 안정성을 높였다. |
| [ ] | WebGL/동적 scene hydration mismatch 수정 | 서버 렌더링과 클라이언트 WebGL scene 초기 상태가 다르면 React hydration 오류가 발생했다. | UnicornScene SSR을 비활성화하고 메인 페이지 hydration mismatch를 정리했다. | client `d908138`, `0e2bc6f` | 클라이언트 전용 3D/미디어 scene을 SSR에서 분리해 hydration 오류를 제거했다. |
| [ ] | 신규 게스트에게 host 설정 동기화 | 크로마키/반전 같은 host 설정이 늦게 들어온 게스트에게 적용되지 않을 수 있었다. | signaling server의 입장 흐름에서 host 설정을 재전파했다. | server `ae98028` | 게스트 재입장/신규 입장 시 host 촬영 설정을 동기화해 역할 간 화면 불일치를 줄였다. |
| [ ] | guest rotation 후 mirror 상태 재동기화 | 기기 회전이나 guest 재배치 후 mirror 기본값이 꼬이면 촬영 방향이 달라진다. | host/guest page의 mirror default와 rotation sync를 조정했다. | client `7d42f34` | 게스트 화면 회전 이후에도 mirror 설정을 다시 맞춰 촬영 방향 오류를 줄였다. |
| [ ] | mergePhotos fallback 해상도 상향 | fallback merge 결과가 낮은 해상도로 생성되면 최종 결과물 품질이 떨어진다. | server merge fallback 해상도를 1600x2400으로 상향했다. | server `d538ff6` | 합성 실패 fallback에서도 출력 해상도를 보장하도록 기본 merge 품질을 올렸다. |
| [x] | host reconnection grace period | host가 잠깐 끊기면 room/session 전체가 종료될 수 있었다. | 30초 grace period를 둔 재연결 흐름을 추가했다. | server `cf8f4f1` | host 일시 이탈을 즉시 장애로 보지 않고 재연결 유예 시간을 두어 촬영 세션을 유지했다. |
| [ ] | 후처리 완료 대기 후 업로드 | 영상 저장 시 후처리 완료 전에 업로드가 시작되면 누락 파일이 생길 수 있었다. | host room에서 post-processing 완료를 기다린 뒤 업로드하도록 수정했다. | client `8af3538` | 녹화 후처리 완료 시점을 명확히 기다려 결과 저장 누락을 방지했다. |

우선 추천: resumable upload, guest insurance/watchdog, host reconnection.

## LUCENT

추천 포지션: 운영 중인 커머스에서 인증, 주문, 제작, 배송, 정산성 데이터를 안정화한 프로젝트.

| 선택 | 후보 | 문제 상황 | 해결 방향 | 근거 commit | 포트폴리오 문구 초안 |
| --- | --- | --- | --- | --- | --- |
| [x] | Supabase SSR auth cookie 정렬 | SSR/미들웨어/클라이언트 사이 cookie 처리 방식이 다르면 로그인 상태가 흔들릴 수 있었다. | Supabase server utils와 proxy, auth cookie client/server util을 정리했다. | frontend `cdf70ce` | SSR 환경의 auth cookie 흐름을 정렬해 서버/클라이언트 로그인 상태 불일치를 줄였다. |
| [ ] | 우체국 XLS shared string table 대응 | 운영자가 내려받는 XLS가 Excel에서 깨지거나 문자열이 누락될 수 있었다. | shared string table 방식으로 우체국 양식 XLS 생성을 보정했다. | frontend `86f9176` | 배송 업무용 XLS를 Excel 호환 구조로 생성해 운영자가 바로 업로드할 수 있게 했다. |
| [ ] | 보존된 우체국 템플릿 기반 Excel 생성 | 수동 구현한 XLS가 실제 양식과 어긋나면 배송 업무가 막힌다. | 원본 template xls를 보존하고 데이터만 채우는 방식으로 바꿨다. | frontend `3861c4f` | 공식 양식 기반으로 배송 Excel을 생성해 운영 파일의 호환성을 높였다. |
| [x] | 제작 요청 PDF 출력과 Chromium 런타임 | PDF 렌더링은 로컬에서는 되지만 배포 이미지에서 브라우저 런타임이 없어 실패할 수 있다. | PDF action과 Docker Chromium runtime을 함께 보강했다. | frontend `7b2a0ef`, backend `eee0b5b` | 제작 요청서를 PDF로 출력하고 배포 환경에서도 렌더링 가능한 Chromium 런타임을 준비했다. |
| [ ] | 배송 출력 첫 클릭 refresh 문제 | 인쇄 화면을 열 때 첫 클릭에서 새로고침/전환이 일어나면 운영 흐름이 끊긴다. | 배송 print를 popup으로 열어 navigation 부작용을 분리했다. | frontend `901337d` | 배송 출력 액션을 popup으로 분리해 첫 클릭 refresh 문제를 피했다. |
| [ ] | 관리자 cross-tab query 갱신 | 여러 관리자 탭에서 mutation 후 stale query가 남으면 방금 처리한 주문이 그대로 보인다. | v2 admin hooks의 invalidate/refetch 범위를 조정했다. | frontend `712e07a` | 관리자 mutation 이후 관련 탭 query를 갱신해 운영 화면의 상태 불일치를 줄였다. |
| [ ] | always-on campaign project scope 강화 | 상시 캠페인 데이터가 project scope를 벗어나면 다른 상품/프로젝트에 노출될 수 있다. | frontend admin util, backend catalog service, migration에서 scope 조건을 강화했다. | frontend `5fab5d6`, backend `9be0c1b` | 캠페인/상품 조회에 project scope를 강제해 운영 데이터 누출 가능성을 줄였다. |
| [ ] | production thumbnail query schema 불일치 | 제작 목록 썸네일 쿼리가 실제 media schema와 맞지 않으면 관리자 화면에서 이미지가 비어 보인다. | backend batch service 쿼리를 `v2_product_media` 기준으로 맞췄다. | backend `a6dadc9` | 제작 관리 썸네일 조회를 실제 media schema에 맞춰 운영자가 상품을 식별할 수 있게 했다. |
| [ ] | dashboard sales aggregation gap | 판매 집계 기준이 일부 주문/상태를 빠뜨리면 대시보드 수치가 신뢰를 잃는다. | sales aggregation 로직을 보정했다. | backend `86e9395` | 대시보드 판매 집계 누락을 보정해 운영 지표의 신뢰도를 높였다. |
| [x] | 디지털 entitlement 확정 경로 정리 | 결제 완료 후 디지털 권한이 primary path로 확정되지 않으면 구매자가 다운로드를 못 받을 수 있다. | order transition, checkout, fulfillment service의 권한 확정 흐름을 정리했다. | backend `593a5aa`, `de45a4c` | 결제 확정 이후 디지털 권한 부여 경로를 정리해 혼합 주문에서도 권한 누락을 줄였다. |

우선 추천: SSR auth cookie, 배송 XLS/PDF, 디지털 entitlement.

## 231EDU

추천 포지션: 학원 운영에서 시간표, 학생 갱신, OMR 채점, 알림톡을 연결하며 생긴 데이터 동기화 문제를 해결한 프로젝트.

| 선택 | 후보 | 문제 상황 | 해결 방향 | 근거 commit | 포트폴리오 문구 초안 |
| --- | --- | --- | --- | --- | --- |
| [ ] | AI OMR grading entrypoint 복구 | 채점 진입점이 사라지거나 route/hook 연결이 깨지면 핵심 기능을 사용할 수 없다. | grading page, progress modal, query/service/type 연결을 복구했다. | web `53319b2` | AI OMR 채점 진입점을 복구하고 진행 상태 UI와 service 타입을 다시 연결했다. |
| [x] | OMR 상세 mark analysis 반환 | OMR 실패 원인을 알 수 없으면 채점 결과를 검증하거나 보정하기 어렵다. | exam server에서 mark analysis detail을 반환했다. | exam `919ec50` | OMR 채점 결과에 상세 마킹 분석을 추가해 오류 판단과 디버깅 근거를 확보했다. |
| [x] | 시간표 canvas memoization | 시간표는 셀/강의/강의실 조합이 많아 불필요 리렌더가 사용감을 크게 떨어뜨릴 수 있다. | canvas schedule 컴포넌트의 memoization과 composition 구조를 조정했다. | web `2747e22`, `836d367` | 시간표 canvas 렌더링을 memoization 중심으로 정리해 편집/조회 중 리렌더 부담을 줄였다. |
| [ ] | derived state sync effect 제거 | 서버 상태를 컴포넌트 state로 복제하면 갱신 시점이 어긋나 preview와 실제 데이터가 달라질 수 있다. | class/schedule/auth 관련 화면에서 파생 state sync effect를 줄였다. | web `97aeb8e` | 파생 상태 동기화 effect를 제거해 시간표/학생 데이터의 stale state 위험을 낮췄다. |
| [ ] | 시간표와 학생 갱신 preview type 정렬 | 갱신 preview와 실제 schedule type이 어긋나면 적용 전 검토가 틀릴 수 있다. | classroom schedule과 renewal preview 타입을 맞췄다. | web `7964b9c` | 학생 갱신 preview와 실제 시간표 타입을 맞춰 적용 전 검토의 신뢰도를 높였다. |
| [x] | 학생 갱신 원클릭 자동 실행 | 학생 갱신은 과목/강의실/시간표 조건이 많아 수동 처리 실수가 생기기 쉽다. | renewal apply endpoint, preview, SQL, UI를 연결하고 미정 강의실 옵션을 추가했다. | web `f116692`, api `a305a77` | 학생 갱신을 preview 후 원클릭 적용 흐름으로 만들어 반복 운영 업무를 자동화했다. |
| [ ] | 알림톡 provider migration | 외부 알림톡 provider 변경은 API, 발송 로그, 실패 처리가 함께 바뀌어야 한다. | sendon에서 solapi로 발송 흐름을 전환하고 관련 route/page를 수정했다. | web `0daba0d` | 알림톡 provider 전환을 발송 화면과 서비스 로직에 반영해 운영 메시지 흐름을 유지했다. |
| [ ] | 학생 갱신 과목별 조회와 timezone 보정 | 갱신 대상 조회와 날짜 기준이 틀리면 잘못된 학생/수업에 변경이 적용될 수 있다. | subject filter와 timezone 관련 버그를 보정했다. | web `e059389` | 학생 갱신 대상을 과목별로 좁히고 timezone 기준을 보정해 적용 실수를 줄였다. |
| [ ] | 시간표 tooltip 오류 수정 | 시간표의 작은 셀에서 tooltip 정보가 틀리면 운영자가 강의 정보를 오해한다. | schedule tooltip 관련 컴포넌트를 수정했다. | web `ab85549` | 시간표 tooltip 표시를 보정해 셀 안의 강의 정보를 정확히 확인하게 했다. |
| [ ] | schedule exception / combined classroom API | 강의실별 예외와 통합 시간표를 프론트에서 조합하면 조건 누락이 생기기 쉽다. | exceptions, combined classroom schedule endpoint를 API로 제공했다. | api `e23ca6b`, `6966067` | 시간표 예외와 강의실 통합 조회를 API 단위로 분리해 화면 로직의 복잡도를 낮췄다. |

우선 추천: 학생 갱신 자동화, 시간표 canvas 최적화, OMR 상세 분석.

## SSUDAM

추천 포지션: 해커톤 기간 안에 모바일 사용자 여정, mock 기반 개발, 채팅/지도/정보 탐색을 빠르게 완성한 프로젝트.

| 선택 | 후보 | 문제 상황 | 해결 방향 | 근거 commit | 포트폴리오 문구 초안 |
| --- | --- | --- | --- | --- | --- |
| [x] | MSW/mock server 기반 병렬 개발 | 백엔드가 완성되기 전에는 화면 플로우를 검증하기 어렵다. | MSW, mock server, handler, service layer를 구성했다. | `3f19d7f`, `b072a27`, `f0fb19e` | mock server를 먼저 구성해 API 완성 전에도 핵심 사용자 흐름을 검증했다. |
| [x] | 상담 채팅에 React Query 적용 | 채팅 데이터 조회/전송을 컴포넌트 안에 두면 상태와 로딩 처리가 흐트러진다. | React Query provider, counseling service, chat types를 연결했다. | `acd9f92` | 상담 채팅의 서버 상태를 React Query와 service layer로 분리했다. |
| [ ] | 상담 채팅 UI/입력 흐름 구현 | 모바일 상담은 입력창, 말풍선, 시간 표시, 안내 메시지가 함께 맞아야 한다. | chat page, ChatInput, ChatBox, format util, mock handler를 구현했다. | `f14783a`, `7871ca9`, `537b83a` | 상담 채팅의 입력, 메시지 표시, 시간 정보를 모바일 흐름에 맞춰 구성했다. |
| [ ] | 상담 funnel 구성 | 사용자가 어떤 상담을 원하는지 단계적으로 좁히지 않으면 첫 진입 장벽이 높다. | CounselingFunnel, step template, funnel panel을 구성했다. | `686fa76` | 상담 유형 선택을 funnel 구조로 나눠 사용자가 단계적으로 진입하게 했다. |
| [ ] | 설문 페이지와 chip 선택 UI | 설문/온보딩에서 선택지가 많으면 입력 부담이 커진다. | Survey page, SurveyWithChip, Chip component를 개선했다. | `5fbdf51`, `dd134a8` | 설문 선택지를 chip 기반으로 구성해 모바일에서 빠르게 응답할 수 있게 했다. |
| [ ] | 지원 정보 필터/상세 탐색 | 지원 정보가 많을 때 필터와 상세 페이지 연결이 없으면 탐색성이 떨어진다. | information list/filter/detail page와 MainFilter, CardListBox를 연결했다. | `38ec573` | 지원 정보를 필터와 상세 화면으로 나눠 필요한 정보를 빠르게 찾게 했다. |
| [ ] | scrap page로 관심 정보 저장 | 사용자가 찾은 정보를 나중에 다시 보려면 저장 흐름이 필요하다. | scrap page와 chip/filter title 관련 표시를 보강했다. | `cca6857` | 관심 지원 정보를 scrap 화면으로 모아 재방문 흐름을 만들었다. |
| [x] | Kakao map loader와 위치 검색 | 위치 기반 정보는 지도 SDK 로딩, 타입 정의, 입력 UI가 함께 맞아야 한다. | Kakao loader hook, map page, MapInputBox, kakao type을 추가했다. | `cdc82ec` | Kakao map loader와 위치 입력 UI를 붙여 주변 정보 탐색 기반을 만들었다. |
| [ ] | Storybook으로 컴포넌트 검증 | 짧은 기간에 UI 컴포넌트가 늘면 화면별 상태를 확인하기 어렵다. | Storybook story와 component export를 정리했다. | `ed47328` | Storybook으로 주요 UI 컴포넌트 상태를 빠르게 확인할 수 있게 했다. |
| [ ] | active sidebar/pathname 표시 | 모바일 내비게이션에서 현재 위치가 보이지 않으면 사용자가 길을 잃기 쉽다. | sidebar가 pathname을 반영하도록 수정했다. | `dfd2b54` | 현재 경로를 sidebar에 반영해 모바일 탐색의 위치감을 높였다. |

우선 추천: MSW 병렬 개발, React Query 채팅, Kakao map 연동.

## FLEA MARKET

추천 포지션: 엑셀로 하던 플리마켓 정산 업무를 영수증 입력, 수수료 설정, 정산 미리보기, 이력/감사 로그, PDF 출력으로 제품화한 프로젝트.

| 선택 | 후보 | 문제 상황 | 해결 방향 | 근거 commit | 포트폴리오 문구 초안 |
| --- | --- | --- | --- | --- | --- |
| [ ] | mock data mode로 디자인/개발 분리 | API 서버가 없거나 데이터가 비어 있으면 UI 검토가 멈춘다. | mock data source를 기본값으로 두고 fixture/mock API/db를 추가했다. | web `81fc85f`, `fd26961`, `d59b330` | mock data mode를 두어 백엔드 연결 전에도 정산 화면과 디자이너 검토를 진행할 수 있게 했다. |
| [ ] | query key 중앙화 | 기능이 늘면서 query key가 흩어지면 invalidate 누락과 stale data가 생긴다. | query keys와 invalidation helper를 중앙화했다. | web `e561e19` | 정산/영수증/참가자 query key를 중앙화해 mutation 이후 갱신 누락을 줄였다. |
| [x] | 영수증 수정/삭제와 audit log | 정산 데이터는 수정 이력이 남지 않으면 신뢰하기 어렵다. | receipt edit/delete API, audit log module, audit log screen을 추가했다. | web `ca2423d`, api `5ef308f`, api `b523e0c` | 영수증 수정과 삭제를 감사 로그와 함께 기록해 정산 데이터의 추적성을 높였다. |
| [x] | 정산 preview 계산기 | 정산 확정 전에 booth/product/fee별 결과를 미리 확인하지 못하면 운영 리스크가 크다. | settlement calculator, preview API, preview UI를 구현했다. | api `2e71909`, web `e25848e` | 정산 확정 전 preview를 제공해 금액 오류를 조기에 확인하게 했다. |
| [ ] | 참가자별 수수료 override | 플리마켓은 참가자마다 수수료 정책이 달라질 수 있다. | participant fee override와 settlement calculator 반영을 추가했다. | api `bfcdf96`, web `e520742` | 기본 수수료와 참가자별 override를 분리해 실제 운영 조건을 정산 계산에 반영했다. |
| [ ] | 정산 version/history 관리 | 정산이 반복 수정되면 어떤 결과가 최종인지, 무엇이 바뀌었는지 알기 어렵다. | settlement history, version detail, snapshot components를 구성했다. | web `69d5562`, web `9fc79ee` | 정산 결과를 version/history로 관리해 변경 전후와 참가자별 snapshot을 확인하게 했다. |
| [ ] | settlement voiding | 이미 생성된 정산을 잘못 확정했을 때 삭제만 허용하면 이력 추적이 어렵다. | void settlement DTO/controller/service를 추가했다. | api `3768c25` | 정산 취소를 void action으로 분리해 확정 후 변경 이력을 보존했다. |
| [x] | 정산 PDF 렌더링과 font asset 정리 | 운영 PDF는 폰트 누락, 줄바꿈, 양식 어긋남이 바로 품질 문제로 보인다. | Paperlogy/SpaceMono font asset과 PDF renderer를 다듬었다. | api `d46020f`, `ab90f89`, `221a6a8`, `e4a5676` | 정산 PDF 렌더러와 로컬 폰트 asset을 정리해 배포 환경에서도 일관된 문서를 출력했다. |
| [ ] | 모바일 대시보드 레이아웃 개선 | 정산 표는 열이 많아 좁은 화면에서 탭/표가 쉽게 깨진다. | mobile tabs를 drawer로 바꾸고 narrow layout을 조정했다. | web `643685c`, `3496645`, `2f8fe6f` | 모바일에서는 drawer와 좁은 화면 전용 레이아웃으로 정산 화면의 사용성을 확보했다. |
| [ ] | owner scope와 DTO validation | market/participant/product API가 owner scope 없이 열리면 다른 운영 데이터 접근 위험이 있다. | domain API owner scope와 DTO validation을 추가했다. | api `596985c`, `d3df62f` | market 도메인 API에 owner scope와 DTO validation을 적용해 데이터 경계를 명확히 했다. |

우선 추천: audit log, settlement preview/versioning, PDF 렌더링.

## 최종 후보 선택 가이드

상세 페이지에는 프로젝트마다 아래 기준으로 2-3개만 고른다.

1. 기능 화면으로 증명 가능한가?
2. 문제 상황이 비개발자도 이해할 만큼 명확한가?
3. commit 근거가 충분하고, 민감 정보를 가리지 않아도 설명 가능한가?
4. 내 역할이 분명하게 드러나는가?
5. 결과가 "좋아졌다"가 아니라 "어떤 실패를 줄였다"로 말할 수 있는가?

추천 최종 조합:

| 프로젝트 | 후보 1 | 후보 2 | 후보 3 |
| --- | --- | --- | --- |
| TEMIS | R2 직접 업로드 | 작가 로열티 정산 | v2 템플릿 편집기 |
| VSHOT | resumable upload | guest insurance/watchdog | host reconnection |
| LUCENT | SSR auth cookie | 배송 XLS/PDF | 디지털 entitlement |
| 231EDU | 학생 갱신 자동화 | 시간표 canvas 최적화 | OMR 상세 분석 |
| SSUDAM | MSW 병렬 개발 | React Query 채팅 | Kakao map 연동 |
| FLEA MARKET | audit log | settlement preview/versioning | PDF 렌더링 |

## 다음 작업

- 선택된 3개 후보는 포트폴리오 상세 오버레이의 `비하인드`, `상영 전 검수`, `말거리` 데이터에 반영했다.
- 다음에는 각 항목을 `문제 - 원인 - 해결 - 결과` 형식으로 더 길게 풀어 별도 case study 문서로 확장할 수 있다.
- 공개 가능한 스크린샷, GIF, commit diff 캡처, 화면 전후 비교 자료를 연결하면 설득력이 더 올라간다.
