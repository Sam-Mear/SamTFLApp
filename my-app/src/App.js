import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Card, CardHeader, CardBody, CardFooter, Container, Heading 
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <ColorModeSwitcher></ColorModeSwitcher>
        <Heading>SamTFLApp</Heading>
        <Text>An app that uses the TFL API.</Text>
      </Container>
    </ChakraProvider>
  );
}

export default App;
