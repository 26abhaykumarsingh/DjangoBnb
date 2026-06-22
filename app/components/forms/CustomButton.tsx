interface CustomButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const CustomButton = ({ label, onClick, className = "w-full" }: CustomButtonProps) => {
  return (
    <div 
      onClick={onClick}
      className={`py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl transition cursor-pointer ${className}`}
    >
      {label}
    </div>
  );
};

export default CustomButton;