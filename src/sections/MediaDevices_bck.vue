<script setup lang="ts">
import RecordRTC from "recordrtc";
import { ref, onMounted , watch } from "vue";
import { useForm, Field, Form, ErrorMessage, FieldArray } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFileStore } from "@/stores/fileStore";
import { ZodError, set } from "zod";
import { useMediaStore } from "@/stores/mediaStore";

const mediaStore = useMediaStore();
const permissionGranted = ref<Boolean>(false);
const isLoading = ref<Boolean>(true);
const videoDevices = ref<MediaDeviceInfo[]>([]);
const audioDevices = ref<MediaDeviceInfo[]>([]);
const selectedVideoDevice = ref<string | undefined>(undefined);
const selectedAudioDevice = ref<string | undefined>(undefined);
const currentMediaStream = ref<MediaStream | null>(null);
const recorder = ref<RecordRTC | null>(null);
const camEnabled = ref<Boolean>(false);
const recordingEnabled = ref<Boolean>(false);

const showPreview = ref<Boolean>(false);
const isRecording = ref<Boolean>(false);
const recordingTimeLimit = ref<number>(10);
const remainingTime = ref<number>(10);
const recordingTimer = ref<number | undefined>(undefined);
const videoElement = ref<HTMLVideoElement | null>(null);
const playBackElement = ref<HTMLVideoElement | null>(null);

const formSchema = toTypedSchema(
  z.object({
    video_device: z.string().optional(),
    audio_device: z.string().optional(),
  })
);

const {
  values: deviceValue,
  setValues,
  handleSubmit,
} = useForm({
  validationSchema: formSchema,
});

onMounted(() => {
  getDevicePermission();
});

const updateSelectedVideo = ()=>{
  console.log('2');
}

const getDevicePermission = () => {
  isLoading.value = true;
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      permissionGranted.value = true;
      getDevices();
    })
    .catch((error) => {
      isLoading.value = false;
      permissionGranted.value = false;
      console.error("Error accessing camera and microphone:", error);
    });
};
const getDevices = () => {
  navigator.mediaDevices.enumerateDevices().then((devices) => {
    videoDevices.value = devices.filter(
      (device) => device.kind === "videoinput"
    );
    audioDevices.value = devices.filter(
      (device) => device.kind === "audioinput"
    );
    if (videoDevices.value.length > 0) {
      selectedVideoDevice.value = videoDevices.value[0].deviceId;
    }
    if (audioDevices.value.length > 0) {
      selectedAudioDevice.value = audioDevices.value[0].deviceId;
    }
    if (selectedAudioDevice.value && selectedVideoDevice.value) {
      initiateCamera();
      setValues({
        audio_device: selectedAudioDevice.value,
        video_device: selectedVideoDevice.value,
      });
    }
  });
};

const initiateCamera = () => {
  captureCamera((camera) => {
    currentMediaStream.value = camera;
    const video: HTMLVideoElement = videoElement.value as HTMLVideoElement;
    video.muted = true;
    video.volume = 0;
    video.srcObject = camera;
    recorder.value = new RecordRTC(camera, {
      type: "video",
    });
  });
  camEnabled.value = true;
};

const captureCamera = (callback: (camera: MediaStream) => void) => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: {
          exact: selectedVideoDevice.value,
        },
      },
      audio: { deviceId: { exact: selectedAudioDevice.value } },
    })
    .then((camera: MediaStream) => {
      callback(camera);
    })
    .catch((error: Error) => {
      alert("Unable to capture your camera. Please check console logs.");
      console.error(error);
    });
};

