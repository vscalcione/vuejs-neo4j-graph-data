<template>
  <li v-bind:id="node.name" v-on:click.stop="nodeClicked">
    <span v-bind:class="{ selected: selectedNode == node.name }">{{
      node.name
    }}</span>

    <ul v-if="node.child && node.child.length">
      <node
        v-for="child in node.child"
        :node="child"
        :selectedNode="selectedNode"
        v-bind:key="child.name"
      ></node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: Object,
    selectedNode: String,
  },
  methods: {
    nodeClicked() {
      this.$root.$emit("node clicked", this.node.name, this.node.description);
    },
  },
};
</script>

<style scoped>
.selected {
  border-color: red;
}
</style>