<script setup lang="ts">

import DraftDto from '@/dto/draft-dto';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';

const props = defineProps<{
  draft: DraftDto
}>()
const emit = defineEmits<{
  (e: 'delete', value: number): void
  (e: 'edit', value: number): void
}>()


const emitPops = (prop: string) => {
  if (prop === 'delete') {
    const id = props.draft?.id
    if (id) {
      emit('delete', id)
    }


  } else if (prop === 'edit') {
    const id = props.draft?.id
    if (id) {
      emit('edit', id)
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ draft?.title }}</h5>
      <p class="card-text" v-html="draft?.content"></p>
      <div class="row">
        <div class="col-12 d-flex justify-items-start gap-3">
          <span class="myIcon" @click="emitPops('edit')">
            <EditIcon />
          </span>
          <span class="myIcon" @click="emitPops('delete')">
            <DeleteIcon />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myIcon {
  width: 19px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  cursor: pointer;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5em;
  max-height: 3em;
}
</style>
