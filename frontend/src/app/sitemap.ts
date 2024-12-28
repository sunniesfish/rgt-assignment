import { MetadataRoute } from "next";
import { bookService } from "@/services/book";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rgt-pi.vercel.app/";

  try {
    const books = await bookService.getBooks({ page: 1, limit: 100 });

    if (!books?.data || books.data.length === 0) {
      console.log("책 데이터가 없습니다.");
      return [
        {
          url: `${baseUrl}/books/list`,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 1,
        },
      ];
    }

    const bookUrls = books.data.map((book) => ({
      url: `${baseUrl}/books/detail/${book.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [
      {
        url: `${baseUrl}/books/list`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      ...bookUrls,
    ];
  } catch (error) {
    console.error("사이트맵 생성 중 오류 발생:", error);
    return [
      {
        url: `${baseUrl}/books/list`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
