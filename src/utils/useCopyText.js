export default function copyText(_dom) {
  const el = document.querySelector(_dom)
  if (!el) throw new Error('is not a Element')

  el.select()
  document.execCommand('copy')
}
