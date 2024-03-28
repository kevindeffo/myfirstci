module.exports = {
    friendlyName: "Create user",
    description: "Helper to create a new user",
    inputs: {
        params: {
            type: "ref",
            required: true
        }
    },
    fn: async function(inputs, exits) {
        let userAdded = await User.create(inputs.params).fetch();
        return exits.success(userAdded);
    }
};