export function getDaysAgo(createdAt) {
    const createdDate = new Date(createdAt);
    const today = new Date();

    const difference = today.getTime() - createdDate.getTime();

    const days = Math.floor(difference / (1000 * 3600 * 24));

    if (days === 0) {
        return "Today";
    }
    
    if (days === 1) {
        return "1 day ago";
    }

    return `${days} days ago`;
}