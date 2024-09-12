module.exports = {
    friendlyName: "Create user",
    description: "Create a new user",
    inputs: {
        data: {
            type: {},
            example: {
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                date_of_birth: 688234800000,
                gender: "male",
                address: "{line_1: 'Street Name', line_2: 'City', line_3: 'Country'}",
                department: "1234",
                report_to: "2345",
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
                    name: "First name",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.last_name,
                    name: "Last name",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.email,
                    value: inputs.data.email,
                    name: "Email",
                    required: true
                }, {
                    type: simpleValidator.constants.type.number,
                    value: inputs.data.date_of_birth,
                    name: "Date of birth",
                    maxLength: 13,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.gender,
                    name: "Gender",
                    maxLength: 6,
                    required: false
                }, {
                    type: simpleValidator.constants.type.json,
                    value: inputs.data.address,
                    name: "Address",
                    maxLength: 500,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.department,
                    name: "Department",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.report_to,
                    name: "Report to",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.active,
                    name: "Active",
                    maxLength: 3,
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
            sails.log.debug("create-user.js : e");
            sails.log.debug(e);
            error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

            return exits.jsonError(error);
        }
    }
};