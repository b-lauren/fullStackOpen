import React from 'react'

export const Person = ({person}) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}
