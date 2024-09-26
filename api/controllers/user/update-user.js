module.exports = {
    friendlyName: "Update user data",
    description: "Controller to update the user model in the application",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    id: "123456789"
                },
                update_params: {
                    first_name: "John",
                    last_name: "Doe",
                    email: "john@example.com",
                    date_of_birth: 946728000000,
                    gender: "male",
                    address: {
                        line_1: "123 Main St",
                        line_2: "Apt 4B",
                        line_3: "New York, NY 10001"

                    },
                    department: "123456789",
                    report_to: "12345678910",
                    active: "yes"
                 },
            }
            update_params: {}
        }
    },
    auth: {
        type: {},
        example: {
            app_token: ""
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
            updateResponse = null;

        try {
            if (inputs.data && inputs.data.search_criteria && inputs.data.update_params) {
                updateResponse = await sails.helpers.database.user.updateUser(inputs.data.search_criteria, inputs.data.update_params);

                return exits.success({
                    data: updateResponse
                });
            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (e) {
            sails.log.debug("update-user.js : e");
            sails.log.debug(e);
            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));

            return exits.jsonError(error);
        }
    }
};