<script setup lang="ts">
import SingleDraft from '../components/SingleDraft.vue'

import AddIcon from '../components/icons/AddIcon.vue';

import { ref, reactive, onBeforeMount, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import DraftDto from '@/dto/draft-dto';
import { getAllSavedData } from '@/services/localStorage';
import { AI_KEY, AI_URL, LOGGED_USER_ID, } from '@/constants/constants';
import { createDraft, updateDraft, deleteSingleDraft, getSingleDraft, getAllSingleUserDraft } from '@/services/draftService';
const draft = reactive(new DraftDto()) as DraftDto;
const editModal = ref(true);
const searchModel = ref('');
const drafts: any = ref([]);
import type { QuillEditor as QuillEditorType } from '@vueup/vue-quill'
const quillRef = ref<InstanceType<typeof QuillEditorType> | null>(null)

const modalButton = ref<HTMLButtonElement | null>(null);

onBeforeMount(() => {
  getAllDrafts();
});


watch(searchModel, () => {
  if (searchModel.value) {
    getAllDrafts(searchModel.value);
  } else {
    getAllDrafts()
  }
})

function createModal() {
  editModal.value = false;

}



const callAI = async (prompt: string, purpose: string) => {
  fetch(`${AI_URL}=${AI_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    })
  })
    .then(response => response.json())
    .then(data => {
      const resp = data.candidates[0].content.parts[0].text
      if (purpose === 'title') draft.title = resp;
      if (purpose === 'summary') draft.summary = resp;
      if (purpose === 'keywords') draft.keywords = resp;

    })
    .catch(error => {
      console.error("Error:", error);
    });

}

const generateTitle = async () => {
  const prompt = `Generate  a single title for this text  '${draft.content}' and return only that title no pre-text or after text`
  const result = callAI(prompt, 'title')
}

const summarizeContent = async () => {
  const prompt = `Summarize this text '${draft.content}'and return only that summary no pre-text or after text`
  const result = callAI(prompt, 'summary')
}


const suggestKeywords = async () => {
  const prompt = `Suggest Keywords from this text '${draft.content}' and return only those keyword separated by comma and return no pre-text or after text`
  const result = callAI(prompt, 'keywords')

}


const saveDraft = async () => {
  if (draft.content) {
    const getUserLoggedInID = await getAllSavedData(LOGGED_USER_ID);
    draft.title = draft.title ? draft.title : 'UNTITLED';
    if (!editModal.value) {
      draft.userId = getUserLoggedInID;
      createDraft(draft)

    } else {
      updateDraft(draft);
    }
    cancelDraft()
    getAllDrafts();

  }
}

const cancelDraft = () => {
  Object.assign(draft, new DraftDto());
  const quill = quillRef.value?.getQuill?.();
  quill?.setText('');
}



const getAllDrafts = (search: string = '') => {
  const allDrafts = getAllSingleUserDraft(search);
  drafts.value = allDrafts;

}

const deleteSelectedDraft = (id: number) => {
  const deleteDraft = deleteSingleDraft(id)
  if (deleteDraft) {
    getAllDrafts();
  }

}

const editSelectedDraft = (id: number) => {
  const editDraft = getSingleDraft(id)
  if (editDraft) {
    draft.content = editDraft.content
    draft.id = editDraft.id
    draft.title = editDraft.title
    draft.userId = editDraft.userId
    draft.status = editDraft.status
    draft.summary = editDraft.summary
    draft.keywords = editDraft.keywords
    editModal.value = true;
    modalButton.value?.click();

  }

}



</script>

<template>
  <main>
    <div class="container-fluid w-100 p-5">
      <div class="row justify-content-between mb-5">
        <div class="col-md-6">
          <h2 style=" color: #2e7d32;">Drafts</h2>
        </div>
        <div class="col-md-4 d-md-flex  justify-content-end  gap-4  ">
          <input type="search" placeholder="Search by title" aria-label="Search" v-model="searchModel"
            class="customized-input search-width mb-2">
          <button class="btn btn-success  d-flex justify-content-center align-items-center gap-2 customized-button"
            @click="createModal" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
            <AddIcon /> Create Draft
          </button>

        </div>
      </div>



      <div class="row d-flex flex-wrap" v-if="drafts ">

        <div class="col-md-4 mb-4" v-for="singleDraft in drafts" :key="singleDraft">
          <SingleDraft :draft="singleDraft" @delete="deleteSelectedDraft" @edit="editSelectedDraft" />
        </div>
      </div>
      <div class="row " v-if="(drafts?.length==0 && !searchModel)||(!drafts && !searchModel)">
        <div class="col-12 empty-state">
          <p class="text-1"> No draft yet!</p>
          <p class="text-1"> Kindly click on Create draft button to create your draft</p>
        </div>
      </div>
        <div class="row " v-if="(drafts?.length==0&& searchModel)||(!drafts && searchModel)">
        <div class="col-12 empty-state">
          <p class="text-1"> Search not found</p>
        </div>
      </div>

    </div>


    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
      tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog  modal-lg modal-dialog-centered  modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalToggleLabel">{{ editModal ? 'Edit Draft' : 'Create Draft' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
              @click="cancelDraft"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 d-grid justify-items-start gap-1 mb-3">
                <label>Title</label>
                <input disabled type="text" id="titleInput" class="customized-input"
                  placeholder="title generated will be displayed here" :value="draft.title">
              </div>
              <div class="col-12 d-grid justify-items-start gap-1 mb-3" v-if="draft.keywords">
                <label>Keywords</label>
                <textarea v-model="draft.keywords" disabled class="customized-input"></textarea>
              </div>
              <div class="col-12 d-grid justify-items-start gap-1 mb-3" v-if="draft.summary">
                <label>Summary</label>
                <textarea v-model="draft.summary" disabled class="customized-input"></textarea>
              </div>
              <div class="col-12 d-grid justify-items-start gap-1 mb-3">
                <label>Content</label>
                <QuillEditor ref="quillRef" v-model:content="draft.content" content-type="html" theme="snow" />

              </div>
              <div class="col-12 d-flex justify-content-center align-items-center flex-wrap gap-3 gap-md-0 ">
                <div class="col-md-4"><button class="btn btn-outline-success" @click="generateTitle">Generate
                    Title</button></div>
                <div class="col-md-4"><button class="btn btn-outline-success"
                    @click="summarizeContent">Summarize</button></div>
                <div class="col-md-4"><button class="btn btn-outline-success" @click="suggestKeywords">Suggest
                    Keywords</button></div>
              </div>
            </div>
          </div>
          <div class="modal-footer gap-2">
            <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-dismiss="modal"
              @click="cancelDraft">Cancel</button>
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-dismiss="modal"
              @click="saveDraft">Save</button>
          </div>
        </div>
      </div>
    </div>

    <a class="btn btn-primary" data-bs-toggle="modal" hidden href="#exampleModalToggle" role="button"
      ref="modalButton">Open first modal</a>
  </main>
</template>


<style scoped>
.customized-input {
  display: flex;
  width: 100%;
  padding: 10px 16px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 7px;
  border: 1px solid #E5E5E5;
  background: #FFF;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.03);
  outline: none;
}

.search-width {
  width: 224px;
}

.customized-button {
  min-width: max-content;
  height: 45px;
}

textarea {
  min-height: 120px;
  max-height: max-content;

  resize: none;
  padding: 0;
  line-height: 1.5;


}

.empty-state {
  height: calc(100dvh - 300px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.text-1 {
  text-align: center;
  color: #19471b;
  font-size: 20px;

}
</style>
