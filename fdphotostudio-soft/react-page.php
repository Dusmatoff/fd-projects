<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
<div id="fdsoft-root"></div>

<style>
    input[type=checkbox], input[type=color], input[type=date], input[type=datetime-local], input[type=datetime], input[type=email], input[type=month], input[type=number], input[type=password], input[type=radio], input[type=search], input[type=tel], input[type=text], input[type=time], input[type=url], input[type=week], select {
        border: none !important;
    }

    textarea, textarea:hover, textarea:focus, input, input:hover, input:focus, select, select:hover, select:focus {
        box-shadow: none !important;
    }

    .yellowCell {
        background: #ffe250;
    }

    .greenCell {
        background: #98db75;
    }

    .redCell {
        background: #ff505091;
    }
</style>

<script>
    window.localStorage.setItem('SYMFONY_API_BASE_URL', '<?php echo SYMFONY_API_BASE_URL; ?>')
</script>

<?php
enqueue_js('/wp-content/plugins/fdphotostudio-soft/react/dist/main.js');
