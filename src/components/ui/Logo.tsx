interface LogoProps {
  color?: "primary" | "white";
}

const Logo = ({ color = "primary" }: LogoProps) => {
  const textColor = color === "white" ? "text-white" : "text-primary-600";

  return (
    <div className="flex items-center">
      <span className={`${textColor} font-serif text-xl font-bold  `}>
        GAC-Bethel Center
      </span>
    </div>
  );
};

export default Logo;
