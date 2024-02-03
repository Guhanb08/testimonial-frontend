<script setup lang="ts">
import RecordRTC from "recordrtc";
import { ref, onMounted, watch } from "vue";
import { useMediaStore } from "@/stores/mediaStore";

const mediaStore = useMediaStore();

const emit = defineEmits();
const emitBlobEvent = (blob : Blob) => {
  emit('emitBlob', blob);
};


const props = defineProps<{
  recordingTimeLimit: number
}>()

const currentMediaStream = ref<MediaStream | null>(null);
const recorder = ref<RecordRTC | null>(null);
const camEnabled = ref<Boolean>(false);
const isRecording = ref<Boolean>(false);
const remainingTime = ref<number>(0);
const recordingTimer = ref<number>(0);
const videoElement = ref<HTMLVideoElement | null>(null);


onMounted(() => {
  camEnabled.value = true;
    initiateCamera();
    remainingTime.value = props.recordingTimeLimit;
});


const initiateCamera = () => {
  captureCamera((camera) => {
    currentMediaStream.value = camera;
    const video: HTMLVideoElement = videoElement.value as HTMLVideoElement;
    video.muted = true;
    video.volume = 0;
    video.srcObject = camera;
    recorder.value = new RecordRTC(camera, {
      type: "video",
      mimeType: 'video/mp4',
    });
  });
  camEnabled.value = true;
};

const captureCamera = (callback: (camera: MediaStream) => void) => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: {
          exact: undefined,
        },
      },
      audio: { deviceId: { exact: undefined } },
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
  remainingTime.value = props.recordingTimeLimit;

  recorder.value?.startRecording();
  recordingTimer.value = setInterval(() => {
    remainingTime.value--;
    if (remainingTime.value <= 0) {
      stopRecord();
    }
  }, 1000);
};
const stopRecord = () => {
  isRecording.value = false;
  recorder.value?.stopRecording(() => {
    const blob = recorder.value?.getBlob();
    if (blob) {
      camEnabled.value = false;
      remainingTime.value = props.recordingTimeLimit;
      clearInterval(recordingTimer.value);
      console.log('blob' , blob)
      emitBlobEvent(blob);
    }
  });
};

</script>

<template>
  <div>
    <div class="relative mb-5"  v-if="camEnabled">
      <video
        autoplay
        playsinline
        ref="videoElement"
        height="500"
        class="w-full scale-x-[-1]"
      ></video>
      <p
        class="absolute right-10 top-8 text-white font-semibold text-2xl m-0"
      >
        <IconPlayerRecordFilled
          class="text-red-500 inline me-1"
          :size="20"
        ></IconPlayerRecordFilled
        >{{ remainingTime }} <span class="text-xl ms-1">S</span>
      </p>
      <div
        class="absolute top-0 left-0 right-0 bottom-0 flex justify-center"
      >
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
  </div>
</template>

<style scoped></style>
