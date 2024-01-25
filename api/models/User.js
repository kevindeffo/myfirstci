module.exports = {
    attributes: {
        first_name: {
            type: 'string',
            required: true
        },
        last_name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        },
        date_of_birth: {
            type: 'number',
        },
        gender: {
            type: 'string',
            isIn: ['male', 'female']
        },
        address: {
            type: 'json'
        },
        department: {
            model: 'department',
            required: true
        },
        report_to: {
            model: 'user'
        },
        active: {
            type: 'string',
            isIn: ['yes', 'no'],
            defaultsTo: 'yes'
        }
    }
}