# Contentz

![license](https://badgen.net/github/license/sergiodxa/contentz)
![releases](https://badgen.net/github/releases/sergiodxa/contentz)
![npm version](https://badgen.net/npm/v/contentz)
![dependencies](https://badgen.net/david/dep/sergiodxa/contentz)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Create Content, Get a Highly Optimized Website

<a href="https://www.patreon.com/sergiodxa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

- Use **MDX** to write articles and pages
- Support **Incremental Build**
- **Offline First**
- Use **Frontmatter** to define metadata for your articles and pages
- **Prefetch** every internal link used in your content
- Get an archive page with linked and prefetched articles
- Get a homepage with links to social networks
- Good Looking **Responsive Design**
- Automatic **Dark Mode** (in Safari)
- Apply **CSS in MDX** using the `css` prop and the `css` template tag
- **Internationalization**
- Generate **social images** (Open Graph) in a single command
- Automatically generate **table of contents**

## Install it

Install it using npm or yarn with a simple command

```bash
yarn add contentz
# npm install contentz
```

## Use it

After you have installed Contentz you could use it with a simple command.

```bash
contentz build
```

That will read your files and generate your website for you.

## Create configuration

Create a configuration file called `config.yml`

```yml
---
title: Sergio Xalambrí
description: Senior Software Engineer and Technical Writer
domain: https://sergiodxa.com
language: en
repository: https://github.com/sergiodxa/personal-site/
email: hello@sergiodxa.com
patreon: sergiodxa
analytics: UA-XXXXXXXXX-2
social:
  twitter: sergiodxa
  github: sergiodxa
  npm: sergiodxa
  linkedin: sergiodxa
  dev: sergiodxa
  meetup: 182915204
navigation:
  - name: About
    path: /about
  - name: Services
    path: /services
```

### Table of options

| Option      | Description                                                                         | Required                                   |
| ----------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| title       | The title of the website, used in the `<title>` and in the homepage                 | No (default: `Just another Contentz site`) |
| description | The description of the website, used in the `<meta>` and in the homepage            | No (default: empty description)            |
| domain      | The domain you are going to use to host the website, used in the RSS feed           | Yes                                        |
| language    | The main language of the website, used as fallback for articles and pages           | No (default: en)                           |
| repository  | The GitHub repository hosting the website, used in the footer of articles and pages | No (default: hide link to edit)            |
| email       | Your email address, used on the Email icon in the homepage                          | No (default: hide icon)                    |
| patreon     | Your Patreon username, used in the homepage and the footer                          | No (default: hiden patreon message)        |
| analytics   | Your Analytics UA                                                                   | No (default: hide analytics)               |
| social      | A list of your social networks, used to link them in the homepage                   | No (default: hide social icons)            |
| navigation  | A list of pages to link in the header                                               | No (default: don't add extra links)        |
| sw          | Set it as `false` if you want to disable SW generation                              | No (default: true)                         |
| incremental | Set it as `false` if you want to disable incremental build                          | No (default: true)                         |
| icon        | Set the path of the favicon of the website                                          | No (default: `/static/favicon.png`)        |

#### Possible social networks

- [Twitter](https://twitter.com/)
- [GitHub](https://github.com/)
- [npm](https://twitter.com/)
- [LinkedIn](https://www.linkedin.com/)
- [Dev](https://dev.to/)
- [Meetup](https://www.meetup.com/)

For other Social Networks send a PR with a new [icon](https://github.com/sergiodxa/contentz/tree/master/src/components/icons) and add a way to [format the URL](https://github.com/sergiodxa/contentz/blob/master/src/components/home.js#L8-L27) for that icon.

## Start Writing

Create a folder `/articles` and put your `.mdx` files there, here's an example post.

```markdown
---
title: My super cool article
description: This is the description of the article
date: 2018-01-01T00:00:00.000Z
published: true
---

This is my content, here I could use markdown or import a component and render it.
```

Now run `contentz` and it will create a `/public` directory with your homepage, archive page and article. You could access your archive at `/articles/` and each article as `/articles/:article/`, in the example you may see it at `/articles/my-super-cool-article`.

## Custom Pages

For custom pages create a `/pages` folder and put your `.mdx` files there, here's an example page.

```markdown
---
title: About me
---

Hi! I'm an example page.
```

Now run `contentz` and it will create a `/public` directory with your homepage and pages. Each page will be put at the base level of `public`, that mean your `/pages/about.mdx` could be accessed as `/about/` in your browser and not `/pages/about`.

## Link Sharing

In case you want to have a page to share interesting links you could create a `link.yml` file at the root of your project. Then run `contentz` and it will automatically generate a `/link/` page for you with a list of all your links. Each link should have `url`, `title`, `comment` and `date` key. Example file:

```yml
---
- url: https://sergiodxa.com/
  title: Sergio Xalambrí
  comment: The website of the creator of Contentz
  date: 2019-01-28T19:44:10.945Z
- url: https://sergiodxa.dev/
  title: sergiodxa.dev
  comment: The alias of the website of the creator of Contentz
  date: 2019-01-28T19:44:10.945Z
```

## Error Page

Contentz will automatically generate an error page on `/404.html`, when deploying you could redirect not found pages to `/404.html`.

If you deploy to Netlify it will pick up that file automatically.

## Service Worker and Offline Mode

Contentz generate a SW automatically for you, this SW will cache every request to your own website (using `location.origin`). It will not cache request to another domain.

This behavior could be disabled adding `sw: false` to your `config.yml` file. Adding this will also delete de `sw.js` and `load-sw.js` to avoid cached access to the and create the `unload-sw.js` file.

## RSS Feed

Contentz will generate a valid RSS Atom feed automatically with your list of articles, it will be placed in `/atom.xml` and a `<meta>` tag will be automatically added for you in each page to make it discoverable.

## Static Files

If you want to link to static files like images, videos, etc. create a `/static` folder and put all your files there. When running `content` they will be automatically copied to `/public/static`

## Style in MDX

In case you want to add an HTML tag with custom styles directly in your MDX content you could use the [`css` prop]9https://emotion.sh/docs/css-prop) and the [`css` template tag](https://emotion.sh/docs/css-prop#string-styles) of [Emotion](https://emotion.sh/).

Example:

```js
<div css={{ color: "red" }}>This is red</div>
<div css={css`color: blue`}>This is blue</div>
```

## Incremental Build

Contentz will detect what files changed and only update the related files. This mean if you add a new link only `/link/` will be regenerated, but if you change an article the article pages, the list of articles and the RSS feed will be regenerated.

In the case you update the configuration or you update Contentz version all pages will be regenerated.

If you want to opt-out of this feature set `incremental: false` in your `config.yml`. This will automatically invalidate previous caches and always generate all pages.

## Social Image

Contentz could also automatically generate social images (aka Open Graph) for you to use in your articles and pages. To use it run the command:

```bash
contentz social [path]
```

Where `[path]` is the file to use to generate the social image. It could also be more than one file adding an space between them.

```bash
contentz social [path1] [path2]
```

A path could be a path for an article, a post or one of the auto generated pages.

- home
- archive/articles
- links
- error

If you want to generate them initially run

```bash
contentz social home articles links error
```

After generating the social images you will see a folder `/static/_social` with your images, pages will be placed in `/static/_social/pages` and articles in `/static/_social/article`, special pages will be at the root of `_social`.

## Internationalization

Contentz support i18n out of the box for the fixed texts of the website, text like the Patreon support or edit on GitHub. To change the main language of your website set the key `language` or the key `lang` (language is prefered) to the language code.

Supported languages are `es` for Spanish and `en` for English (default to English in case of invalid language code).

If your language is not supported [add a JSON with the messages](https://github.com/sergiodxa/contentz/tree/master/src/messages) and [load it in the i18n lib](https://github.com/sergiodxa/contentz/blob/master/src/lib/i18n.js). Then send a PR to add it.
