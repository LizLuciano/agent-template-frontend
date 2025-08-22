interface TitleProps {
  label: string
}

const Title = ({ label }: TitleProps) => {
  return <h1 className="text-2xl font-bold">{label}</h1>
}

export default Title