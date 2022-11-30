import { NextSeo } from 'next-seo'

const Page = ({ name, path, children }) => {
    const title = `FeedMeFast - ${name}`
    const url = `https://feedmefast.vercel.app${path}`

    return (
        <>
            <NextSeo 
                title={title}
                canonical={url}
                openGraph={{
                    url,
                    title
                }}
            />
            { children }
        </>
    )
}

export default Page