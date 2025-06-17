interface GoatLogoProps {
  title: string;
}

export const GoatLogo = ({ title }: GoatLogoProps) => {
  return (
    <div className="text-[26px]">
      <strong>goat</strong> <span className="font-light">{title}</span>
    </div>
  );
};
