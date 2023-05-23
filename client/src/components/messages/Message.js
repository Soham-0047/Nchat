import React from 'react'
import './message.css'


const Message = ({user,message,classs}) => {

  if(user){
  return (
    <div className={`messagediv ${classs}`}>

      {`${user}:${message}`}</div>
  )

  }

  else{

    return (
      <div className={`messagediv ${classs}`}>
        
        {`You: ${message}`}</div>
    )
  
  }
 
}

export default Message