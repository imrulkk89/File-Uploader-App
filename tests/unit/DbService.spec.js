import { DIContainer } from '../../ioc/index.esm.js';
import  TYPES  from '../../ioc/types.esm.js'

const dbService = DIContainer.get(TYPES.DbService);

describe('Database Service Tests', () => {
    describe('Database Read Method test', () => {
        it('should return an array', async () => {
            const data = await dbService.read();
            expect(Array.isArray(data)).toBe(true);
        });
    });
});