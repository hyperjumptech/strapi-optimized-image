# Strapi Optimized Image

Retrieve optimized image from [Strapi](https://strapi.io/).

## Quick Start

### Install

```sh
npm i --save-exact @hyperjumptech/strapi-optimized-image
```

### Usage

```typescript
import {
  PreferredSize,
  strapiOptimizedImage,
} from "@hyperjumptech/strapi-optimized-image";

const formats = {
  thumbnail: {
    height: 180,
    url: "https://example.com/logo_thumbnail.svg",
    width: 320,
  },
  small: {
    height: 225,
    url: "https://example.com/logo_small.svg",
    width: 400,
  },
  large: {
    height: 900,
    url: "https://example.com/logo_large.svg",
    width: 1600,
  },
};
const { height, src, width } = strapiOptimizedImage({
  image: {
    formats,
    height: 720,
    url: "https://example.com/logo.svg",
    width: 1280,
  },
  fallback: "smaller",
  preferredSize: PreferredSize.Medium,
});

console.log({ height, src, width });
// { height: 225, src: "https://example.com/logo_small.svg", width: 400 }
```

| Props         | Default Value | Description                                                                                                                       | Example                                                          |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| image         | `undefined`   | The image object structure from the Strapi API response                                                                           | `{ formats, height: 100, url: "/uploads/logo.svg", width: 100 }` |
| fallback      | "original"    | Uses the original size of the image if set to `"original"`. Tries to find a smaller image if set to `"smaller"`.                  | `"original" / "smaller"`                                         |
| preferredSize | "large"       | Attempts to use the preferred size. If unavailable, it will use the original or a smaller image, depending on the fallback value. | `"thumbnail" / "small" / "medium" / "large"`                     |

## License

The MIT License.
