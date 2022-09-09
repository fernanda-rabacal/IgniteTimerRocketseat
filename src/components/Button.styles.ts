import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonVariants = {
  primary: 'purple',
  secondary: 'turquoise',
  danger: 'darkred',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 5px;
  border: none;
  border-radius: 4px;

  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['green-500']};

  /* ${(props) =>
    css`
      background-color: ${ButtonVariants[props.variant]};
    `} */
`
