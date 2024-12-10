"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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

const formSchema = z.object({
  originalUrl: z.string().url(),
  customUrl: z.string().min(5).max(50),
});

const CreateUrlForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      customUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
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
          name="customUrl"
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
        >
          Shorten!
        </Button>
      </form>
    </Form>
  );
};

export default CreateUrlForm;
