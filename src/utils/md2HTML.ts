import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import footnotes from 'remark-footnotes'

export default async function markdownToHtml(markdown) {
    const result = await remark()
        .use(html)
        .use(gfm)
        .use(footnotes, { inlineNotes: true })
        .process(markdown)
    return result.toString()
}
