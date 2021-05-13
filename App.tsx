import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import './index.scss';
import { ZODIAC_SIGN } from './constants';

const App = (): React.ReactElement => {
	const [zodiacState, setZodiacState] = useState('');
	const selectBirthDate = (date: Moment, _: string) => {
		const formattedDate = date.format('MM-DD');
		let zodiacSign;
		if (moment(formattedDate).isBetween('03-20', '04-20', 'day')) {
			zodiacSign = 'Aries';
		}
		if (moment(formattedDate).isBetween('04-19', '05-21', 'day')) {
			zodiacSign = 'Taurus';
		}
		if (moment(formattedDate).isBetween('05-20', '06-21', 'day')) {
			zodiacSign = 'Gemini';
		}
		if (moment(formattedDate).isBetween('06-20', '07-23', 'day')) {
			zodiacSign = 'Cancer';
		}
		if (moment(formattedDate).isBetween('07-22', '08-23', 'day')) {
			zodiacSign = 'Leo';
		}
		if (moment(formattedDate).isBetween('08-22', '09-23', 'day')) {
			zodiacSign = 'Virgo';
		}
		if (moment(formattedDate).isBetween('09-22', '10-23', 'day')) {
			zodiacSign = 'Libra';
		}
		if (moment(formattedDate).isBetween('10-22', '11-22', 'day')) {
			zodiacSign = 'Scorpio';
		}
		if (moment(formattedDate).isBetween('11-21', '12-22', 'day')) {
			zodiacSign = 'Sagittarius';
		}
		if (
			moment(formattedDate).isBetween('12-21', '12-31', 'day') ||
			moment(formattedDate).isBetween('01-01', '01-20', 'day') ||
			formattedDate === '12-31' ||
			formattedDate === '01-01'
		) {
			zodiacSign = 'Capricorn';
		}
		if (moment(formattedDate).isBetween('01-19', '02-19', 'day')) {
			zodiacSign = 'Aquarius';
		}
		if (moment(formattedDate).isBetween('02-18', '03-21', 'day')) {
			zodiacSign = 'Pisces';
		}
		setZodiacState(zodiacSign);
	};
	return (
		<div className="main-background">
			<p className="text-xl md:text-3xl sm:text-2xl futura text-center text-white font-extrabold pt-5 md:pt-10 sm:pt-8 pb-4 sm:pb-5 md:pb-8">
				My Zodiac sign
			</p>
			<div className="mx-3 sm:mx-5 md:mx-8">
				<p className="text-left text-xl md:text-5xl futura sm:text-3xl whitesmoke w-5/6 font-bold sm:w-4/6 md:w-3/5">
					Want to learn about your Zodiac sign?
				</p>
				<p className="text-left text-lg md:text-2xl futura sm:text-xl whitesmoke w-5/6 sm:w-4/6 font-semibold md:w-3/5">
					To start just tell us your birthday
				</p>
			</div>
			<div className="mt-24 flex justify-center align-middle">
				<DatePicker
					allowClear
					format="DD-MM-YYYY"
					onChange={selectBirthDate}
					disabledDate={current => {
						return current && current > moment();
					}}
				/>
			</div>
			{zodiacState && (
				<div className="mx-auto mt-8 w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 h-auto p-4 bg-white border-radius">
					{ZODIAC_SIGN.map(({ name, star, attr, image }) => {
						if (name === zodiacState) {
							return (
								<>
									<p className="font-semibold text-2xl text-center text-black">
										{name}
									</p>
									<div
										key={name}
										className="flex justify-center align-middle m-5"
									>
										<img src={star} className="m-2 w-3/5 h-auto" />
										<img src={image} className="m-2 w-3/5 h-auto" />
									</div>
									<p className="text-xl font-semibold text-center text-grey-900">
										Characteristics
									</p>
									<ul className="mx-5 list-disc">
										{attr.map(attribute => (
											<li key={attribute}>{attribute}</li>
										))}
									</ul>
								</>
							);
						}
					})}
				</div>
			)}
		</div>
	);
};

export default App;
