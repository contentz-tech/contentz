# Contentz
Write MDX, get highly optimized HTML.

* Write MDX
* Preloaded linked pages 
* Automatic lazy load images
* Code Highlight
* Generate RSS and Sitemap
* Use Frontmatter to add metadata 
* Use React client side to improve UX
* Automatic Dark Mode
* Good looking design 
* Themable
* Get automatically created list of posts
* Get automatic homepage
* Automatic Social Image
* Offline First
* PWA
* Incremental build when possible using Git

## How does it work?
Create an articles folder and put your .mdx files there. Run `contentz build`, you will get a public folder with the code of your blog automatically generated for you.

### Pages
You could also create a pages folder to put static pages (E.g. about, services, etc.).

### Custom Layouts
If you want to customize it create a _layouts folder with all your layouts, you could then use them in your posts with the layout property in the frontmatter of your articles. The layouts “article” and “page” are the default for those kind of content.

### Social Images
At build time an open graph will be generated, in case an article or page define its usen OG it will avoid generating one for such content.

The layout is customizable with the `_social-image` layout name.

