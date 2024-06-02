#!/bin/sh
for i in $(env | grep REACT_APP_)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)
    echo $key=$value
    find /app -type f -exec sed -i "s|td.${key}|'${value}'|g" '{}' +

    # sed JS and CSS only
    # find /app -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|${key}|${value}|g" '{}' +
done

serve -s /app/build -l 3000