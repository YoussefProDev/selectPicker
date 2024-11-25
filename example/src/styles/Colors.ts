/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// import { getTheme } from "@/providers/ThemeProvider";
const theme = 'light';
// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';
export const colorsList = {
  light: {
    text: '#11181C',
    primary: '#3D38ED',
    primaryMuted: '#C9C8FA',
    background: '#F5F5F5',
    dark: '#141518',
    gray: '#626D77',
    lightGray: '#D8DCE2',
  },
  dark: {
    text: '#ECEDEE',
    primary: '#3D38ED',
    primaryMuted: '#C9C8FA',
    background: '#F5F5F5',
    dark: '#141518',
    gray: '#626D77',
    lightGray: '#D8DCE2',
  },
};

export const Colors = colorsList[theme];
