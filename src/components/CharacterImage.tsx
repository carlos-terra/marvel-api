import styled from '@emotion/styled';

interface Props {
  src: string;
  width?: string;
}

const ImageContainer = styled.div<{ width: string }>`
  width: ${props => props.width};
`;

const SquareImage = styled.div<{ src: string }>`
  width: 100%;
  padding-bottom: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-image: url(${props => props.src});
`;

const CharacterImage = ({ src, width = '100%' }: Props) => {
  return (
    <ImageContainer width={width}>
      <SquareImage src={src} />
    </ImageContainer>
  );
};

export default CharacterImage;
