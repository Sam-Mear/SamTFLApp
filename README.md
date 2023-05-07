# SamTFLApp
Transport for London API App

TODO : 
1. put bikepoints on a map(https://api.tfl.gov.uk/BikePoint/) DONE
2. add extra info on click(https://api.tfl.gov.uk/BikePoint/BikePoints_121) DONE, extra API call not needed.
3. bike accidents heat map (https://api.tfl.gov.uk/AccidentStats/2010), sometimes works

## Running locally
1. Make sure you have you google maps API javascript key in my-app/.env.local like so
`REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here`
2. `npm install --save react-router-dom -force` in my-app folder.
2. Start server with `npm start` in the my-app folder.
