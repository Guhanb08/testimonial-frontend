<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useForm, Field, Form, ErrorMessage, FieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useSpaceStore } from "@/stores/spaceStore";
import { useFileStore } from "@/stores/fileStore";
import toastService from "@/plugins/toast";
import * as z from "zod";
import { ZodError, set } from "zod";
import router from "@/router";
import { IconArrowDown } from "@tabler/icons-vue";

const spaceStore = useSpaceStore();
const fileStore = useFileStore();
const selectedFile = ref<File | null>(null);
const formSchema = toTypedSchema(
  z.object({
    space_name: z.string(),
    space_setting: z.object({
      logo: z.string().optional(),
      url: z.string().optional(),
      logo_type: z.boolean().optional(),
      header_title: z.string().optional(),
      message: z.string().optional(),
      collection_type: z.string().optional(),
      collect_star: z.boolean().optional(),
      theme: z.boolean().optional(),
      custom_color: z.string().optional(),
      language: z.string().optional(),
      video_duration: z.number().optional(),
      maxtext_length: z.number().optional(),
      videobutton_text: z.string().optional(),
      textbutton_text: z.string().optional(),
      display_contest: z.string().optional(),
      contest_link: z.string().optional(),
      question_label: z.string().optional(),
      apply_watermark: z.boolean().optional(),
      watermark_image: z.string().optional(),
      watermark_position: z.string().optional(),
      testimonial_avatar: z.string().optional(),
      affliated_link: z.string().optional(),
      show_testimonials: z.boolean().optional(),
      thirdparty: z.string().optional(),
      thirdparty_link: z.string().optional(),
      autopopulate_walloflove: z.boolean().optional(),
      disable_videorecord: z.boolean().optional(),
      space_questions: z.array(
        z.object({
          question: z.string(),
        })
      ),
      space_collections: z.array(
        z.object({
          label: z.string().optional(),
          field_type: z.string().optional(),
          is_required: z.boolean().optional(),
          is_enabled: z.boolean().optional(),
        })
      ),
    }),
  })
);