const startRecord = () => {
  isRecording.value = true;
  remainingTime.value = recordingTimeLimit.value;
  recordingTimer.value = setInterval(() => {
    remainingTime.value--;
    if (remainingTime.value <= 0) {
      stopRecord();
    }
  }, 1000);
  recorder.value?.startRecording();
};
const stopRecord = () => {
  isRecording.value = false;
  recorder.value?.stopRecording(() => {
    const blob = recorder.value?.getBlob();
    if (blob) {
      camEnabled.value = false;
      showPreview.value = true;
      remainingTime.value = recordingTimeLimit.value;
      clearInterval(recordingTimer.value);
      const video: HTMLVideoElement = playBackElement.value as HTMLVideoElement;
      video.src = URL.createObjectURL(blob);
      video.play();
      const mediaStreamRef = currentMediaStream.value;
      if (mediaStreamRef) {
        const mediaStream = mediaStreamRef as MediaStream;
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  });
};
const recordVideo = ()=>{
  recordingEnabled.value = true;
}
</script>

<template>
  <div>
    <div class="relative mb-5" v-if="camEnabled">
      <video
        autoplay
        playsinline
        ref="videoElement"
        height="500"
        class="w-full scale-x-[-1]"
      ></video>
      <p v-if="recordingEnabled" class="absolute right-10 top-8 text-white font-semibold text-2xl m-0">
        <IconPlayerRecordFilled
          class="text-red-500 inline me-1"
          :size="20"
        ></IconPlayerRecordFilled
        >{{ remainingTime }}<span class="text-xl ms-1">S</span>
      </p>
      <div  v-if="recordingEnabled" class="absolute top-0 left-0 right-0 bottom-0 flex justify-center">
        <div class="flex flex-col items-center justify-center">
          <p class="text-xl text-red-500 font-semibold">REC</p>
          <div
            v-if="!isRecording"
            class="bg-slate-100 mt-1 p-0 cursor-pointer rounded-full bg-opacity-30"
            @click="startRecord"
          >
            <IconPlayerRecordFilled
              class="text-red-500"
              :size="40"
            ></IconPlayerRecordFilled>
          </div>
          <div
            v-else
            class="bg-slate-100 mt-1 p-0 cursor-pointer rounded-full bg-opacity-30"
            @click="stopRecord"
          >
            <IconPlayerStopFilled
              class="text-red-500 p-1"
              :size="40"
            ></IconPlayerStopFilled>
          </div>
        </div>
      </div>
    </div>
    <video
      autoplay
      controls
      playsinline
      ref="playBackElement"
      height="500"
      class="w-full"
      :class="showPreview ? 'block' : 'hidden'"
    ></video>
  </div>
  <form action="" v-if="!recordingEnabled">
    <div class="mb-5">
      <ShadFormField v-slot="{ componentField }" name="video_device">
        <ShadFormItem>
          <ShadFormLabel class="form-label">Camera</ShadFormLabel>
          <ShadSelect v-bind="componentField">
            <ShadFormControl class="select">
              <ShadSelectTrigger>
                <ShadSelectValue
                  class="text-gray-600"
                  placeholder="Select Video Device"
                />
              </ShadSelectTrigger>
            </ShadFormControl>
            <ShadSelectContent>
              <ShadSelectGroup>
                <ShadSelectItem
                  class="text-gray-500"
                  v-for="collection in videoDevices"
                  :value="collection.deviceId"
                  @change ="updateSelectedVideo"
                >
                  {{ collection.label }}
                </ShadSelectItem>
              </ShadSelectGroup>
            </ShadSelectContent>
          </ShadSelect>
        </ShadFormItem>
      </ShadFormField>
    </div>
    <div class="mb-5">
      <ShadFormField v-slot="{ componentField }" name="audio_device">
        <ShadFormItem>
          <ShadFormLabel class="form-label">Microphone</ShadFormLabel>
          <ShadSelect v-bind="componentField">
            <ShadFormControl class="select">
              <ShadSelectTrigger>
                <ShadSelectValue
                  class="text-gray-600"
                  placeholder="Select Audio Device"
                />
              </ShadSelectTrigger>
            </ShadFormControl>
            <ShadSelectContent>
              <ShadSelectGroup>
                <ShadSelectItem
                  class="text-gray-500"
                  v-for="collection in audioDevices"
                  :value="collection.deviceId"
                  @change ="updateSelectedVideo"
                >
                  {{ collection.label }}
                </ShadSelectItem>
              </ShadSelectGroup>
            </ShadSelectContent>
          </ShadSelect>
        </ShadFormItem>
      </ShadFormField>
    </div>
  </form>
  <div class="pb-5" v-if="!permissionGranted && !isLoading">
    <p class="text-red-500 text-sm text-center">
      You may have denied camera & microphone access, if so you will have to
      allow access in browser settings. However, you can still choose a file to
      upload.
    </p>
  </div>
  <div v-if="!recordingEnabled">
    <ShadButton v-if="camEnabled" @click="recordVideo" type="button" class="w-full">
      Record My video
    </ShadButton>
    <ShadButton
      v-if="!camEnabled && isLoading"
      type="button"
      disabled
      class="w-full"
    >
      <IconLoader2 class="w-4 h-4 mr-2 animate-spin" />
      Please wait
    </ShadButton>
  </div>
</template>

<style scoped></style>
