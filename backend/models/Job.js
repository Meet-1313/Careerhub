import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },

    jobType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
        required: true,
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{
    timestamps: true,
})

const Job = mongoose.model("Job", jobSchema);

export default Job;