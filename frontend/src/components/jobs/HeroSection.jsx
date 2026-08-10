import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function HeroSection({ search, setSearch }) {
    return (
        <section className='text-center py-10 sm:py-12 space-y-6 px-4'>
            <div className='space-y-3'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
                    Find Your Dream Job
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
                    Discover opportunities from top companies around the world.
                </p>
            </div>
            <div className="max-w-2xl mx-auto relative px-2 sm:px-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                    placeholder="Search by title, company or keyword..."
                    className="pl-12 h-11 sm:h-12 text-base sm:text-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </section>
    );
}

export default HeroSection;
