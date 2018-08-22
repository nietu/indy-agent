'use strict';

const config = {
    /*
    - PORT=3003
    - NAME=Acme Corporation
    - EMAIL=boss@acme.com
    - PASSWORD=123
    - USERNAME=acme
    - PUBLIC_DID_ENDPOINT=173.17.0.180:3003
    - DOCKERHOST=${DOCKERHOST}
    - RUST_LOG=${RUST_LOG}
    - TEST_POOL_IP=${TEST_POOL_IP}
    */

    // Change to your endpoint did's endpoint
    //endpointDidEndpoint: process.env.PUBLIC_DID_ENDPOINT,
    //endpointDidEndpoint: process.env.PUBLIC_DID_ENDPOINT || "173.17.0.200:3005",
    endpointDidEndpoint: process.env.PUBLIC_DID_ENDPOINT || "127.0.0.1:3005",

    // IP Address of the running ledger
    testPoolIp: process.env.TEST_POOL_IP || '127.0.0.1',
    //testPoolIp: process.env.TEST_POOL_IP || '173.17.0.100',

    // the port to run the agent server on
    port: process.env.PORT || 3005,

    // Optional: Give your wallet a unique name
    //walletName: `${process.env.USERNAME || 'alice'}_wallet`,
    walletName: `${process.env.USERNAME || 'tommi'}_wallet`,

    // Optional: Give your pool config a unique name
    poolName: process.env.POOL_NAME || 'aidemo',

    // Optional: Give your pool config a unique name
    subUrl: process.env.SUB_URL || '/saidot_tommi',
    //subUrl: process.env.SUB_URL || '',

    // This information is used to issue your "Government ID"
    userInformation: {
        name: process.env.NAME || 'Tommi home',
        email: process.env.EMAIL || 'tommi@home.com',
        tax_id: process.env.TAX_ID || '123-45-6789',
        username: process.env.USERNAME || 'tommi',
        password: process.env.PASSWORD || '123'
    },

    sessionSecret: "YUYFDISYFSIUOFYERTEWRTEWTWETRNNNMNJHKHFASDdyfiudayDAYIUSDFYASIOFOOASIUDFYEREAHLSKJFE57894502354354HJKAFDDFS"
};

module.exports = config;