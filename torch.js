module.exports = {
  run: [
    // nvidia 50 series (windows)
    {
      "when": "{{gpu === 'nvidia' platform === 'win32' && gpu_model && / 50.+/.test(gpu_model) }}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install https://huggingface.co/w-e-w/torch-2.6.0-cu128.nv/resolve/main/torch-2.6.0%2Bcu128.nv-cp310-cp310-win_amd64.whl",
          "uv pip install https://huggingface.co/w-e-w/torch-2.6.0-cu128.nv/resolve/main/torchvision-0.20.0a0%2Bcu128.nv-cp310-cp310-win_amd64.whl",
          "uv pip install https://huggingface.co/DeathDaDev/torchaudio-2.6.0-cu128/resolve/main/torchaudio-2.6.0a0%2Bc670ad8-cp310-cp310-win_amd64.whl",
        ]
      },
      "next": null
    },
    // nvidia 50 series (linux)
    {
      "when": "{{gpu === 'nvidia' platform === 'linux' && gpu_model && / 50.+/.test(gpu_model) }}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
      },
      "next": null
    },
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu121"
      }
    },
    // windows amd
    {
      "when": "{{platform === 'win32' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch-directml torchaudio torchvision numpy==1.26.4"
      }
    },
    // windows cpu
    {
      "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 numpy==1.26.4"
      }
    },
    // apple mac
    {
      "when": "{{platform === 'darwin' && arch === 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1"
      }
    },
    // intel mac
    {
      "when": "{{platform === 'darwin' && arch !== 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2"
      }
    },
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu121"
      }
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/rocm6.0"
      }
    },
    // linux cpu
    {
      "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !=='nvidia')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cpu"
      }
    }
  ]
}
