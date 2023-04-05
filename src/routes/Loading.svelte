


<style>
    .spinner {
      margin: 0 auto;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 5px solid #ddd;
      border-top-color: #555;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
  

  <script>
    export let isLoading = false;
  </script>
  
  {#if isLoading}
    <div class="spinner"></div>
  {/if}
  