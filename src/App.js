import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import DataContainer from './dataContainer';
const qs = require('qs');

  //oAUTH Credentials
//var code = '88521712ed1872ed467a30e137fe0124a12c7f19';
var code = '';
var client_id = '72890';
var client_secret = '11d5916955d707c9c1c07dc6834e51943800be56';
var showData = false;
var accessToken = null;
var refreshToken = null;

function App(props) {
  //Define state of athlete variables
  //Athlete Info
  const [athlete_username, setathlete_username] = useState('');
  const [athlete_firstName, setathlete_firstName] = useState('');
  const [athlete_lastName, setathlete_lastName] = useState('');
  const [athlete_sex, setathlete_sex] = useState('');
  const [athlete_weight, setathlete_weight] = useState('');
  const [activity_distance, setactivity_distance] = useState(0);

  const [activity_name, setactivity_name] = useState('');

  //Use the effect hook to run at page load to see if we have been redirected back from Strava oAuth Portal
  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);

    code = queryParams.get('code');
    console.log(code);
    //If we find a code if the url use it to fetch the access and refresh tokens
    if((code != '' & code != null) & athlete_username == ''){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
      var fetchString = 'https://www.strava.com/oauth/token?client_id='+client_id+'&client_secret='+client_secret+'&code='+code+'&grant_type=authorization_code';
      console.log(fetchString)
      fetch(fetchString, requestOptions)
      .then(response => {
        //do something with response
        response.json().then(data => {
          accessToken = data.access_token;
          refreshToken = data.refresh_token;
          setathlete_username(data.athlete.username);
          setathlete_firstName(data.athlete.firstname);
          setathlete_lastName(data.athlete.lastname);
          setathlete_sex(data.athlete.sex);
          setathlete_weight(data.athlete.weight);
          //Add the flag to render the data
          console.log('access_token:' + data.access_token);
        });
      })
      .catch(err => {
        throw new Error(err)
      })

    }

    //Get the activity name and distance
    if(!showData){
    var fetchString2 = 'https://www.strava.com/api/v3/athlete/activities?access_token=22a7c286a8d1b091c98a933a447a567bee1f6317'
    fetch(fetchString2,)
    .then(response => {
      //do something with response
      response.json().then(data => {
        //Add the flag to render the data
        console.log("LOGGING DATA");
        console.log(data);
        setactivity_name(data[0].name)
        setactivity_distance(data[0].moving_time)
        console.log(activity_distance);
        showData = true;
      });
    })
    .catch(err => {
      throw new Error(err)
    })
  }
  });

  //create the container to display the data.
  if(showData){
    var dataContainer = '<Data';
  }

  return (
    <div className="App">
      <script type="text/javascript" src="https://unpkg.com/react@latest/dist/react.js"></script>
      <script type="text/javascript" src="http://fb.me/JSXTransformer-0.13.3.js"></script>
      <script type="text/javascript" src="https://unpkg.com/react@15.6.0/dist/react.min.js"></script>
      <script type="text/javascript" src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
      <script type="text/javascript" src="http://unpkg.com/fusioncharts/fusioncharts.js"></script>
      <script type="text/javascript" src="http://unpkg.com/fusioncharts/fusioncharts.charts.js"></script>
      <script type="text/javascript" src="http://unpkg.com/fusioncharts@3.12.1/themes/fusioncharts.theme.ocean.js"></script>
      <script type="text/javascript" src="http://unpkg.com/react-fusioncharts/dist/react-fusioncharts.js"></script>


      <div className="heading" >VandyHacks 2021 - Galactic Calorie Tracker</div>
      <div className="container" >
        <p>Click here to sign into your Strava Account!</p>
<a href="https://www.strava.com/oauth/authorize?client_id=72890&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read" className="strava-badge- strava-badge-follow" target="_blank"><img src="//badges.strava.com/echelon-sprite-48.png" alt="Strava" /></a>

<hr/>
<p>Username: {athlete_username} | Name: {athlete_firstName} {athlete_lastName} | Weight: {athlete_weight} | Last Activity Name: {activity_name} | Last Activity Duration: {activity_distance} seconds</p>
</div>


    <DataContainer weight={athlete_weight} distance={activity_distance}/>
    </div>
  );
}



export default App;
