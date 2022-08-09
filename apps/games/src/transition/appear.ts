interface IAppearTrasnsitionOption {
  delay?: number
  duration?: number
}

export default function appear(
  node: Element,
  { delay = 0, duration = 400 }: IAppearTrasnsitionOption,
) {
  return {
    delay,
    duration,
    css: (t: number) => {
      const style: CSSStyleDeclaration = getComputedStyle(node)
      const o: number = +style.opacity
      return `
        transform: scale(${t * o});
        opacity: ${t * o};
      `
    },
  }
}
