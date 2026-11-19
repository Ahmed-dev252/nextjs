import React from 'react'


interface BlogPageProps {
    params: {
        slug: string[]
    }
}

const blogPage = ({ params }: BlogPageProps) => {
  return (

    <div>blog page for {params.slug.join('/')}</div>
  )
}

export default blogPage;