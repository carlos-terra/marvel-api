import styled from '@emotion/styled';

interface Props {
  src: string;
  name: string;
  minWidth?: string;
}

const Item = styled('img')<{
  width?: string;
  minWidth?: string;
}>(({ width = 'auto', minWidth = 'auto' }) => ({
  borderRadius: 12,
  display: 'block',
  width: width,
  minWidth: minWidth,
}));

const Thumbnail = ({ src, name, minWidth }: Props) => {
  return (
    <div>
      <Item src={src} alt={name} loading="lazy" minWidth={minWidth} />
    </div>
  );
};

export default Thumbnail;
