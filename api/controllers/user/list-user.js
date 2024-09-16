module.exports = {
    friendlyName: "Get details of a specific user",
    description: "Reads and returns the details of a specific user from the database",
    inputs: {
        data: {
            type: {},
            example: {
                data: {
                    search_criteria: {
                        email: "user@example.com"
                    },
                    pagination: {
                        rows_per_page: 50,
                        page_number: 1
                    },
                    sort: {
                        createdAt: 1
                    },
                    populate: {
                        type: "ref",
                    }
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
            searchCriteria = {},
            dataList = [],
            limit = 0,
            skip = 0,
            sort = null,
            populate = null;

        try {
            if (inputs && inputs.data) {
                if (inputs.data.search_criteria) {
                    searchCriteria = inputs.data.search_criteria;
                }

                if (inputs.data.pagination) {
                    if (inputs.data.pagination.rows_per_page) {
                        limit = inputs.data.pagination.rows_per_page;
                    }

                    if (inputs.data.pagination.page_number) {
                        skip = (inputs.data.pagination.page_number - 1) * inputs.data.pagination.rows_per_page;
                    }
                }

                if (inputs.data.sort) {
                    sort = await sails.helpers.database.getWaterlineSortFormat(inputs.data.sort);
                }

                if (inputs.data.populate) {
                    populate = inputs.data.populate;
                }

                dataList = await sails.helpers.database.user.listUser(searchCriteria, sort, limit, skip, populate);

                return exits.success({
                    data: dataList
                });
            } else {
                error.push(await sails.helpers.utility.error.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (e) {
            sails.log.debug("list-user.js : e"); 
            sails.log.debug(e); 
            error.push(await sails.helpers.utility.error.getAppError("general.unknown_error"));

            return exits.jsonError(error);
        }
    }
};