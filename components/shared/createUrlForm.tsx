"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleCheck, CircleX, ClipboardCopy } from "lucide-react";
import toast from "react-hot-toast";

type urlDefinition = {
  originalUrl: string;
  alias: string;
};

const formSchema = z.object({
  originalUrl: z.string().url(),
  alias: z.string().min(5).max(50),
});

const CreateUrlForm = () => {
  const [urlObj, setUrlObj] = useState<urlDefinition | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      alias: "",
    },
  });

  const copyUrl = () => {
    if (urlObj) {
      navigator.clipboard.writeText(
        `https://eleganturl.deno.dev/${urlObj.alias}`
      );
    }
    toast.success("URL copied to clipboard.");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://eleganturl.deno.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const resData = await response.json();
      console.log(resData);
      const urlData = resData.data as urlDefinition;
      setUrlObj({
        originalUrl: urlData.originalUrl,
        alias: urlData.alias,
      });
      if (resData.success === true) {
        setIsSuccess(1);
      } else {
        setIsSuccess(2);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 lg:w-[600px] w-[90vw] space-x-2"
        >
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem className="col-span-4 h-28">
                <FormLabel>Original URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Paste the long URL here..."
                    type="text"
                    {...field}
                    className="text-sm lg:text-lg lg:h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="font-poppins text-[10px] lg:text-lg font-medium self-center mb-9 lg:mb-0">
            eleganturl.me/
          </p>
          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem className="col-span-3 lg:col-span-2 h-36 lg:h-28">
                <FormLabel>Short URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Customize your URL here..."
                    type="text"
                    {...field}
                    className="text-sm lg:text-lg lg:h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-md h-12 self-center col-span-4 lg:col-span-1"
            disabled={isSubmitting}
          >
            Shorten!
          </Button>
        </form>
      </Form>

      <div className="flex flex-col h-24 font-poppins lg:mt-0 mt-8">
        {isSuccess === 1 && (
          <div>
            <div className="flex justify-center items-center gap-x-2">
              <CircleCheck width={25} height={25} color="green" />
              <p>Your URL is ready!</p>
            </div>
            <div className="mt-5 flex justify-center items-center gap-x-2 font-medium border-2 rounded-md p-2">
              <p>https://eleganturl.deno.dev/{urlObj?.alias}</p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyUrl()}
              >
                <ClipboardCopy />
              </Button>
            </div>
          </div>
        )}
        {isSuccess === 2 && (
          <div className="flex justify-center items-center gap-x-2">
            <CircleX width={25} height={25} color="red" />
            <p>
              Sorry, but this short URL already exists. Please try another one
              🙏
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateUrlForm;
