const { dbService } = require('../../services/index.js');
const fs = require('fs').promises;

describe('Database Service Tests', () => {

    beforeEach(() => {
        jest.resetAllMocks();
     });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Database Read Method test', () => {
        it('should return an array', async () => {        
            const readFileSpy = jest.spyOn(fs, 'readFile');
            readFileSpy.mockResolvedValueOnce(JSON.stringify([]));

            const data = await dbService.read();
            expect(Array.isArray(data)).toBe(true);
        });
    });

    describe('Database Write Method test', () => {
        it('should not return anything', async() => {
            const fileInfo = {
                file_name: 'string',
                mime_type: 'string',
                private_key: 'string',
                public_key: 'string',
                processed_time: 'string'
            }
            
            const readFileSpy = jest.spyOn(fs, 'readFile');
            readFileSpy.mockResolvedValueOnce(JSON.stringify([]));

            const writeFileSpy = jest.spyOn(fs, 'writeFile');
            writeFileSpy.mockImplementationOnce(() => {});

            await dbService.write(fileInfo);

            expect(writeFileSpy).toHaveBeenCalledTimes(1);           
        });
    });

    describe('Database Find Method test', () => {
        it('should throw error if database is empty', async () => {

            const key = 'string';
                        
            const readFileSpy = jest.spyOn(fs, 'readFile');
            readFileSpy.mockResolvedValueOnce(JSON.stringify([]));

            try {
                  const foundValue = await dbService.find(key);

            } catch (error) {
               expect(error).toBeInstanceOf(Error); 
               expect(error).toHaveProperty('message' , 'No data in database');
            }
        });

        it('should return an object consist of another object and string if success', async () => {
            const key = 'string';

            const data = [
                {
                    file_name: 'string',
                    mime_type: 'string',
                    private_key: 'string',
                    public_key: 'string',
                    processed_time: 'string'
                }
            ];
            
            const readFileSpy = jest.spyOn(fs, 'readFile');
            readFileSpy.mockResolvedValueOnce(JSON.stringify(data));

            const findSpy1 = jest.spyOn(Array.prototype, 'find');
            findSpy1.mockResolvedValueOnce(data[0]);

            try {
                const found = await dbService.find(key);
            } catch (error) {
                
            }

        }); 
    });
});