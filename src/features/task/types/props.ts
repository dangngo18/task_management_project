export interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string; // Tailwind color class, e.g. "bg-blue-500"
    bgColor: string; // Tailwind background color class, e.g. "bg-blue-100"
}