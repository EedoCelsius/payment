# 역할
- 앱 라우트와 화면 구성을 결정하는 핵심 영역.
- 루트 `config.json`은 프로젝트 전역 설정, 각 하위 디렉터리는 화면/섹션 단위.

# 작성 지침
- 재사용 가능한 component는 `/src/components`에 작성하고 여기에서는 레이아웃 위주로 구성.
- 직관성을 해치지 않는 범위 내에서 필요하다면 같은 디렉터리 내에 여러 SFC로 분할해서 작성할 수 있음.
- 여러 컴포넌트에서 공유되는 로직은 `/src/composables/`에 작성.
- PrimeVue를 우선 활용하고 필요한 component가 없을 경우 Element Plus를 사용.
- PrimeIcon, Boxicons, Iconify 순으로 우선 활용. 예외로 Element Plus component에는 Element Plus icon을 우선 사용함.

# Styling 지침
- Component library 사용 시 기본 제공 style을 충분히 존중할 것.
- Tailwind class를 우선 사용하고 직접 작성한 CSS는 필요한 최소만.
- Light mode 위주로 styling할 것. (자동으로 dark mode 전환되도록 팔레트가 구성돼 있음)
- Light/Dark에서 동일한 색상을 유지해야 하는 경우가 아니라면 `src\plugins\styles\tailwind.css`를 참조해서 직접 정의한 팔레트를 우선 사용할 것.

# 새 화면을 만들 때
1) 하위 폴더 생성
2) `index.vue` 및 `config.json` 작성
3) 상위 섹션 `routes`에 새 폴더를 연결.

# config.json 작성 지침
- `meta`와 `routes`는 `/src/plugins/router.js`의 작동 원리를 참고해서 작성할 것.
- `messages`는 `{"index": {"ko": {}, ...}, ...}`처럼 SFC별로 객체를 구분해 작성하고 각 Vue에서 해당 객체만 `useI18n`를 이용해 local scope로 참조한다.