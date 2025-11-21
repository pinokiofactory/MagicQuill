module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
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
        env: {
          CONDA_AUTO_UPDATE_CONDA: "false"
        },
        message: [
          "conda update -y -c conda-forge huggingface_hub",
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
          "https://github.com/pinokiofactory/comfy.git",
          "https://github.com/pinokiofactory/stable-diffusion-webui-forge.git",
          "https://github.com/6Morpheus6/Fooocus-API.git",
          "https://github.com/6Morpheus6/forge-neo.git"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download LiuZichen/MagicQuill-models --exclude "*DS_Store" --exclude "*.md" --local-dir models && dir'
      }
    }
  ]
}
