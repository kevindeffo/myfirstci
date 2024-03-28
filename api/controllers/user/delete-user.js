module.exports = {
    friendlyName: "Delete User",
    description: "Delete a specific User",
    inputs: {
        data: {
            type: {},
            example: {
                id: "12345"
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
            isEmptyObject = require("is-empty-object");

        try {
            if (inputs && inputs.data && !isEmptyObject(inputs.data)) {
                await sails.helpers.database.user.deleteUser(inputs.data);

                return exits.success({});
            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (e) {
            sails.log.debug("delete-user.js : e"); 
            sails.log.debug(e);
            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));

            return exits.jsonError(error);
        }
    }
};