import { MoonStars, Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";

export function Header() {
  return (
  <HeaderContainer>
    <MoonStars size={32} color="#00875F" weight="fill" />
    <nav>
      <NavLink to="/" title="Timer">
        <Timer size={24} />
      </NavLink>
      <NavLink to="/history" title="Histórico">
        <Scroll size={24}/>
      </NavLink>
    </nav>
  </HeaderContainer>
  )
}
