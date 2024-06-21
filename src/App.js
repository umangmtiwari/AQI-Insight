import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  window.addEventListener('scroll', () => {
    document.querySelector('#Home h1').style.marginTop = `${
      window.scrollY * 1.4
    }px`;
    document.querySelector('form').style.marginTop = `${
      window.scrollY * 1.45
    }px`;
    document.querySelector('#Mountain1').style.marginBottom = `${
      106 - window.scrollY
    }px`;
    document.querySelector(
      '#leftCloud'
    ).style.marginLeft = `-${window.scrollY}px`;
    document.querySelector(
      '#mainCloud'
    ).style.marginTop = `-${window.scrollY}px`;
    document.querySelector(
      '#rightCloud'
    ).style.marginRight = `-${window.scrollY}px`;
  });

  const daysArray = [
    { day: 'Day 1' },
    { day: 'Day 2' },
    { day: 'Day 3' },
    { day: 'Day 4' },
    { day: 'Day 5' },
    { day: 'Day 6' },
    { day: 'Day 7' },
    { day: 'Day 8' },
  ];

  let [city, setCity] = useState('');
  let [wDetails, setWdetails] = useState();
  let getData = event => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 600); //delay

    fetch(
      `https://api.waqi.info/feed/${city}/?token=34f484e7b0773bbe3fa8a4c6eb5e32d5d65c3503`
    )
      .then(res => res.json())
      .then(finalResponse => {
        console.log(finalResponse);
        if (
          city == '' ||
          finalResponse.data == 'Unknown station' ||
          finalResponse.status == 'error'
        ) {
          setWdetails(undefined);
        } else {
          setWdetails(finalResponse);
        }
      });
    event.preventDefault();
    setCity('');
  };

  let qualityLevel = aqi => {
    if (aqi < 50) {
      return 'Good';
    }
    if ((aqi > 51) & (aqi < 100)) {
      return 'Satisfactory';
    }
    if ((aqi > 101) & (aqi < 200)) {
      return 'Poor';
    }
    if ((aqi > 201) & (aqi < 300)) {
      return 'Very Poor';
    } else {
      return 'Severe';
    }
  };

  let imageSource = aqi => {
    if (aqi < 50) {
      return 'Good.png';
    }
    if ((aqi > 51) & (aqi < 100)) {
      return 'Satisfactory.png';
    }
    if ((aqi > 101) & (aqi < 200)) {
      return 'Poor.png';
    }
    if ((aqi > 201) & (aqi < 300)) {
      return 'Very Poor.png';
    } else {
      return 'Severe.png';
    }
  };

  return (
    <div className='App'>
      <body>
        <header>
          <nav>
            <h1>AQI-Insight</h1>
            <span></span>
          </nav>
        </header>
        <section id='Home'>
          <h1></h1>
          <form onSubmit={getData}>
            Type City Name and Press Enter:{' '}
            <input
              type='text'
              className='ip2'
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder='Mumbai, Dubai...'
              required
            ></input>
          </form>

          <img src='./leftCloud.png' id='leftCloud' alt='' />
          <img src='./mainCloud.png' id='mainCloud' alt='' />
          <img src='./rightCloud.png' id='rightCloud' alt='' />
          <img src='./Layer 1.png' id='Mountain1' alt='' />
          <img src='./Layer 2.png' id='Mountain2' alt='' />
        </section>
        <section id='About'>
          <div className='outer-container'>
            <h1>
              <br></br>Results<br></br>
              <br></br>
            </h1>
          </div>

          {wDetails !== undefined ? (
            <div className='outer-container'>
              <div className='container'>
                <div className='answer'>
                  <h2>Air Quality Index: {wDetails.data.aqi}</h2>
                  <h3>Station: {wDetails.data.city.name}</h3>
                  <h3>AQI Level: {qualityLevel(wDetails.data.aqi)}</h3>
                  <h3>
                    Impact on Health: {qualityLevel(wDetails.data.forecast)}
                  </h3>
                  <br></br>
                  <img
                    className='About'
                    src={imageSource(wDetails.data.aqi)}
                    width='300'
                    height='200'
                    alt='AQI Level'
                  />
                  <p>AQI Fetched at: {wDetails.data.debug.sync}</p>
                  <p>
                    Coordinates: Latitude {wDetails.data.city.geo[0]}, Longitude{' '}
                    {wDetails.data.city.geo[1]}
                  </p>
                  <p>
                    Pollutant Contributing the Most: {wDetails.data.dominentpol}
                  </p>
                  <br></br>
                  <h3>Future Prediction for 8 Days:</h3>
                  <table border='1' width='100%' className='data-table'>
                    <thead>
                      <tr>
                        <th>
                          <b>Day</b>
                        </th>
                        <th>
                          <b>O3</b>
                        </th>
                        <th>
                          <b>PM 1.0</b>
                        </th>
                        <th>
                          <b>PM 2.5</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {wDetails.data.forecast.daily.o3.map((item, index) => (
                        <tr key={index}>
                          <td>Day {index + 1}</td>
                          <td>{item.avg} µg/m³</td>
                          <td>
                            {wDetails.data.forecast.daily.pm10[index].avg} µg/m³
                          </td>
                          <td>
                            {wDetails.data.forecast.daily.pm25[index].avg} µg/m³
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className='outer-container'>
              <p3>
                Enter City Name and See the Results!<br></br>
              </p3>
            </div>
          )}
        </section>
        <div className='outer-container'>
          <p3>
            <br></br>
            <br></br>
            By: Umang Tiwari
            <br />
            <a href='https://github.com/umangmtiwari'>🚀 Github</a>
            <br />
            <a href='https://www.linkedin.com/in/umang-tiwari-252616210/'>
              🌐 LinkedIn<br></br>
              <br></br>
            </a>
          </p3>
        </div>
      </body>
    </div>
  );
}

export default App;
