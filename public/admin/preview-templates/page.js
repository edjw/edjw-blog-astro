import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <article class="prose">
          <h2>${entry.getIn(["data", "title"], null)}</h1>

          ${this.props.widgetFor("body")}
        </article>
      </main>
    `;
  }
});

export default Page;
