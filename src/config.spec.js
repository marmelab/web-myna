import { getApiTokenName, getMissingEnvironmentTokens } from './config.js';

describe('config', () => {
    describe('getApiTokenName', () => {
        it('should return "fakeWebMynaTokenName" if api.name is not a string', () => {
            const testGetApiTokenName = api => expect(getApiTokenName(api)).toEqual('fakeWebMynaTokenName');
            testGetApiTokenName({ name: null });
            testGetApiTokenName({ name: undefined });
            testGetApiTokenName({ name: 345 });
            testGetApiTokenName({ name: { foo: 'bar' } });
            testGetApiTokenName({ name: '' });
            testGetApiTokenName({});
        });

        it('should return a well formated token name', () => {
            expect(getApiTokenName({ name: 'rick-and-morty' })).toEqual('RICK_AND_MORTY_TOKEN');
        });
    });

    describe('getMissingEnvironmentTokens', () => {
        it('should return an array of missing token in precess.env', () => {
            const apis = [
                { name: 'api-1', requiresAuthentication: false },
                { name: 'api-2', requiresAuthentication: true },
                { name: 'api-3', requiresAuthentication: true },
            ];
            const processEnv = {};
            processEnv['API_2_TOKEN'] = 'foo';
            expect(getMissingEnvironmentTokens(apis, processEnv)).toEqual(['API_3_TOKEN']);
        });
    });
});
