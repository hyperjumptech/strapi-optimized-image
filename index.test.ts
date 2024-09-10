import assert from "node:assert";
import { PreferredSize, strapiOptimizedImage } from ".";

describe("Preferred size enum", () => {
  it("should return thumbnail", () => {
    assert.equal(PreferredSize.Thumbnail, "thumbnail");
  });

  it("should return small", () => {
    assert.equal(PreferredSize.Small, "small");
  });

  it("should return medium", () => {
    assert.equal(PreferredSize.Medium, "medium");
  });

  it("should return large", () => {
    assert.equal(PreferredSize.Large, "large");
  });
});

const originalImage = {
  height: 720,
  url: "https://example.com/logo.svg",
  width: 1280,
};
const thumbnail = {
  height: 180,
  url: "https://example.com/logo_thumbnail.svg",
  width: 320,
};
const small = {
  height: 225,
  url: "https://example.com/logo_small.svg",
  width: 400,
};
const medium = {
  height: 450,
  url: "https://example.com/logo_medium.svg",
  width: 800,
};
const large = {
  height: 900,
  url: "https://example.com/logo_large.svg",
  width: 1600,
};

describe("Strapi Optimized image", () => {
  it("should return original image (default parameters)", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: {},
      },
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: originalImage });
  });

  it("should return original image (fallback to smaller)", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: {},
      },
      fallback: "smaller",
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: originalImage });
  });

  it("should return original image (fallback to smaller & preferred size is large)", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: {},
      },
      fallback: "smaller",
      preferredSize: PreferredSize.Large,
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: originalImage });
  });

  it("should return large image", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: { large, medium, small, thumbnail },
      },
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: large });
  });

  it("should return large image (fallback to smaller)", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: { large, medium, small, thumbnail },
      },
      fallback: "smaller",
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: large });
  });

  it("should return large image (fallback to smaller & preferred size is large)", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: { large, medium, small, thumbnail },
      },
      fallback: "smaller",
      preferredSize: PreferredSize.Large,
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: large });
  });

  it("should return smaller image possible", () => {
    // arrange and act
    const optimizedImage = strapiOptimizedImage({
      image: {
        ...originalImage,
        formats: { thumbnail },
      },
      fallback: "smaller",
    });

    // assert
    assertOptimizedImage({ optimizedImage, expectedImage: thumbnail });
  });
});

type StrapiImage = {
  height: number;
  url: string;
  width: number;
};

type OptimizedImage = {
  src: string;
} & Omit<StrapiImage, "url">;

type AssertOptimizedImageParameters = {
  optimizedImage: OptimizedImage;
  expectedImage: StrapiImage;
};

function assertOptimizedImage({
  optimizedImage,
  expectedImage,
}: AssertOptimizedImageParameters) {
  assert.equal(optimizedImage.height, expectedImage.height);
  assert.equal(optimizedImage.src, expectedImage.url);
  assert.equal(optimizedImage.width, expectedImage.width);
}
