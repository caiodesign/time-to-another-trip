import { expect } from 'chai';
import App from '../src/App';

const AppClass = new App;

describe('Time to Another Trip', () => {

    describe('smoke tests', () => {
      it('should exist the App class', () => {
        expect(AppClass).to.exist;
      });
    });
  
  });