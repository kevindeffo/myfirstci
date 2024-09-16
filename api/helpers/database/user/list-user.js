module.exports = {
    friendlyName: "Read user data",
    description: "Helper function to read user data based on the given query from the database",
    inputs: {
        search_criteria: {
            type: "ref",
            required: true
        },
        sort_criteria: {
            type: "ref",
            required: false
        },
        limit: {
            type: "number",
            required: false
        },
        skip: {
            type: "number",
            required: false
        },
        populate: {
            type: "ref",
            required: false
        }
    },

    fn: async function(inputs, exits) {
        let promise = User.find(inputs.search_criteria),
            recordList = [];

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
                promise.populate("department");
            }

            if (inputs.populate.report_to) {
                promise.populate("report_to");
            }
        }

        recordList = await promise.then();

        return exits.success(recordList);
    }
};