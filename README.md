# ARtomic — GitHub Pages website

A responsive static website for **ARtomic**, featuring the supplied logo, animated dark-blue science theme, Android app download, learning-packet placeholder, and author section.

## Publish on GitHub Pages

1. Create a new **public GitHub repository**, for example `artomic-website`.
2. Upload the **contents of this folder** to the repository's root: `index.html`, `styles.css`, `script.js`, and the `assets` folder.
3. Open the repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose **main** and **/(root)**, then click **Save**.
6. Once deployed, the website will be at `https://YOUR-GITHUB-USERNAME.github.io/artomic-website/` (GitHub will also display the URL in Pages settings).

No hosting service, database, build tool, or API key is needed.

## Add the learning packet link later

Open **index.html** and find two placeholders:

### Hero button

Replace:

```html
<button class="btn btn-secondary" type="button" disabled aria-label="Learning packet download coming soon">
  ...
</button>
```

with an `<a>` using the same classes, e.g.:

```html
<a class="btn btn-secondary" href="YOUR_LEARNING_PACKET_URL" target="_blank" rel="noopener noreferrer">
  Download Learning Packet ↗
</a>
```

### Download section button

Replace:

```html
<button class="item-action unavailable" type="button" disabled>Coming Soon <span aria-hidden="true">⌛</span></button>
```

with:

```html
<a class="item-action active" href="YOUR_LEARNING_PACKET_URL" target="_blank" rel="noopener noreferrer">
  Get the Packet <span aria-hidden="true">↗</span>
</a>
```

Also update the “Available soon” text and the download footnote if needed. Commit your changes, and GitHub Pages will automatically republish the site.

## Customize

- **Project text / author**: edit `index.html`.
- **Android download**: search for `drive.google.com` in `index.html` and replace both occurrences with your new link.
- **Logo**: replace `assets/artomic-logo.png` with an image of the same filename.
- **Colors and animations**: edit the CSS variables at the top of `styles.css`.
- **Floating particle animation**: edit `script.js`. Reduced-motion accessibility preferences are respected.

All paths are **relative**, so the site works both at a GitHub username root and inside a project repository.
