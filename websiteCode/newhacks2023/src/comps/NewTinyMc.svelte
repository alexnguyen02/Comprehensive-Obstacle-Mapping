<!-- TinyMCEEditor.svelte -->
<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      tinymce.init({
        selector: '#editor',
        plugins: 'advlist autolink lists link image charmap print preview anchor',
        toolbar: 'undo redo | bold italic | bullist numlist outdent indent',
      });
    });
  </script>
  
  <div class="editor-container">
    <textarea id="editor"></textarea>
  </div>
  
      <!--button 1-->
  <div class="bg-pink min-h-100"> 
    <!-- Other content -->
    <div class="editor-container">
      <TinyMCEEditor />
    </div>

      <!-- Display the content from TinyMCE for Button 1 -->
  <div>{buttonText1}</div>

  <!-- Button 2 -->
  <div class="editor-container">
    <TinyMCEEditor />
    <button on:click={() => { /* handle button 2 click */ }}>Button 2</button>
  </div>
  <!-- Display the content from TinyMCE for Button 2 -->
  <div>{buttonText2}</div>

  <!-- Button 3 -->
  <div class="editor-container">
    <TinyMCEEditor />
    <button on:click={() => { /* handle button 3 click */ }}>Button 3</button>
  </div>
  <!-- Display the content from TinyMCE for Button 3 -->
  <div>{buttonText3}</div>

  <!-- Add more buttons as needed -->
  <!-- ...
</div>
