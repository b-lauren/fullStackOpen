import React from 'react'
import { Part } from './Part'

export const Content = (props) => {
  return (
    <>
        <Part part1={props.part1} exercises1={props.exercises1}/>
        <Part part2={props.part2} exercises2={props.exercises2}/>
        <Part part3={props.part3} exercises3={props.exercises3}/> 
    </>
  )
}
