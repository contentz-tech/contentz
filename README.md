# Contentz

![license](https://badgen.net/github/license/sergiodxa/contentz)
![releases](https://badgen.net/github/releases/sergiodxa/contentz)
![npm version](https://badgen.net/npm/v/contentz)
![dependencies](https://badgen.net/david/dep/sergiodxa/contentz)

Write MDX, get highly optimized HTML.

<a href="https://www.patreon.com/sergiodxa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

- Use MDX to write your content
- Use Frontmatter to define metadata for your content
- Prefetch every internal link used in your content
- Get an archive page with linked and prefetched articles
- Get a homepage with links to social networks
- Automatic Dark Mode in Safari (more browsers coming!)
- Good looking design

## Install it

Install it using npm or yarn with a simple command

```bash
yarn add contentz
# npm install contentz
```

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

| Option      | Description                                                                         | Required                            |
| ----------- | ----------------------------------------------------------------------------------- | ----------------------------------- |
| title       | The title of the website, used in the `<title>` and in the homepage                 | Yes                                 |
| description | The description of the website, used in the `<meta>` and in the homepage            | Yes                                 |
| domain      | The domain you are going to use to host the website, used in the RSS feed           | Yes                                 |
| language    | The main language of the website, used as fallback for articles and pages           | No (default: en)                    |
| repository  | The GitHub repository hosting the website, used in the footer of articles and pages | No (default: hide link to edit)     |
| email       | Your email address, used on the Email icon in the homepage                          | No (default: hide icon)             |
| patreon     | Your Patreon username, used in the homepage and the footer                          | No (default: hiden patreon message) |
| social      | A list of your social networks, used to link them in the homepage                   | No (default: hide social icons)     |
| navigation  | A list of pages to link in the header                                               | No (default: don't add extra links) |
| sw          | Set it as `false` if you want to disable SW generation                              | No (default: true)                  |

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
