const { model, Schema} = require('mongoose');

let counting = new schema ({
    Guild: String,
    Channel: String,
    Number: Number,
    LastUser: String,
})

GPUShaderModule.exports = model('counting', counting);
