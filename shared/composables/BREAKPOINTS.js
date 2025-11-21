import { 
  breakpointsTailwind,
  breakpointsBootstrapV5,
  breakpointsVuetifyV2,
  breakpointsVuetifyV3,
  breakpointsAntDesign,
  breakpointsQuasar,
  breakpointsSematic,
  breakpointsMasterCss,
  breakpointsPrimeFlex,
  breakpointsElement
} from '@vueuse/core'

const breakpointsDevice = {
  fold1: 320,
  fold5: 344,
  iphoneSE: 375,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
}

const breakpointsContainer = {
  '3xs': 256,
  '2xs': 288,
  'xs': 320,
  'sm': 384,
  'md': 448,
  'lg': 512,
  'xl': 576,
  '2xl': 672,
  '3xl': 768,
  '4xl': 896,
  '5xl': 1024,
  '6xl': 1152,
  '7xl': 1280
}

export const BREAKPOINTS = {
  TAILWIND: breakpointsTailwind,
  BOOTSTRAP_V5: breakpointsBootstrapV5,
  VUETIFY_V2: breakpointsVuetifyV2,
  VUETIFY_V3: breakpointsVuetifyV3,
  ANT_DESIGN: breakpointsAntDesign,
  QUASAR: breakpointsQuasar,
  SEMANTIC: breakpointsSematic,
  MASTER_CSS: breakpointsMasterCss,
  PRIME_FLEX: breakpointsPrimeFlex,
  ELEMENT: breakpointsElement,

  DEVICE: breakpointsDevice,
  CONTAINER: breakpointsContainer
}
