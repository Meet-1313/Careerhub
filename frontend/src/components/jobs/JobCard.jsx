import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Building2,
  IndianRupee,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 mb-6">
      <CardContent className="p-6 sm:p-6  space-y-5">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold leading-tigh">
            {job.title || "Check the database"}
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>{job.company.name}</span>
          </div>
        </div>
        {/* Job Info */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location || "check the database"}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {job.jobType || "check the database"}
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            {(job.salary / 100000).toFixed(1)} LPA
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {job.experience}+ Years
          </div>
        </div>
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge>Node.js</Badge>
          <Badge>MongoDB</Badge>
        </div>
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {job?.description || "check the database"}
        </p>
        {/* Footer */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <span className="text-sm text-muted-foreground">
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <Link to={`/${job._id}`}>
            <Button >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default JobCard;