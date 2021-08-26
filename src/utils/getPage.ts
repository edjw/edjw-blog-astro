import matter from 'gray-matter'
import markdownToHtml from './md2HTML'

const getPage = async (page) => {

    const pageData = matter(page)

    const data = {
        title: pageData.data.title,
        socialDescription: pageData.data.socialDescription,
        markdownBody: await markdownToHtml(pageData.content)
    }

    return {
        data
    }
}

export default getPage
