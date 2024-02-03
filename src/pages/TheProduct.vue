<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useForm, Field, Form, ErrorMessage, FieldArray } from "vee-validate";
import toastService from "@/plugins/toast";
import { useRoute, useRouter, RouterView } from "vue-router";
import { useSpaceStore } from "@/stores/spaceStore";
import { useTagStore } from "@/stores/tagStore";

import type { space } from "@/models/types";
import { useReviewStore } from "@/stores/reviewStore";
import { IconTrash } from "@tabler/icons-vue";
const reviewStore = useReviewStore();
const spaceStore = useSpaceStore();
const tagStore = useTagStore();
const route = useRoute();
const router = useRouter();
const spaceValue = ref<space>();
const reviewValue = ref();
const userData = ref();
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const slug = ref(route.params.slug as string);

const tagName = ref("");
const loading = ref(false);

const formSchema = toTypedSchema(
  z.object({
    tags: z.array(
      z.object({
        name: z.string(),
        is_hide: z.boolean(),
      })
    ),
  })
);
type Tag = {
  tag_no : number,
  tag_name: string;
  hide: boolean;
};

let tags = ref<Tag[]>([]);

const {
  values: tagValue,
  setValues,
  handleSubmit,
} = useForm({
  validationSchema: formSchema,
});

const addtag = async () => {
  const existTag = tags.value.find(x=>x.tag_name == tagName.value);
  if(existTag){
    toastService.default('🥹 Tag already exists')
    return;
  }
  loading.value = true;
  let tag = {
    tag_name: tagName.value, 
    hide: false,
    status: 'Active',
  };
  let response = await tagStore.createTag(tag);
  tagName.value = '';
  fetchTags();
  loading.value = false;
};

const updateHide = async (tag_no : number ,tag_name : string ,  hide : boolean , status : string )  => {
  let tag = {
    tag_no,
    tag_name,
    hide : !hide,
    status
  };
  let response = await tagStore.createTag(tag);
  tagName.value = '';
  fetchTags();
};



const updateTag = async (tag_no : number , tag_name : string ,  hide : boolean , status : string )  => {
  let tag = {
    tag_no,
    tag_name,
    hide,
    status
  };
  let response = await tagStore.createTag(tag);
  tagName.value = '';
  fetchTags();
};


onMounted(() => {
  userData.value = JSON.parse(localStorage.getItem("userData") as string);
  fetchSpaces();
  fetchTags();
});
const fetchSpaces = async () => {
  try {
    let response = await spaceStore.fetchSpaceBySlug(slug.value);
    if (response) {
      spaceValue.value = response.data;
      fetchReviews();
    }
  } catch (error: any) {
    toastService.default(error.message);
  }
};

const fetchTags = async () => {
  try {
    let response = await tagStore.fetchTagByUserId();
    if (response) {
      tags.value = response.data.sort((a : Tag, b : Tag)  => a.tag_no - b.tag_no);
    }
  } catch (error: any) {
    toastService.default(error.message);
  }
};

const fetchReviews = async () => {
  if (spaceValue?.value?.id) {
    try {
      let response = await reviewStore.fetchReviewBySpaceId(
        spaceValue?.value?.id
      );
      if (response) {
        reviewValue.value = response.data;
      }
    } catch (error: any) {
      toastService.default(error.message);
    }
  }
};
</script>

