//App.js

// import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'
import Spinner from 'react-bootstrap/Spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown } from '@fortawesome/free-solid-svg-icons';

function Home() {
	const [input, setInput] = useState('');
	const [weather, setWeather] = useState({
		loading: false,
		data: {},
		error: false,
	});

	const toDateFunction = () => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		const WeekDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
			}`;
		return date;
	};

	const search = async (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setInput('');
			setWeather({ ...weather, loading: true });
			const url = 'https://api.openweathermap.org/data/2.5/weather';
			const api_key = '6050c56ab1d3d5773a09a24eed56abf5';
			await axios
				.get(url, {
					params: {
						q: input,
						units: 'metric',
						appid: api_key,
					},
				})
				.then((res) => {
					console.log('res', res);
					setWeather({ data: res.data, loading: false, error: false });
				})
				.catch((error) => {
					setWeather({ ...weather, data: {}, error: true });
					setInput('');
					console.log('error', error);
				});
		}
	};

	return (
        <div className="container ">
            <div className="row justify-content-center mt-5">
            <div className='col-md-6 ms-5'>
            <h1 className="app-name">
				Wheather App
			</h1>
			<div className="search-bar">
				<input
					type="text"
					className="city-search mt-3"
					placeholder="Enter City Name.."
					name="query"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					onKeyPress={search}
				/>
			</div>
			{weather.loading && (
				<>
					<br />
                            <br />
                            <Spinner animation="border" role="status">
      <span className="visually-hidden ms-5">Loading...</span>
    </Spinner>
					{/* <Oval type="Oval" color="black" height={100} width={100} /> */}
				</>
			)}
			{weather.error && (
				<>
					<br />
					<br />
					<span className="error-message">
						{/* <FontAwesomeIcon icon={faFrown} /> */}
						<span style={{ fontSize: '20px' }}>City not found</span>
					</span>
				</>
			)}
			{weather && weather.data && weather.data.main && (
				<div>
					<div className="city-name mt-3">
						<h2>
							{weather.data.name}, <span>{weather.data.sys.country}</span>
						</h2>
					</div>
					<div className="date">
						<span>{toDateFunction()}</span>
                            </div>
                            <div className='d-flex mt-4'>
                            <div className="icon-temp">
                                <p className='fs-4 ms-3'>Temp</p>
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
							alt={weather.data.weather[0].description}
						/>
						{Math.round(weather.data.main.temp)}
						<sup className="deg">°C</sup>
                                </div>
                                <div className="icon-temp">
                                <p className='fs-4 ms-4'>Max Temp</p>
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
							alt={weather.data.weather[0].description}
						/>
						{Math.round(weather.data.main.temp_min)}
						<sup className="deg">°C</sup>
					</div>
                            </div>
                           
                           
					<div className="des-wind">
						<p>{weather.data.weather[0].description.toUpperCase()}</p>
                                <p className='text-success'>Wind Speed: {weather.data.wind.speed}m/s</p>
                                <p className='text-success'>Humidity: {weather.data.main.humidity}%</p>
					</div>
				</div>
			)}
            </div>
            </div>
         
			
		</div>
	);
}

export default Home;
