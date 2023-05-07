import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Container,
  Heading,
  Text,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  GoogleMap,
  InfoBox,
  Marker,
  useLoadScript,
  HeatmapLayer,
} from '@react-google-maps/api';

const libraries = ['places', 'visualization'];
const mapContainerStyle = {
  height: '500px',
  width: '100%',
};
const center = {
  lat: 51.507602,
  lng: -0.127816,
};
const options = {
  disableDefaultUI: false,
};

function App() {
  const [data, setData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch('https://api.tfl.gov.uk/BikePoint/');
      const data = await response.json();
      setData(data);
    }
    async function getAccidents() {
      const response2 = await fetch('https://api.tfl.gov.uk/AccidentStats/2019');
      const accidentData = await response2.json();
      setAccidentData(accidentData);
    }
    getData();
    getAccidents();
  }, []);

  const pedalCycleAccidents = accidentData.filter(accident => {
    return accident.vehicles.some(vehicle => vehicle.type === "PedalCycle");
  });
  
  const pedalCycleAccidentCoords = pedalCycleAccidents.map(accident => {
    return { location: new window.google.maps.LatLng(accident.lat, accident.lon), weight: 1 };
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <ColorModeSwitcher />
        <Heading>SamTFLApp</Heading>
        <Text>An app that uses the TFL API.</Text>
        <Heading as='h4' size='md'>Bike locations</Heading>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
        >
          {data.map((datapoint) => (
            <Marker
              key={datapoint.id}
              position={{
                lat: datapoint.lat,
                lng: datapoint.lon,
              }}
              onClick={() => {
                setSelected(datapoint);
              }}
            />
          ))}

          {/*Render an InfoBox component when a Marker is selected*/}
          {selected && (
            <InfoBox
              position={{
                lat: selected.lat,
                lng: selected.lon,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div style={{ backgroundColor: "black" }}>
                <Heading as="h2" size="md">
                  {selected.commonName}
                </Heading>
                <Text>{selected.id}</Text>
                <Text>{selected.additionalProperties.find(prop => prop.key === 'NbBikes').value} bike(s) available</Text>
                <Text>Last updated: {selected.additionalProperties.find(prop => prop.key ==='NbBikes').modified}</Text>
              </div>
            </InfoBox>
          )}
        </GoogleMap>
        <Heading as='h4' size='md'>Bike accident heat map (2019 data)</Heading>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
        >
          <HeatmapLayer 
            data={pedalCycleAccidentCoords}
          />
        </GoogleMap>
      </Container>
    </ChakraProvider>
  );
}

export default App;
