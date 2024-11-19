import { useState } from 'react'
import './App.css'
import Routers from './Router/Router';
import { PrimeReactProvider } from 'primereact/api';
import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <>
      <PrimeReactProvider>
        <NextUIProvider>
          <Routers/>
        </NextUIProvider>
       <Toaster position="top-right" reverseOrder={false} />
      </PrimeReactProvider>
    </>
  )
}

export default App
