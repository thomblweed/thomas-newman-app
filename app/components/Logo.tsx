type LogoProps = {
  logoText: string;
};

export const Logo = ({ logoText }: LogoProps) => (
  <div className='text-primary text-4xl whitespace-nowrap'>{logoText}</div>
);
