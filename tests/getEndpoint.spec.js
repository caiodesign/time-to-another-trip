import { expect } from 'chai';
import getEndpoint from '../src/environment/Endpoints';

describe('getEndpoints tests', () => {
  
  it('should return a string with a valid url', () => {
    const location = 'cities';
    const url = 'localhost'
    expect(getEndpoint(location, 'localhost')).to.be.a('string');
  });

});