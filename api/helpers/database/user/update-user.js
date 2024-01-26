module.exports = {
friendlyName:  "Update a user's data in the database",
description: "Helper to execute user data update queries.",
inputs: {
search_criteria: {
type: "json",
required: true
},
update_params: {
type: "json",
required: true
}
},

fn: async function(inputs, exits) {
await User.update(inputs.search_criteria, inputs.update_params);

return exits.success();
}
};