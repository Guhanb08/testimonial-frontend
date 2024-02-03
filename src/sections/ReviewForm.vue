<script setup lang="ts">
import { ref, onMounted , nextTick} from "vue";
import toastService from "@/plugins/toast";
import { useRoute, useRouter, RouterView } from "vue-router";

import type { space } from "@/models/types";
import { useSpaceStore } from "@/stores/spaceStore";
import { useReviewStore } from "@/stores/reviewStore";
import { useMediaStore } from "@/stores/mediaStore";

import { useForm, Field, Form, ErrorMessage, FieldArray } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFileStore } from "@/stores/fileStore";
import { ZodError, set } from "zod";
const fileStore = useFileStore();
const spaceStore = useSpaceStore();
const reviewStore = useReviewStore();
const pbVideoElement = ref<HTMLVideoElement | null>(null);
const route = useRoute();
const router = useRouter();
const videoUrl = ref<string>('');
const props = defineProps<{
  testimonialType: string;
  videoBlobUrl : Blob | null
}>();

const slug = ref(route.params.slug as string);
const spaceValue = ref<space>();
const selectedFile = ref<File | null>(null);
const selectedAvatar = ref<File | null>(null);

const previewImage = ref("");
const previewAvatar = ref("");

const formSchema = toTypedSchema(
  z.object({
    space_name: z.string().optional(),
    space_id: z.number().optional(),
    review_info: z.object({
      review_text: z.string().optional(),
      image: z.string().optional(),
      video: z.string().optional(),
      rating: z.number(),
      reviewer_image: z.string().optional(),
      review_type: z.string().optional(),
      is_agree: z.boolean().optional(),
      review_collections: z.array(
        z.object({
          label: z.string().optional(),
          field_type: z.string().optional(),
          text_value: z.string().optional(),
          checkbox_value: z.boolean().optional(),
          is_required: z.boolean().optional(),
        })
      ),
    }),
  })
);

onMounted(() => {
  fetchSpaces();
  nextTick(() => {
    setVideoUrl();
  });
});
const setVideoUrl = () => {
    if (props.videoBlobUrl && props.testimonialType =='Video') {
      console.log('videoBlobUrl' , props.videoBlobUrl)
       videoUrl.value = URL.createObjectURL(props.videoBlobUrl);
      const video: HTMLVideoElement = pbVideoElement.value as HTMLVideoElement;
      video.src = videoUrl.value;
    }
};

const {
  values: reviewValue,
  setValues,
  validate,
  handleSubmit,
} = useForm({
  validationSchema: formSchema,
  initialValues: {
    space_name: spaceValue?.value?.space_name,
    space_id: spaceValue?.value?.id,
    review_info: {
      rating: 5,
      review_type: props.testimonialType,
    
    },
  },
});

const fetchSpaces = async () => {
  try {
    let response = await spaceStore.fetchSpaceBySlug(slug.value);
    if (response) {
      spaceValue.value = response.data;
      let spaceCollection = response.data.space_setting[0]?.space_collections;
      let reviewCollections = [
        {
          label: "Name",
          field_type: "Text",
          text_value: "",
          checkbox_value: false,
          is_required: true,
        },
        {
          label: "Email",
          field_type: "Text",
          text_value: "",
          checkbox_value: false,
          is_required: true,
        },
        ...spaceCollection.map((collection: any) => ({
          label: collection.label,
          field_type: collection.field_type,
          text_value: "",
          checkbox_value: false,
          is_required: collection.is_required,
        })),
      ];
      setValues({
        space_name: spaceValue?.value?.space_name,
        space_id: spaceValue?.value?.id,
        review_info: {
          review_collections: reviewCollections,
        },
      });
    }
  } catch (error: any) {
    toastService.default(error.message);
  }
};

const setRating = (ratingValue: number) => {
  setValues({
    review_info: {
      rating: ratingValue,
    },
  });
};

