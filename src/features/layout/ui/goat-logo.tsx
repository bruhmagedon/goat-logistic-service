interface GoatLogoProps {
  title: string;
}

export const GoatLogo = ({ title }: GoatLogoProps) => {
  return (
    <>
      <strong>goat</strong> <span className="font-light">{title}</span>
    </>
  );
};