<template>
  <section>
    <div class="bg-gray-100">
      <div class="max-container py-5">
        <div class="">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div class="border border-gray-300 rounded">
                <img
                  class="h-16"
                  :src="
                    'https://testimoniallogos.s3.us-east-005.backblazeb2.com/' +
                    spaceValue?.space_setting[0]?.logo
                  "
                  :class="
                    spaceValue?.space_setting[0]?.logo
                      ? 'rounded-md'
                      : 'rounded-full'
                  "
                  alt=""
                />
              </div>
              <div class="ms-5">
                <h3 class="text-3xl font-bold">{{ spaceValue?.space_name }}</h3>
                <p class="text-sm mt-1 text-gray-600">
                  Space public URL:
                  <a
                    :href="
                      'https://testimonial.to/review/' +
                      spaceValue?.space_setting[0].url
                    "
                  >
                    https://testimonial.to/review/{{
                      spaceValue?.space_setting[0].url
                    }}
                  </a>
                </p>
              </div>
            </div>
            <div class="flex">
              <div class="flex">
                <IconVideo class="mt-1" :size="20" />
                <div class="ms-3">
                  <p class="text-sm">Video credits</p>
                  <p class="text-sm mt-2 ms-1">2</p>
                </div>
              </div>
              <div class="flex ms-10">
                <IconMessage2 class="mt-1" :size="20" />
                <div class="ms-3">
                  <p class="text-sm">Text credits</p>
                  <p class="text-sm mt-2 ms-1">10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-container py-5 mt-10">
      <div class="grid grid-cols-4">
        <div class="col-span-1">
          <div>
            <div class="mb-3">
              <h5 class="uppercase text-gray-500 font-semibold text-md">
                Inbox
              </h5>
            </div>
            <ul>
              <li
                class="p-2 bg-blue-50 hover:bg-blue-50 rounded flex items-center"
              >
                <span>
                  <IconPointFilled
                    class="text-gray-500 me-2"
                    :size="15"
                  ></IconPointFilled
                ></span>
                All
              </li>
              <li class="p-2 hover:bg-blue-50 rounded flex items-center">
                <span>
                  <IconPointFilled
                    class="text-pink-500 me-2"
                    :size="15"
                  ></IconPointFilled
                ></span>
                Video
              </li>
              <li class="p-2 hover:bg-blue-50 rounded flex items-center">
                <span>
                  <IconPointFilled
                    class="text-cyan-500 me-2"
                    :size="15"
                  ></IconPointFilled
                ></span>
                Text
              </li>
              <li class="p-2 hover:bg-blue-50 rounded flex items-center">
                <span>
                  <IconPointFilled
                    class="text-gray-500 me-2"
                    :size="15"
                  ></IconPointFilled
                ></span>
                Archived
              </li>
              <li class="p-2 hover:bg-blue-50 rounded flex items-center">
                <span>
                  <IconPointFilled
                    class="text-orange-500 me-2"
                    :size="15"
                  ></IconPointFilled
                ></span>
                Liked
              </li>
            </ul>
          </div>
          <div class="mt-5">
            <div class="mb-3">
              <h5 class="uppercase text-gray-500 font-semibold text-md">
                Space Settings
              </h5>
            </div>
            <ul>
              <li class="p-2 hover:bg-blue-50 rounded flex items-center">
                <span>
                  <IconTag class="text-cyan-500 me-2" :size="15"></IconTag
                ></span>
                <ShadDialog>
                  <ShadDialogTrigger class="w-full text-left">
                    Manage Tags</ShadDialogTrigger
                  >
                  <ShadDialogContent>
                    <ShadDialogHeader>
                      <ShadDialogTitle> Manage Tags</ShadDialogTitle>
                      <ShadDialogDescription>
                        You can create up to 5 tags
                      </ShadDialogDescription>
                    </ShadDialogHeader>

                    <div class="flex" v-if="tags?.length < 5">
                      <div class="w-full me-3">
                        <ShadInput
                          class="input"
                          autocomplete="off"
                          type="text"
                          v-model="tagName"
                        />
                      </div>
                      <div>
                        <ShadButton @click="addtag">
                          <span v-if="loading" class="flex items-center">
                            <IconLoader2 class="w-4 h-4 mr-2 animate-spin" />
                            Saving
                          </span>
                          <span v-else="loading">Create</span>
                        </ShadButton>
                      </div>
                    </div>
                    <div>
                      <ShadTable v-if="tags?.length">
                        <ShadTableHeader>
                          <ShadTableRow>
                            <ShadTableHead class="w-[300px]">
                              Name
                            </ShadTableHead>
                            <ShadTableHead>Hide</ShadTableHead>
                            <ShadTableHead>Delete</ShadTableHead>
                          </ShadTableRow>
                        </ShadTableHeader>
                        <ShadTableBody>
                          <ShadTableRow v-for="(tag, i) in tags">
                            <ShadTableCell class="font-medium">
                                 {{ tag.tag_name }} 
                            </ShadTableCell>
                            <ShadTableCell>
                              <div> 
                                <ShadSwitch  :checked="tag.hide"   @click="updateHide(tag.tag_no , tag.tag_name ,  tag.hide, 'Active')" />
                              </div>
                            </ShadTableCell>
                            <ShadTableCell>
                              <ShadButton
                                variant="secondary"
                               @click="updateTag(tag.tag_no ,tag.tag_name ,  tag.hide, 'Inactive')"
                              >
                                <IconTrash :size="15"></IconTrash>
                              </ShadButton>
                            </ShadTableCell>
                          </ShadTableRow>
                        </ShadTableBody>
                      </ShadTable>
                    </div>
                  </ShadDialogContent>
                </ShadDialog>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-span-3">
          <div class="px-40">
            <div
              class="hover:bg-violet-50 rounded-md p-5 mb-10"
              v-for="review in reviewValue"
            >
              <div class="mb-5">
                <span
                  class="px-5 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-600 text-left"
                  >{{ review.review_info[0].review_type }}</span
                >
              </div>
              <div class="mb-5">
                <StarRating
                  :star-size="25"
                  :rating="review.review_info[0].rating"
                  :show-rating="false"
                ></StarRating>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-5">
                  {{ review.review_info[0].review_text }}
                </p>
              </div>
              <div v-if="review?.review_info[0].image" class="mb-5">
                <img
                  class="h-40"
                  :src="
                    'https://testimoniallogos.s3.us-east-005.backblazeb2.com/' +
                    review?.review_info[0]?.image
                  "
                  alt=""
                />
              </div>
              <div
                class=""
                v-if="review?.review_info[0].review_type == 'Video'"
              >
                <video
                  controls
                  :src="
                    'https://testimoniallogos.s3.us-east-005.backblazeb2.com/' +
                    review?.review_info[0]?.video
                  "
                  height="500"
                  class="w-full"
                ></video>
              </div>
              <div class="flex justify-between mt-5">
                <div class="flex flex-col">
                  <div class="mb-4">
                    <h6
                      class="text-gray-500 font-medium dark:text-gray-300 capitalize"
                    >
                      Name
                    </h6>
                    <div class="flex items-center">
                      <ShadAvatar>
                        <ShadAvatarImage
                          :src="
                            'https://testimoniallogos.s3.us-east-005.backblazeb2.com/' +
                            review?.review_info[0]?.reviewer_image
                          "
                          alt="logo"
                        />
                      </ShadAvatar>
                      <p class="ms-3 text-gray-600 dark:text-gray-200 text-sm">
                        {{
                          review?.review_info[0]?.review_collections[0]
                            ?.text_value
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="mb-4">
                    <h6
                      class="text-gray-500 font-medium dark:text-gray-300 capitalize"
                    >
                      Email
                    </h6>
                    <p class="f text-gray-600 dark:text-gray-200 text-sm">
                      {{
                        review?.review_info[0]?.review_collections[1]
                          ?.text_value
                      }}
                    </p>
                  </div>
                </div>
                <div class="flex flex-col me-10">
                  <div class="mb-5">
                    <h6
                      class="text-gray-500 font-medium dark:text-gray-300 capitalize"
                    >
                      Title
                    </h6>
                    <p class="f text-gray-600 dark:text-gray-200 text-sm">
                      {{
                        review?.review_info[0]?.review_collections[2]
                          ?.text_value
                      }}
                    </p>
                  </div>
                  <div class="mb-5">
                    <h6
                      class="text-gray-500 font-medium dark:text-gray-300 capitalize"
                    >
                      Social Link
                    </h6>
                    <p class="f text-gray-600 dark:text-gray-200 text-sm">
                      {{
                        review?.review_info[0]?.review_collections[3]
                          ?.text_value
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
