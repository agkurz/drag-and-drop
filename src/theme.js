import { createMuiTheme } from '@material-ui/core/styles';

const colorPrime = '#0747A6'; // blue
const colorLightPrime = '#DEEBFF'; // blue
// light blue #DEEBFF
const colorRedPrime = '#ED1C24';
// A custom theme for this app
const theme = createMuiTheme({
  themeName: 'Main Drag and Drop Theme',
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
    ].join(','),
    h6: {
      textTransform: 'none',
      fontWeight: 600,
      color: '#444',
      lineHeight: '24px',
      fontSize: '1.5em'
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
  },
  palette: {
    primary: {
      main: colorPrime,
    },
    secondary: {
      main: '#DEEBFF',
    },
    error: {
      main: colorRedPrime,
    },
    background: {
      default: '#e6e6e6',
    },
    // ====================
    // Primary Pallete
    // ====================
    colorPrime,
    colorGreyPrime: '#999999',
    // ====================
    // Secondary Pallete
    // ====================
    colorGreenPrime: '#00AE4D',
    colorRedPrime,
    colorYellowPrime: '#FFC20E',
    colorBluePrime: '#286FAD',
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        borderRadius: 3,
        border: 0,
        color: 'white',
      },
    },
    MuiTextField: {
      root: {
        margin: 0,
      }
    },
    MuiInput: {
      root: {
        background: colorLightPrime,
      },
      underline: {
        '&:focus': {
          borderBottom: `1px solid ${colorPrime}`,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid ${colorPrime}`,
        },
        '&:after': {
          borderBottom: `2px solid ${colorPrime}`,
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&.Mui-focused': {
          color: '#F96302',
        },
      },
    },
    MuiIconButton: {
      colorSecondary: {
        '&:hover': {
          color: '#F96302',
        },
      },
    },
    MuiTable: {
      root: {
        marginBottom: '16px'
      },
    },
    MuiTableRow: {
      root: {
        verticalAlign: 'top',
      }
    },
    MuiTableCell: {
      root: {
        '&:last-child': {
          paddingRight: 'unset',
        },
      },
      body: {
        fontWeight: 300,
        fontSize: '1.3em',
      },
      sizeSmall: {
        border: 'none',
        padding: 0,
        '&:last-child': {
          paddingRight: 'unset',
        },
      },
    },
    MuiPaper: {
      root: {
        padding: '16px',
        // width: '100%',
      },
      rounded: {
        borderRadius: '2px',
      },
    },
    MuiContainer: {
      root: {
        overflow: 'hidden',
        alignItems: 'center',
        padding: '1.25em',
        '& ::-webkit-scrollbar': {
          background: 'none'
        }
      },
    },
    MuiToolbar: {
      regular: {
        height: '100%',
        minHeight: 'unset',
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#444'
      },
      positionFixed: {
        bottom: 0,
        top: 'auto',
        height: '52px',
        padding: 0
      }
    },
    MuiGrid: {
      root: {
        height: '100%',
      }
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '1em'
      }
    }
  },
});

export default theme;
