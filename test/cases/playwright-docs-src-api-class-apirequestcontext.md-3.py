api_request_context.fetch(
  "https://example.com/api/uploadScrip'",
  method="post",
  multipart={
    "fileField": {
      "name": "f.js",
      "mimeType": "text/javascript",
      "buffer": b"console.log(2022);",
    },
  })
