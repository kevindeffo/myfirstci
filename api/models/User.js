/**
 * User.js
 * User
 */

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
            required: false
        },
        gender: {
            type: 'string',
            required: false,
            isIn: ['male', 'female']
        },
        address: {
            type: 'json',
            required: false
        },
        department: {
            model: 'department',
            required: true
        },
        report_to: {
            model: 'user',
            required: false
        },
        active: {
            type: 'string',
            required: false,
            isIn: ['yes', 'no'],
            defaultsTo: 'yes'
        }
    }
};