export default function getUserRankLabel(rank: number) {
    // Expects rank >= 1
    switch (rank) {
        case 1:
            return '1st';
        case 2:
            return '2nd';
        case 3:
            return '3rd';
        default:
            return `${rank}th`;
    }
}