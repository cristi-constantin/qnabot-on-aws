/*********************************************************************************************************************
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.                                                *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.org/licenses/                                                                               *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 *********************************************************************************************************************/

const base = require('./base');
const Promise = require('bluebird');
const outputs = require('../../../../bin/exports');

const setup = outputs('dev/cognito').then(function (output) {
    process.env.USERPOOL = output.UserPool;
    process.env.CLIENT = output.Client;

    const param = {
        LoginRedirectUrl: 'https://exampe.com',
        LogoutRedirectUrl: 'https://exampe.com',
        Domain: 'example.com',
        UserPool: 'userpool'
    };
    return param;
});

exports.create = () => params('Create');
exports.update = () => params('Update');
exports.delete = () => params('Delete');

function params(stage) {
    return setup.then((param) => base('CognitoUrl', stage, param));
}
