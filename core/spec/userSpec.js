var request = require('request');
var frisby = require('frisby');
var config = require('../config');

/** 
 * Wrong user 
 */
frisby.create('Ensure that there isnt a user')
    .post(config.HOST+'/authenticate')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON({
        status: "error",
        errorcode: 1,
        msg: "user not exists"
    })
    .expectJSONTypes({
        status: String,
        errorcode: Number,
        msg: String
    })
.toss();

/** 
 * First admin user 
 */
frisby.create('Ensure that first admin user is created')
    .get(config.HOST+'/setup')
    .after(function(err, res, body) {

        /** 
         * Correct user, wrong password 
         */
        frisby.create('Ensure that user is using wrong password')
            .post(config.HOST+'/authenticate', {
                mail: 'root@admin.com',
                password: 'wrong_password'
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'json')
            .expectJSON({
                status: "error",
                errorcode: 2,
                msg: "wrong password"
            })
            .expectJSONTypes({
                status: String,
                errorcode: Number,
                msg: String
            })
        .toss();

        /** 
         * Correct user and password 
         */
        frisby.create('Ensure that api is authenticating an administrator user')
            .post(config.HOST+'/authenticate', {
                mail: 'root@admin.com',
                password: '123456@admin'
            })
            .afterJSON(function(json) {

                /** 
                 * Get users basic list 
                 */
                frisby.create('Ensure that is return a basic list of users')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user')
                    .expectJSONTypes({
                        status: String,
                        data: Array
                    })
                    .expectJSON('data.?', { // Verifica se dentro da array data, existe o valor definido abaixo
                        mail: "root@admin.com"
                    })
                    .expectJSONLength('data.*', 3) // The default number of fields
                .toss();

                /** 
                 * Get users with defined fields 
                 */
                frisby.create('Ensure that is returning only some fields')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user?fields=name,mail')
                    .expectJSONTypes('data.*',{
                        name: String
                    })
                    .expectJSONLength('data.*', 3) // It's number of fields more _id field
                .toss();

                /** 
                 * Ensure that if fields is empty, return standard
                 */
                frisby.create('Ensure that is only returning _id')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user?fields=')
                    .expectJSONLength('data.*', 3) // It's number of fields more _id field
                .toss();

                /** 
                 * Ensure that is not trying to return unknow fields
                 */
                frisby.create('Ensure that is only returning _id')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user?fields=field1,field2,strangefield')
                    .expectJSONLength('data.*', 1) // It's number of fields more _id field
                .toss();

                /**
                 * Ensure that is creating a new access token
                 * (Vou ter que criar um access token para cada request)
                 */
                frisby.create('Ensure that is creating a new access token')
                    .get(config.HOST+'/access-token')
                    .afterJSON(function(json_token) {

                        let access_token = json_token.token;

                        /**
                         * Ensure that is creating a new user with minimum requeriments
                         */
                        frisby.create('Ensure that is creating a new user with minimum requeriments')
                            .post(config.HOST+'/user', {
                                name: 'User test',
                                mail: 'usertest@outlook.com',
                                password: '123456@teste',
                                cpf: '11122233389',
                                token: access_token
                            })
                            .expectJSONTypes('data.*',{
                                status: String
                            })
                            .expectJSONLength('data.*', 1)
                            .afterJSON(function(json_result_creation) {

                                /**
                                 * Ensure that user is in database
                                 */


                            })
                        .toss();



                    })
                .toss();

                
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'json')
            .expectJSON({
                status: "success"
            })
            .expectJSONTypes({
                status: String,
                token: String
            })
        .toss();



    })
.toss();