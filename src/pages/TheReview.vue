<script setup lang="ts">
import { ref, onMounted } from "vue";
import toastService from "@/plugins/toast";
import { useRoute, useRouter, RouterView } from "vue-router";

import type { space } from "@/models/types";
import { useSpaceStore } from "@/stores/spaceStore";
import { useReviewStore } from "@/stores/reviewStore";
import { useMediaStore } from "@/stores/mediaStore";
import MediaDevices from "@/sections/MediaDevices.vue";
import VideoRecorder from "@/sections/VideoRecorder.vue";
import ReviewForm from "@/sections/ReviewForm.vue";


import { useForm, Field, Form, ErrorMessage, FieldArray } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFileStore } from "@/stores/fileStore";
import { ZodError, set } from "zod";
const mediaStore = useMediaStore();
const fileStore = useFileStore();
const spaceStore = useSpaceStore();
const reviewStore = useReviewStore();
const playBackVideoElement = ref<HTMLVideoElement | null>(null);
const route = useRoute();
const router = useRouter();

const slug = ref(route.params.slug as string);
const spaceValue = ref<space>();
const rating = ref(5);
const videoUrl = ref<string>('');
const videoBlob = ref<Blob | null >(null)
const selectedFile = ref<File | null>(null);
const selectedAvatar = ref<File | null>(null);

const previewImage = ref("");
const previewAvatar = ref("");
const showRecorderChooser = ref<Boolean>(true);
const showRecorder = ref<Boolean>(false);
const showForm = ref<Boolean>(false);



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
});

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
      review_type: "Text",
      /*    review_collections: [
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
      ], */
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
    if (selectedFile.value) {
      let formData = new FormData();
      formData.append("file", selectedFile.value);
      let fileResponse = await fileStore.uploadFile(formData);
      imageName = fileResponse.fileName;
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

  const handleBlobEvent = (blob: Blob) => {
    if (blob) {
      // videoUrl.value = URL.createObjectURL(blob);
      videoBlob.value = blob;
      showForm.value = true;
      showRecorder.value = false;
    }
  };


  const recordVideo = ()=>{
    showForm.value = false;
    showRecorderChooser.value = false;
    showRecorder.value = true;
  }
  const recordVideoAgain = ()=>{
    showForm.value = false;
    showRecorder.value = false;
    showRecorderChooser.value = true;
  }
</script>

<template>
  <section class="padding-x padding-t">
    <div class="max-container max-w-2xl mx-auto">
      <div class="flex flex-col justify-center items-center">
        <div>
          <img
            v-if="spaceValue?.space_setting[0]?.logo"
            class="w-[100px] rounded-full"
            :src="
              'https://testimoniallogos.s3.us-east-005.backblazeb2.com/' +
              spaceValue?.space_setting[0]?.logo
            "
            :class="
              spaceValue?.space_setting[0]?.logo_type
                ? 'rounded-md'
                : 'rounded-full'
            "
            alt=""
          />
        </div>
        <div class="text-center mt-5">
          <h3 class="text-5xl mt-3 font-bold text-gray-800">
            {{ spaceValue?.space_setting[0]?.header_title }}
          </h3>
          <p class="mt-3 text-gray-500">
            {{ spaceValue?.space_setting[0]?.message }}
          </p>
        </div>
        <div class="w-full px-4 py-4 text-left mx-auto mt-6">
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
        <div class="mt-20 grid grid-cols-2 gap-x-5">
          <ShadDialog>
            <ShadDialogTrigger>
              <ShadButton class="">
                <IconVideo class="me-2" :size="17" />
                {{ spaceValue?.space_setting[0]?.videobutton_text }}
              </ShadButton>
            </ShadDialogTrigger>
            <ShadDialogContent>
              <ShadDialogHeader>
                <ShadDialogTitle v-if="!showRecorder && !showForm " class="text-center pt-5 pb-2 font-medium">
                  <div>
                    <ShadButton
                      type="button"
                      class="h-10 w-10 p-0 cursor-default rounded-full bg-violet-700"
                    >
                      <IconVideo :size="20" />
                    </ShadButton>
                    <p class="mt-5">Check Your Camera and Microphone</p>
                  </div>
                </ShadDialogTitle>
              
                <ShadDialogDescription v-if="!showRecorder && !showForm"  class="text-center"
                  >You have up to 60 seconds to record your video. Don’t worry:
                  You can review your video before submitting it, and you can
                  re-record if needed.
                </ShadDialogDescription>

                <div class="pt-5 pb-1" v-if="showRecorderChooser">
                    <MediaDevices></MediaDevices>
                </div>
                <div class="pt-5 pb-1" v-if="showRecorder">
                  <VideoRecorder
                    :recordingTimeLimit="7"
                    @emitBlob="handleBlobEvent"
                  ></VideoRecorder>
                </div>
                <div v-if="showForm">
                  {{  showForm}}
                  <ReviewForm :testimonialType="'Video'" :videoBlobUrl="videoBlob"></ReviewForm>
                </div>
                <ShadButton @click="recordVideo" v-if="!showRecorder && !showForm"  type="button" class="w-full">
                  Record My video
                </ShadButton>
                <ShadButton @click="recordVideoAgain" v-if="showForm"  type="seconday" class="w-full">
                  Record Again
                </ShadButton>

                <!-- <div>
                  <div class="">
                    <div class="">
                      <ShadInput id="picture" type="file" />
                    </div>
                  </div>
                </div> -->
              </ShadDialogHeader>
            </ShadDialogContent>
          </ShadDialog>
          <ShadDialog>
            <ShadDialogTrigger>
              <ShadButton class="bg-black hover:bg-gray-700">
                <IconPencil class="me-2" :size="17" />
                {{ spaceValue?.space_setting[0]?.textbutton_text }}
              </ShadButton>
            </ShadDialogTrigger>
            <ReviewForm :testimonialType="'Text'" :videoBlobUrl="null" ></ReviewForm>
          </ShadDialog>
        </div>
        <div class="mt-5">
          <p class="text-gray-500">
            Or leave a review on
            <a
              :href="spaceValue?.space_setting[0]?.contest_link"
              target="_blank"
              class="underline"
            >
              G2
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
