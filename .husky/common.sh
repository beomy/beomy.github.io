command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

# git 훅은 터미널 설정(mise activate)이 없는 셸에서 돌아 PATH 의 node/yarn 이 다른 버전일 수 있다.
# mise shims 를 PATH 앞에 두면 shim 이 저장소의 mise.toml 을 읽어 고정된 버전으로 실행한다.
# (mise 가 없는 환경은 그대로 PATH 의 도구를 쓴다)
MISE_SHIMS="${MISE_DATA_DIR:-$HOME/.local/share/mise}/shims"
if [ -d "$MISE_SHIMS" ]; then
  export PATH="$MISE_SHIMS:$PATH"
fi
