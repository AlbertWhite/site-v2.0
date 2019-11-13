import React from "react"
import styled from "styled-components"

interface INameProps {
  name: string
}

const RedH1 = styled.h1`
  color: red;
`

const Name = (props: INameProps) => {
  return <RedH1>{props.name}</RedH1>
}

export default () => {
  return <Name name="blog page" />
}
