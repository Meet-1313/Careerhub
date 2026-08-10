import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function FilterBar({ filters, setFilters }) {
    return (
        <div className='flex flex-wrap gap-4 my-8'>
            <Select value={filters.location} onValueChange={(value) => 
                setFilters({ ...filters, location: value })
            }>
                <SelectTrigger className="w-52">
                    <SelectValue placeholder="Location" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.jobType} onValueChange={(value) => 
                setFilters({ ...filters, jobType: value })
            }>
                <SelectTrigger className="w-52">
                    <SelectValue placeholder="Job Type" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="Full-Time">Full Time</SelectItem>
                    <SelectItem value="Part-Time">Part Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.experience} onValueChange={(value) =>
               setFilters ({ ...filters, experience: value })
            }>
                <SelectTrigger className="w-52">
                    <SelectValue placeholder="Experience" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="1">1+ Years</SelectItem>
                    <SelectItem value="2">2+ Years</SelectItem>
                    <SelectItem value="3">3+ Years</SelectItem>
                    <SelectItem value="5">5+ Years</SelectItem>
                </SelectContent>
            </Select>

            <Select value={filters.sort} onValueChange={(value) =>
                setFilters({ ...filters, sort: value })
            }>
                <SelectTrigger className="w-52">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="salary_desc">Salary High → Low</SelectItem>
                    <SelectItem value="salary_asc">Salary Low → High</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default FilterBar;