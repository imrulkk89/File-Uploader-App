import { dbService } from '../../services/index.esm.js'

describe('Database Service Tests', () => {
    describe('Database Read Method test', () => {
        it('should return an array', async () => {
            const data = await dbService.read();
            expect(Array.isArray(data)).toBe(true);
        });
    });
});