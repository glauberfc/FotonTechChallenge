// @ts-ignore
import * as styledComponents from 'styled-components/native'
import { ThemedStyledComponentsModule } from 'styled-components'

import { ThemeInterface } from './theme'

const {
  default: styled,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export { ThemeProvider }
export default styled
