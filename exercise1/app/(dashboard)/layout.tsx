import React from 'react'

function Notification({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <div>layout</div>
      {children}
    </div>
  )
}

export default Notification