module.exports = {
    friendlyName: 'Delete user',
    description: 'Delete a user by ID.',
    inputs: {
        delete_criteria: {
            type: 'ref',
            required: true
        }
    },
    fn: async function(inputs, exits) {
        await User.destroy(inputs.delete_criteria);
        return exits.success();
    }
};