const onSubmit = handleSubmit(async (values) => {
  try {
    let imageName = "";
    let videoName = "";

    if(props.testimonialType == 'Text'){
      if (selectedFile.value) {
      let formData = new FormData();
      formData.append("file", selectedFile.value);
      let fileResponse = await fileStore.uploadFile(formData);
      imageName = fileResponse.fileName;
    }
    }
    if(props.testimonialType == 'Video'){
      if (props.videoBlobUrl  ) {
      let formData = new FormData();
      formData.append("file", props.videoBlobUrl);
      let fileResponse = await fileStore.uploadVideo(formData);
      videoName = fileResponse.fileName;
      }
    }

    let avatarName = "";
    if (selectedAvatar.value) {
      let formData = new FormData();
      formData.append("file", selectedAvatar.value);
      let fileResponse = await fileStore.uploadFile(formData);
      avatarName = fileResponse.fileName;
    }

    let reviewPayload = { ...values };
    reviewPayload.review_info.image = imageName;
    reviewPayload.review_info.reviewer_image = avatarName;
    reviewPayload.review_info.video = videoName;
    console.log(reviewPayload);
    let response = await reviewStore.createReview(reviewPayload);
    if (response) {
      toastService.default(`🎉 ${response.message}`);
      router.push("/dashboard");
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      toastService.default(error.errors[0].message);
    } else {
      toastService.default(error.message);
    }
  }
});

const handleImageChange = (event: Event, type: string) => {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];
  if (file && type === "image") {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  } else if (file && type === "avatar") {
    selectedAvatar.value = file;
    previewAvatar.value = URL.createObjectURL(file);
  }
};

const validateAndSubmit = async () => {
  const isValid = await validate();
  if (isValid) {
    onSubmit();
  } else {
    console.log("Form is invalid");
  }
};

const removeImage = (type: string) => {
  if (type === "image") {
    selectedFile.value = null;
    previewImage.value = "";
  } else if (type === "avatar") {
    previewAvatar.value = "";
  }
};

</script>

