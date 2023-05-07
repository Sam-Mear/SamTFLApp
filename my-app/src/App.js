import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Container,
  Heading,
  Text,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://api.tfl.gov.uk/BikePoint/');
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <ColorModeSwitcher />
        <Heading>SamTFLApp</Heading>
        <Text>An app that uses the TFL API.</Text>
        {data.map(datapoint => {
          return (
            <div key={datapoint.id}>
              <Heading as="h2" size="md">
                {datapoint.commonName}
              </Heading>
              <Text>{datapoint.lat}</Text>
              <Text>{datapoint.lon}</Text>
            </div>
          );
        })}
      </Container>
    </ChakraProvider>
  );
}

export default App;
