type Theme = {
  container: {
    bgColor: string;
    darkerBgColor: string;
  };
  primaryFontColor: string;
  secondaryFontColor: string;
  tertiaryFontColor: string;
  starFontColor: string;
};

const RestaurantTheme: Record<string, Theme> = {
  default: {
    container: {
      bgColor: 'white',
      darkerBgColor: '#efefef',
    },
    primaryFontColor: 'rgba(0,0,0,0.98)',
    secondaryFontColor: 'rgba(0,0,0,0.8)',
    tertiaryFontColor: 'rgba(0,0,0,0.66)',
    starFontColor: 'rgba(0,0,0,0.98)',
  },
  bim: {
    container: {
      bgColor: '#012849',
      darkerBgColor: 'rgba(0,0,0,0.3)',
    },
    primaryFontColor: '#F557A0',
    secondaryFontColor: '#BAEF78',
    tertiaryFontColor: '#F5EEEC',
    starFontColor: '#F5EEEC',
  },
  'github-dark': {
    container: {
      bgColor: '#0F1217',
      darkerBgColor: '#000000',
    },
    primaryFontColor: '#F78166',
    secondaryFontColor: '#56D364',
    tertiaryFontColor: '#FFFFFF',
    starFontColor: '#FFFFFF',
  },
  'github-light': {
    container: {
      bgColor: '#F6F8FA',
      darkerBgColor: '#E2E2E2',
    },
    primaryFontColor: '#A40F26',
    secondaryFontColor: '#24292E',
    tertiaryFontColor: '#24292E',
    starFontColor: '#24292E',
  },
  'wild-cherry': {
    container: {
      bgColor: '#1F1726',
      darkerBgColor: '#000507',
    },
    primaryFontColor: '#D94085',
    secondaryFontColor: '#FFD16F',
    tertiaryFontColor: '#ECECEC',
    starFontColor: '#ECECEC',
  },
};

export default RestaurantTheme;
