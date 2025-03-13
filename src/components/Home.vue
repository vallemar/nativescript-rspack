<script lang="ts" setup>
import { CreateViewEventData, Placeholder } from "@nativescript/core";
import {
  $navigateTo,
  computed,
  onMounted,
  onUnmounted,
  ref,
} from "nativescript-vue";
import { MyButton } from "~/androidClassTest";
import Details from "./Details.vue";

const counter = ref(0);
const message = computed(() => {
  return `Blank {N}-Vue app: ${counter.value}`;
});

function logMessage() {
  console.log("You have tapped the message!");
}

let interval: any;
onMounted(() => {
  console.log("mounted");
  interval = setInterval(() => counter.value++, 100);
});

onUnmounted(() => {
  console.log("unmounted");
  clearInterval(interval);
});

function creatingView(args: CreateViewEventData) {
  const button = new MyButton();
  args.view = button;
  button.onClick();
}
</script>

<template>
  <Frame>
    <Page>
      <ActionBar>
        <Label text="Home" class="font-bold text-lg" />
      </ActionBar>

      <GridLayout rows="*, auto, auto, *" class="px-4 bg-blue-400">
        <Placeholder @creatingView="creatingView" />

        <Button
          row="2"
          @tap="$navigateTo(Details)"
          class="mt-4 px-4 py-2 bg-white border-2 border-blue-400 rounded-lg"
          horizontalAlignment="center"
        >
          View Details
        </Button>
      </GridLayout>
    </Page>
  </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>
