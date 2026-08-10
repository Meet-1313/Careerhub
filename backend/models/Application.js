import mongoose from 'mongoose';

const applicationScehma = new mongoose.Schema({
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    status:{
        type: String,
        enum: ['Pending','Accepted','Rejected'],
        default: 'Pending'
    },
},
{
    timestamps: true
});

const Application = mongoose.model('Application', applicationScehma);

export default Application;