#!/bin/bash

dir="./content"

output_file="./posts.js"

truncate -s 0 "${output_file}"

echo "const posts = [" > "${output_file}"

for file in "${dir}"/*.md ; do
    filename=$(basename "${file}")

    title=$(head -n 1 "${file}" | sed 's/^# //')

    echo " { title: \"${title}\", file: \"${filename}\" }," >> "${output_file}"
done

echo "];" >> "${output_file}"

echo "export default posts" >> "${output_file}"

echo "Posts have been written to ${output_file}"