<template>
  <ShadDialogContent
    class="max-h-screen overflow-y-scroll scrollbar-hide mt-10 py-10 pb-16"
  >
    <ShadDialogHeader>
      <ShadDialogTitle class="text-xl">
        <span v-if="testimonialType == 'Text'">
          Write text testimonial to
        </span>
        <span v-if="testimonialType == 'Video'"> Send video testimonial </span>
      </ShadDialogTitle>
      <ShadDialogDescription> </ShadDialogDescription>
    </ShadDialogHeader>
    <div>
      <div class="mb-5" v-if="testimonialType == 'Text'">
        <img
          class="h-20 rounded-md shadow-md"
          :src="
            'https://testimoniallogos.s3.us-east-005.backblazeb2.com/' +
            spaceValue?.space_setting[0]?.logo
          "
          alt=""
        />
      </div>
      <div class="mb-5 text-left mx-auto" v-if="testimonialType == 'Text'">
        <h3
          class="text-md leading-6 font-semibold text-gray-600 uppercase mb-2"
        >
          questions
        </h3>
        <div class="w-10 mb-2 border-b-2 border-violet-500"></div>
        <ul class="mt-3 list-disc pl-4 text-gray-500 font-light text-sm">
          <li
            v-for="space_question in spaceValue?.space_setting[0]
              ?.space_questions"
          >
            {{ space_question.question }}
          </li>
        </ul>
      </div>
      <div class="mb-5" v-if="testimonialType == 'Video'">
        <video
          autoplay
          controls
          playsinline
          ref="pbVideoElement"
          height="500"
          class="w-full"
        ></video>
      </div>

      <form class="space-y-6" @submit="onSubmit">
        <div>
          <StarRating
            @update:rating="setRating"
            :star-size="25"
            :rating="reviewValue?.review_info?.rating"
            :show-rating="false"
          ></StarRating>
        </div>
        <div v-if="reviewValue?.review_info?.rating">
          <div
            v-if="
              testimonialType == 'Text' || reviewValue?.review_info?.rating < 4
            "
          >
            <ShadFormField
              v-slot="{ componentField }"
              name="review_info.review_text"
            >
              <ShadFormItem v-auto-animate>
                <ShadFormControl>
                  <ShadTextarea
                    class="input"
                    v-bind="componentField"
                    rows="5"
                    maxlength="100"
                    :placeholder="reviewValue?.review_info?.rating < 4 ? 'What did you dislike? How can we make it better?' : ''" 
                  />
                </ShadFormControl>

                <ShadFormDescription class="text-xs text-end">
                  {{ reviewValue.review_info?.review_text?.length || 0 }}/100
                  characters
                </ShadFormDescription>
              </ShadFormItem>
            </ShadFormField>
          </div>
        </div>

        <div v-if="testimonialType == 'Text'">
          <p class="text-sm text-gray-500 font-light">
            Attach an Image (Optional)
          </p>
          <div class="flex items-center mt-3">
            <div v-if="previewImage" class="me-3">
              <img class="rounded-md max-h-32" :src="previewImage" alt="logo" />
            </div>
            <label
              for="oppimage"
              class="px-2 border py-2 rounded-md text-gray-700 text-sm font-light"
              >Choose an Image
              <ShadInput
                id="oppimage"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageChange($event, 'image')"
              />
            </label>
            <div v-if="previewImage" class="ms-auto cursor-pointer p-2">
              <IconTrash
                @click="removeImage('image')"
                class="text-gray-500"
                :size="23"
              />
            </div>
          </div>
        </div>

        <div>
          <FieldArray
            name="review_info.review_collections"
            v-slot="{ fields, push, remove }"
          >
            <div class="mt-3">
              <div v-for="(field, fieldid) in fields" :key="fieldid">
                <div
                  class="relative w-full mb-4"
                  v-if="
                    reviewValue?.review_info?.review_collections?.[fieldid]
                      .field_type == 'Text'
                  "
                >
                  <ShadFormField
                    v-slot="{ componentField }"
                    :id="`collectionlabels_${fieldid}`"
                    :name="`review_info.review_collections[${fieldid}].text_value`"
                  >
                    <ShadFormItem v-auto-animate>
                      <ShadFormLabel class="form-label">
                        {{
                          reviewValue?.review_info?.review_collections?.[
                            fieldid
                          ].label
                        }}

                        <span
                          v-if="
                            reviewValue?.review_info?.review_collections?.[
                              fieldid
                            ].is_required
                          "
                          class="text-red-600"
                          >*</span
                        ></ShadFormLabel
                      >
                      <ShadFormControl>
                        <ShadInput
                          class="input"
                          autocomplete="off"
                          type="text"
                          :required="
                            reviewValue?.review_info?.review_collections?.[
                              fieldid
                            ].is_required
                          "
                          v-bind="componentField"
                        />
                      </ShadFormControl>
                    </ShadFormItem>
                  </ShadFormField>
                </div>
                <div class="mb-4" v-else>
                  <ShadFormField
                    v-slot="{ value, handleChange }"
                    :id="`collectioncheckbox_${fieldid}`"
                    :name="`review_info.review_collections[${fieldid}].checkbox_value`"
                  >
                    <ShadFormItem class="flex items-center">
                      <ShadFormControl class="mt0">
                        <ShadCheckbox
                          :checked="value"
                          @update:checked="handleChange"
                        />
                      </ShadFormControl>
                      <ShadFormLabel class="form-label mt0 ms-3">
                        {{
                          reviewValue?.review_info?.review_collections?.[
                            fieldid
                          ].label
                        }}
                      </ShadFormLabel>
                    </ShadFormItem>
                  </ShadFormField>
                </div>
              </div>
            </div>
          </FieldArray>
        </div>

        <div>
          <p class="text-sm text-gray-500 font-light">Upload Your Photo</p>

          <div class="flex items-center mt-3">
            <ShadAvatar class="me-3">
              <ShadAvatarImage :src="previewAvatar" alt="logo" />
            </ShadAvatar>
            <label
              for="avatart"
              class="px-2 border py-2 rounded-md text-gray-700 text-sm font-light"
              >Choose an Image
              <ShadInput
                id="avatart"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageChange($event, 'avatar')"
              />
            </label>
            <div v-if="previewAvatar" class="ms-auto cursor-pointer p-2">
              <IconTrash
                @click="removeImage('avatar')"
                class="text-gray-500"
                :size="23"
              />
            </div>
          </div>
        </div>

        <div>
          <ShadFormField
            v-slot="{ value, handleChange }"
            name="review_info.is_agree"
          >
            <ShadFormItem v-auto-animate class="flex items-center">
              <ShadFormControl>
                <ShadCheckbox
                  class=" "
                  :checked="value"
                  @update:checked="handleChange"
                />
              </ShadFormControl>
              <ShadFormLabel class="form-label mt0 ms-2">
                <span class="text-sm text-gray-600"
                  >I agree to the
                  <a
                    href="#"
                    class="font-semibold leading-5 text-violet-600 hover:text-violet-500"
                    >terms</a
                  >
                  and give permission to use this testimonial.
                </span>
              </ShadFormLabel>
            </ShadFormItem>
          </ShadFormField>
        </div>
      </form>
    </div>

    <ShadDialogFooter>
      <ShadDialogClose as-child>
        <ShadButton class="bg-gray-400 hover:bg-gray-500"> Cancel </ShadButton>
      </ShadDialogClose>
      <ShadButton @click="validateAndSubmit" class="ms-2 hover:bg-violet-700">
        Send
      </ShadButton>
    </ShadDialogFooter>
  </ShadDialogContent>
</template>

<style scoped></style>
