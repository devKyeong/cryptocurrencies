import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { isDarkAtom } from "../atoms";

interface HeaderProps {
  title: string;
}
function Header({ title }: HeaderProps) {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <Container>
      <Title>{title}</Title>
      <BrightButton
        onClick={() => setIsDark((current) => !current)}
        className="material-symbols-outlined"
        $isDark={isDark}
      >
        {isDark ? "light_mode" : "dark_mode"}
      </BrightButton>
    </Container>
  );
}

const Container = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 48px;
  color: ${({ theme: { colors } }) => colors.accent};
`;

const BrightButton = styled.button<{ $isDark: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 10px;
  position: fixed;
  bottom: 250px;
  left: 20px;

  border-radius: 100%;
  background-color: ${({ theme: { colors } }) => colors.box};
  color: ${({ theme: { colors } }) => colors.text};
  font-size: 40px;
  border: none;
`;

export default Header;
