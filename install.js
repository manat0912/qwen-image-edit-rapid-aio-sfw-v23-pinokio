module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/IllyaS08/qwen-image-edit-rapid-aio-sfw-v23 app",
        ]
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "patches/app.py",
        dest: "app/app.py"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch spaces",
          "uv tool install hf",
          "uv pip install hf-xet pip",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "IllyaS08/qwen-image-edit-rapid-aio-sfw-v23" ],
        "repo-type": "space",
        "local-dir": "checkpoints",
        "token": "False"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",                // Edit this to customize the venv folder path
          path: "app",                // Edit this to customize the path to start the shell from
          flashattention: true,   // uncomment this line if your project requires flashattention
          xformers: true,   // uncomment this line if your project requires xformers
          triton: true,  // uncomment this line if your project requires triton
          sageattention: true   // uncomment this line if your project requires sageattention
        }
      }
    },
  ]
}
