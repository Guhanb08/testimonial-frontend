import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import apiClient from "./plugins/axios";
import { defineRule } from "vee-validate";
import * as AllRules from "@vee-validate/rules";

import "./assets/css/index.css";
// import VueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/ir-black.css'
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Form, Field, ErrorMessage } from "vee-validate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import { Switch } from "@/components/ui/switch";

import {
  IconInfoCircle,
  IconEdit,
  IconVideo,
  IconMoodSmile,
  IconBriefcase,
  IconSettings,
  IconPlus,
  IconCopy,
  IconArrowRight,
  IconChevronDown,
  IconAnalyze,
  IconMenu2,
  IconShoppingBag,
  IconUsers,
  IconBook,
  IconDeviceMobile,
  IconPencil,
  IconStarFilled,
  IconTrash,
  IconDotsVertical,
  IconAdjustmentsAlt,
  IconAdjustmentsFilled,
  IconAdjustments,
  IconCirclePlus
} from "@tabler/icons-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive("auto-animate", vAutoAnimate);
app.use(Vue3Toasity, { autoClose: 5000 } as ToastContainerOptions);
app.provide("$axios", apiClient);

// VEE VALIDATE
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, (AllRules as any)[rule]);
});

// SHAD UI
app.component("ShadButton", Button);
app.component("ShadInput", Input);
app.component("ShadToast", toast);
app.component("ShadCheckbox", Checkbox);
app.component("ShadTextarea", Textarea);
app.component("ShadAvatar", Avatar);
app.component("ShadAvatarFallback", AvatarFallback);
app.component("ShadAvatarImage", AvatarImage);
app.component("ShadFormControl", FormControl);
app.component("ShadFormDescription", FormDescription);
app.component("ShadFormField", FormField);
app.component("ShadFormItem", FormItem);
app.component("ShadFormLabel", FormLabel);
app.component("ShadFormMessage", FormMessage);
app.component("ShadCard", Card);
app.component("ShadCardContent", CardContent);
app.component("ShadCardDescription", CardDescription);
app.component("ShadCardFooter", CardFooter);
app.component("ShadCardHeader", CardHeader);
app.component("ShadCardTitle", CardTitle);
app.component("ShadSelect", Select);
app.component("ShadSelectContent", SelectContent);
app.component("ShadSelectGroup", SelectGroup);
app.component("ShadSelectItem", SelectItem);
app.component("ShadSelectTrigger", SelectTrigger);
app.component("ShadSelectValue", SelectValue);
app.component("ShadHoverCard", HoverCard);
app.component("ShadHoverCardContent", HoverCardContent);
app.component("ShadHoverCardTrigger", HoverCardTrigger);
app.component("ShadTooltip", Tooltip);
app.component("ShadTooltipContent", TooltipContent);
app.component("ShadTooltipProvider", TooltipProvider);
app.component("ShadTooltipTrigger", TooltipTrigger);
app.component("ShadSwitch", Switch);

// icons

app.component("IconInfoCircle", IconInfoCircle);
app.component("IconEdit", IconEdit);
app.component("IconVideo", IconVideo);
app.component("IconMoodSmile", IconMoodSmile);
app.component("IconBriefcase", IconBriefcase);
app.component("IconSettings", IconSettings);
app.component("IconPlus", IconPlus);
app.component("IconCopy", IconCopy);
app.component("IconArrowRight", IconArrowRight);
app.component("IconChevronDown", IconChevronDown);
app.component("IconAnalyze", IconAnalyze);
app.component("IconMenu2", IconMenu2);
app.component("IconShoppingBag", IconShoppingBag);
app.component("IconUsers", IconUsers);
app.component("IconBook", IconBook);
app.component("IconDeviceMobile", IconDeviceMobile);
app.component("IconStarFilled", IconStarFilled);
app.component("IconPencil", IconPencil);
app.component("IconTrash", IconTrash);
app.component("IconDotsVertical", IconDotsVertical);
app.component("IconAdjustmentsAlt", IconAdjustmentsAlt);
app.component("IconAdjustmentsFilled", IconAdjustmentsFilled);
app.component("IconAdjustments", IconAdjustments);
app.component("IconCirclePlus", IconCirclePlus);

app.component("DragContainer", Container);
app.component("Draggable", Draggable);

// app.use(VueHighlightJS)
app.mount("#app");
