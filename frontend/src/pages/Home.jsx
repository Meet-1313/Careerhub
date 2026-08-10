import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/services/jobService";
import { useEffect, useState } from "react";
import JobList from "@/components/jobs/JobList";
import HeroSection from "@/components/jobs/HeroSection";
import FilterBar from "@/components/jobs/FilterBar";
import Loading from '@/components/shared/Loading';
import { toast } from "sonner";
import Pagination from "@/components/shared/Pagination";

function Home() {
    const [jobs,setJobs] = useState([]);
    const [search,setSearch] = useState('');
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [filters,setFilters] = useState({
        location:'',
        jobType:'',experience:'',sort:''});
    useEffect(() => {
        const fetchJobs = async () => {
            try{
                console.log(filters);
            const data = await getJobs(search,
                filters.location,filters.jobType,filters.experience,filters.sort,currentPage
            );
            // console.log('serch:',search);
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
        }catch(err){
            console.error(err);
            toast.error(
                err.response?.data?.message || "Failed to fetch jobs. Please try again.",
            )
        }
    }
    fetchJobs();
    },[search,filters,currentPage]); 
    
    useEffect(() => {

    setCurrentPage(1);

}, [search, filters]);

    if (!jobs) {
        return <Loading />;
    }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className='space-y-6'>
        <HeroSection search={search} setSearch={setSearch} />
        <FilterBar filters={filters} setFilters={setFilters} />
        <JobList jobs={jobs} />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}/>
      </div>
    </div>
  );
}

export default Home;