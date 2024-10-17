# SyncSpace-Collaborative-Whiteboard-Web-App-Project
 #Frontend: Vue.js Whiteboard Interface
 // src/components/Whiteboard.vue
 <template>
  <div id="whiteboard">
    <canvas ref="canvas" @mousedown="startDrawing" @mousemove="draw"
 @mouseup="stopDrawing" @mouseleave="stopDrawing"></canvas>
  </div>
 </template>
 <script>
 export default {
  data() {
    return {
      drawing: false,
      context: null,
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.context = canvas.getContext('2d');
  },
  methods: {
    startDrawing() {
      this.drawing = true;
    },
    draw(event) {
      if (!this.drawing) return;
      this.context.lineTo(event.clientX, event.clientY);
      this.context.stroke();
    },
    stopDrawing() {
      this.drawing = false;
      this.context.beginPath();
    },
  },
 };
 </script>
 <style>
 #whiteboard canvas {
  border: 1px solid black;
 }
 </style>
