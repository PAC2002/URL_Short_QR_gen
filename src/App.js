import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

import UrlProvider from './context/context';
import Site from './components/site';

function App() {
  return (<>
    <UrlProvider>
      <ChakraProvider>

        <Site />

      </ChakraProvider>
    </UrlProvider>
  </>
  );
}

export default App;
