import matter from 'gray-matter'
import slugify from 'slugify'
import readingTime from 'reading-time'

const getPosts = (context) => {
    const keys = context.keys()
    const values = keys.map(context)


    const dateTimeFormat = new Intl.DateTimeFormat("en-GB", { day: '2-digit', month: 'long', year: 'numeric' })

    const data = keys.map((key, index) => {
        let strippedFileName = key
            .replace(/^.*[\\\/]/, '')
            .slice(0, -3)
        let slug = `/blog/${slugify(strippedFileName)}`
        const value = values[index]
        const postData = matter(value.default)

        return {
            title: postData.data.title,
            date: dateTimeFormat.format(postData.data.date),
            markdownBody: postData.content,
            readingTime: readingTime(postData.content).text,
            featured: postData.data.featured || false,
            tags: postData.data.tags || null,
            slug,
        }
    }).reverse()
    return data
}

export default getPosts
