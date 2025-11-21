<template>
	<div
		class="group grid max-h-[14rem] w-full grid-rows-5 lg:max-h-[16rem]"
	>
		<Button
      severity="secondary"
			class="col-span-full row-span-4 row-start-2 transition bg-surface border-none group-hover:translate-y-2"
		></Button>

		<div
			class="item-wrapper relative z-10 col-span-full row-span-3 row-start-1 p-3 place-self-center transition pointer-events-none group-hover:-translate-y-2"
		>
			<slot name="item" />
		</div>

		<div
			class="z-10 col-span-full row-span-2 row-start-4 flex flex-col items-center justify-center pointer-events-none"
		>
      <slot />
		</div>
	</div>
</template>


<script setup>
import Button from 'primevue/button';
</script>

<style scoped>
.item-wrapper::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -8px;      /* 아래쪽으로 이동 → 바닥 그림자 느낌 */
  transform: translateX(-50%);
  width: 75%;
  height: 10%;         /* 세로는 얇게 → 바닥 그림자 형태 */
  
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.30) 30%,
    rgba(0, 0, 0, 0.15) 60%,
    transparent 100%
  );

  filter: blur(2.5px);
  z-index: -1;
  pointer-events: none;
  transition: 0.3s ease;
}

/* hover 시 좀 더 위로 뜨면서 그림자도 약간 커짐 */
.group:hover .item-wrapper::before {
  bottom: -16px;
  filter: blur(6px);
  opacity: 0.75;
}

</style>