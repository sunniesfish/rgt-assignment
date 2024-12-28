"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBookQuery, useBooksMutations } from "@/hooks/book.hook";
import { UpdateBookDto } from "@/types/book.type";

export default function AdminBookEditPage() {
  const router = useRouter();
  const { bookId } = useParams();
  const { data: book } = useBookQuery(bookId as string);
  const { updateBook } = useBooksMutations();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UpdateBookDto>({
    defaultValues: {
      id: bookId as string,
      title: book?.title,
      author: book?.author,
      publishedDate: book?.publishedDate,
      description: book?.description,
      coverImage: book?.coverImage,
      metadata: {
        stockQuantity: book?.metadata.stockQuantity,
        price: book?.metadata.price,
      },
    },
  });

  const onSubmit = async (data: UpdateBookDto) => {
    try {
      await updateBook.mutateAsync({ id: bookId as string, data });
      router.push(`/admin/books/detail/${bookId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Image
              src={"/images/no-image.png"}
              alt={book?.title ?? ""}
              width={400}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
            <Button type="button" className="mt-4 w-full">
              Change Image - 미구현
            </Button>
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                {...register("title", { required: "제목을 입력해주세요" })}
                aria-invalid={errors.title ? "true" : "false"}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <Input
                id="author"
                {...register("author", { required: "저자를 입력해주세요" })}
                aria-invalid={errors.author ? "true" : "false"}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="publishDate"
                className="block text-sm font-medium text-gray-700"
              >
                Publish Date
              </label>
              <Input
                id="publishDate"
                type="date"
                {...register("publishedDate", {
                  required: "출판일을 입력해주세요",
                })}
                aria-invalid={errors.publishedDate ? "true" : "false"}
              />
              {errors.publishedDate && (
                <p className="text-red-500 text-sm">
                  {errors.publishedDate.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                {...register("description", {})}
                rows={6}
                aria-invalid={errors.description ? "true" : "false"}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("metadata.price", {
                  required: "가격을 입력해주세요",
                })}
                aria-invalid={errors.metadata?.price ? "true" : "false"}
              />
              {errors.metadata?.price && (
                <p className="text-red-500 text-sm">
                  {errors.metadata.price.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentValue = Number(
                      watch("metadata.stockQuantity") || 0
                    );
                    setValue(
                      "metadata.stockQuantity",
                      Math.max(0, currentValue - 1)
                    );
                  }}
                >
                  -
                </Button>
                <Input
                  id="stock"
                  type="number"
                  className="w-20 text-center"
                  {...register("metadata.stockQuantity", {
                    required: "재고 수량을 입력해주세요",
                    min: { value: 0, message: "재고는 0 이상이어야 합니다" },
                  })}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentValue = Number(
                      watch("metadata.stockQuantity") || 0
                    );
                    setValue("metadata.stockQuantity", currentValue + 1);
                  }}
                >
                  +
                </Button>
              </div>
              {errors.metadata?.stockQuantity && (
                <p className="text-red-500 text-sm">
                  {errors.metadata.stockQuantity.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </>
  );
}
