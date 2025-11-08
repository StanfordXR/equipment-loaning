export default function PeriodNotFound({ periodID }: { periodID: string }) {
    return (
        <div className='flex items-center justify-center w-full h-full text-muted-foreground'>
            <div className='text-center'>
                <div>Period not found.</div>
                <div>Period id: <span className='font-mono'>{periodID}</span></div>
            </div>
        </div>
    );
}