const {
  values: spaceValue,
  setValues,
  handleSubmit,
} = useForm({
  validationSchema: formSchema,
  initialValues: {
    space_setting: {
      logo: "",
      logo_type: true,
      message: "",
      url: "your-space",
      collection_type: "Text and Video",
      videobutton_text: "Record a video",
      textbutton_text: "Send in text",
      collect_star: true,
      theme: false,
      space_questions: [
        {
          question: "Who are you / what are you working on?",
        },
        {
          question: "How has [our product / service] helped you?",
        },
        {
          question: "What is the best thing about [our product / service]",
        },
      ],
      space_collections: [
        {
          label: "Title, company",
          field_type: "Text",
          is_required: false,
          is_enabled: false,
        },
        {
          label: "Social link",
          field_type: "Text",
          is_required: false,
          is_enabled: false,
        },
        {
          label: "Address",
          field_type: "Text",
          is_required: false,
          is_enabled: false,
        },
      ],
    },
  },
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  try {
    let fileName = "";
    if (selectedFile.value) {
      let formData = new FormData();
      formData.append("file", selectedFile.value);
      let fileResponse = await fileStore.uploadFile(formData);
      fileName = fileResponse.fileName;
    }
    let spacePayload = { ...values };
    spacePayload.space_setting.logo = fileName;
    let response = await spaceStore.createSpace(spacePayload);
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
const previewImage = ref("");
const defaultImage = ref(
  "https://testimonial.to/static/media/just-logo.040f4fd2.svg"
);
// const url = ref("testimonial.to/your-space");
const collectionType = ref(["Text and Video", "Text Only", "Video Only"]);
watch(
  () => spaceValue.space_name,
  (newValue, oldValue) => {
    const sanitizedValue = newValue
      ? newValue.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-")
      : "your-space";

    setValues({
      space_setting: {
        url: sanitizedValue.toLowerCase(),
      },
    });
  }
);

const onDrop = (dropResult: any) => {
  const updatedQuestions = applyDrag(
    spaceValue?.space_setting?.space_questions,
    dropResult
  );
  setValues({
    space_setting: {
      space_questions: updatedQuestions,
    },
  });
};

const applyDrag = (arr: any, dragResult: any) => {
  const { removedIndex, addedIndex, payload } = dragResult;

  if (removedIndex === null && addedIndex === null) return arr;
  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }
  console.log(result);

  return result;
};

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];
  if (file) {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};
</script>

<template>
  <section class="padding-x padding-t">
    <div class="max-container max-w-6xl mx-auto">
      <div class="md:grid md:grid-cols-5 md:gap-x-12 md:gap-y-10">
        <div class="md:col-span-2 py-6 md:py-12">
          <div
            class="flex flex-col rounded-lg shadow-lg border border-gray-200 relative"
          >
            <div class="p-8">
              <div class="flex flex-col justify-center items-center">
                <div>
                  <img
                    class="w-[100px] rounded-full"
                    :class="
                      spaceValue?.space_setting?.logo_type
                        ? 'rounded-md'
                        : 'rounded-full'
                    "
                    :src="previewImage ? previewImage : defaultImage"
                    alt=""
                  />
                </div>
                <div class="text-center">
                  <h3 class="text-3xl mt-3 font-semibold text-gray-500">
                    {{
                      spaceValue?.space_setting?.header_title
                        ? spaceValue.space_setting?.header_title
                        : "Header goes here..."
                    }}
                  </h3>
                  <p class="mt-3 text-gray-500">
                    {{
                      spaceValue?.space_setting?.message
                        ? spaceValue.space_setting?.message
                        : "Your custom message goes here..."
                    }}
                  </p>
                </div>
                <div class="w-full px-4 py-4 text-left mx-auto mt-6">
                  <h3
                    class="text-md leading-6 font-semibold text-gray-600 uppercase mb-2"
                  >
                    questions
                  </h3>
                  <div class="w-10 mb-2 border-b-2 border-violet-500"></div>
                  <ul
                    class="mt-3 list-disc pl-4 text-gray-500 font-light text-sm"
                  >
                    <li
                      v-for="space_question in spaceValue?.space_setting
                        ?.space_questions"
                    >
                      {{ space_question.question }}
                    </li>
                  </ul>
                </div>
                <div class="mt-5 w-full">
                  <ShadButton class="w-full">
                    <IconVideo class="me-2" :size="17" />
                    {{ spaceValue?.space_setting?.videobutton_text }}
                  </ShadButton>

                  <ShadButton class="w-full mt-2 bg-black hover:bg-gray-700">
                    <IconPencil class="me-2" :size="17" />
                    {{ spaceValue?.space_setting?.textbutton_text }}
                  </ShadButton>
                </div>
                <div>
                  <div class="absolute top-0 left-0 ml-6 -mt-4">
                    <div
                      class="text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full"
                    >
                      Live preview - Testimonial page
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--    <div class="flex mt-7">
            <button class="w-1/2 hover:bg-gray-50 border rounded-md py-2 me-4 flex justify-center items-center">
              <IconEdit class="text-gray-700" :size="18" />
             <span class="ms-2 text-sm " > Thank  you page</span>
            </button>
            <button class="w-1/2 hover:bg-gray-50 border rounded-md py-2 ms-4 flex justify-center items-center">
              <IconAdjustments class="text-gray-700" :size="18" />
             <span class="ms-2 text-sm " > Extra Settings</span>
            </button>

          </div> -->
        </div>
        <div class="mt-5 md:mt-0 md:col-span-3">
          <div class="mb-6 text-center">
            <h3 class="text-3xl font-semibold">Create a new Space</h3>
            <p class="mt-3 text-gray-500">
              After the Space is created, it will generate a dedicated page for
              collecting testimonials.
            </p>
          </div>
          <div class="px-5">
            <form class="space-y-6" @submit="onSubmit">
              <div>
                <ShadFormField v-slot="{ componentField }" name="space_name">
                  <ShadFormItem v-auto-animate>
                    <ShadFormLabel class="form-label"
                      >Space name
                      <span class="text-red-600">*</span></ShadFormLabel
                    >
                    <ShadFormControl>
                      <ShadInput
                        class="input"
                        autocomplete="off"
                        type="text"
                        v-bind="componentField"
                      />
                    </ShadFormControl>

                    <ShadFormDescription class="text-xs">
                      Public URL is: testimonial.to/{{
                        spaceValue?.space_setting?.url
                      }}
                    </ShadFormDescription>
                  </ShadFormItem>
                </ShadFormField>
              </div>
              <div>
                <ShadFormField
                  v-slot="{ value, handleChange }"
                  name="space_setting.logo_type"
                >
                  <ShadFormItem v-auto-animate class="flex items-center">
                    <ShadFormLabel class="form-label"
                      >Space logo
                      <span class="text-red-600">*</span></ShadFormLabel
                    >
                    <ShadFormControl class="ms-3 mt0">
                      <ShadCheckbox
                        :checked="value"
                        @update:checked="handleChange"
                      />
                    </ShadFormControl>
                    <span class="text-sm text-gray-500 ms-2 mt0">Square?</span>
                  </ShadFormItem>
                </ShadFormField>
              </div>
              <div>
                <div class="flex items-center">
                  <ShadAvatar>
                    <ShadAvatarImage :src="previewImage" alt="logo" />
                  </ShadAvatar>
                  <label
                    for="spacelogo"
                    class="ms-3 border px-2 py-1 shadow rounded-sm text-gray-700 text-sm font-light"
                    >Change
                    <ShadInput
                      id="spacelogo"
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleImageChange"
                    />
                  </label>
                </div>
              </div>
              <div>
                <ShadFormField
                  v-slot="{ componentField }"
                  name="space_setting.header_title"
                >
                  <ShadFormItem v-auto-animate>
                    <ShadFormLabel class="form-label"
                      >Header title
                      <span class="text-red-600">*</span></ShadFormLabel
                    >
                    <ShadFormControl>
                      <ShadInput
                        class="input"
                        autocomplete="off"
                        type="text"
                        placeholder="Would you like to give a shoutout for xyx?"
                        v-bind="componentField"
                      />
                    </ShadFormControl>
                  </ShadFormItem>
                </ShadFormField>
              </div>
              <div>
                <ShadFormField
                  v-slot="{ componentField }"
                  name="space_setting.message"
                >
                  <ShadFormItem v-auto-animate>
                    <ShadFormLabel class="form-label"
                      >Your custom message
                      <span class="text-red-600">*</span></ShadFormLabel
                    >
                    <ShadFormControl>
                      <ShadTextarea
                        class="input"
                        autocomplete="off"
                        type="text"
                        placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
                        v-bind="componentField"
                      />
                    </ShadFormControl>
                  </ShadFormItem>
                </ShadFormField>
              </div>
              <div>
                <div class="mb-2">
                  <span class="form-label text-sm">Questions</span>
                </div>
                <div>
                  <DragContainer
                    @drop="onDrop"
                    drag-handle-selector=".column-drag-handle"
                  >
                    <FieldArray
                      name="space_setting.space_questions"
                      v-slot="{ fields, push, remove }"
                    >
                      <Draggable v-for="(field, idx) in fields" :key="idx">
                        <div class="draggable-item">
                          <div class="flex items-center mb-3">
                            <span class="column-drag-handle">
                              <IconDotsVertical
                                class="text-gray-500"
                                :size="23"
                              />
                            </span>
                            <div class="w-full">
                              <ShadFormField
                                v-slot="{ componentField }"
                                :id="`question_${idx}`"
                                :name="`space_setting.space_questions[${idx}].question`"
                              >
                                <ShadFormItem v-auto-animate>
                                  <ShadFormControl>
                                    <ShadInput
                                      class="input"
                                      autocomplete="off"
                                      type="text"
                                      placeholder="keep it short"
                                      v-bind="componentField"
                                    />
                                  </ShadFormControl>
                                  <!-- <ShadFormMessage /> -->
                                </ShadFormItem>
                              </ShadFormField>
                            </div>
                            <button
                              class="ms-2"
                              type="button"
                              @click="remove(idx)"
                            >
                              <IconTrash
                                v-if="fields.length > 1"
                                class="text-gray-500"
                                :size="23"
                              />
                            </button>
                          </div>
                        </div>
                      </Draggable>
                      <div
                        v-if="fields.length < 5"
                        class="mt-2 cursor-pointer"
                        @click="push({ question: '' })"
                      >
                        <IconCirclePlus
                          class="text-gray-500 inline-block"
                          :size="20"
                        />
                        <span class="text-sm text-gray-600 ms-2"
                          >Add one (up to 5)</span
                        >
                      </div>
                    </FieldArray>
                  </DragContainer>
                </div>
              </div>
              <div>
                <div class="mb-2">
                  <span class="form-label text-sm"
                    >Collect extra information</span
                  >
                </div>
                <div>
                  <ShadPopover>
                    <ShadPopoverTrigger>
                      <ShadButton
                        class="bg-white hover:bg-white text-gray-600 border font-normal flex items-center"
                      >
                        Title, Social Link, etc.
                        <IconChevronDown class="ms-1" :size="18" />
                      </ShadButton>
                    </ShadPopoverTrigger>
                    <ShadPopoverContent :align="'start'" class="w-fit">
                      <div>
                        <div>
                          <FieldArray
                            name="space_setting.space_collections"
                            v-slot="{ fields, push, remove }"
                          >
                            <div
                              v-for="(field, fieldid) in fields"
                              :key="fieldid"
                            >
                              <div
                                class="flex justify-between"
                                v-if="fieldid < 3"
                              >
                                <div class="mb-6">
                                  <ShadFormField
                                    v-slot="{ value, handleChange }"
                                    :id="`collectionenabled_${fieldid}`"
                                    :name="`space_setting.space_collections[${fieldid}].is_enabled`"
                                  >
                                    <ShadFormItem
                                      class="flex justify-center items-center"
                                    >
                                      <ShadFormControl>
                                        <ShadSwitch
                                          :checked="value"
                                          @update:checked="handleChange"
                                        />
                                      </ShadFormControl>
                                      <ShadFormLabel
                                        class="form-label ms-2 mt0"
                                      >
                                        {{
                                          spaceValue?.space_setting
                                            ?.space_collections?.[fieldid].label
                                        }}
                                      </ShadFormLabel>
                                    </ShadFormItem>
                                  </ShadFormField>
                                </div>
                                <div class="mt-1 ms-4">
                                  <ShadFormField
                                    v-slot="{ value, handleChange }"
                                    :id="`collectionRequired_${fieldid}`"
                                    :name="`space_setting.space_collections[${fieldid}].is_required`"
                                  >
                                    <ShadFormItem class="flex items-center">
                                      <ShadFormLabel
                                        class="text-sm cursor-pointer text-gray-700 ms-2 mt0 font-normal"
                                        >Required?
                                      </ShadFormLabel>

                                      <ShadFormControl class="ms-2 mt0">
                                        <ShadCheckbox
                                          :checked="value"
                                          @update:checked="handleChange"
                                        />
                                      </ShadFormControl>
                                    </ShadFormItem>
                                  </ShadFormField>
                                </div>
                              </div>
                            </div>
                          </FieldArray>
                        </div>
                        <h5 class="text-sm font-medium text-gray-700">
                          Create your own fields
                        </h5>
                        <FieldArray
                          name="space_setting.space_collections"
                          v-slot="{ fields, push, remove }"
                        >
                          <div class="mt-3">
                            <div
                              v-for="(field, fieldid) in fields"
                              :key="fieldid"
                            >
                              <div
                                v-if="fieldid > 2"
                                class="flex justify-between items-center mb-4"
                              >
                                <div class="flex">
                                  <div class="relative">
                                    <ShadFormField
                                      v-slot="{ componentField }"
                                      :id="`collectionlabels_${fieldid}`"
                                      :name="`space_setting.space_collections[${fieldid}].label`"
                                    >
                                      <ShadFormItem v-auto-animate>
                                        <ShadFormControl>
                                          <ShadInput
                                            class="input rounded-e-none"
                                            autocomplete="off"
                                            type="text"
                                            v-bind="componentField"
                                          />
                                        </ShadFormControl>
                                      </ShadFormItem>
                                    </ShadFormField>
                                    <p
                                      class="absolute bg-white right-2 top-3 text-xs text-gray-500"
                                    >
                                      0/50
                                    </p>
                                  </div>
                                  <div class="w-28">
                                    <ShadFormField
                                      v-slot="{ componentField }"
                                      :id="`field_type_${fieldid}`"
                                      :name="`space_setting.space_collections[${fieldid}].field_type`"
                                    >
                                      <ShadFormItem>
                                        <ShadSelect v-bind="componentField">
                                          <ShadFormControl
                                            class="select rounded-s-none rounded-e-none border-s-0 border-e-0"
                                          >
                                            <ShadSelectTrigger>
                                              <ShadSelectValue
                                                class="text-gray-600"
                                                placeholder="Text"
                                              />
                                            </ShadSelectTrigger>
                                          </ShadFormControl>
                                          <ShadSelectContent>
                                            <ShadSelectGroup>
                                              <ShadSelectItem
                                                class="text-gray-500"
                                                value="Text"
                                              >
                                                Text
                                              </ShadSelectItem>
                                              <ShadSelectItem
                                                class="text-gray-500"
                                                value="Checkbox"
                                                >Checkbox
                                              </ShadSelectItem>
                                            </ShadSelectGroup>
                                          </ShadSelectContent>
                                        </ShadSelect>
                                      </ShadFormItem>
                                    </ShadFormField>
                                  </div>
                                  <div class="flex items-center space-x-2">
                                    <ShadButton
                                      class="border border-gray-200 rounded-s-none bg-gray-50 hover:bg-gray-100 text-gray-600"
                                    >
                                      <ShadFormField
                                        v-slot="{ value, handleChange }"
                                        :id="`collectionreq_${fieldid}`"
                                        :name="`space_setting.space_collections[${fieldid}].is_required`"
                                      >
                                        <ShadFormItem class="flex items-center">
                                          <ShadFormControl class=" ">
                                            <ShadCheckbox
                                              :checked="value"
                                              @update:checked="handleChange"
                                            />
                                          </ShadFormControl>
                                          <ShadFormLabel
                                            class="text-sm text-gray-700 ms-2 mt0 font-normal cursor-pointer"
                                            >Required?
                                          </ShadFormLabel>
                                        </ShadFormItem>
                                      </ShadFormField>
                                    </ShadButton>
                                  </div>
                                </div>
                                <div class="ms-4 cursor-pointer">
                                  <IconTrash
                                    @click="remove(fieldid)"
                                    class="text-gray-500"
                                    :size="20"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="flex items-center cursor-pointer"
                            v-if="fields.length < 8"
                            @click="
                              push({
                                label: '',
                                field_type: 'Text',
                                is_required: false,
                                is_enable: true,
                              })
                            "
                          >
                            <IconCirclePlus class="text-gray-700" :size="18" />
                            <h5 class="text-sm font-medium ms-1 text-gray-700">
                              Add a new field (up to 5)
                            </h5>
                          </div>
                        </FieldArray>
                      </div>
                    </ShadPopoverContent>
                  </ShadPopover>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-x-5">
                <div>
                  <ShadFormField
                    v-slot="{ componentField }"
                    name="space_setting.collection_type"
                  >
                    <ShadFormItem>
                      <ShadFormLabel class="form-label"
                        >Collection type</ShadFormLabel
                      >
                      <ShadSelect v-bind="componentField">
                        <ShadFormControl class="select">
                          <ShadSelectTrigger>
                            <ShadSelectValue
                              class="text-gray-600"
                              placeholder="Select collection type"
                            />
                          </ShadSelectTrigger>
                        </ShadFormControl>
                        <ShadSelectContent>
                          <ShadSelectGroup>
                            <ShadSelectItem
                              class="text-gray-500"
                              v-for="collection in collectionType"
                              :value="collection"
                            >
                              {{ collection }}
                            </ShadSelectItem>
                          </ShadSelectGroup>
                        </ShadSelectContent>
                      </ShadSelect>
                    </ShadFormItem>
                  </ShadFormField>
                </div>
                <div>
                  <ShadFormField
                    v-slot="{ value, handleChange }"
                    name="space_setting.collect_star"
                  >
                    <ShadFormItem v-auto-animate>
                      <ShadFormLabel class="form-label"
                        >Collect star ratings</ShadFormLabel
                      >
                      <ShadFormControl>
                        <ShadSwitch
                          :checked="value"
                          @update:checked="handleChange"
                        />
                      </ShadFormControl>
                    </ShadFormItem>
                  </ShadFormField>
                </div>
                <div>
                  <ShadFormField
                    v-slot="{ value, handleChange }"
                    name="space_setting.theme"
                  >
                    <ShadFormItem v-auto-animate>
                      <ShadFormLabel class="form-label"
                        >Choose a theme</ShadFormLabel
                      >
                      <ShadFormControl>
                        <ShadSwitch
                          :checked="value"
                          @update:checked="handleChange"
                        />
                      </ShadFormControl>
                    </ShadFormItem>
                  </ShadFormField>
                </div>
              </div>

              <ShadButton class="w-full" type="submit">
                Create New Space
              </ShadButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
