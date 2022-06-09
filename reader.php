<?php

$file = fopen("dates.txt", "r");
while($line = fgets($file)){
    echo $line;
}
fclose($file);

echo "Last update: ".date("d F Y H:i:s", filemtime("dates.txt"))."\n";

?>