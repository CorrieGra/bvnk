import { DefaultTheme } from "styled-components/dist/types";
import { colours } from "./colour";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme: DefaultTheme = {
    colours,
    spacing,
    typography,
} as const;