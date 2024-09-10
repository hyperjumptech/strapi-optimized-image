type StrapiImage = {
  height: number;
  url: string;
  width: number;
};

type StrapiImageFormats = {
  thumbnail?: StrapiImage;
  small?: StrapiImage;
  medium?: StrapiImage;
  large?: StrapiImage;
};

export enum PreferredSize {
  Thumbnail = "thumbnail",
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type GetOptimizedImageParameters = {
  image: { formats: StrapiImageFormats } & StrapiImage;
  fallback?: "original" | "smaller";
  preferredSize?: PreferredSize;
};

type OptimizedImage = {
  src: string;
} & Omit<StrapiImage, "url">;

export function strapiOptimizedImage({
  image: { formats, height, url: src, width },
  fallback = "original",
  preferredSize = PreferredSize.Large,
}: GetOptimizedImageParameters): OptimizedImage {
  if (!formats?.[preferredSize]) {
    if (fallback === "original") {
      return { height, src, width };
    }

    const image = smallerImage(formats, preferredSize);

    if (!image) {
      return { height, src, width };
    }

    return image;
  }

  return {
    height: formats[preferredSize].height,
    src: formats[preferredSize].url,
    width: formats[preferredSize].width,
  };
}

function smallerImage(
  formats: StrapiImageFormats,
  preferredSize: PreferredSize,
): OptimizedImage | undefined {
  const preferredSizes = Object.values(PreferredSize);
  const end = preferredSizes.indexOf(preferredSize);
  for (const ps of preferredSizes.slice(0, end)) {
    if (formats[ps]) {
      const { height, url: src, width } = formats[ps];

      return { height, src, width };
    }
  }

  return undefined;
}
