interface ReportButtonProps {
    onClick: () => void;
    isOpen: boolean;
}

const ReportButton = ({ onClick, isOpen }: ReportButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center font-bold text-white transition-all duration-300 z-40 ${isOpen ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700 animate-bounce'
            }`}
        >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H5.75C4.232 1.5 3 2.732 3 4.25v11.5C3 17.268 4.232 18.5 5.75 18.5h8.5c1.518 0 2.75-1.232 2.75-2.75v-11.5c0-1.518-1.232-2.75-2.75-2.75h-1.25V1.5zm0 2h-1v1.5h1v-1.5zm0 4h-1v5h1v-5z" />
            </svg>
        </button>
    );
};

export default ReportButton;
