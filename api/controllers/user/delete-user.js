module.exports = {
    friendlyName: 'Delete user',
    description: 'Delete a user by ID.',
    inputs: {
        id: {
            type: 'string',
            required: true
        }
    },
    exits: {
        notFound: {
            description: 'No user with the specified ID was found in the database.',
            responseType: 'notFound'
        },
        success: {
            responseType: 'success'
        }
    },
    fn: async function (inputs, exits) {
        await User.destroy({ id: inputs.id });
    }
};