"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormInputs {
  title: string;
  author: string;
}

export function SearchForm({ baseUrl }: { baseUrl: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit } = useForm<SearchFormInputs>({
    defaultValues: {
      title: searchParams.get("title") ?? "",
      author: searchParams.get("author") ?? "",
    },
  });

  const onSubmit = (data: SearchFormInputs) => {
    const params = new URLSearchParams(searchParams.toString());
    if (data.title) params.set("title", data.title);
    if (data.author) params.set("author", data.author);
    params.set("page", "1");
    router.push(`${baseUrl}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Search by title"
        className="flex-grow"
        {...register("title")}
      />
      <Input
        type="text"
        placeholder="Search by author"
        className="flex-grow"
        {...register("author")}
      />
      <Button type="submit">검색</Button>
    </form>
  );
}
