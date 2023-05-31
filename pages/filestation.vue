<script lang="ts" setup>
import Tree, {TreeNode} from 'primevue/tree'
import {ref} from "#imports";
import {useSynoStore} from "~/stores/syno";

const {fetchFileStationFiles, fetchFileStationSharedFolders, handleFilestationDownload} = useSynoStore()

const createTreeNode = (item: any): TreeNode => {
  return {
    data: item,
    key: item.path,
    label: item.name,
    icon: item.isdir ? 'pi pi-folder' : 'pi pi-file',
    leaf: item.additional?.size != null && item.additional?.size <= 0
  }
}

const nodes = ref<TreeNode[]>();
const loading = ref<boolean>(false);
const files = ref<any[] | null>()

const data_list = await fetchFileStationSharedFolders()

nodes.value = data_list.shares.map((it: any) => createTreeNode(it))

const onNodeExpand = async (node: TreeNode) => {
  loading.value = true

  try {
    const data_list_children = await fetchFileStationFiles({
      folder_path: node.key!!,
      filetype: 'dir'
    })

    const allDirs = data_list_children.files.filter((it: any) => it.isdir)

    if (allDirs.length < 1) {
      node.leaf = true
    } else {
      node.children = allDirs.map((it: any) => createTreeNode(it))
    }
  } finally {
    loading.value = false
  }
};

const onNodeSelect = async (node: TreeNode) => {
  const data_list_node = await fetchFileStationFiles({
    folder_path: node.key!!,
  })
  files.value = data_list_node.files
}

const onFilenameClick = async (item: any) => {
  const blob = await handleFilestationDownload(item.path)

  downloadBlob(blob, item.isdir ? `${item.name}.zip` : item.name)
}
</script>

<template>
  <Card :pt="{root: {class: 'shadow-none border-1 border-gray-300'}}">
    <template #title>
      File Manager
    </template>

    <template #content>
      <div class="flex flex-row">
        <Tree :value="nodes" @node-expand="onNodeExpand" :loading="loading" class="w-full md:w-30rem" scroll-height="50rem" :filter="true" selection-mode="single" filter-mode="lenient" @node-select="onNodeSelect"></Tree>

        <div class="flex-grow-1 w-100">
          <template v-if="files != null && files.length > 0">
            <DataTable class="p-datatable-sm" scroll-height="50rem" :value="files" paginator :rows="15" :rows-per-page-options="[5,10,15,25,50,100]" paginator-position="both">

              <Column field="name" header="Nom du fichier">
                <template #body="props">
                  <div class="flex align-items-center gap-2">
                    <i class="pi" :class="{'pi-folder text-orange-500': props.data.isdir, 'pi-file text-blue-500': !props.data.isdir}"></i>
                    <span class="cursor-pointer hover:underline" @click="onFilenameClick(props.data)">{{ props.data.name }}</span>
                  </div>
                </template>
              </Column>

              <Column header="Taille">
                <template #body="props">
                  {{ props.data.additional?.size }}
                </template>
              </Column>

            </DataTable>
          </template>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.p-tree {
  border: none;
}
</style>
