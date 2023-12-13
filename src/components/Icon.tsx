interface IconProps {
  name: string;
}

const Icon = (props: IconProps) => {
  const { name } = props;
  return <span className="material-symbols-outlined">{name}</span>;
};

export default Icon;
