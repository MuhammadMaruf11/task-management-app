import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
}

export default function Button({ children, variant = "primary", ...rest }: Props) {
    const base = "px-4 py-2 rounded font-medium transition";

    const styles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-300 text-gray-900 hover:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return <button className={`${base} ${styles[variant]}`} {...rest}>{children}</button>;
}
