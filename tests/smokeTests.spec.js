import { expect } from 'chai';
import App from '../src/App';
import Form from '../src/components/Form';
import getEndpoint from '../src/environment/Endpoints';

const AppClass = new App;
const FormClass = new Form;

describe('smoke tests', () => {
	// APP TESTS
	it('should exist the App class', () => {
		expect(AppClass).to.exist;
	});
	it('should exist the getData method', () => {
		expect(AppClass.getData).to.exist;
	});
	it('should exist the getCityWeather method', () => {
		expect(AppClass.getCityWeather).to.exist;
	});
	it('should exist the getCityData method', () => {
		expect(AppClass.getCityData).to.exist;
	});
	it('should exist the filterDataByWeather method', () => {
		expect(AppClass.filterDataByWeather).to.exist;
	});
	it('should exist the filterByBestPeriod method', () => {
		expect(AppClass.filterByBestPeriod).to.exist;
	});
	it('should exist the refreshApplication method', () => {
		expect(AppClass.refreshApplication).to.exist;
	});
	it('should exist the componentDidMount method', () => {
		expect(AppClass.componentDidMount).to.exist;
	});
	// FORM TESTS
	it('should exist the getBackgroundPhoto method', () => {
		expect(FormClass.getBackgroundPhoto).to.exist;
	});
	it('should exist the setWeather method', () => {
		expect(FormClass.setWeather).to.exist;
	});
	it('should exist the componentDidMount method', () => {
		expect(FormClass.componentDidMount).to.exist;
	});
	// GET ENDPOINT TESTS
	it('should exist the getEndpoint method', () => {
		expect(getEndpoint).to.exist;
	});
	
});