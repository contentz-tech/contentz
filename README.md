# Contentz

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

## Start writing

Create a folder `/articles` and put your `.mdx` files there, here's an example post

```mdx
---
title: My super cool article
description: This is the description of the article
date: 2018-01-01T00:00:00.000Z
published: true
---

This is my content, here I could use markdown or import a component and render it.
```

Now run `contentz` and it will create a `/public` directory with your homepage, archive page and article.
