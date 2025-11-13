# System Design Sample — 상점 고객 패턴 시뮬레이터

**제목:** 상점(캐시마트) 고객 패턴 시뮬레이터 — 기획자용 검증 도구

> 이 문서의 예시는 레포지토리의 `cashmart_test` 폴더(예: [cashmart_test/index_cashmart_exp.html](../cashmart_test/index_cashmart_exp.html))를 참고하여 작성되었습니다. 실제 데모와 코드는 해당 폴더에서 확인할 수 있습니다.

## 목표
상점 내 고객 방문/행동 패턴을 시뮬레이션하고 시각화하여 기획자가 가설을 빠르게 검증할 수 있도록 한다.

## 요구사항
- **R1**: 고객 스폰/이동/행동(대기/구매/이탈)을 재현할 수 있어야 한다.
- **R2**: 시뮬레이션 로그(타임스탬프, 고객ID, 이벤트)를 CSV/JSON으로 내보낼 수 있어야 한다.
- **R3**: 여러 시나리오(패턴)를 빠르게 전환/편집할 수 있어야 한다.
- **R4**: 대량 이벤트(초당 수백 이벤트)에서 실시간 피드백이 가능해야 한다.

## 핵심 아키텍처
- **프론트엔드**: 경량 웹 UI (HTML/CSS/JS)
  - 시뮬레이터 뷰 (캔버스 또는 DOM)
  - 시나리오 에디터(간단한 JSON 에디터)
  - 로그 뷰어 및 내보내기
- **저장소(선택)**: JSON 파일로 시나리오 저장 (로컬/깃 저장소) — 간단한 프로젝트라 백엔드 불필요

### 데이터 예시 (시나리오)
```json
{
  "name": "rush_hour",
  "events": [
    {"time":0, "type":"spawn", "customer":"A"},
    {"time":2000, "type":"spawn", "customer":"B"},
    {"time":4500, "type":"order", "customer":"A"}
  ]
}
```

## 트레이드오프
- **정확한 AI 모델** vs **경량 규칙 기반 모델**: 분석 목적이면 규칙 기반 모델로 충분하며, 개발/검증 속도가 빠릅니다.
- **실시간 시각화** vs **배치 처리**: 실시간은 UX가 좋지만 복잡도 증가. 기획 검증에는 실시간이 유리.

## 테스트/검증
- **재현성 테스트**: 동일 시나리오를 여러 번 실행해 통계가 일관되는지 확인.
- **퍼포먼스 테스트**: 목표: 초당 200 이벤트까지 지연 없이 처리.
- **사용성 테스트**: 기획자가 3분 내 시나리오를 만들고 결과를 이해할 수 있는지 확인.

## 배포/운영
- GitHub Pages로 호스팅 가능(프론트엔드만으로 충분).
- 시나리오 파일은 레포에 저장하고 브랜치별로 관리 가능.

## 면접용 요약 (30~60초)
"저는 작은 시뮬레이터를 만들어 기획자가 고객 행동 패턴을 빠르게 검증할 수 있게 했습니다. 요구사항 정의부터 시나리오 모델링, 로그 내보내기까지 책임졌고, 규칙 기반 시뮬레이션으로 충분한 통찰을 얻도록 설계했습니다."

---

*파일 원본: `docs/system_design_sample.md` — 편집용 마크다운 소스입니다.*

## 코드 예시 — 충돌 감지 유틸 (정리됨)
아래는 데모에서 사용한 충돌 검사/해결 로직을 정리한 예시입니다. 원본은 학습하던 시절에 작성한 코드에서 가져왔고, 면접·문서용으로 읽기 쉬운 형태로 리팩터링한 것입니다. 실제 데모는 `assets/demo/collision_demo.html` 또는 레포의 `cashmart_test` 폴더를 참조하세요.

```javascript
// 작은 유틸 예시: circle collision helpers
const CollisionUtils = (function(){
  function isCircleCollision(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const r = a.r + b.r;
    return dx*dx + dy*dy <= r*r;
  }

  function resolveOverlap(a, b, push = 8) {
    const dx = a.x - b.x; const dy = a.y - b.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist === 0) dist = 1;
    const nx = dx/dist, ny = dy/dist;
    b.x -= nx * push; b.y -= ny * push;
  }

  return { isCircleCollision, resolveOverlap };
})();

// 사용 예시
// if (CollisionUtils.isCircleCollision(player, target)) {
//   CollisionUtils.resolveOverlap(player, target, 12);
// }
```

위 코드를 별도 파일(`assets/demo/collision_utils.js`)로 분리해 재사용할 수 있습니다. 원하시면 이 유틸을 `collision_demo.html`에서 import/연결해 드리겠습니다.
