
import './App.css'
import Approuter from './router/Approuter'
import Routers from './Router/Router';
import { PrimeReactProvider } from 'primereact/api';
import {NextUIProvider} from "@nextui-org/react";
import { Toaster } from 'react-hot-toast';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'react-quill/dist/quill.snow.css';

 export default function App() {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <PrimeReactProvider>
        <NextUIProvider>
          <Routers/>
        </NextUIProvider>
       <Toaster position="top-right" reverseOrder={false} />
      </PrimeReactProvider>
      <Approuter/>
    </>
  )
}
 

// function App() {
//   window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
//   }
//   return (
//     <>
       
//           <Approuter/>
        
     
//     </>
//   )
// }
// export default App
