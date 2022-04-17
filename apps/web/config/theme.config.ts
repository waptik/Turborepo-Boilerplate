import { theme as proTheme } from "@chakra-ui/pro-theme";
import { theme as defaultTheme, extendTheme } from "@chakra-ui/react";
import { createPalette } from "@saas-ui/palette";
import { theme as saasTheme } from "@saas-ui/react";

const color = defaultTheme.colors.blue;
const colors = createPalette(color["500"], {
  blackLuminance: 0.005,
  colors: {
    gray: "#1f2937",
    primary: color["500"],
  },
});

const theme = extendTheme(
  {
    colors,
    fonts: {
      poppins: "Poppins, -apple-system",
    },
  },
  proTheme,
  saasTheme
);

export default theme;
