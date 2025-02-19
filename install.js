module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone --recursive https://github.com/6Morpheus6/MagicQuill app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio_magicquill-0.0.1-py3-none-any.whl",
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      when: "{{platform === 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "mkdir models\\checkpoints\\SD1.5 models\\configs models\\controlnet",
          "copy /Y pyproject.toml MagicQuill\\LLaVA\\",
          "uv pip install -e MagicQuill\\LLaVA\\",
//          "uv pip uninstall -y torch torchvision torchaudio"
        ]
      },
        next: "torch"
    },
    {
      when: "{{platform !== 'win32'}}",
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "mkdir -p models/checkpoints/SD1.5 models/configs models/controlnet",
          "cp -f pyproject.toml MagicQuill/LLaVA/",
          "uv pip install -e MagicQuill/LLaVA/",
//          "uv pip uninstall -y torch torchvision torchaudio"
        ]
      }
    },
    {
      id: "torch",
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      "method": "fs.link",
      "params": {
        "drive": {
          "checkpoints": "app/models/checkpoints/SD1.5",
          "configs": "app/models/configs",
          "controlnet": "app/models/controlnet"
        },
        "peers": [
          "https://github.com/cocktailpeanut/fluxgym.git",
          "https://github.com/cocktailpeanutlabs/automatic1111.git",
          "https://github.com/cocktailpeanutlabs/fooocus.git",
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "LiuZichen/MagicQuill-models" ],
        "exclude": '"*DS_Store" "*.md"',
        "local-dir": "models",
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/env"
      }
    }
  ]
}
