import Link from "next/link"

const Home = () => {
  return (
    <div>
      <h1>n4ruse&apos;s Wiki.</h1>
      <Link href="/wiki/new-post">記事を書く</Link>
    </div>
  )
}

export default Home
