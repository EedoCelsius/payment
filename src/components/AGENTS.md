# 작업 지침
- 하나의 component를 구현하기 위해 재활용 가능한 여러 SFC로 분할해서 작성할 수 있음.
- 여러 컴포넌트에서 공유되는 로직은 `/src/composables/`에 작성.
- PrimeVue를 우선 활용하고 필요한 component가 없을 경우 Element Plus를 사용.
- PrimeIcon, Boxicons, Iconify 순으로 우선 활용. 예외로 Element Plus component에는 Element Plus icon을 우선 사용함.

# Styling 지침
- Component library 사용 시 기본 제공 style을 충분히 존중할 것.
- Tailwind class를 우선 사용하고 직접 작성한 CSS는 필요한 최소만.
- Light mode 위주로 styling할 것. (자동으로 dark mode 전환되도록 팔레트가 구성돼 있음)
- Light/Dark에서 동일한 색상을 유지해야 하는 경우가 아니라면 `src\plugins\styles\tailwind.css`를 참조해서 직접 정의한 팔레트를 우선 사용할 것.
