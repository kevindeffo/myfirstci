module.exports = {
    friendlyName: "Create User",
    description: "Controller to create User",
    inputs: {
        data: {
            type: {},
            example: {
                first_name: "",
                last_name: "",
                email: "",
                date_of_birth: 0,
                gender: "",
                address: {},
                department: "",
                report_to: "",
                active: "yes"
            }
        },
        auth: {
            type: {},
            example: {
                app_token: ""
            }
        }
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function(inputs, exits) {
        let error = [],
            insertParams = {},
            simpleValidator = require("@suyashsumaroo/simple-validator"),
            validationElements = [],
            addedResponse = "";

        try {
            if (inputs.data) {
                validationElements = [{
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.first_name,
                    name: "first_name",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.last_name,
                    name: "last_name",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.email,
                    name: "email",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.number,
                    value: inputs.data.date_of_birth,
                    name: "date_of_birth",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.gender,
                    name: "gender",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.json,
                    value: inputs.data.address,
                    name: "address",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.json,
                    value: inputs.data.department,
                    name: "department",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.json,
                    value: inputs.data.report_to,
                    name: "report_to",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.active,
                    name: "active",
                    maxLength: 200,
                    required: false
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    return exits.jsonError(error);
                } else {
                    insertParams = {
                        first_name: inputs.data.first_name,
                        last_name: inputs.data.last_name,
                        email: inputs.data.email,
                        date_of_birth: inputs.data.date_of_birth,
                        gender: inputs.data.gender,
                        address: inputs.data.address,
                        department: inputs.data.department,
                        report_to: inputs.data.report_to,
                        active: inputs.data.active
                    };

                    addedResponse = await sails.helpers.database.user.createUser(insertParams);

                    return exits.success({
                        data: addedResponse
                    });
                }
            }
        } catch (e) {
            sails.log.debug("create-user.js : e"); //debug
            sails.log.debug(e); //debug
            error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

            return exits.jsonError(error);
        }
    }
};