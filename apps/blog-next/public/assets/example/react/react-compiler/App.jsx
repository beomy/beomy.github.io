import { useState, useEffect, useRef } from 'react'

const ROWS = 300
const items = Array.from({ length: ROWS }, (_, i) => ({ id: i + 1, name: `item ${i + 1}` }))

// 행 하나를 그릴 때 드는 약간의 계산 (실제 앱의 포맷팅·필터링 등을 흉내)
const format = (n) => {
  let s = 0
  for (let i = 0; i < 20000; i++) s = (s + n * i) % 9973
  return s
}

const Row = ({ item, onSelect, onRender }) => {
  const ref = useRef(null)
  useEffect(() => {
    // 이 효과는 Row 가 렌더링될 때마다 실행됩니다. 렌더링 횟수를 세고 행을 잠깐 반짝입니다.
    onRender()
    const el = ref.current
    el.classList.remove('flash')
    void el.offsetWidth
    el.classList.add('flash')
  })
  return (
    <li ref={ref} onClick={() => onSelect(item.id)}>
      {item.name} <span className="dim">{format(item.id)}</span>
    </li>
  )
}

export const App = ({ label }) => {
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(null)
  const rowRenders = useRef(0)
  const clickedAt = useRef(0)
  const statRef = useRef(null)
  const rendersRef = useRef(null)

  const onRender = () => {
    rowRenders.current += 1
  }
  const onClick = () => {
    clickedAt.current = performance.now()
    setCount(count + 1)
  }

  useEffect(() => {
    // 렌더링과 커밋이 끝난 시점. 자식 Row 의 효과가 먼저 실행되므로 누적 횟수가 정확합니다.
    rendersRef.current.textContent = String(rowRenders.current)
    if (clickedAt.current) {
      const ms = performance.now() - clickedAt.current
      statRef.current.textContent = `${ms.toFixed(1)} ms`
      clickedAt.current = 0
    }
  })

  return (
    <section className="panel">
      <h2>{label}</h2>
      <div className="controls">
        <button onClick={onClick}>count + 1</button>
        <span className="count">count: {count}</span>
      </div>
      <dl>
        <dt>마지막 클릭 처리 시간</dt>
        <dd ref={statRef}>-</dd>
        <dt>Row 누적 렌더링 횟수</dt>
        <dd ref={rendersRef}>0</dd>
        <dt>선택한 행</dt>
        <dd>{selected ?? '-'}</dd>
      </dl>
      <ul>
        {items.map((item) => (
          <Row key={item.id} item={item} onSelect={setSelected} onRender={onRender} />
        ))}
      </ul>
    </section>
  )
}
