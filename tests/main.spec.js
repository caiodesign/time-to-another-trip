import { expect } from 'chai';
import App from './App';

describe('Time to Another Trip', () => {

    describe('smoke tests', () => {
      it('should exist the getData method', () => {
        expect(App.getData).to.exist;
      });
    });
  
  });