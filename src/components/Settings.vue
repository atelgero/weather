<template>
  <div class="settings">
    <div class="close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
           @click="$emit('close-settings') "
           class="bi bi-x-lg" viewBox="0 0 16 16">
        <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </div>
    <p>Settings</p>

    <draggable :list="locations" handle=".hamburger" class="list-wrap">
    <div class="city" v-for="(l, idx) in locations" :key="l.name">
      <svg class="hamburger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
      <p class="town">{{ l.name }}, {{ l.country }}</p>
      <svg class="trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
           @click="removeAt(idx)">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
    </div>
    </draggable>

    <AddCity v-on:add-city="onAddCity"/>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import AddCity from "@/components/NewLocation";

export default {
  name: 'LocationSettings',
  components: {
    draggable, AddCity
  },
  props: {
    locations: Array,
  },
  data() {
    return {
      dragging: false,
      newCity: ""
    }
  },
  methods: {
    onAddCity(newLocation) {
      this.$emit('add-city', newLocation)
    },

    removeAt(idx) {
      this.$emit('remove-city', idx);
    },
  }
}
</script>

<style scoped>
.settings {
  width: 197px;
  min-height: 259px;
  margin: 0;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  display: none;
}

/*noinspection CssUnusedSymbol*/
.active {
  display: block;
  /*min-height: 260px;*/
}

.list-wrap {
  margin-bottom: 60px;
}

p {
  margin-top: 0.2em;
}

.bi-x-lg {
  float: right;
  cursor: pointer;
}

.city {
  display: flex;
  background-color: whitesmoke;
  align-items: center;
}

.hamburger {
  padding: 10px;
  cursor: move;
  min-width: 16px;
  min-height: 16px;
}

.town {
  margin: 0;
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trash {
  padding: 10px;
  margin-left: auto;
  align-self: center;
  cursor: pointer;
  min-width: 16px;
  min-height: 16px;
}

</style>