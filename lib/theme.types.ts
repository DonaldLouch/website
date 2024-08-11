// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json }
//   | Json[];

export interface Theme {
  public: {
    primary: string;
    secondary: string;
    green: string;
    black: string;
    white: string;
    blurredPurple: string;
    whiteColourGradient: string;
    mainGradient: string;
    backgroundGradient: string;
    blurredBackground: string;
    subtleBlurredBackground: string;
    prideGradient: string;
    newPrideGradient: string;
    body: string;
    heading: string;
    bsPrimary: string;
    bsSecondary: string;
    bsWhite: string;
    bsBoldPrimary: string;
    bsBoldSecondary: string;
    bsBoldWhite: string;
    bsBoldRed: string;
    bsMediumBoldPrimary: string;
    bsMediumBoldSecondary: string;
    bsMediumBoldWhite: string;
    bsMediumBoldRed: string;
    bsBigBoldPrimary: string;
    bsBigBoldSecondary: string;
    bsBigBoldWhite: string;
    bsBigBoldRed: string;
    tsPrimary: string;
  };
}

export interface ThemeButton {
  variant: {
    primary: string;
    heroButton: string;
    portalButton: string;
    portalButtonRed: string;
    formButton: string;
    sectionButton: string;
    blackFormButton: string;
    newFormButton: string;
  };
}

export interface ThemeLink {
  variant: {
    primary: string;
    primaryButton: string;
    primaryButton2: string;
    fullCardButton: string;
  };
}
