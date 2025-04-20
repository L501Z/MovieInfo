import express from 'express';
const router = express.Router();

import * as databaseModule from '../services/DatabaseCollection.mjs'


/**
 * Home route '/api/v2;'
 * @param {*} req 
 * @param {*} res 
 */
const home = (req, res) => {
    try{
        res.header("Content-Type","application/json");
        const homeMessage = {
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
        res.status(201).send(homeMessage);
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};


//DB MODULE


const databaseSize = async(req, res) => {
    try{
        const returnArray = await databaseModule.returnDatabaseSizes();
        res.status(201).send(returnArray);
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
    await timeout(3000);
    return fn(...args);
}
const dbSearch = async(req, res) => {
    try{
        timeout(1000)
        //searches for collections within database
        if (!req.query.search || req.query.search === undefined){
  
            res.status(400).send("No search parameters");
        }
        else{


            const Results = await databaseModule.initialiseDatabaseSearch(req.query.search) || {Error:{"Data":"Unable To Fetch"}};

            const final_results = {
                SearchResults: Results.length,
                Results,
            } 
            
            res.status(201).send(final_results);           
        }
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const getCollectionDocs = async(req, res) => {
    try{
        if (!req.params.collection || req.params.collection === undefined){
            res.status(400).send("No col name use '/collection' as paramater")
        }
        else{
            const db = req.params.db || "";
            const col = req.params.collection || "";
            const docs = await databaseModule.getAllDocs(db, col) || {Unknown:{"Unknown":"Empty"}}
            res.status(201).send(docs);
        }
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const getCollectionNames = async(req, res) => {
    try{        
        //gets current col names
        if (!req.query.dbName || req.query.dbName === undefined){
            res.status(400).send("Please include db name as 'endpoint?dbName=YourValue'")
        }
        else{
            const search = databaseModule.getColNames(req.query.dbName);

            res.status(201).send(search);
        }
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const getFieldNames = (req, res) => {
    try{
        const docs = databaseModule.getAllFieldNames()

        res.status(201).send(docs);

    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const getAllField = async(req, res) => {
    try{
        const db = req.params.db
        console.log(db)
        const data = await databaseModule.returnAllInField(db,req.params.collection, req.params.field)
        res.status(201).send(data)
        
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const getImage = async(req, res) => {
    try{        
        //gets current col names


        const PixelArray = await databaseModule.image(req.query.search) || {Error:{"Result":"Unavailable"}};

        const returnObject = {
            ImageUrl:"",
            PixelArray
        }

        res.status(201).send(returnObject);
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};


//DB SERVICE

/** 
const getDbStats = async(req, res) => {
    try{

        if (!req.query.dbName || req.query.dbName === undefined){
            res.status(400).send("Please include db name as 'endpoint?dbName=YourValue'")
        }

        else{
            const dbName = req.query.dbName;
            const result = await service.getDatabaseStats(dbName);
            let resultObj = new Array();
            for (let i = 0; i<=result.length-1;i++){
                let fields = await service.getCollectionFieldNames(dbName, result[i].name); 
                let totalDocs=20;
                resultObj.push({
                    name:result[i].name,
                    ReadOnly:result[i].info.readOnly,
                    totalDocuments:totalDocs,
                    fields:Object.keys(fields),
                })

            }

            res.status(200).send(resultObj)
        }
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const searchInCollection = async(req, res) => {
    try{
        if (!req.query.search || req.query.search === undefined){
            res.status(400).send("No search parameter use '?search=<your_search>' as query parameter")
        }
        let finalResults = new Map();
        
        //gets current col names
        const search = await service.searchCol(req.query.search);


        res.status(201).send(search);
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const getColStats = async(req, res) => {
    try{

        const result = await service.getCollectionStatsRef() || {Error:{"Result":"Unavailable"}};

        res.status(200).send(result)
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const colSearchFields = async(req, res) => {
    try{
        //searches for collections within database
        if (!req.query.search || req.query.search === undefined){
            res.status(400).send("No search parameters");
        }
        else{
            const collectionMatch = await service.searchColFields(req.query.search) || {Error:{"Result":"Unavailable"}};

            const final_results = {
                SearchResults: collectionMatch.length,
                collectionMatch,
            }
            
            res.status(201).send(final_results);           
        }
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};

const colSearchNames = async(req, res) => {
    try{
        //searches for collections within database
        if (!req.query.search || req.query.search === undefined){
            res.status(400).send("No search parameters");
        }
        else{
            const collectionMatch = await service.searchColNames(req.query.search) || {Error:{"Result":"Unavailable"}};

            const final_results = {
                SearchResults: collectionMatch.length,
                collectionMatch,
            }
            
            res.status(201).send(final_results);           
        }
    }
    catch(err){
        res.status(500).send(`There was an error: ${err}`)
    }
};


*/

export {getAllField};
export {getFieldNames};
export {dbSearch};
export {databaseSize};
export {getCollectionDocs};

export {home};
export {getCollectionNames};
export {getImage}
