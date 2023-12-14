<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { IconInfoCircle , IconVideo , IconEdit } from "@tabler/icons-vue";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  })
);
import { Switch } from "@/components/ui/switch";
const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  toast({
    title: "You submitted the following values:",
  });
});
</script>

<template>
  <section class="padding-x padding-t">
    <div class="max-container max-w-6xl mx-auto">
      <div class="flex">
        <div class="w-1/2 pe-10">
          <div class="mb-6">
            <h3 class="text-3xl font-semibold">Preview</h3>
          </div>
          <div>
            <Card>
              <div class="px-10 mt-5 ">
                <div class="">
                  <img
                    class="w-[100px] m-auto"
                    src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
                    alt=""
                  />
                  <div class="text-center">
                    <h2 class="text-3xl font-semibold text-gray-600">
                      Header goes here...
                    </h2>
                    <p class="mt-4 text-gray-500">
                      Your custom message goes here...
                    </p>
                  </div>
                </div>
                <div class="mt-7">
                  <h5 class="mb-4 ms-[-12px]">QUESTIONS</h5>
                  <ul class="list-disc">
                    <li v-for="i in 3" class="text-sm text-gray-600 mb-2">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </li>
                  </ul>
                </div>
                <div>
                  <Button 
                class="mt-7 rounded-sm bg-violet-500 w-full hover:bg-violet-600"
                type="submit"
              >
              <IconVideo  class="" :size="16" />
              <span class="ms-2"> Record a video</span>
              </Button>
              <Button
                class="mt-5 rounded-sm mb-10 bg-gray-700 w-full "
                type="submit"
              >
              <IconEdit  class="" :size="16" />
              <span class="ms-2"> Send in text</span>
              </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div>
          <div class="mb-6 text-center">
            <h3 class="text-3xl font-semibold">Create a new Space</h3>
            <p class="mt-3 text-gray-500">
              After the Space is created, it will generate a dedicated page for
              collecting testimonials.
            </p>
          </div>
          <div>
            <form class="space-y-6" @submit="onSubmit">
              <FormField v-slot="{ componentField }" name="space_name">
                <FormItem v-auto-animate>
                  <FormLabel class="text-gray-600 font-light"
                    >Space name <span class="text-red-600">*</span></FormLabel
                  >
                  <FormControl>
                    <Input
                      class="focus-visible:border-none focus-visible:ring-2 focus-visible:ring-violet-500 ocus-visible:ring-offset-0 placeholder:font-light"
                      type="text"
                      placeholder="Would you like to give a shoutout for xyx?"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription class="text-xs">
                    Public URL is: testimonial.to/your-space
                  </FormDescription>
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="space_name">
                <FormItem v-auto-animate class="flex items-center">
                  <FormLabel class="text-gray-600 font-light mt-2"
                    >Space logo <span class="text-red-600">*</span></FormLabel
                  >
                  <FormControl class="ms-4 me-2">
                    <Checkbox class="" id="terms" />
                  </FormControl>
                  <FormLabel class="text-gray-600 font-light"
                    >square?</FormLabel
                  >
                </FormItem>
              </FormField>
              <div class="flex">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/radix-vue.png"
                    alt="@radix-vue"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div class="ms-3">
                  <Input id="picture" type="file" />
                </div>
              </div>

              <FormField v-slot="{ componentField }" name="header_title">
                <FormItem v-auto-animate>
                  <FormLabel class="text-gray-600 font-light"
                    >Header title <span class="text-red-600">*</span></FormLabel
                  >
                  <FormControl>
                    <Input
                      class="focus-visible:border-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-0 placeholder:font-light"
                      type="text"
                      placeholder="Would you like to give a shoutout for xyx?"
                      v-bind="componentField"
                    />
                  </FormControl>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="header_title">
                <FormItem v-auto-animate>
                  <FormLabel class="text-gray-600 font-light"
                    >Your custom message
                    <span class="text-red-600">*</span></FormLabel
                  >
                  <FormControl>
                    <Textarea
                      class="focus-visible:border-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-0 placeholder:font-light"
                      type="text"
                      placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
                      v-bind="componentField"
                    />
                  </FormControl>
                </FormItem>
              </FormField>

              <div class="grid grid-cols-3">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel class="text-gray-600 font-light"
                      >Collect extra information
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <IconInfoCircle color="gray" class="" :size="13" />
                          </TooltipTrigger>
                          <TooltipContent class="max-w-xs">
                            <p>
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing elit. Quasi magni necessitatibus
                              excepturi porro! Doloremque, libero!
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>

                    <Select v-bind="componentField">
                      <FormControl>
                        <SelectTrigger
                          class="focus-visible:border-none focus-visible:ring-1 focus-visible:ring-gray-500 focus-visible:ring-offset-0 placeholder:font-light"
                        >
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="m@example.com">
                            Text and Video
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            Text Only
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            Video Only
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                </FormField>
                <div class="ms-10">
                  <FormField v-slot="{ value, handleChange }" name="theme">
                    <FormItem>
                      <FormLabel class="text-gray-600 font-light mb-0"
                        >Collect star ratings</FormLabel
                      >
                      <FormControl>
                        <Switch
                          :checked="value"
                          @update:checked="handleChange"
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </div>

                <FormField v-slot="{ value, handleChange }" name="star">
                  <FormItem>
                    <FormLabel class="text-gray-600 font-light"
                      >Choose a theme</FormLabel
                    >

                    <FormControl>
                      <Switch :checked="value" @update:checked="handleChange" />
                    </FormControl>
                  </FormItem>
                </FormField>
              </div>

              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel class="text-gray-600 font-light"
                    >Language
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconInfoCircle color="gray" class="" :size="13" />
                        </TooltipTrigger>
                        <TooltipContent class="max-w-xs">
                          <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Quasi magni necessitatibus excepturi porro!
                            Doloremque, libero!
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>

                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger
                        class="focus-visible:border-none focus-visible:ring-1 focus-visible:ring-gray-500 focus-visible:ring-offset-0 placeholder:font-light"
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="m@example.com">
                          Text and Video
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          Text Only
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          Video Only
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              </FormField>
              <Button
                class="bg-violet-500 rounded-none w-full hover:bg-violet-600"
                type="submit"
              >
                Create New Space
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
