/**
 * 
 * Testing the Http status codes to ensure 200 is being returned
 * 
 * Testing whether the response matches the input from the controller
 * 
 * One test suite for handling the functions and another for the routes
 * 
 */

import { describe, test, it, expect } from "vitest"; 
import {defineConfig} from 'vitest/config';


export default defineConfig({
    test: {
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
    },
  });

//testing controllers > databaseAll.mjs 
describe("home", () => {
    test('the contents of the home directory are up to date', async() =>{
        const expectedValue = {
            "API":"Hello, welcome to the api!",
            Endpoints:{
                Home:"/api/v2",
                Routes:{
                    "/dbsizes":{
                        params:{
                            paramCount:0,
                            paramName:"None",
                            paramType:"None",
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Retrieves storage information about all databases",
                            example:"/dbsizes"
                        }
                    },
                    "/dbstats - V1":{
                        params:{
                            paramCount:1,
                            paramName:"dbName",
                            paramType:"endpoint query",
                            example:"/dbstats?dbName=data"
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Retrieves information about a given databases"
                        }
                    },
                    "/database/collection":{
                        params:{
                            paramCount:2,
                            paramName:"database",
                            paramName:"collection",
                            paramType:"endpoint parameters",
                            example:"/data/test"
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Retrieving all documents within a given database and collection"
                        }
                    },
                    "/getCollectionNames":{
                        params:{
                            paramCount:1,
                            paramName:"dbName",
                            paramType:"endpoint query",
                            example:"/getCollectionNames?dbName=data"
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Gets Collection Names from a given database"
                        }
                    },
                    "/data/fields/collection":{
                        params:{
                            paramCount:1,
                            paramName:"collection",
                            paramType:"endpoint parameter",
                            example:"/data/fields/test"
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Gets all fields within a given collection in the 'data' database"
                        }
                    },
                    "/data/collection/field":{
                        params:{
                            paramCount:2,
                            paramName:"collection",
                            paramName:"field",
                            paramType:"endpoint parameter",
                            example:"/data/test/speed"
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Gets all values froma field within a given collection in the 'data' database"
                        }
                    },
                    "/image":{
                        params:{
                            paramCount:1,
                            paramName:"collection",
                            paramType:"query parameter",
                            example:"/image?search=test_picture_2"
                        },
                        info:{
                            Method:"GET",
                            Headers:"None",
                            Desc:"Converts the database image (collection name as search parameter) to a pixel array"
                        }
                    },

                    
      
                }


            }

        }

        const result = await fetch("http://127.0.0.1:5000/api/v2/");
        const resultJson = await result.json() 

        expect(resultJson).toStrictEqual(expectedValue)
    })
})
