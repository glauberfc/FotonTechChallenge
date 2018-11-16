// @ts-ignore
import * as styledComponents from 'styled-components/native'
// @ts-ignore
import { ThemedStyledComponentsModule } from 'styled-components/native'

import ThemeInterface from './theme'

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export { css, createGlobalStyle, keyframes, ThemeProvider }
export default styled
