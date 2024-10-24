import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './hooks/useThemeMode.jsx'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './context/SocketContext.jsx'

const styles = {
  global:(props) => ({
    body:{
      color:mode('gray.800', 'whiteAlpha.900')(props),
      bg:mode('gray.100', '#101010')(props),
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const colors = {
  gray:{
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({config, styles, colors})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
              <SocketContextProvider>
                <App />
              </SocketContextProvider>
          </ChakraProvider>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
