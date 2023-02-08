OptimaV2-Docs
=============

## Requirements
- python
- mkdocs

## How to generate HTML docs
``` bash
# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Generate HTML docs
mkdocs build
```