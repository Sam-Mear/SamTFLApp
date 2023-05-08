# SamTFLApp
Transport for London API App

Made roughly in a day for a job interview. It is make with React(First time using/learning for me). Also using Chakra for react but I dont think I really used it enough as I was only aiming for functionality. I only wanted some familiarity with Chakra.
### What it does:
* Displays BikePoint information on a google map
    * On click, displays how many bikes are available and last time this information was updated.
* Displays a heat map of accidents involving a bicycle

## Running locally
1. Make sure you have you google maps API javascript key in my-app/.env.local like so
`REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here`
2. `npm install --save react-router-dom -force` in my-app folder.
2. Start server with `npm start` in the my-app folder.
