import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Container,
  Heading,
  Text,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";



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

  const Map = withGoogleMap(() => (
    /*if (typeof google === 'undefined') {
      return null;
    }*/
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 51.507602, lng: -0.127816 }}
    >
      {data.map(datapoint => (
        <Marker
          key={datapoint.id}
          position={{
            lat: datapoint.lat,
            lng: datapoint.lon
          }}
          icon={{
            url: `http://www.sammear.co.uk/Images/instagram.png`,
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
        ))}
    </GoogleMap>
  ));

  const WrappedMap = () => (
    <Map
      containerElement={<div style={{ height: `500px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
  

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <ColorModeSwitcher />
        <Heading>SamTFLApp</Heading>
        <Text>An app that uses the TFL API.</Text>
        <WrappedMap />
        {data.map(datapoint => {
          return (
            <div key={datapoint.id}>
              <Heading as="h2" size="md">
                {datapoint.commonName}
              </Heading>
              <Text>{datapoint.id}</Text>
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
