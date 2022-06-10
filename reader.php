<?php

$file = fopen("dates.txt", "r");
while($line = fgets($file)){
    echo $line;
}
fclose($file);

date_default_timezone_set("Europe/Brussels");
echo date("d M Y H:i", filemtime("dates.txt"))."\n";

?>