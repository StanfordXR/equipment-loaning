export default function Attribute({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <div className='text-muted-foreground text-sm font-semibold'>{label}</div>
            <div>{value}</div>
        </div>
    )
}