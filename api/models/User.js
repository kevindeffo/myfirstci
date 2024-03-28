/**
 * User.js
 * User Model
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
            isIn: ['male', 'female'],
            required: false
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
            defaultsTo: 'yes',
            isIn: ['yes', 'no']
        }
    },
    constants: {
        gender: {
            male: 'Male',
            female: 'Female'
        },
        active: {
            yes: 'Yes',
            no: 'No'
        }
    }
};