module.exports = {
    friendlyName: "Create User",
    description: "Creates a new user.",
    inputs: {
        data: {
            type: {},
            example: {
                first_name: "",
                last_name: "",
                email: "",
                date_of_birth: null,
                gender: "",
                address: {},
                department: "",
                report_to: "",
                active: ""
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
                    name: "First Name",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.last_name,
                    name: "Last Name",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.email,
                    name: "Email",
                    maxLength: 200,
                    required: true
                }, {
                    type: simpleValidator.constants.type.number,
                    value: inputs.data.date_of_birth,
                    name: "Date of Birth",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.gender,
                    name: "Gender",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.object,
                    value: inputs.data.address,
                    name: "Address",
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
                    name: "Report To",
                    maxLength: 200,
                    required: false
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.active,
                    name: "Active",
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
            sails.log.debug("create-user.js : e");
            sails.log.debug(e);
            error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

            return exits.jsonError(error);
        }
    }
};