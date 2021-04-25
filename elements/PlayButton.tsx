import styled from "styled-components";

type PlayButtonProps = {
  isActive: boolean;
};

function PlayButton({ isActive }: PlayButtonProps) {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 65">
      <path
        d="M63.5-5.9h-95a5,5,0,0,0-5,5v55a5,5,0,0,0,5,5h95a5,5,0,0,0,5-5V-.9A5,5,0,0,0,63.5-5.9ZM4.36,41V12.16L31.64,26.6Z"
        transform="translate(36.5 5.9)"
        fill={isActive ? "#00adef" : "#0c1216"}
        opacity="0.9"
      />
      <polygon
        points="40.86 46.94 68.14 32.5 40.86 18.06 40.86 46.94"
        fill="#fff"
        opacity="0.9"
      />
    </SVG>
  );
}

export default PlayButton;

const SVG = styled.svg`
  z-index: 20;
  width: 80px;
  transform: translateY(-10%);
`;
