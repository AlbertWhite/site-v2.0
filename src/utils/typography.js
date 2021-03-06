import Typography from "typography"
import Theme from "typography-theme-parnassus"

Theme.baseFontSize = "16px"

const typography = new Typography(Theme)

// Export helper functions
export const { scale, rhythm, options } = typography
export default typography
