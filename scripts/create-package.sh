#!/bin/bash

# 引数チェック
if [ -z "$1" ]; then
  echo "Usage: $0 <package-name>"
  exit 1
fi

PACKAGE_NAME=$1
PACKAGE_DIR="packages/$PACKAGE_NAME"

# ディレクトリが既に存在するかチェック
if [ -d "$PACKAGE_DIR" ]; then
  echo "Package directory $PACKAGE_DIR already exists."
  exit 1
fi

# ディレクトリ作成
mkdir -p "$PACKAGE_DIR"
cd "$PACKAGE_DIR"

# bun initで初期化
bun init -y

# package.jsonを更新
cat > package.json << EOF
{
  "name": "@workspace/$PACKAGE_NAME",
  "version": "0.1.0",
  "module": "index.ts",
  "type": "module",
  "main": "index.ts",
  "types": "index.ts",
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  }
}
EOF

echo "Package @workspace/$PACKAGE_NAME created successfully in $PACKAGE_DIR"