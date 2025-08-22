"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Title from "./Title"
import { Toaster, toast } from "sonner"

const FormSchema = z.object({
  agent_name: z.string().min(2, {
    message: "Agent Name must be at least 2 characters.",
  }),
  api_url: z.string().min(2, {
    message: "API URL must be at least 50 characters.",
  }),
  api_token: z.string().min(2, {
    message: "API Token must be at least 50 characters.",
  }),
  primary_color: z.string().min(2, {
    message: "Primary Color must be at least 6 characters.",
  }).regex(/^#([0-9a-fA-F]{6})$/, {
    message: "Primary Color must be a valid hex color.",
  })
})

export function ConfigForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agent_name: "",
      api_url: "",
      api_token: "",
      primary_color: "",
    },
  })

  // Load localStorage data on client side only
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem("config")
      if (savedConfig) {
        const config = JSON.parse(savedConfig)
        form.reset(config)
      }
    } catch (error) {
      console.error("Error loading config from localStorage:", error)
    }
  }, [form])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    localStorage.setItem("config", JSON.stringify(data))
  }
  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-20 w-2/3 max-w-md min-w-md space-y-6">
        <Title label="Configure the environment variables" />
        <FormField
          control={form.control}
          name="agent_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="Assistant" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the agent you want to use.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="api_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API URL</FormLabel>
              <FormControl>
                <Input placeholder="https://api.example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the URL of the API you want to use.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="api_token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Token</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormDescription>
                This is the token you need to use to authenticate with the API.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="primary_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Color</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input placeholder="#000000" {...field} />
                  <div className="w-8 h-8 bg-primary rounded-md" style={{ backgroundColor: field.value }} />
                </div>
              </FormControl>
              <FormDescription>
                This is the primary color you want to use for the application.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full cursor-pointer" type="submit">Save</Button>
      </form>
    </Form>
  )
}