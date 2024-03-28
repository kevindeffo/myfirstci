module.exports = {
    friendlyName: "Retrieve user data",
    description: "Helper to fetch list of users from the User model based on search criteria",
    inputs: {
        search_criteria: {
            type: 'ref',
            required: true
        },
        sort_criteria: {
            type: 'ref',
            required: false
        },
        limit: {
            type: 'number',
            required: false
        },
        skip: {
            type: 'number',
            required: false
        },
        populate: {
            type: 'ref',
            required: false
        }
    },

    fn: async function(inputs, exits) {
        let promise = User.find(inputs.search_criteria),
            userList = [];

        if (inputs.sort_criteria) {
            promise.sort(inputs.sort_criteria);
        }

        if (inputs.limit) {
            promise.limit(inputs.limit);
        }

        if (inputs.skip) {
            promise.skip(inputs.skip);
        }

        if (inputs.populate) {
            if (inputs.populate.department) {
                promise.populate('department');
            }

            if (inputs.populate.report_to) {
                promise.populate('report_to');
            }
        }

        userList = await promise.then();

        return exits.success(userList);
    }
}