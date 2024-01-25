module.exports = {
    friendlyName: "Update user",
    description: "Controller to update user data.",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    id: "123456789"
                },
                update_params: {
                    first_name: "SomeName",
                    last_name: "SomeLastName",
                    date_of_birth: 123456789,
                    gender: "male",
                    address: {line_1: "aaaaa", line_2: "sssssss", line_3: "ddddd"},
                    department: "Sales",
                    report_to: "SeniorUser","active":"yes"
                }
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
            updateResponse = null;

        try {
            if (inputs.data && inputs.data.search_criteria && inputs.data.update_params) {
                updateResponse = await sails.helpers.database.updateUser(inputs.data.search_criteria, inputs.data.update_params);

                return exits.success({
                    data: updateResponse
                });
            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (e) {
            sails.log.error("update-user.js : e");
            sails.log.error(e);
            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));

            return exits.jsonError(error);
        }
    }
};