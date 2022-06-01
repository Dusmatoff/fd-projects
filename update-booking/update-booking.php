<h1><a href="/wp-admin/admin.php?page=update-appointment&updateid=<?php echo $_GET['updateid']; ?>" target="_blank">Old update booking page</a></h1>
<!-- Fonts to support Material Design -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
<!-- Icons to support Material Design -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
<!-- Styles for new update booking page -->
<?php enqueue_css( '/wp-content/plugins/appointment-calendar/update-booking/update-booking.css' ); ?>
<div id="root"></div>
<?php
enqueue_js('/wp-content/plugins/appointment-calendar/update-booking/dist/main.js');
?>